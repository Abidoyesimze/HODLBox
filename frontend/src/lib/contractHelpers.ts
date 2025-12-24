/**
 * Helper functions for contract interactions
 */

import { CONTRACT_ADDRESS, CONTRACT_NAME } from './constants';
import { stxToMicroStx } from './utils';

/**
 * Prepare contract call parameters for create-vault
 */
export function prepareCreateVaultParams(amount: number, unlockHeight: number, note: string) {
  return {
    contractAddress: CONTRACT_ADDRESS.split('.')[0],
    contractName: CONTRACT_NAME,
    functionName: 'create-vault',
    functionArgs: [
      stxToMicroStx(amount),
      unlockHeight,
      note,
    ],
  };
}

/**
 * Prepare contract call parameters for add-to-vault
 */
export function prepareAddToVaultParams(vaultId: number, amount: number) {
  return {
    contractAddress: CONTRACT_ADDRESS.split('.')[0],
    contractName: CONTRACT_NAME,
    functionName: 'add-to-vault',
    functionArgs: [
      vaultId,
      stxToMicroStx(amount),
    ],
  };
}

/**
 * Prepare contract call parameters for withdraw
 */
export function prepareWithdrawParams(vaultId: number) {
  return {
    contractAddress: CONTRACT_ADDRESS.split('.')[0],
    contractName: CONTRACT_NAME,
    functionName: 'withdraw',
    functionArgs: [vaultId],
  };
}

/**
 * Prepare contract call parameters for emergency-withdraw
 */
export function prepareEmergencyWithdrawParams(vaultId: number) {
  return {
    contractAddress: CONTRACT_ADDRESS.split('.')[0],
    contractName: CONTRACT_NAME,
    functionName: 'emergency-withdraw',
    functionArgs: [vaultId],
  };
}

