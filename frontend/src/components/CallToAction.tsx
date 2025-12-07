'use client';

import { useWallet } from '@/contexts/WalletContext';
import WalletButton from './WalletButton';

export default function CallToAction() {
  const { isConnected } = useWallet();

  return (
    <section id="cta" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-3xl p-12 lg:p-16 text-center text-white overflow-hidden animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in-up">
            {isConnected ? 'Ready to Create Your Vault?' : 'Ready to Start Saving?'}
          </h2>
          <p className="text-xl lg:text-2xl mb-8 opacity-90 max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            {isConnected 
              ? 'Create your first time-locked vault and start saving on the blockchain.' 
              : 'Connect your Stacks wallet and create your first time-locked vault in minutes.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-200">
            {isConnected ? (
              <a
                href="/dashboard"
                className="group px-8 py-4 bg-white text-indigo-600 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 font-semibold text-lg relative overflow-hidden"
              >
                <span className="relative z-10">Go to Dashboard</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            ) : (
              <div className="transform scale-125">
                <WalletButton />
              </div>
            )}
            <a
              href="https://explorer.stacks.co/?chain=testnet&txid=STM2GQAYZKBVAV6EYDEMM42H1Z666KAXARM5RX8X.hodlbox"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-white/30 rounded-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 active:scale-95 font-semibold text-lg"
            >
              View Smart Contract
            </a>
          </div>
          <div className="mt-12 pt-8 border-t border-white/20 animate-fade-in animation-delay-400">
            <p className="text-lg opacity-80 mb-4">Built on Stacks • Secured by Clarity Smart Contracts</p>
            <p className="text-sm opacity-70 font-mono">
              Contract: STM2GQAYZKBVAV6EYDEMM42H1Z666KAXARM5RX8X.hodlbox
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

