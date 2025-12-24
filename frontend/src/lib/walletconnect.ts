/**
 * WalletConnect configuration and utilities
 */

// WalletConnect Project ID - Get from https://cloud.walletconnect.com
export const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

/**
 * Check if WalletConnect is configured
 */
export function isWalletConnectConfigured(): boolean {
  return !!WALLETCONNECT_PROJECT_ID;
}

/**
 * Get WalletConnect configuration
 */
export function getWalletConnectConfig() {
  return {
    projectId: WALLETCONNECT_PROJECT_ID,
    metadata: {
      name: 'HODLBox',
      description: 'Time-locked STX savings vaults on Stacks blockchain',
      url: typeof window !== 'undefined' ? window.location.origin : 'https://hodlbox.app',
      icons: typeof window !== 'undefined' ? [`${window.location.origin}/favicon.ico`] : [],
    },
  };
}

