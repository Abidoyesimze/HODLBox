export default function Features() {
  const features = [
    {
      title: "Time-Locked Savings",
      description: "Set a future block height to unlock your funds. No early withdrawals until then.",
      icon: "🔒",
    },
    {
      title: "Full Custody",
      description: "You maintain complete control. Funds are in your vault, enforced by smart contract logic.",
      icon: "🔑",
    },
    {
      title: "Recurring Deposits",
      description: "Add more STX to your existing vault anytime. Build your savings over time.",
      icon: "📈",
    },
    {
      title: "Achievement NFTs",
      description: "Earn non-transferable achievement badges for reaching savings milestones.",
      icon: "🏆",
    },
    {
      title: "Emergency Withdrawal",
      description: "Need funds early? Emergency withdrawals available with a configurable penalty.",
      icon: "⚠️",
    },
    {
      title: "Trustless & Secure",
      description: "Built on Stacks blockchain with Clarity smart contracts. No intermediaries.",
      icon: "🛡️",
    },
  ];

'use client';

export default function Features() {
  const features = [
    {
      title: "Time-Locked Savings",
      description: "Set a future block height to unlock your funds. No early withdrawals until then.",
      icon: "🔒",
    },
    {
      title: "Full Custody",
      description: "You maintain complete control. Funds are in your vault, enforced by smart contract logic.",
      icon: "🔑",
    },
    {
      title: "Recurring Deposits",
      description: "Add more STX to your existing vault anytime. Build your savings over time.",
      icon: "📈",
    },
    {
      title: "Achievement NFTs",
      description: "Earn non-transferable achievement badges for reaching savings milestones.",
      icon: "🏆",
    },
    {
      title: "Emergency Withdrawal",
      description: "Need funds early? Emergency withdrawals available with a configurable penalty.",
      icon: "⚠️",
    },
    {
      title: "Trustless & Secure",
      description: "Built on Stacks blockchain with Clarity smart contracts. No intermediaries.",
      icon: "🛡️",
    },
  ];

  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 animate-fade-in-up">Everything You Need to Save Smarter</h2>
        <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
          Powerful features that make saving on the blockchain simple, secure, and rewarding
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-400/50 animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 inline-block animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {feature.title}
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

