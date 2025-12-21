'use client';

export default function SecuritySection() {
  const securityFeatures = [
    {
      title: 'Smart Contract Audited',
      description: 'Our Clarity smart contract has been thoroughly audited for security and correctness.',
      icon: '🛡️',
    },
    {
      title: 'Non-Custodial',
      description: 'You maintain full control of your funds. We never hold your STX.',
      icon: '🔑',
    },
    {
      title: 'Transparent & Verifiable',
      description: 'All transactions are on-chain and publicly verifiable on the Stacks blockchain.',
      icon: '👁️',
    },
    {
      title: 'Open Source',
      description: 'Our smart contract code is open source and available for anyone to review.',
      icon: '📖',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Security First</h2>
        <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
          Your funds are protected by blockchain technology and smart contract logic
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {securityFeatures.map((feature, index) => (
          <div
            key={index}
            className="group p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-400/50 animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
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

