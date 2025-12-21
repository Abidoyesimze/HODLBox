/**
 * Utility functions for HODLBox
 */

/**
 * Convert microSTX to STX
 * @param microStx - Amount in microSTX (1 STX = 1,000,000 microSTX)
 * @returns Amount in STX
 */
export function microStxToStx(microStx: number | string): number {
  const amount = typeof microStx === 'string' ? parseFloat(microStx) : microStx;
  return amount / 1_000_000;
}

/**
 * Convert STX to microSTX
 * @param stx - Amount in STX
 * @returns Amount in microSTX
 */
export function stxToMicroStx(stx: number | string): number {
  const amount = typeof stx === 'string' ? parseFloat(stx) : stx;
  return Math.floor(amount * 1_000_000);
}

/**
 * Format STX amount for display
 * @param amount - Amount in STX or microSTX
 * @param decimals - Number of decimal places (default: 2)
 * @param isMicroStx - Whether the amount is in microSTX (default: false)
 * @returns Formatted string
 */
export function formatStx(amount: number | string, decimals: number = 2, isMicroStx: boolean = false): string {
  const stxAmount = isMicroStx ? microStxToStx(Number(amount)) : Number(amount);
  return stxAmount.toFixed(decimals);
}

/**
 * Calculate blocks from days
 * @param days - Number of days
 * @returns Number of blocks
 */
export function daysToBlocks(days: number): number {
  return Math.floor(days * 144); // 144 blocks per day
}

/**
 * Calculate days from blocks
 * @param blocks - Number of blocks
 * @returns Number of days
 */
export function blocksToDays(blocks: number): number {
  return blocks / 144;
}

/**
 * Format address for display (truncate middle)
 * @param address - Full address string
 * @param startChars - Number of characters to show at start (default: 5)
 * @param endChars - Number of characters to show at end (default: 4)
 * @returns Truncated address
 */
export function formatAddress(address: string, startChars: number = 5, endChars: number = 4): string {
  if (!address || address.length <= startChars + endChars) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Calculate estimated unlock date from blocks
 * @param blocks - Number of blocks until unlock
 * @returns Estimated date string
 */
export function estimateUnlockDate(blocks: number): string {
  const days = blocksToDays(blocks);
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(days));
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

