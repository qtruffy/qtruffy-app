import { Chat } from '@/components/chat';
import { NoiseGradient } from '@/components/noise-gradient';

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden font-sans">
      <NoiseGradient />
      <Chat />
    </div>
  );
}
