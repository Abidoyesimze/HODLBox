import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Benefits from '@/components/Benefits';
import UseCasesSection from '@/components/UseCasesSection';
import SecuritySection from '@/components/SecuritySection';
import StatsSection from '@/components/StatsSection';
import FAQSection from '@/components/FAQSection';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[var(--background)] via-[var(--muted)]/20 to-[var(--background)]">
      <Header />
      <main className="flex-1">
        <Hero />
        <StatsSection />
        <Features />
        <HowItWorks />
        <UseCasesSection />
        <Benefits />
        <SecuritySection />
        <FAQSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
