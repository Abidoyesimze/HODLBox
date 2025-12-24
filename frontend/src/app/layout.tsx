import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/contexts/WalletContext";
import NotificationCenter from "@/components/NotificationCenter";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HODLBox - Time-Locked STX Savings Vaults",
  description: "Lock your STX until a future date. Full custody, enforced by smart contract logic on Stacks blockchain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <WalletProvider>
          {children}
          <NotificationCenter />
        </WalletProvider>
      </body>
    </html>
  );
}
