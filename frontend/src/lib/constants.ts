export const CONTRACT_ADDRESS = "STM2GQAYZKBVAV6EYDEMM42H1Z666KAXARM5RX8X.hodlbox";
export const CONTRACT_NAME = "hodlbox";
export const NETWORK = "testnet" as const;

// Block time on Stacks is approximately 10 minutes, so ~144 blocks per day
export const BLOCKS_PER_DAY = 144;
export const BLOCKS_PER_WEEK = BLOCKS_PER_DAY * 7;
export const BLOCKS_PER_MONTH = BLOCKS_PER_DAY * 30;
export const BLOCKS_PER_YEAR = BLOCKS_PER_DAY * 365;

// Minimum and maximum values
export const MIN_VAULT_AMOUNT = 0.001; // Minimum STX amount
export const MAX_VAULT_AMOUNT = 1000000; // Maximum STX amount (1M)
export const MIN_LOCK_PERIOD_DAYS = 1;
export const MAX_LOCK_PERIOD_DAYS = 3650; // 10 years
export const MAX_NOTE_LENGTH = 256;

// Default values
export const DEFAULT_LOCK_PERIOD_DAYS = 30;
export const DEFAULT_LOCK_PERIOD_BLOCKS = BLOCKS_PER_MONTH;

// Achievement milestones (in blocks)
export const MILESTONE_1_WEEK = 1008;
export const MILESTONE_1_MONTH = 4320;
export const MILESTONE_3_MONTHS = 12960;
export const MILESTONE_6_MONTHS = 25920;
export const MILESTONE_1_YEAR = 52560;


