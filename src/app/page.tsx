import BatteryCard from './components/BatteryCard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-500 mb-8">Battery Dashboard</h1>
        <BatteryCard />
      </div>
    </main>
  );
}
