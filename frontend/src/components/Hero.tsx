'use client';

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-hidden">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in-up">
          Time-Locked STX Savings Vaults
        </h1>
        <p className="text-xl lg:text-2xl text-[var(--text-secondary)] mb-4 leading-relaxed animate-fade-in-up animation-delay-100">
          Lock your STX until a future date. Full custody, enforced by smart contract logic on the Stacks blockchain.
        </p>
        <p className="text-lg text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          Perfect for emergency funds, goal savings, or long-term HODLing. The smart contract keeps you honest when your willpower might not.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-300">
          <button className="group px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 font-medium text-lg relative overflow-hidden">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <a 
            href="#how-it-works"
            className="px-8 py-4 border-2 border-[var(--border)] rounded-xl hover:bg-[var(--muted)] hover:border-indigo-400 transition-all duration-300 hover:scale-105 active:scale-95 font-medium text-lg"
          >
            Learn How It Works
          </a>
        </div>
      </div>
    </section>
  );
}

