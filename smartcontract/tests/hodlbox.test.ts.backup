import { describe, it, expect } from 'vitest';

// Helper function to calculate future block height
const getUnlockHeight = (chain: any, blocks: number): number => {
  return chain.blockHeight + blocks;
};

// Test suite for HODLBox contract
describe("HODLBox Contract Tests", () => {
  it("should create vault successfully", async () => {
    const deployer = simnet.getAccount('deployer');
    const wallet1 = simnet.getAccount('wallet_1');
    
    const amount = 1000000; // 1 STX in microSTX
    const unlockHeight = getUnlockHeight(simnet, 100);
    const note = "Saving for vacation";
    
    let block = simnet.mineBlock([
      simnet.callPublicFn(
        'hodlbox',
        'create-vault',
        [
          simnet.types.uint(amount),
          simnet.types.uint(unlockHeight),
          simnet.types.ascii(note)
        ],
        wallet1.address
      )
    ]);
    
    // Should succeed and return vault ID 1
    expect(block.result[0]).toBeOk();
    expect(block.result[0]).toBeUint(1);
    
    // Check vault was created correctly
    let vaultData = simnet.callReadOnlyFn(
      'hodlbox',
      'get-vault',
      [simnet.types.uint(1)],
      wallet1.address
    );
    
    const vault = vaultData.result.expectSome().expectTuple();
    expect(vault['owner']).toBe(wallet1.address);
    expect(vault['amount']).toBeUint(amount);
    expect(vault['unlock-height']).toBeUint(unlockHeight);
    expect(vault['withdrawn']).toBeBool(false);
    expect(vault['cancelled']).toBeBool(false);
  });
});

Clarinet.test({
  name: "Test: Cannot create vault with zero amount",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    const unlockHeight = getUnlockHeight(chain, 100);
    
    let block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'create-vault',
        [
          types.uint(0), // Invalid: zero amount
          types.uint(unlockHeight),
          types.ascii("Test")
        ],
        wallet1.address
      )
    ]);
    
    // Should fail with err-invalid-amount (u104)
    block.receipts[0].result.expectErr().expectUint(104);
  },
});

Clarinet.test({
  name: "Test: Cannot create vault with past unlock height",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    let block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'create-vault',
        [
          types.uint(1000000),
          types.uint(1), // Past block height
          types.ascii("Test")
        ],
        wallet1.address
      )
    ]);
    
    // Should fail with err-invalid-unlock-time (u105)
    block.receipts[0].result.expectErr().expectUint(105);
  },
});

Clarinet.test({
  name: "Test: Withdraw vault after unlock",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    const amount = 5000000; // 5 STX
    const lockBlocks = 10;
    const unlockHeight = getUnlockHeight(chain, lockBlocks);
    
    // Create vault
    let block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'create-vault',
        [
          types.uint(amount),
          types.uint(unlockHeight),
          types.ascii("Test vault")
        ],
        wallet1.address
      )
    ]);
    
    block.receipts[0].result.expectOk().expectUint(1);
    
    // Mine blocks to reach unlock height
    chain.mineEmptyBlockUntil(unlockHeight);
    
    // Withdraw
    block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'withdraw',
        [types.uint(1)],
        wallet1.address
      )
    ]);
    
    // Should succeed and return withdrawn amount
    block.receipts[0].result.expectOk().expectUint(amount);
    
    // Check vault is marked as withdrawn
    let vaultData = chain.callReadOnlyFn(
      'hodlbox',
      'get-vault',
      [types.uint(1)],
      wallet1.address
    );
    
    const vault = vaultData.result.expectSome().expectTuple();
    assertEquals(vault['withdrawn'], types.bool(true));
  },
});

Clarinet.test({
  name: "Test: Cannot withdraw before unlock height",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    const unlockHeight = getUnlockHeight(chain, 100);
    
    // Create vault
    let block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'create-vault',
        [
          types.uint(1000000),
          types.uint(unlockHeight),
          types.ascii("Test")
        ],
        wallet1.address
      )
    ]);
    
    block.receipts[0].result.expectOk();
    
    // Try to withdraw immediately (still locked)
    block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'withdraw',
        [types.uint(1)],
        wallet1.address
      )
    ]);
    
    // Should fail with err-still-locked (u102)
    block.receipts[0].result.expectErr().expectUint(102);
  },
});

Clarinet.test({
  name: "Test: Cannot withdraw vault twice",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    const unlockHeight = getUnlockHeight(chain, 10);
    
    // Create vault
    let block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'create-vault',
        [
          types.uint(1000000),
          types.uint(unlockHeight),
          types.ascii("Test")
        ],
        wallet1.address
      )
    ]);
    
    // Mine to unlock
    chain.mineEmptyBlockUntil(unlockHeight);
    
    // First withdrawal
    block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'withdraw',
        [types.uint(1)],
        wallet1.address
      )
    ]);
    
    block.receipts[0].result.expectOk();
    
    // Second withdrawal attempt
    block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'withdraw',
        [types.uint(1)],
        wallet1.address
      )
    ]);
    
    // Should fail with err-already-withdrawn (u103)
    block.receipts[0].result.expectErr().expectUint(103);
  },
});

Clarinet.test({
  name: "Test: Only vault owner can withdraw",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    const wallet2 = accounts.get('wallet_2')!;
    
    const unlockHeight = getUnlockHeight(chain, 10);
    
    // Wallet1 creates vault
    let block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'create-vault',
        [
          types.uint(1000000),
          types.uint(unlockHeight),
          types.ascii("Test")
        ],
        wallet1.address
      )
    ]);
    
    // Mine to unlock
    chain.mineEmptyBlockUntil(unlockHeight);
    
    // Wallet2 tries to withdraw wallet1's vault
    block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'withdraw',
        [types.uint(1)],
        wallet2.address // Different user
      )
    ]);
    
    // Should fail with err-unauthorized (u106)
    block.receipts[0].result.expectErr().expectUint(106);
  },
});

Clarinet.test({
  name: "Test: Add funds to existing vault (recurring deposit)",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    const initialAmount = 1000000; // 1 STX
    const additionalAmount = 500000; // 0.5 STX
    const unlockHeight = getUnlockHeight(chain, 100);
    
    // Create vault
    let block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'create-vault',
        [
          types.uint(initialAmount),
          types.uint(unlockHeight),
          types.ascii("Savings")
        ],
        wallet1.address
      )
    ]);
    
    block.receipts[0].result.expectOk();
    
    // Add more funds
    block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'add-to-vault',
        [
          types.uint(1),
          types.uint(additionalAmount)
        ],
        wallet1.address
      )
    ]);
    
    // Should return new total
    block.receipts[0].result.expectOk().expectUint(initialAmount + additionalAmount);
    
    // Verify vault amount updated
    let vaultData = chain.callReadOnlyFn(
      'hodlbox',
      'get-vault',
      [types.uint(1)],
      wallet1.address
    );
    
    const vault = vaultData.result.expectSome().expectTuple();
    assertEquals(vault['amount'], types.uint(initialAmount + additionalAmount));
    assertEquals(vault['total-deposited'], types.uint(initialAmount + additionalAmount));
  },
});

Clarinet.test({
  name: "Test: Cannot add funds to withdrawn vault",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    const unlockHeight = getUnlockHeight(chain, 10);
    
    // Create and withdraw vault
    let block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'create-vault',
        [
          types.uint(1000000),
          types.uint(unlockHeight),
          types.ascii("Test")
        ],
        wallet1.address
      )
    ]);
    
    chain.mineEmptyBlockUntil(unlockHeight);
    
    block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'withdraw',
        [types.uint(1)],
        wallet1.address
      )
    ]);
    
    // Try to add funds to withdrawn vault
    block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'add-to-vault',
        [
          types.uint(1),
          types.uint(500000)
        ],
        wallet1.address
      )
    ]);
    
    // Should fail with err-cannot-add-to-withdrawn (u111)
    block.receipts[0].result.expectErr().expectUint(111);
  },
});

Clarinet.test({
  name: "Test: Cancel vault successfully",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    const amount = 2000000;
    const unlockHeight = getUnlockHeight(chain, 100);
    
    // Create vault
    let block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'create-vault',
        [
          types.uint(amount),
          types.uint(unlockHeight),
          types.ascii("Test")
        ],
        wallet1.address
      )
    ]);
    
    block.receipts[0].result.expectOk();
    
    // Cancel vault
    block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'cancel-vault',
        [types.uint(1)],
        wallet1.address
      )
    ]);
    
    // Should return amount
    block.receipts[0].result.expectOk().expectUint(amount);
    
    // Verify vault is marked as cancelled
    let vaultData = chain.callReadOnlyFn(
      'hodlbox',
      'get-vault',
      [types.uint(1)],
      wallet1.address
    );
    
    const vault = vaultData.result.expectSome().expectTuple();
    assertEquals(vault['cancelled'], types.bool(true));
  },
});

Clarinet.test({
  name: "Test: Emergency withdrawal with penalty",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    const amount = 1000000; // 1 STX
    const unlockHeight = getUnlockHeight(chain, 100);
    
    // Create vault
    let block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'create-vault',
        [
          types.uint(amount),
          types.uint(unlockHeight),
          types.ascii("Test")
        ],
        wallet1.address
      )
    ]);
    
    // Emergency withdraw (before unlock)
    block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'emergency-withdraw',
        [types.uint(1)],
        wallet1.address
      )
    ]);
    
    const result = block.receipts[0].result.expectOk().expectTuple();
    
    // Default penalty is 10%
    const expectedPenalty = amount * 10 / 100;
    const expectedWithdrawn = amount - expectedPenalty;
    
    assertEquals(result['withdrawn'], types.uint(expectedWithdrawn));
    assertEquals(result['penalty'], types.uint(expectedPenalty));
  },
});

Clarinet.test({
  name: "Test: User can create multiple vaults",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    const unlockHeight = getUnlockHeight(chain, 100);
    
    // Create 3 vaults
    let block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'create-vault',
        [types.uint(1000000), types.uint(unlockHeight), types.ascii("Vault 1")],
        wallet1.address
      ),
      Tx.contractCall(
        'hodlbox',
        'create-vault',
        [types.uint(2000000), types.uint(unlockHeight + 10), types.ascii("Vault 2")],
        wallet1.address
      ),
      Tx.contractCall(
        'hodlbox',
        'create-vault',
        [types.uint(3000000), types.uint(unlockHeight + 20), types.ascii("Vault 3")],
        wallet1.address
      ),
    ]);
    
    // All should succeed
    block.receipts[0].result.expectOk().expectUint(1);
    block.receipts[1].result.expectOk().expectUint(2);
    block.receipts[2].result.expectOk().expectUint(3);
    
    // Check user vault list
    let userVaults = chain.callReadOnlyFn(
      'hodlbox',
      'get-user-vaults',
      [types.principal(wallet1.address)],
      wallet1.address
    );
    
    const vaultIds = userVaults.result.expectTuple()['vault-ids'];
    // Should have 3 vaults
    assertEquals(vaultIds.length, 3);
  },
});

Clarinet.test({
  name: "Test: Get user stats after vault completion",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    const amount = 5000000;
    const unlockHeight = getUnlockHeight(chain, 10);
    
    // Create vault
    let block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'create-vault',
        [
          types.uint(amount),
          types.uint(unlockHeight),
          types.ascii("Test")
        ],
        wallet1.address
      )
    ]);
    
    // Check stats after creation
    let stats = chain.callReadOnlyFn(
      'hodlbox',
      'get-user-stats',
      [types.principal(wallet1.address)],
      wallet1.address
    );
    
    let statsData = stats.result.expectTuple();
    assertEquals(statsData['total-vaults-created'], types.uint(1));
    assertEquals(statsData['total-vaults-completed'], types.uint(0));
    assertEquals(statsData['total-stx-locked'], types.uint(amount));
    
    // Complete vault
    chain.mineEmptyBlockUntil(unlockHeight);
    
    block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'withdraw',
        [types.uint(1)],
        wallet1.address
      )
    ]);
    
    // Check stats after completion
    stats = chain.callReadOnlyFn(
      'hodlbox',
      'get-user-stats',
      [types.principal(wallet1.address)],
      wallet1.address
    );
    
    statsData = stats.result.expectTuple();
    assertEquals(statsData['total-vaults-completed'], types.uint(1));
  },
});

Clarinet.test({
  name: "Test: Check vault lock duration calculation",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    const lockBlocks = 1000;
    const unlockHeight = getUnlockHeight(chain, lockBlocks);
    
    // Create vault
    let block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'create-vault',
        [
          types.uint(1000000),
          types.uint(unlockHeight),
          types.ascii("Test")
        ],
        wallet1.address
      )
    ]);
    
    // Check lock duration
    let duration = chain.callReadOnlyFn(
      'hodlbox',
      'get-vault-lock-duration',
      [types.uint(1)],
      wallet1.address
    );
    
    // Should equal lockBlocks
    duration.result.expectUint(lockBlocks);
  },
});

Clarinet.test({
  name: "Test: Admin can toggle emergency withdrawal",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    
    // Check initial state (should be enabled)
    let enabled = chain.callReadOnlyFn(
      'hodlbox',
      'is-emergency-withdrawal-enabled',
      [],
      deployer.address
    );
    
    enabled.result.expectBool(true);
    
    // Toggle off
    let block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'toggle-emergency-withdrawal',
        [],
        deployer.address
      )
    ]);
    
    block.receipts[0].result.expectOk().expectBool(false);
    
    // Verify it's disabled
    enabled = chain.callReadOnlyFn(
      'hodlbox',
      'is-emergency-withdrawal-enabled',
      [],
      deployer.address
    );
    
    enabled.result.expectBool(false);
  },
});

Clarinet.test({
  name: "Test: Non-admin cannot toggle emergency withdrawal",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    let block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'toggle-emergency-withdrawal',
        [],
        wallet1.address // Non-admin
      )
    ]);
    
    // Should fail with err-owner-only (u100)
    block.receipts[0].result.expectErr().expectUint(100);
  },
});

Clarinet.test({
  name: "Test: Admin can set emergency penalty",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    
    const newPenalty = 25; // 25%
    
    let block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'set-emergency-penalty',
        [types.uint(newPenalty)],
        deployer.address
      )
    ]);
    
    block.receipts[0].result.expectOk().expectUint(newPenalty);
    
    // Verify new penalty
    let penalty = chain.callReadOnlyFn(
      'hodlbox',
      'get-emergency-penalty-percent',
      [],
      deployer.address
    );
    
    penalty.result.expectUint(newPenalty);
  },
});

Clarinet.test({
  name: "Test: Cannot set penalty over 50%",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    
    let block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'set-emergency-penalty',
        [types.uint(51)], // Over 50%
        deployer.address
      )
    ]);
    
    // Should fail with err-invalid-penalty (u108)
    block.receipts[0].result.expectErr().expectUint(108);
  },
});

Clarinet.test({
  name: "Test: Vault unlocked status check",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!;
    
    const unlockHeight = getUnlockHeight(chain, 50);
    
    // Create vault
    let block = chain.mineBlock([
      Tx.contractCall(
        'hodlbox',
        'create-vault',
        [
          types.uint(1000000),
          types.uint(unlockHeight),
          types.ascii("Test")
        ],
        wallet1.address
      )
    ]);
    
    // Check if locked (should be locked)
    let isUnlocked = chain.callReadOnlyFn(
      'hodlbox',
      'is-vault-unlocked',
      [types.uint(1)],
      wallet1.address
    );
    
    isUnlocked.result.expectBool(false);
    
    // Mine to unlock
    chain.mineEmptyBlockUntil(unlockHeight);
    
    // Check again (should be unlocked)
    isUnlocked = chain.callReadOnlyFn(
      'hodlbox',
      'is-vault-unlocked',
      [types.uint(1)],
      wallet1.address
    );
    
    isUnlocked.result.expectBool(true);
  },
});