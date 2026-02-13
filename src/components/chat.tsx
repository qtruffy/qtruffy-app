'use client';

import { useChat } from '@ai-sdk/react';
import {
  ArrowRight,
  Book,
  Briefcase,
  FileText,
  Mail,
  Smile,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const suggestions = [
  { label: 'About me', icon: Smile },
  { label: 'Projects', icon: Briefcase },
  { label: 'Contact', icon: Mail },
  { label: 'Blog', icon: Book },
  { label: 'Resume', icon: FileText },
];

export function Chat() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hasMessages = messages.length > 0;
  const isStreaming = status === 'streaming' || status === 'submitted';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    sendMessage({ text: input });
    setInput('');
  };

  const handleSuggestion = (label: string) => {
    if (isStreaming) return;
    sendMessage({ text: label });
  };

  if (!hasMessages) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-8">
          <div className="flex flex-col items-center">
            <div className="text-2xl font-semibold text-neutral-800">
              Hey, I&apos;m Quentin 👋
            </div>
            <div className="text-6xl font-bold text-neutral-900">
              Software Engineer
            </div>
          </div>
          <div className="flex min-w-2xl flex-col items-center space-y-4">
            <form
              onSubmit={handleSubmit}
              className="flex h-16 w-full max-w-xl flex-row items-center justify-between rounded-full border border-neutral-400/50 bg-white/40 p-1.5"
            >
              <input
                type="text"
                placeholder="Ask me anything..."
                value={input}
                onChange={e => setInput(e.target.value)}
                className="w-full pl-4 text-base text-neutral-600 backdrop-blur-lg outline-none"
              />
              <button
                type="submit"
                className="flex aspect-square h-full items-center justify-center rounded-full bg-neutral-900 text-white duration-150 hover:cursor-pointer hover:bg-neutral-800"
              >
                <ArrowRight className="size-5" />
              </button>
            </form>
            <div className="grid w-full grid-cols-5 gap-4">
              {suggestions.map(suggestion => (
                <button
                  key={suggestion.label}
                  type="button"
                  onClick={() => handleSuggestion(suggestion.label)}
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
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="mx-auto flex max-w-2xl flex-col space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-neutral-900 text-white'
                    : 'border border-neutral-400/50 bg-white/60 text-neutral-800 backdrop-blur-lg'
                }`}
              >
                {message.parts.map((part, i) =>
                  part.type === 'text' ? (
                    <p
                      key={i}
                      className="text-sm leading-relaxed whitespace-pre-wrap"
                    >
                      {part.text}
                    </p>
                  ) : null
                )}
              </div>
            </div>
          ))}
          {isStreaming && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-neutral-400/50 bg-white/60 px-4 py-3 backdrop-blur-lg">
                <div className="flex space-x-1">
                  <span className="size-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:0ms]" />
                  <span className="size-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:150ms]" />
                  <span className="size-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="px-4 pb-8">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex h-14 max-w-2xl flex-row items-center justify-between rounded-full border border-neutral-400/50 bg-white/40 p-1.5 backdrop-blur-lg"
        >
          <input
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full pl-4 text-sm text-neutral-600 outline-none"
          />
          <button
            type="submit"
            disabled={isStreaming}
            className="flex aspect-square h-full items-center justify-center rounded-full bg-neutral-900 text-white duration-150 hover:cursor-pointer hover:bg-neutral-800 disabled:opacity-50"
          >
            <ArrowRight className="size-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
