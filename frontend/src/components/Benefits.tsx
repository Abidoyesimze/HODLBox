export default function Benefits() {
  const benefits = [
    {
      icon: "💎",
      title: "Enforced Discipline",
      description: "The smart contract prevents early withdrawals until your chosen date, helping you stick to your savings goals.",
    },
    {
      icon: "🔐",
      title: "Self-Custody",
      description: "Your funds stay in your wallet. The contract only enforces the lock period - you maintain full ownership.",
    },
    {
      icon: "🌐",
      title: "Decentralized",
      description: "No bank accounts, no intermediaries. Built on Stacks blockchain with transparent, auditable smart contracts.",
    },
    {
      icon: "⚡",
      title: "Flexible",
      description: "Set any lock period from days to years. Add funds anytime. Choose your own savings timeline.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Why HODLBox Works</h2>
        <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
          Traditional savings accounts can't enforce your discipline. Smart contracts can.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="text-center p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="text-5xl mb-4">{benefit.icon}</div>
            <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

