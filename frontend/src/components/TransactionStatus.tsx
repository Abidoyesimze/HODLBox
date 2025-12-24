'use client';

interface TransactionStatusProps {
  status: 'pending' | 'success' | 'failed';
  txId?: string;
  message?: string;
}

export default function TransactionStatus({ status, txId, message }: TransactionStatusProps) {
  const statusConfig = {
    pending: {
      icon: '⏳',
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      text: 'Transaction pending...',
    },
    success: {
      icon: '✓',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      text: 'Transaction successful!',
    },
    failed: {
      icon: '✕',
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      text: 'Transaction failed',
    },
  };

  const config = statusConfig[status];

  return (
    <div className={`p-4 rounded-xl border ${config.bgColor} ${config.borderColor} ${config.color}`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{config.icon}</span>
        <div className="flex-1">
          <p className="font-semibold">{message || config.text}</p>
          {txId && (
            <a
              href={`https://explorer.stacks.co/txid/${txId}?chain=testnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono hover:underline mt-1 block"
            >
              View on Explorer
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

