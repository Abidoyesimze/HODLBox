/**
 * URL helper utilities
 */

/**
 * Get vault URL
 */
export function getVaultUrl(vaultId: number): string {
  if (typeof window === 'undefined') return '';
  return `${window.location.origin}/vault/${vaultId}`;
}

/**
 * Get explorer URL for transaction
 */
export function getExplorerTxUrl(txId: string, network: 'mainnet' | 'testnet' = 'testnet'): string {
  return `https://explorer.stacks.co/txid/${txId}?chain=${network}`;
}

/**
 * Get explorer URL for address
 */
export function getExplorerAddressUrl(address: string, network: 'mainnet' | 'testnet' = 'testnet'): string {
  return `https://explorer.stacks.co/address/${address}?chain=${network}`;
}

/**
 * Get explorer URL for contract
 */
export function getExplorerContractUrl(contractAddress: string, network: 'mainnet' | 'testnet' = 'testnet'): string {
  return `https://explorer.stacks.co/txid/${contractAddress}?chain=${network}`;
}

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

