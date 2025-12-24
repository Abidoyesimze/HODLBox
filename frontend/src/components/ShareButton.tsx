'use client';

import { useState } from 'react';
import { copyToClipboard } from '@/lib/copy';

interface ShareButtonProps {
  url: string;
  title?: string;
  className?: string;
}

export default function ShareButton({ url, title = 'Share', className = '' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'HODLBox Vault',
          text: 'Check out my HODLBox vault!',
          url,
        });
      } catch (error) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback to copy
      const success = await copyToClipboard(url);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)] transition-colors flex items-center gap-2 text-sm ${className}`}
    >
      {copied ? (
        <>
          <span>✓</span>
          <span>Copied!</span>
        </>
      ) : (
        <>
          <span>🔗</span>
          <span>{title}</span>
        </>
      )}
    </button>
  );
}

