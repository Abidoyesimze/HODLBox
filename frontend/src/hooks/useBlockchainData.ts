'use client';

import { useState, useEffect } from 'react';
import { fetchCurrentBlockHeight } from '@/lib/api';

interface BlockchainData {
  currentHeight: number;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook to fetch and manage blockchain data
 */
export function useBlockchainData() {
  const [data, setData] = useState<BlockchainData>({
    currentHeight: 0,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        const height = await fetchCurrentBlockHeight();
        setData({
          currentHeight: height,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setData({
          currentHeight: 0,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch block height',
        });
      }
    };

    // Fetch immediately
    fetchData();

    // Then fetch every 10 minutes (approximate block time)
    interval = setInterval(fetchData, 10 * 60 * 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return data;
}

