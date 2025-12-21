/**
 * Validation utilities for form inputs and data
 */

/**
 * Validate STX amount
 */
export function validateStxAmount(amount: string): { valid: boolean; error?: string } {
  const numAmount = parseFloat(amount);
  
  if (isNaN(numAmount) || amount === '') {
    return { valid: false, error: 'Please enter a valid amount' };
  }
  
  if (numAmount <= 0) {
    return { valid: false, error: 'Amount must be greater than 0' };
  }
  
  if (numAmount < 0.001) {
    return { valid: false, error: 'Minimum amount is 0.001 STX' };
  }
  
  return { valid: true };
}

/**
 * Validate lock period in days
 */
export function validateLockPeriod(days: string): { valid: boolean; error?: string } {
  const numDays = parseInt(days);
  
  if (isNaN(numDays) || days === '') {
    return { valid: false, error: 'Please enter a valid number of days' };
  }
  
  if (numDays < 1) {
    return { valid: false, error: 'Lock period must be at least 1 day' };
  }
  
  if (numDays > 3650) {
    return { valid: false, error: 'Lock period cannot exceed 10 years' };
  }
  
  return { valid: true };
}

/**
 * Validate note length
 */
export function validateNote(note: string): { valid: boolean; error?: string } {
  if (note.length > 256) {
    return { valid: false, error: 'Note cannot exceed 256 characters' };
  }
  
  return { valid: true };
}

/**
 * Validate unlock height
 */
export function validateUnlockHeight(unlockHeight: number, currentHeight: number): { valid: boolean; error?: string } {
  if (unlockHeight <= currentHeight) {
    return { valid: false, error: 'Unlock height must be in the future' };
  }
  
  return { valid: true };
}

