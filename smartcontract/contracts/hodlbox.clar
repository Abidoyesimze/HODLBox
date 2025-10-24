;; HODLBox - Time-Locked STX Savings Vault
;; A decentralized savings vault where users can lock STX until a future block height
;; Users maintain full custody of their funds while the contract enforces time locks
;; Features: Time-locks, Emergency withdrawals, Recurring deposits, Achievement NFTs

;; ====================================
;; Constants - Error Codes
;; ====================================

(define-constant contract-owner tx-sender)

;; Error codes for contract operations
(define-constant err-owner-only (err u100))                    ;; Only contract owner can perform this action
(define-constant err-vault-not-found (err u101))               ;; Vault ID does not exist
(define-constant err-still-locked (err u102))                  ;; Vault has not reached unlock block height
(define-constant err-already-withdrawn (err u103))             ;; Vault has already been withdrawn
(define-constant err-invalid-amount (err u104))                ;; Amount must be greater than 0
(define-constant err-invalid-unlock-time (err u105))           ;; Unlock height must be in the future
(define-constant err-unauthorized (err u106))                  ;; Caller is not the vault owner
(define-constant err-emergency-withdrawal-disabled (err u107)) ;; Emergency withdrawals are currently disabled
(define-constant err-invalid-penalty (err u108))               ;; Penalty percentage exceeds maximum allowed
(define-constant err-vault-already-funded (err u109))          ;; Cannot cancel a funded vault
(define-constant err-vault-cancelled (err u110))               ;; Vault has been cancelled
(define-constant err-cannot-add-to-withdrawn (err u111))       ;; Cannot add funds to withdrawn vault
(define-constant err-nft-mint-failed (err u112))               ;; Failed to mint achievement NFT

;; Achievement milestones (in blocks)
(define-constant milestone-1-week u1008)      ;; ~1 week (7 days * 144 blocks/day)
(define-constant milestone-1-month u4320)     ;; ~1 month (30 days * 144 blocks/day)
(define-constant milestone-3-months u12960)   ;; ~3 months
(define-constant milestone-6-months u25920)   ;; ~6 months
(define-constant milestone-1-year u52560)     ;; ~1 year

;; ====================================
;; Data Variables
;; ====================================

;; Counter for generating unique vault IDs
(define-data-var vault-nonce uint u0)

;; Global toggle for emergency withdrawal feature
(define-data-var emergency-withdrawal-enabled bool true)

;; Penalty percentage for emergency withdrawals (default 10%)
;; This incentivizes users to wait for the full lock period
(define-data-var emergency-penalty-percent uint u10)

;; Counter for NFT token IDs
(define-data-var nft-token-nonce uint u0)

;; ====================================
;; NFT Definition
;; ====================================

;; Achievement badge NFT
;; Non-transferable soul-bound tokens representing milestones
(define-non-fungible-token hodlbox-achievement uint)

;; ====================================
;; Data Maps
;; ====================================

;; Main storage for all vault data
;; Maps vault-id to vault details including owner, amount, and lock status
(define-map vaults
  { vault-id: uint }
  {
    owner: principal,              ;; Wallet address that created and owns the vault
    amount: uint,                  ;; Amount of STX locked in microSTX (1 STX = 1,000,000 microSTX)
    unlock-height: uint,           ;; Block height when vault can be withdrawn
    created-at: uint,              ;; Block height when vault was created
    withdrawn: bool,               ;; Flag to prevent double withdrawals
    cancelled: bool,               ;; Flag for cancelled vaults
    note: (string-ascii 256),      ;; Optional user note/goal description
    total-deposited: uint          ;; Track total amount deposited (for recurring deposits)
  }
)

;; Index to track all vaults owned by each user
;; Allows efficient lookup of user's vaults
;; Each user can have up to 100 vaults
(define-map user-vault-ids
  { user: principal }
  { vault-ids: (list 100 uint) }
)

;; Track user statistics for achievements
(define-map user-stats
  { user: principal }
  {
    total-vaults-created: uint,
    total-vaults-completed: uint,
    total-stx-locked: uint,
    longest-lock-duration: uint
  }
)

;; NFT metadata storage
(define-map nft-metadata
  { token-id: uint }
  {
    achievement-type: (string-ascii 64),
    vault-id: uint,
    earned-at: uint,
    lock-duration: uint
  }
)

;; Track which achievements users have earned
(define-map user-achievements
  { user: principal, achievement-type: (string-ascii 64) }
  { earned: bool, token-id: uint }
)

;; ====================================
;; Read-Only Functions
;; ====================================

;; Retrieve full details of a specific vault
;; Returns: (optional vault-data) or none if vault doesn't exist
;; @param vault-id: The unique identifier of the vault
(define-read-only (get-vault (vault-id uint))
  (map-get? vaults { vault-id: vault-id })
)

;; Get list of all vault IDs belonging to a user
;; Returns: list of vault IDs (empty list if user has no vaults)
;; @param user: The principal address to query
(define-read-only (get-user-vaults (user principal))
  (default-to 
    { vault-ids: (list) }
    (map-get? user-vault-ids { user: user })
  )
)

;; Check if a vault has reached its unlock time
;; Returns: true if current block height >= unlock height, false otherwise
;; @param vault-id: The unique identifier of the vault
(define-read-only (is-vault-unlocked (vault-id uint))
  (match (map-get? vaults { vault-id: vault-id })
    vault (>= stacks-block-height (get unlock-height vault))
    false
  )
)

;; Get the current vault counter (last vault ID created)
;; Useful for tracking total vaults created
;; Returns: current nonce value
(define-read-only (get-vault-nonce)
  (var-get vault-nonce)
)

;; Check if emergency withdrawals are currently enabled
;; Returns: true if enabled, false if disabled
(define-read-only (is-emergency-withdrawal-enabled)
  (var-get emergency-withdrawal-enabled)
)

;; Get the current emergency withdrawal penalty percentage
;; Returns: penalty percentage (e.g., 10 = 10%)
(define-read-only (get-emergency-penalty-percent)
  (var-get emergency-penalty-percent)
)

;; Calculate the penalty amount for emergency withdrawal
;; Used by frontend to show users the cost of early withdrawal
;; @param amount: The vault amount in microSTX
;; Returns: penalty amount in microSTX
(define-read-only (calculate-emergency-penalty (amount uint))
  (/ (* amount (var-get emergency-penalty-percent)) u100)
)

;; Get user statistics for profile/achievements
;; @param user: The principal address to query
;; Returns: user stats or default values
(define-read-only (get-user-stats (user principal))
  (default-to
    {
      total-vaults-created: u0,
      total-vaults-completed: u0,
      total-stx-locked: u0,
      longest-lock-duration: u0
    }
    (map-get? user-stats { user: user })
  )
)

;; Get NFT metadata for an achievement
;; @param token-id: The NFT token ID
;; Returns: NFT metadata or none
(define-read-only (get-nft-metadata (token-id uint))
  (map-get? nft-metadata { token-id: token-id })
)

;; Check if user has earned a specific achievement
;; @param user: The principal address
;; @param achievement-type: The achievement name
;; Returns: achievement data or none
(define-read-only (get-user-achievement (user principal) (achievement-type (string-ascii 64)))
  (map-get? user-achievements { user: user, achievement-type: achievement-type })
)

;; Get NFT owner
;; @param token-id: The NFT token ID
;; Returns: owner principal or none
(define-read-only (get-nft-owner (token-id uint))
  (nft-get-owner? hodlbox-achievement token-id)
)

;; Calculate lock duration for a vault
;; @param vault-id: The vault identifier
;; Returns: duration in blocks or u0 if not found
(define-read-only (get-vault-lock-duration (vault-id uint))
  (match (map-get? vaults { vault-id: vault-id })
    vault (- (get unlock-height vault) (get created-at vault))
    u0
  )
)

;; ====================================
;; Public Functions - Core Functionality
;; ====================================

;; Create a new time-locked vault
;; Transfers STX from user to contract and creates vault record
;; Emits event for indexing
;; @param amount: Amount of STX to lock (in microSTX)
;; @param unlock-height: Block height when vault unlocks
;; @param note: Optional note/goal description (max 256 chars)
;; Returns: (ok vault-id) on success, error code on failure
(define-public (create-vault (amount uint) (unlock-height uint) (note (string-ascii 256)))
  (let
    (
      (vault-id (+ (var-get vault-nonce) u1))  ;; Generate new unique ID
      (sender tx-sender)
      (lock-duration (- unlock-height stacks-block-height))
    )
    ;; Validation: amount must be positive
    (asserts! (> amount u0) err-invalid-amount)
    
    ;; Validation: unlock height must be in the future
    (asserts! (> unlock-height stacks-block-height) err-invalid-unlock-time)
    
    ;; Transfer STX from user to contract
    ;; This is where the actual locking happens
    (try! (stx-transfer? amount sender (as-contract tx-sender)))
    
    ;; Store vault data in the map
    (map-set vaults
      { vault-id: vault-id }
      {
        owner: sender,
        amount: amount,
        unlock-height: unlock-height,
        created-at: stacks-block-height,
        withdrawn: false,
        cancelled: false,
        note: note,
        total-deposited: amount
      }
    )
    
    ;; Add vault ID to user's list of vaults
    ;; This maintains an index for easy lookup
    (match (map-get? user-vault-ids { user: sender })
      user-data
        ;; User has existing vaults, append new ID to list
        (map-set user-vault-ids
          { user: sender }
          { vault-ids: (unwrap-panic (as-max-len? (append (get vault-ids user-data) vault-id) u100)) }
        )
      ;; User's first vault, create new list
      (map-set user-vault-ids
        { user: sender }
        { vault-ids: (list vault-id) }
      )
    )
    
    ;; Update user stats
    (let ((stats (get-user-stats sender)))
      (map-set user-stats
        { user: sender }
        {
          total-vaults-created: (+ (get total-vaults-created stats) u1),
          total-vaults-completed: (get total-vaults-completed stats),
          total-stx-locked: (+ (get total-stx-locked stats) amount),
          longest-lock-duration: (if (> lock-duration (get longest-lock-duration stats))
                                    lock-duration
                                    (get longest-lock-duration stats))
        }
      )
    )
    
    ;; Increment the vault counter for next vault
    (var-set vault-nonce vault-id)
    
    ;; Emit event for indexing
    (print {
      event: "vault-created",
      vault-id: vault-id,
      owner: sender,
      amount: amount,
      unlock-height: unlock-height,
      lock-duration: lock-duration,
      created-at: stacks-block-height
    })
    
    ;; Return the new vault ID to the user
    (ok vault-id)
  )
)

;; Add more STX to an existing vault (recurring deposit)
;; Increases the total amount locked without changing unlock time
;; @param vault-id: The vault to add funds to
;; @param amount: Amount of STX to add (in microSTX)
;; Returns: (ok new-total) on success
(define-public (add-to-vault (vault-id uint) (amount uint))
  (let
    (
      (vault (unwrap! (map-get? vaults { vault-id: vault-id }) err-vault-not-found))
      (sender tx-sender)
      (new-total (+ (get amount vault) amount))
    )
    ;; Validation: amount must be positive
    (asserts! (> amount u0) err-invalid-amount)
    
    ;; Validation: only vault owner can add funds
    (asserts! (is-eq sender (get owner vault)) err-unauthorized)
    
    ;; Validation: cannot add to withdrawn vault
    (asserts! (not (get withdrawn vault)) err-cannot-add-to-withdrawn)
    
    ;; Validation: cannot add to cancelled vault
    (asserts! (not (get cancelled vault)) err-vault-cancelled)
    
    ;; Transfer additional STX to contract
    (try! (stx-transfer? amount sender (as-contract tx-sender)))
    
    ;; Update vault with new total
    (map-set vaults
      { vault-id: vault-id }
      (merge vault { 
        amount: new-total,
        total-deposited: (+ (get total-deposited vault) amount)
      })
    )
    
    ;; Update user stats
    (let ((stats (get-user-stats sender)))
      (map-set user-stats
        { user: sender }
        (merge stats { total-stx-locked: (+ (get total-stx-locked stats) amount) })
      )
    )
    
    ;; Emit event
    (print {
      event: "vault-deposit-added",
      vault-id: vault-id,
      owner: sender,
      amount: amount,
      new-total: new-total,
      added-at: stacks-block-height
    })
    
    (ok new-total)
  )
)

;; Cancel a vault before it's fully funded (emergency escape)
;; Can only cancel if vault hasn't been withdrawn
;; This is different from emergency-withdraw - it's for mistakes during creation
;; @param vault-id: The vault to cancel
;; Returns: (ok amount-returned) on success
(define-public (cancel-vault (vault-id uint))
  (let
    (
      (vault (unwrap! (map-get? vaults { vault-id: vault-id }) err-vault-not-found))
      (sender tx-sender)
    )
    ;; Validation: only vault owner can cancel
    (asserts! (is-eq sender (get owner vault)) err-unauthorized)
    
    ;; Validation: cannot cancel withdrawn vault
    (asserts! (not (get withdrawn vault)) err-already-withdrawn)
    
    ;; Validation: cannot cancel already cancelled vault
    (asserts! (not (get cancelled vault)) err-vault-cancelled)
    
    ;; Return all funds to owner
    (try! (as-contract (stx-transfer? (get amount vault) tx-sender sender)))
    
    ;; Mark as cancelled
    (map-set vaults
      { vault-id: vault-id }
      (merge vault { cancelled: true })
    )
    
    ;; Emit event
    (print {
      event: "vault-cancelled",
      vault-id: vault-id,
      owner: sender,
      amount-returned: (get amount vault),
      cancelled-at: stacks-block-height
    })
    
    (ok (get amount vault))
  )
)

;; Withdraw STX from an unlocked vault
;; Only callable by vault owner after unlock height is reached
;; Mints achievement NFT based on lock duration
;; @param vault-id: The unique identifier of the vault to withdraw
;; Returns: (ok amount) on success, error code on failure
(define-public (withdraw (vault-id uint))
  (let
    (
      (vault (unwrap! (map-get? vaults { vault-id: vault-id }) err-vault-not-found))
      (sender tx-sender)
      (lock-duration (- (get unlock-height vault) (get created-at vault)))
    )
    ;; Validation: only vault owner can withdraw
    (asserts! (is-eq sender (get owner vault)) err-unauthorized)
    
    ;; Validation: prevent double withdrawal
    (asserts! (not (get withdrawn vault)) err-already-withdrawn)
    
    ;; Validation: cannot withdraw cancelled vault
    (asserts! (not (get cancelled vault)) err-vault-cancelled)
    
    ;; Validation: vault must be unlocked
    (asserts! (>= stacks-block-height (get unlock-height vault)) err-still-locked)
    
    ;; Transfer STX from contract back to owner
    ;; as-contract switches context to make contract the sender
    (try! (as-contract (stx-transfer? (get amount vault) tx-sender sender)))
    
    ;; Mark vault as withdrawn to prevent re-entry
    (map-set vaults
      { vault-id: vault-id }
      (merge vault { withdrawn: true })
    )
    
    ;; Update user stats
    (let ((stats (get-user-stats sender)))
      (map-set user-stats
        { user: sender }
        (merge stats { total-vaults-completed: (+ (get total-vaults-completed stats) u1) })
      )
    )
    
    ;; Mint achievement NFT based on lock duration
    (try! (mint-achievement-nft sender vault-id lock-duration))
    
    ;; Emit event
    (print {
      event: "vault-withdrawn",
      vault-id: vault-id,
      owner: sender,
      amount: (get amount vault),
      lock-duration: lock-duration,
      withdrawn-at: stacks-block-height
    })
    
    ;; Return the withdrawn amount
    (ok (get amount vault))
  )
)

;; Emergency withdrawal with penalty
;; Allows users to access funds before unlock time at a cost
;; Penalty remains in contract (could fund development, rewards, etc.)
;; Does NOT mint achievement NFT (didn't complete the lock)
;; @param vault-id: The unique identifier of the vault to withdraw
;; Returns: (ok {withdrawn: uint, penalty: uint}) on success
(define-public (emergency-withdraw (vault-id uint))
  (let
    (
      (vault (unwrap! (map-get? vaults { vault-id: vault-id }) err-vault-not-found))
      (sender tx-sender)
      (penalty (calculate-emergency-penalty (get amount vault)))
      (withdrawal-amount (- (get amount vault) penalty))
    )
    ;; Validation: feature must be enabled globally
    (asserts! (var-get emergency-withdrawal-enabled) err-emergency-withdrawal-disabled)
    
    ;; Validation: only vault owner can withdraw
    (asserts! (is-eq sender (get owner vault)) err-unauthorized)
    
    ;; Validation: prevent double withdrawal
    (asserts! (not (get withdrawn vault)) err-already-withdrawn)
    
    ;; Validation: cannot withdraw cancelled vault
    (asserts! (not (get cancelled vault)) err-vault-cancelled)
    
    ;; Validation: vault must still be locked (otherwise use regular withdraw)
    (asserts! (< stacks-block-height (get unlock-height vault)) err-still-locked)
    
    ;; Transfer STX minus penalty back to owner
    ;; Penalty stays in contract for community use
    (try! (as-contract (stx-transfer? withdrawal-amount tx-sender sender)))
    
    ;; Mark vault as withdrawn
    (map-set vaults
      { vault-id: vault-id }
      (merge vault { withdrawn: true })
    )
    
    ;; Emit event
    (print {
      event: "vault-emergency-withdrawn",
      vault-id: vault-id,
      owner: sender,
      amount: withdrawal-amount,
      penalty: penalty,
      withdrawn-at: stacks-block-height
    })
    
    ;; Return withdrawal details
    (ok { withdrawn: withdrawal-amount, penalty: penalty })
  )
)

;; ====================================
;; NFT Achievement Functions
;; ====================================

;; Internal function to mint achievement NFT
;; Called automatically when user completes a vault
;; Different NFTs for different lock durations
;; @param recipient: Who receives the NFT
;; @param vault-id: The vault that was completed
;; @param lock-duration: How long the vault was locked (in blocks)
;; Returns: (ok token-id) or error
(define-private (mint-achievement-nft (recipient principal) (vault-id uint) (lock-duration uint))
  (let
    (
      (token-id (+ (var-get nft-token-nonce) u1))
      (achievement-type (get-achievement-type lock-duration))
    )
    ;; Only mint if user hasn't earned this achievement type before
    (match (map-get? user-achievements { user: recipient, achievement-type: achievement-type })
      existing-achievement (ok (get token-id existing-achievement)) ;; Already has this achievement
      (begin
        ;; Mint the NFT
        (try! (nft-mint? hodlbox-achievement token-id recipient))
        
        ;; Store NFT metadata
        (map-set nft-metadata
          { token-id: token-id }
          {
            achievement-type: achievement-type,
            vault-id: vault-id,
            earned-at: stacks-block-height,
            lock-duration: lock-duration
          }
        )
        
        ;; Mark achievement as earned
        (map-set user-achievements
          { user: recipient, achievement-type: achievement-type }
          { earned: true, token-id: token-id }
        )
        
        ;; Increment NFT counter
        (var-set nft-token-nonce token-id)
        
        ;; Emit event
        (print {
          event: "achievement-earned",
          recipient: recipient,
          token-id: token-id,
          achievement-type: achievement-type,
          vault-id: vault-id,
          lock-duration: lock-duration
        })
        
        (ok token-id)
      )
    )
  )
)

;; Determine achievement type based on lock duration
;; @param duration: Lock duration in blocks
;; Returns: Achievement name as string
(define-private (get-achievement-type (duration uint))
  (if (>= duration milestone-1-year)
    "diamond-hands"
    (if (>= duration milestone-6-months)
      "gold-holder"
      (if (>= duration milestone-3-months)
        "silver-saver"
        (if (>= duration milestone-1-month)
          "bronze-believer"
          (if (>= duration milestone-1-week)
            "week-warrior"
            "first-lock"
          )
        )
      )
    )
  )
)

;; ====================================
;; Admin Functions
;; ====================================

;; Enable or disable emergency withdrawals globally
;; Only callable by contract owner
;; Returns: (ok new-status) on success
(define-public (toggle-emergency-withdrawal)
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (var-set emergency-withdrawal-enabled (not (var-get emergency-withdrawal-enabled)))
    
    ;; Emit event
    (print {
      event: "emergency-withdrawal-toggled",
      enabled: (var-get emergency-withdrawal-enabled),
      changed-at: stacks-block-height
    })
    
    (ok (var-get emergency-withdrawal-enabled))
  )
)

;; Update the emergency withdrawal penalty percentage
;; Only callable by contract owner
;; @param new-percent: New penalty percentage (max 50%)
;; Returns: (ok new-percent) on success
(define-public (set-emergency-penalty (new-percent uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    ;; Cap penalty at 50% to prevent abuse
    (asserts! (<= new-percent u50) err-invalid-penalty)
    (var-set emergency-penalty-percent new-percent)
    
    ;; Emit event
    (print {
      event: "emergency-penalty-updated",
      new-percent: new-percent,
      changed-at: stacks-block-height
    })
    
    (ok new-percent)
  )
)