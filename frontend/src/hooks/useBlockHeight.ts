'use client';

import { useState, useEffect } from 'react';
import { fetchCurrentBlockHeight } from '@/lib/api';

/**
 * Custom hook to fetch and track current block height
 */
export function useBlockHeight() {
  const [blockHeight, setBlockHeight] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchHeight = async () => {
      try {
        setError(null);
        const height = await fetchCurrentBlockHeight();
        setBlockHeight(height);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch block height');
        setLoading(false);
      }
    };

    // Fetch immediately
    fetchHeight();

    // Then fetch every 10 minutes (approximate block time)
    interval = setInterval(fetchHeight, 10 * 60 * 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return { blockHeight, loading, error };
}

