'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { openAuth, UserSession, AppConfig } from '@stacks/connect';
import { StacksTestnet } from '@stacks/network';
import { CONTRACT_ADDRESS, NETWORK } from '@/lib/constants';

interface WalletContextType {
  userSession: UserSession | null;
  userData: any | null;
  isConnected: boolean;
  address: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  loading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const network = NETWORK === 'testnet' ? new StacksTestnet() : new StacksTestnet();

const appConfig = new AppConfig(['store_write', 'publish_data'], typeof window !== 'undefined' ? window.location.origin : '');

export function WalletProvider({ children }: { children: ReactNode }) {
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    if (typeof window !== 'undefined') {
      const session = new UserSession({ appConfig });

      if (session.isUserSignedIn()) {
        setUserSession(session);
        const data = session.loadUserData();
        setUserData(data);
      }

      // Check if returning from auth redirect
      if (session.isSignInPending()) {
        session.handlePendingSignIn().then((userData) => {
          setUserSession(session);
          setUserData(userData);
        });
      }

      setLoading(false);
    }
  }, []);

  const connectWallet = async () => {
    try {
      openAuth({
        appDetails: {
          name: 'HODLBox',
          icon: typeof window !== 'undefined' ? `${window.location.origin}/favicon.ico` : '',
        },
        redirectTo: '/',
        onFinish: async () => {
          const session = new UserSession({ appConfig });
          if (session.isSignInPending()) {
            const userData = await session.handlePendingSignIn();
            setUserSession(session);
            setUserData(userData);
          }
        },
        onCancel: () => {
          console.log('User canceled wallet connection');
        },
        network,
      });
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = () => {
    if (userSession) {
      userSession.signUserOut();
      setUserSession(null);
      setUserData(null);
    }
  };

  const address = userData?.profile?.stxAddress?.testnet || userData?.profile?.stxAddress?.mainnet || null;

  return (
    <WalletContext.Provider
      value={{
        userSession,
        userData,
        isConnected: !!userData,
        address,
        connectWallet,
        disconnectWallet,
        loading,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
