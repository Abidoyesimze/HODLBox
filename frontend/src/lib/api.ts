/**
 * API utilities for interacting with Stacks network
 */

import { STACKS_TESTNET, STACKS_MAINNET } from '@stacks/network';
import { NETWORK } from './constants';

const network = NETWORK === 'testnet' ? STACKS_TESTNET : STACKS_MAINNET;

/**
 * Get Stacks API base URL
 */
export function getApiBaseUrl(): string {
  return network.client.baseUrl;
}

/**
 * Fetch current block height from Stacks API
 */
export async function fetchCurrentBlockHeight(): Promise<number> {
  try {
    const response = await fetch(`${getApiBaseUrl()}/v2/info`);
    const data = await response.json();
    return data.stacks_tip_height || 0;
  } catch (error) {
    console.error('Error fetching block height:', error);
    throw error;
  }
}

/**
 * Fetch account balance
 */
export async function fetchAccountBalance(address: string): Promise<number> {
  try {
    const response = await fetch(`${getApiBaseUrl()}/v2/accounts/${address}?proof=0`);
    const data = await response.json();
    return parseInt(data.balance || '0', 10);
  } catch (error) {
    console.error('Error fetching account balance:', error);
    throw error;
  }
}

/**
 * Fetch transaction status
 */
export async function fetchTransactionStatus(txId: string): Promise<any> {
  try {
    const response = await fetch(`${getApiBaseUrl()}/extended/v1/tx/${txId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching transaction status:', error);
    throw error;
  }
}

