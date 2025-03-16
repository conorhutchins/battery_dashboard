import BatteryCard from './components/BatteryCard';
import { ThemeToggle } from './components/ThemeToggle';

export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-background text-foreground">
      <div className="container mx-auto max-w-6xl">
        <header className="flex items-center mb-6 relative">
          <h1 className="text-2xl font-bold w-full text-center">Battery Dashboard</h1>
          <div className="absolute right-0">
            <ThemeToggle />
          </div>
        </header>
        
        <div className="flex justify-center">
          <BatteryCard />
        </div>
      </div>
    </main>
  );
}
