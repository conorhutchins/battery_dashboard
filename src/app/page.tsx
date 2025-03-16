import BatteryCard from './components/BatteryCard';
import { ThemeToggle } from './components/ThemeToggle';

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4 md:px-6 bg-background text-foreground">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-10 text-center relative">
          <h1 className="text-3xl font-bold">
            <span className="text-primary">Battery</span> Dashboard
          </h1>
          <div className="absolute right-0 top-0">
            <ThemeToggle />
          </div>
        </header>
        
        <div className="flex justify-center">
          <BatteryCard />
        </div>
        
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>Click on the battery card to view charge history</p>
        </footer>
      </div>
    </main>
  );
}
