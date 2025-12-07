export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-xl font-bold">HODLBox</span>
            </div>
            <p className="text-[var(--text-secondary)] text-sm">
              Time-locked STX savings vaults on Stacks blockchain. Lock your funds, build your future.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li>
                <a
                  href="https://explorer.stacks.co/?chain=testnet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  View Contract
                </a>
              </li>
              <li>
                <a
                  href="https://docs.stacks.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Stacks Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://www.stacks.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  About Stacks
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Security</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-4">
              Built on Stacks with Clarity smart contracts. Your funds, your custody.
            </p>
            <p className="text-xs text-[var(--text-secondary)]">
              Contract: <span className="font-mono">STM2GQAYZKBVAV6EYDEMM42H1Z666KAXARM5RX8X.hodlbox</span>
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[var(--border)] text-center text-sm text-[var(--text-secondary)]">
          <p>© {new Date().getFullYear()} HODLBox. Built on Stacks blockchain.</p>
        </div>
      </div>
    </footer>
  );
}

