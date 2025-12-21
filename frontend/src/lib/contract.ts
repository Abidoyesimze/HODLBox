/**
 * Contract interaction utilities
 */

import { CONTRACT_ADDRESS, CONTRACT_NAME, NETWORK } from './constants';
import { StacksTestnet, StacksMainnet } from '@stacks/network';
import { callReadOnlyFunction, cvToJSON } from '@stacks/transactions';
import { standardPrincipalCV } from '@stacks/transactions';

const network = NETWORK === 'testnet' ? new StacksTestnet() : new StacksMainnet();

/**
 * Get contract address
 */
export function getContractAddress(): string {
  return CONTRACT_ADDRESS;
}

/**
 * Get contract name
 */
export function getContractName(): string {
  return CONTRACT_NAME;
}

/**
 * Read-only function call helper
 */
export async function callReadOnly(
  functionName: string,
  args: any[] = [],
  senderAddress?: string
) {
  try {
    const result = await callReadOnlyFunction({
      network,
      contractAddress: CONTRACT_ADDRESS.split('.')[0],
      contractName: CONTRACT_NAME,
      functionName,
      functionArgs: args,
      senderAddress: senderAddress || CONTRACT_ADDRESS,
    });
    
    return cvToJSON(result);
  } catch (error) {
    console.error(`Error calling ${functionName}:`, error);
    throw error;
  }
}

/**
 * Get vault data
 */
export async function getVault(vaultId: number, senderAddress?: string) {
  return callReadOnly('get-vault', [standardPrincipalCV(vaultId)], senderAddress);
}

/**
 * Get user's vaults
 */
export async function getUserVaults(userAddress: string) {
  return callReadOnly('get-user-vaults', [standardPrincipalCV(userAddress)], userAddress);
}

/**
 * Check if vault is unlocked
 */
export async function isVaultUnlocked(vaultId: number) {
  return callReadOnly('is-vault-unlocked', [standardPrincipalCV(vaultId)]);
}

/**
 * Get user statistics
 */
export async function getUserStats(userAddress: string) {
  return callReadOnly('get-user-stats', [standardPrincipalCV(userAddress)], userAddress);
}

