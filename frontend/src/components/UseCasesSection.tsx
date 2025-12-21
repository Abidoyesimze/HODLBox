'use client';

export default function UseCasesSection() {
  const useCases = [
    {
      title: 'Emergency Fund',
      description: 'Build a safety net that you can only access when truly needed. Lock your emergency fund for 6-12 months to ensure it stays untouched.',
      icon: '🚨',
      color: 'from-red-500 to-orange-500',
    },
    {
      title: 'Goal Savings',
      description: 'Save for a vacation, down payment, or major purchase. Set your target date and let the smart contract keep you on track.',
      icon: '🎯',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Long-term HODLing',
      description: 'Commit to holding your STX for years. Perfect for long-term investors who want enforced discipline.',
      icon: '💎',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Recurring Savings',
      description: 'Add funds to your vault regularly. Build your savings incrementally while maintaining your lock period.',
      icon: '📈',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Use Cases</h2>
        <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
          Discover how HODLBox can help you achieve your financial goals
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {useCases.map((useCase, index) => (
          <div
            key={index}
            className="group relative p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            <div className="relative z-10">
              <div className="text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                {useCase.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {useCase.title}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                {useCase.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

