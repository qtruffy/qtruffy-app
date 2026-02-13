import { NoiseGradient } from '@/components/noise-gradient';
import {
  ArrowRight,
  Book,
  Briefcase,
  FileText,
  Mail,
  Smile,
} from 'lucide-react';

export default function Home() {
  const suggestions = [
    {
      label: 'About me',
      icon: Smile,
    },
    {
      label: 'Projects',
      icon: Briefcase,
    },
    {
      label: 'Contact',
      icon: Mail,
    },
    {
      label: 'Blog',
      icon: Book,
    },
    {
      label: 'Resume',
      icon: FileText,
    },
  ];

  return (
    <div className="relative h-screen w-screen overflow-hidden font-sans">
      <NoiseGradient />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-8">
          <div className="flex flex-col items-center">
            <div className="font- text-2xl font-semibold text-neutral-800">
              Hey, I&apos;m Quentin 👋
            </div>
            <div className="text-6xl font-bold text-neutral-900">
              Software Engineer
            </div>
          </div>
          <div className="flex min-w-2xl flex-col items-center space-y-4">
            <div className="flex h-16 w-full max-w-xl flex-row items-center justify-between rounded-full border border-neutral-400/50 bg-white/40 p-1.5">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="w-full pl-4 text-base text-neutral-600 backdrop-blur-lg outline-none"
              />
              <button className="flex aspect-square h-full items-center justify-center rounded-full bg-neutral-900 text-white duration-150 hover:cursor-pointer hover:bg-neutral-800">
                <ArrowRight className="size-5" />
              </button>
            </div>
            <div className="grid w-full grid-cols-5 gap-4">
              {suggestions.map(suggestion => (
                <button
                  key={suggestion.label}
                  className="flex flex-col items-center justify-center space-y-2 rounded-2xl border border-neutral-400/50 py-4 backdrop-blur-lg duration-150 hover:cursor-pointer hover:border-neutral-400"
                >
                  <suggestion.icon className="size-5 text-neutral-500" />
                  <div className="text-sm text-neutral-800">
                    {suggestion.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
