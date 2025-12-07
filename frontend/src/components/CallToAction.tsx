export default function CallToAction() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-3xl p-12 lg:p-16 text-center text-white">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          Ready to Start Saving?
        </h2>
        <p className="text-xl lg:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
          Connect your Stacks wallet and create your first time-locked vault in minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-4 bg-white text-indigo-600 rounded-xl hover:bg-gray-100 transition-all shadow-lg font-semibold text-lg">
            Connect Wallet & Get Started
          </button>
          <a
            href="https://explorer.stacks.co/?chain=testnet&txid=STM2GQAYZKBVAV6EYDEMM42H1Z666KAXARM5RX8X.hodlbox"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-white/30 rounded-xl hover:bg-white/10 transition-colors font-semibold text-lg"
          >
            View Smart Contract
          </a>
        </div>
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-lg opacity-80 mb-4">Built on Stacks • Secured by Clarity Smart Contracts</p>
          <p className="text-sm opacity-70 font-mono">
            Contract: STM2GQAYZKBVAV6EYDEMM42H1Z666KAXARM5RX8X.hodlbox
          </p>
        </div>
      </div>
    </section>
  );
}

