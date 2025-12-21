/**
 * Error handling utilities
 */

export class VaultError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'VaultError';
  }
}

export class ContractError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ContractError';
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Parse error from contract response
 */
export function parseContractError(error: any): string {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.error) return error.error;
  return 'An unknown error occurred';
}

/**
 * Get user-friendly error message
 */
export function getUserFriendlyError(error: any): string {
  const message = parseContractError(error);
  
  // Map common error codes to user-friendly messages
  const errorMap: Record<string, string> = {
    'u100': 'Unauthorized: Only contract owner can perform this action',
    'u101': 'Vault not found',
    'u102': 'Vault is still locked',
    'u103': 'Vault has already been withdrawn',
    'u104': 'Invalid amount: Must be greater than 0',
    'u105': 'Invalid unlock time: Must be in the future',
    'u106': 'Unauthorized: You are not the vault owner',
    'u107': 'Emergency withdrawals are currently disabled',
    'u108': 'Invalid penalty percentage',
    'u109': 'Cannot cancel a funded vault',
    'u110': 'Vault has been cancelled',
    'u111': 'Cannot add funds to withdrawn vault',
    'u112': 'Failed to mint achievement NFT',
  };
  
  // Check if error code exists in map
  for (const [code, friendlyMessage] of Object.entries(errorMap)) {
    if (message.includes(code)) {
      return friendlyMessage;
    }
  }
  
  return message;
}

