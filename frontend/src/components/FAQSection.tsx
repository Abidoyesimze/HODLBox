'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'What is HODLBox?',
      answer: 'HODLBox is a decentralized savings platform on the Stacks blockchain that allows you to lock your STX tokens until a future block height. It enforces discipline through smart contract logic, helping you save for goals without the temptation of early withdrawal.',
    },
    {
      question: 'How does time-locking work?',
      answer: 'When you create a vault, you specify an unlock block height. Your STX is transferred to the smart contract and cannot be withdrawn until the blockchain reaches that block height. Stacks blocks are produced approximately every 10 minutes (~144 blocks per day).',
    },
    {
      question: 'Can I add more funds to my vault?',
      answer: 'Yes! You can add more STX to your existing vault at any time using the "Add Funds" feature. This increases your total locked amount without changing the unlock date.',
    },
    {
      question: 'What happens if I need my funds early?',
      answer: 'Emergency withdrawals are available with a configurable penalty (default 10%). The penalty stays in the contract, incentivizing you to wait for the full lock period. Note: Emergency withdrawals may be disabled by the contract owner.',
    },
    {
      question: 'Are my funds safe?',
      answer: 'Yes! HODLBox is built on Stacks blockchain with Clarity smart contracts. Your funds are held in the contract, and you maintain full custody. The contract code is open source and auditable. We never hold your private keys.',
    },
    {
      question: 'What are Achievement NFTs?',
      answer: 'When you successfully complete a vault (withdraw after the lock period), you earn non-transferable achievement NFTs based on your lock duration. Milestones include Week Warrior, Bronze Believer, Silver Saver, Gold Holder, and Diamond Hands.',
    },
    {
      question: 'What is the minimum lock period?',
      answer: 'The minimum lock period is 1 day (~144 blocks). There\'s no maximum, but we recommend staying within reasonable bounds for your financial goals.',
    },
    {
      question: 'Can I cancel my vault?',
      answer: 'You can cancel a vault before it\'s fully funded, but once funds are locked, you must wait until the unlock block height or use emergency withdrawal (with penalty).',
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-[var(--text-secondary)]">
          Everything you need to know about HODLBox
        </p>
      </div>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-scale-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[var(--muted)] transition-colors duration-200"
            >
              <span className="font-semibold text-lg pr-4">{faq.question}</span>
              <svg
                className={`w-5 h-5 flex-shrink-0 transform transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-[var(--text-secondary)] leading-relaxed animate-fade-in">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

