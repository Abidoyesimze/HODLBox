'use client';

export default function VaultList() {
  // Mock data for UI demonstration
  const mockVaults = [
    {
      id: 1,
      amount: '500.00',
      unlockHeight: 125000,
      currentHeight: 120000,
      blocksRemaining: 5000,
      daysRemaining: 35,
      note: 'Emergency fund',
      status: 'locked' as const,
    },
    {
      id: 2,
      amount: '1000.00',
      unlockHeight: 130000,
      currentHeight: 120000,
      blocksRemaining: 10000,
      daysRemaining: 69,
      note: 'Vacation savings',
      status: 'locked' as const,
    },
  ];

  const formatDays = (days: number) => {
    if (days < 1) return 'Less than 1 day';
    if (days === 1) return '1 day';
    return `${days} days`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'locked':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'unlocked':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Your Vaults</h2>
          <p className="text-[var(--text-secondary)]">
            Manage your time-locked savings vaults
          </p>
        </div>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium">
          + New Vault
        </button>
      </div>

      {mockVaults.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-[var(--border)] rounded-2xl">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold mb-2">No vaults yet</h3>
          <p className="text-[var(--text-secondary)] mb-6">
            Create your first vault to start your savings journey
          </p>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium">
            Create Your First Vault
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {mockVaults.map((vault) => (
            <div
              key={vault.id}
              className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-bold">#{vault.id}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">
                        {vault.amount} STX
                      </h3>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(vault.status)}`}>
                        {vault.status === 'locked' ? 'Locked' : 'Unlocked'}
                      </span>
                    </div>
                  </div>
                  {vault.note && (
                    <p className="text-[var(--text-secondary)] mb-2">💭 {vault.note}</p>
                  )}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-[var(--text-secondary)]">Unlocks in:</span>
                      <p className="font-semibold">{formatDays(vault.daysRemaining)}</p>
                    </div>
                    <div>
                      <span className="text-[var(--text-secondary)]">Blocks remaining:</span>
                      <p className="font-mono font-semibold">{vault.blocksRemaining.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-[var(--text-secondary)]">Unlock height:</span>
                      <p className="font-mono font-semibold">{vault.unlockHeight.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-[var(--text-secondary)]">Progress:</span>
                      <div className="w-full bg-[var(--muted)] rounded-full h-2 mt-1">
                        <div
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full"
                          style={{
                            width: `${Math.max(0, Math.min(100, ((vault.unlockHeight - vault.currentHeight - vault.blocksRemaining) / (vault.unlockHeight - vault.currentHeight)) * 100))}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)] transition-colors font-medium text-sm">
                    View Details
                  </button>
                  {vault.status === 'unlocked' && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
                      Withdraw
                    </button>
                  )}
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm">
                    Add Funds
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}


