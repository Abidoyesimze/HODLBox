'use client';

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Create a Vault",
      description: "Set the amount of STX to lock and choose your unlock date (block height). Add an optional note for your savings goal.",
    },
    {
      number: "2",
      title: "Fund Your Vault",
      description: "Deposit STX into your vault. The funds are locked immediately and cannot be withdrawn until the unlock block height.",
    },
    {
      number: "3",
      title: "Add More Anytime",
      description: "Want to increase your savings? Add more STX to your existing vault without changing the unlock date.",
    },
    {
      number: "4",
      title: "Withdraw When Ready",
      description: "Once the unlock block height is reached, withdraw your full amount back to your wallet. No penalties, no delays.",
    },
  ];

  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 animate-fade-in-up">How It Works</h2>
        <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
          Four simple steps to secure your financial future on the blockchain
        </p>
      </div>
      <div className="bg-gradient-to-br from-[var(--muted)] via-[var(--muted)] to-indigo-50 dark:to-indigo-950/20 rounded-3xl p-8 lg:p-12 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="relative group animate-slide-in-right"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-2xl font-bold mb-4 shadow-lg shadow-indigo-500/30 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-indigo-500/40 transition-all duration-300">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {step.title}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 -z-10 opacity-60 group-hover:opacity-100 transition-opacity" style={{ width: 'calc(100% - 4rem)', marginLeft: '2rem' }} />
            )}
          </div>
        ))}
      </div>
      <div className="mt-12 text-center animate-fade-in animation-delay-500">
        <div className="inline-block p-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl max-w-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <p className="text-lg text-[var(--text-secondary)] mb-2">
            <strong className="text-[var(--foreground)]">Remember:</strong> Stacks blocks are produced approximately every 10 minutes.
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            ~144 blocks per day • Plan your lock period accordingly
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}
