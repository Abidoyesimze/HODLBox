import { describe, it, expect } from 'vitest';
import { tx } from '@hirosystems/clarinet-sdk';
import { uintCV, stringAsciiCV } from '@stacks/transactions';

// Helper function to calculate future block height
const getUnlockHeight = (chain: any, blocks: number): number => {
  return chain.blockHeight + blocks;
};

// Test suite for HODLBox contract
describe("HODLBox Contract Tests", () => {
  it("should create vault successfully", async () => {
    // Use standard test accounts
    const deployer = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
    const wallet1 = 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5';
    
    const amount = 1000000; // 1 STX in microSTX
    const unlockHeight = getUnlockHeight(simnet, 100);
    const note = "Saving for vacation";
    
    let block = simnet.mineBlock([
      tx.callPublicFn(
        'hodlbox',
        'create-vault',
        [
          uintCV(amount),
          uintCV(unlockHeight),
          stringAsciiCV(note)
        ],
        wallet1
      )
    ]);
    
    // Should succeed and return vault ID 1
    expect(block[0].result).toBeOk(uintCV(1));
    
    // Check vault was created correctly
    let vaultData = simnet.callReadOnlyFn(
      'hodlbox',
      'get-vault',
      [uintCV(1)],
      wallet1
    );
    
    expect(vaultData.result).toBeSome();
    // Additional checks would go here
  });

  it("should not create vault with zero amount", async () => {
    const wallet1 = 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5';
    
    const amount = 0;
    const unlockHeight = getUnlockHeight(simnet, 100);
    const note = "Invalid vault";
    
    let block = simnet.mineBlock([
      tx.callPublicFn(
        'hodlbox',
        'create-vault',
        [
          uintCV(amount),
          uintCV(unlockHeight),
          stringAsciiCV(note)
        ],
        wallet1
      )
    ]);
    
    // Should fail
    expect(block[0].result).toBeErr(uintCV(104));
  });

  it("should not create vault with past unlock height", async () => {
    const wallet1 = 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5';
    
    const amount = 1000000;
    const unlockHeight = 1; // Past height (current block is higher)
    const note = "Invalid vault";
    
    let block = simnet.mineBlock([
      tx.callPublicFn(
        'hodlbox',
        'create-vault',
        [
          uintCV(amount),
          uintCV(unlockHeight),
          stringAsciiCV(note)
        ],
        wallet1
      )
    ]);
    
    // Should fail
    expect(block[0].result).toBeErr(uintCV(105));
  });
});
