import BatteryCard from '../components/BatteryCard/BatteryCard';
import { ThemeToggle } from '../components/ThemeToggle/ThemeToggle';

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4 md:px-6 bg-background text-foreground relative">
      <div className="bg-pattern absolute inset-0 z-0"></div>
      <div className="container mx-auto max-w-6xl relative z-10">
        <header className="mb-10 text-center relative">
          <h1 className="text-3xl font-bold relative inline-block">
            <span className="text-primary relative z-10">Battery</span>
            <span className="relative z-10"> Dashboard</span>
            <span className="absolute -inset-1 bg-primary/10 blur-md rounded-full opacity-70"></span>
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
