/**
 * Type definitions for HODLBox vaults
 */

export interface Vault {
  id: number;
  owner: string;
  amount: string; // in STX
  unlockHeight: number;
  currentHeight: number;
  blocksRemaining: number;
  daysRemaining: number;
  note?: string;
  status: 'locked' | 'unlocked' | 'withdrawn' | 'cancelled';
  createdAt: number;
  withdrawn: boolean;
  cancelled: boolean;
  totalDeposited: string;
}

export interface VaultFormData {
  amount: string;
  lockPeriod: string; // in days
  note: string;
  unlockHeight?: number;
}

export interface CreateVaultParams {
  amount: number; // in microSTX
  unlockHeight: number;
  note: string;
}

export interface UserStats {
  totalVaultsCreated: number;
  totalVaultsCompleted: number;
  totalStxLocked: number;
  longestLockDuration: number;
}

export interface AchievementNFT {
  tokenId: number;
  achievementType: string;
  vaultId: number;
  earnedAt: number;
  lockDuration: number;
}

export type VaultStatus = 'locked' | 'unlocked' | 'withdrawn' | 'cancelled';

