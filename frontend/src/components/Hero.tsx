export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Time-Locked STX Savings Vaults
        </h1>
        <p className="text-xl lg:text-2xl text-[var(--text-secondary)] mb-8 leading-relaxed">
          Lock your STX until a future date. Full custody, enforced by smart contract logic on the Stacks blockchain.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30 font-medium text-lg">
            Create Your First Vault
          </button>
          <a 
            href="https://explorer.stacks.co/?chain=testnet"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-[var(--border)] rounded-xl hover:bg-[var(--muted)] transition-colors font-medium text-lg"
          >
            View Contract
          </a>
        </div>
      </div>
    </section>
  );
}

