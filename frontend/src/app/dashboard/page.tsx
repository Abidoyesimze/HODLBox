import Header from '@/components/Header';
import VaultForm from '@/components/VaultForm';
import VaultList from '@/components/VaultList';
import Footer from '@/components/Footer';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[var(--background)] via-[var(--muted)]/20 to-[var(--background)]">
      <Header />
      <main className="flex-1">
        <VaultForm />
        <VaultList />
      </main>
      <Footer />
    </div>
  );
}

