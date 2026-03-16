"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SendHorizontal } from 'lucide-react';

interface CarouselItem {
  icon: string;
  title: string;
  subtitle: string;
  cta: string;
}

interface Message {
  role: 'mav' | 'user';
  content: string;
  buttons?: string[];
  carousel?: CarouselItem[] | null;
  hasClickedButton?: boolean;
}

export default function InlineChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'mav',
      content: "Hey — I'm Mav, Spengo's assistant. What brought you here today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => {
    if (typeof window !== 'undefined' && window.crypto?.randomUUID) {
      return window.crypto.randomUUID();
    }
    return Math.random().toString(36).substring(2, 15);
  });
  
  const chatDisplayRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll disabled to keep user position static on page layout flows
  /* useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]); */

  const parseMavResponse = (rawContent: string) => {
    let text = rawContent;
    let buttons: string[] = [];
    let carousel: CarouselItem[] | null = null;

    // 1. Parse Buttons [BUTTONS: Book a free audit, Tell me more]
    const buttonMatch = text.match(/\[BUTTONS:\s*(.+?)\]/);
    if (buttonMatch) {
      buttons = buttonMatch[1].split(',').map(b => b.trim());
      text = text.replace(/\[BUTTONS:\s*.+?\]/, '').trim();
    }

    // 2. Parse Carousel [CAROUSEL]\n[...]
    const carouselIndex = text.indexOf('[CAROUSEL]');
    if (carouselIndex !== -1) {
      const jsonStr = text.substring(carouselIndex + '[CAROUSEL]'.length).trim();
      try {
        carousel = JSON.parse(jsonStr);
        text = text.substring(0, carouselIndex).trim();
      } catch (e) {
        console.error("Carousel parsing failed:", e);
      }
    }

    return { text, buttons, carousel };
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('https://goadlabs.app.n8n.cloud/webhook/a36340de-354c-44c1-92c6-c4c02c33e62d', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId: sessionId })
      });

      const data = await res.json();
      console.log("📥 Raw response from n8n:", data);

      const botResponse = data.output || data.response?.output;

      const { text: cleanText, buttons, carousel } = parseMavResponse(String(botResponse));

      setMessages(prev => [
        ...prev,
        {
          role: 'mav',
          content: cleanText,
          buttons: buttons.length > 0 ? buttons : undefined,
          carousel: carousel
        }
      ]);
    } catch (error) {
      console.error("Webhook Error:", error);
      setMessages(prev => [
        ...prev,
        { role: 'mav', content: "Mav is taking a short break. Please try again in a moment." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (text: string, messageIndex: number) => {
    // Mark buttons as clicked for this message to hide them
    setMessages(prev => prev.map((msg, i) => 
      i === messageIndex ? { ...msg, hasClickedButton: true } : msg
    ));
    sendMessage(text);
  };

  return (
    <div className="w-full">
      {/* Chat Area */}
      <div 
        ref={chatDisplayRef}
        className="flex flex-col gap-8"
      >
        <AnimatePresence initial={false}>
          {messages.map((message, i) => {
            const isMav = message.role === 'mav';
            const showButtons = isMav && message.buttons && !message.hasClickedButton && i === messages.length - 1;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`flex flex-col ${isMav ? 'items-start' : 'items-end'} w-full`}
              >
                {/* Message Bubble */}
                <div 
                  className={`max-w-[100%] ${
                    isMav 
                      ? 'border-l-[3px] border-primary pl-6 text-white' 
                      : 'bg-primary/20 border border-primary/30 text-white px-5 py-3 rounded-2xl'
                  }`}
                >
                  <p className={`font-jakarta leading-relaxed whitespace-pre-wrap ${
                    isMav ? 'text-lg md:text-xl font-medium text-white/90' : 'text-sm'
                  }`}>
                    {message.content}
                  </p>
                </div>

                {/* Quick Reply Buttons */}
                {showButtons && message.buttons && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-wrap gap-2 mt-3"
                  >
                    {message.buttons.map((btn, btnIdx) => (
                      <button
                        key={btnIdx}
                        onClick={() => handleQuickReply(btn, i)}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95"
                      >
                        {btn}
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* Carousel */}
                {isMav && message.carousel && (
                  <div className="w-full overflow-x-auto mt-4 px-1 pb-2">
                    <div className="flex gap-4 min-w-max">
                      {message.carousel.map((card, cardIdx) => (
                        <motion.div
                          key={cardIdx}
                          whileHover={{ y: -4 }}
                          className="bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl w-64 backdrop-blur-md transition-shadow group"
                        >
                          <div className="text-3xl mb-3">{card.icon}</div>
                          <h4 className="text-white font-semibold text-sm mb-1">{card.title}</h4>
                          <p className="text-white/60 text-xs mb-3 line-clamp-2">{card.subtitle}</p>
                          <button
                            onClick={() => sendMessage(`Tell me ${card.title}`)}
                            className="w-full bg-primary/20 hover:bg-primary border border-primary/30 text-white text-xs font-semibold py-2 rounded-lg transition-all duration-200 group-hover:bg-primary"
                          >
                            {card.cta}
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start"
          >
            <div className="bg-white/5 border-l-4 border-primary text-white backdrop-blur-md px-4 py-3 rounded-xl rounded-tl-none">
              <div className="flex gap-1 items-center justify-center p-1">
                <span className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce"></span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="mt-8 pt-6 border-t border-white/5">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex gap-4 items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Mav anything..."
            disabled={isLoading}
            className="flex-1 bg-transparent disabled:opacity-50 border-b border-white/10 focus:border-primary rounded-none px-0 py-4 text-white text-lg md:text-xl outline-none transition-all duration-300 placeholder:text-white/30"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white p-4 rounded-full transition-all duration-200 flex items-center justify-center aspect-square shadow-[0_0_20px_rgba(124,58,237,0.3)]"
          >
            <SendHorizontal size={20} className="transform group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}
