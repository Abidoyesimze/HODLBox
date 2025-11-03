# HODLBox

Time-locked STX savings vaults on the Stacks blockchain. Lock your STX until a future block height. Full custody, enforced by smart contract logic.

## What it does

HODLBox lets you create vaults with custom lock periods. Until the unlock block height, funds stay locked. After that, you can withdraw them. The contract handles the enforcement so you don’t have to trust yourself to wait.

**Features:**
- Custom lock periods (in blocks)
- Recurring deposits to an existing vault
- Emergency withdrawals (with a penalty)
- Cancel vaults before funding
- Achievement NFTs for holding milestones

## Getting started

### Prerequisites

- Node.js (v18 or later)
- Clarinet CLI installed

```bash
npm install -g @hirosystems/clarinet-sdk
```

### Installation

```bash
cd smartcontract
npm install
```

### Run tests

```bash
clarinet check
npm test
```

## How it works

### Creating a vault

Call `create-vault` with:
- `amount`: STX to lock (in microSTX; 1 STX = 1,000,000 microSTX)
- `unlock-height`: block height when the vault unlocks
- `note`: optional note

On success, you get a vault ID. Funds move to the contract on creation.

### Withdrawing

After the unlock height, call `withdraw` with the vault ID. The full amount is returned to your address.

### Emergency withdrawals

If enabled by the contract owner, call `emergency-withdraw` before the unlock height. A penalty is applied and only a percentage is returned.

Default penalty: 10%

### Adding to an existing vault

Call `add-to-vault` with the vault ID and additional amount. This increases the total locked without changing the unlock time.

### Cancelling a vault

Call `cancel-vault` to cancel an unfunded vault. Funded vaults cannot be cancelled.

## Smart contract structure

Located in `smartcontract/contracts/hodlbox.clar`.

**Main data structures:**
- `vaults`: Maps vault IDs to vault details
- `user-vault-ids`: Index of vaults per user
- `user-stats`: User statistics for achievements
- `hodlbox-achievement`: NFT for milestone achievements

**Public functions:**
- `create-vault`: Create a new vault
- `withdraw`: Withdraw from an unlocked vault
- `emergency-withdraw`: Withdraw before unlock (with penalty)
- `add-to-vault`: Add funds to an existing vault
- `cancel-vault`: Cancel an unfunded vault
- `get-vault`: Read vault details

**Read-only functions:**
- `is-vault-unlocked`: Check if a vault has reached its unlock height
- `get-user-stats`: Get user statistics
- `get-user-vault-ids`: List vaults for a user

## Error codes

| Code | Description |
|------|-------------|
| u100 | Only contract owner can perform this action |
| u101 | Vault ID does not exist |
| u102 | Vault has not reached unlock block height |
| u103 | Vault has already been withdrawn |
| u104 | Amount must be greater than 0 |
| u105 | Unlock height must be in the future |
| u106 | Caller is not the vault owner |
| u107 | Emergency withdrawals are currently disabled |
| u108 | Penalty percentage exceeds maximum allowed |
| u109 | Cannot cancel a funded vault |
| u110 | Vault has been cancelled |
| u111 | Cannot add funds to withdrawn vault |
| u112 | Failed to mint achievement NFT |

## Development

```bash
# Check contract syntax
clarinet check

# Run tests
npm test

# Console for testing
clarinet console
```

## Testing

Tests in `smartcontract/tests/hodlbox.test.ts` cover:
- Creating a vault
- Validating vault creation rules
- Checking unlock height requirements

## Deployment

**Testnet Contract Address:** `STM2GQAYZKBVAV6EYDEMM42H1Z666KAXARM5RX8X.hodlbox`

**View on Explorer:** [Stacks Explorer (Testnet)](https://explorer.stacks.co/?chain=testnet)

## Architecture

Built on the Stacks blockchain using Clarity. The contract is self-contained and doesn't require external tokens or services.

**Security notes:**
- Users retain custody; the contract enforces locks
- Funds can't be withdrawn before the unlock height
- Emergency withdrawals include a configurable penalty
- Owner-only controls for toggling emergency withdrawals and penalty

