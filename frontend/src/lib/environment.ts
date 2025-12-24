/**
 * Environment and configuration utilities
 */

/**
 * Check if running in development mode
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Check if running in production mode
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * Get API URL based on environment
 */
export function getApiUrl(): string {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'https://api.testnet.hiro.so';
  }
  return process.env.NEXT_PUBLIC_API_URL || window.location.origin;
}

/**
 * Check if feature flag is enabled
 */
export function isFeatureEnabled(feature: string): boolean {
  const envVar = `NEXT_PUBLIC_FEATURE_${feature.toUpperCase()}`;
  return process.env[envVar] === 'true';
}

/**
 * Get environment variable with fallback
 */
export function getEnvVar(key: string, fallback: string = ''): string {
  return process.env[key] || fallback;
}

