import React, { useState } from 'react';
import { Brain, ArrowUp, Sparkles, BarChart2, Dumbbell, BookOpen, MoreHorizontal, User } from 'lucide-react';
import { ForgeLogo } from '../ForgeLogo';
import { BrainChatMessage } from '../../types';
import { BRAIN_CHAT_SEED, BRAIN_PROMPT_SUGGESTIONS, USER_PROFILE } from '../../data/mockData';

interface BrainScreenProps {
  onNavigateTab?: (tab: 'home' | 'workouts' | 'brain' | 'stats' | 'profile') => void;
}

export const BrainScreen: React.FC<BrainScreenProps> = ({
  onNavigateTab,
}) => {
  const [messages, setMessages] = useState<BrainChatMessage[]>(BRAIN_CHAT_SEED);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: BrainChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    // Realistic evidence-backed response generator
    setTimeout(() => {
      let brainReplyText = '';
      let actionChips: string[] = [];

      const lower = text.toLowerCase();
      if (lower.includes('stall') || lower.includes('bench')) {
        brainReplyText =
          "Bench Press shows steady progress. You completed 60 kg x 10, 9, 8 today with an average RIR of 1.7. Since last week's chest volume reached 3,600 kg, accumulated session fatigue may be contributing rather than a plateau. Maintain current loads for 1 more session to solidify technique before adding weight.";
        actionChips = ['Review bench press history', 'Review chest volume history'];
      } else if (lower.includes('review') || lower.includes('last workout')) {
        brainReplyText =
          "Your last Push session hit 8,450 lb total volume across 5 exercises. Key highlight: Set 2 Barbell Bench reached 9 clean reps at 60 kg (+1 rep delta). Target RIR was maintained across all working sets.";
        actionChips = ['Compare with previous week', 'Review set logs'];
      } else if (lower.includes('adjust') || lower.includes('today')) {
        brainReplyText =
          "Based on logged volume trends across the past 4 weeks, consider keeping main compound movements at RIR 2, with an optional 1-set reduction on secondary isolation if perceived exertion is high.";
        actionChips = ['Apply session adjustment', 'Keep standard plan'];
      } else {
        brainReplyText =
          "Analysis of your 4-week microcycle indicates consistent progressive overload (+8.4% monthly volume). Your chest and back volume are well-balanced with a 1:1.1 push-to-pull ratio.";
        actionChips = ['Show my training distribution', 'Plan next microcycle'];
      }

      const brainMsg: BrainChatMessage = {
        id: `brain-${Date.now()}`,
        sender: 'brain',
        text: brainReplyText,
        timestamp: 'Just now',
        actionChips,
      };

      setMessages((prev) => [...prev, brainMsg]);
      setIsThinking(false);
    }, 700);
  };

  return (
    <div className="flex-1 flex flex-col px-4 pt-2 pb-3 text-[#F5F5F5] font-sans h-full overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between py-2 border-b border-white/[0.06] mb-2 shrink-0">
        <ForgeLogo size="sm" />
        <button
          onClick={() => onNavigateTab?.('profile')}
          className="w-8 h-8 rounded-full overflow-hidden border border-white/20 hover:border-[#FF7A32] transition-colors cursor-pointer"
        >
          <img
            src={USER_PROFILE.avatar}
            alt={USER_PROFILE.name}
            className="w-full h-full object-cover grayscale brightness-95"
            referrerPolicy="no-referrer"
          />
        </button>
      </div>

      {/* Screen Title */}
      <div className="mb-3 shrink-0">
        <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
          <span>Forge Brain</span>
        </h1>
        <p className="text-xs text-[#8E8E93]">Your training intelligence.</p>
      </div>

      {/* Scrollable conversation & evidence card container */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-0.5">
        {/* Featured Evidence Card */}
        <div
          className="relative rounded-2xl overflow-hidden bg-[#101012] border border-[#FF7A32]/30 p-3.5"
          style={{
            boxShadow: '0 8px 30px -10px rgba(255, 122, 50, 0.25)',
          }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden pointer-events-none opacity-30">
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80"
              alt="Plates"
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#101012] via-[#101012]/90 to-transparent" />
          </div>

          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1C1714] border border-[#FF7A32]/60 flex items-center justify-center shrink-0">
                <Brain className="w-5 h-5 text-[#FF7A32]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white tracking-tight leading-tight">
                  Bench Press is progressing
                </h2>
                <p className="text-[11px] text-[#A3A3A3] mt-0.5">
                  +4 total reps across 3 sessions
                </p>
              </div>
            </div>
            <button className="text-[#8E8E93] hover:text-white p-1">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick prompt suggestions carousel */}
        <div>
          <div className="text-[10px] uppercase font-bold text-[#8E8E93] tracking-wider mb-1.5 px-0.5">
            Suggested Analysis
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {BRAIN_PROMPT_SUGGESTIONS.slice(0, 4).map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-[#FF7A32]/20 hover:border-[#FF7A32]/40 border border-white/[0.08] text-[10px] font-medium text-white/90 transition-all cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation Message Stream */}
        <div className="space-y-3 pt-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              {msg.sender === 'user' ? (
                /* User Bubble */
                <div className="max-w-[85%] bg-white/[0.1] border border-white/[0.12] rounded-2xl rounded-tr-xs px-3.5 py-2.5 text-xs text-white">
                  <p>{msg.text}</p>
                  <span className="block text-[9px] text-[#8E8E93] text-right mt-1">
                    {msg.timestamp}
                  </span>
                </div>
              ) : (
                /* Brain Bubble */
                <div className="max-w-[95%] space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#1C1714] border border-[#FF7A32]/50 flex items-center justify-center shrink-0 mt-0.5">
                      <Brain className="w-3.5 h-3.5 text-[#FF7A32]" />
                    </div>
                    <div className="bg-[#101012] border border-white/[0.08] rounded-2xl rounded-tl-xs p-3 text-xs text-[#E5E5E5] leading-relaxed">
                      <p>{msg.text}</p>
                    </div>
                  </div>

                  {/* Contextual action cards */}
                  {msg.actionChips && msg.actionChips.length > 0 && (
                    <div className="space-y-1 pl-8">
                      {msg.actionChips.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(chip)}
                          className="w-full text-left px-3 py-2 rounded-xl bg-[#0E0E10] border border-white/[0.06] hover:border-[#FF7A32]/40 flex items-center justify-between text-[11px] font-medium text-[#A3A3A3] hover:text-white transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            {idx === 0 ? (
                              <BarChart2 className="w-3.5 h-3.5 text-[#FF7A32]" />
                            ) : idx === 1 ? (
                              <Dumbbell className="w-3.5 h-3.5 text-[#FF7A32]" />
                            ) : (
                              <BookOpen className="w-3.5 h-3.5 text-[#FF7A32]" />
                            )}
                            <span>{chip}</span>
                          </div>
                          <span>&gt;</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 text-xs text-[#A3A3A3] pl-2 py-1">
              <Sparkles className="w-3.5 h-3.5 text-[#FF7A32] animate-spin" />
              <span>Analyzing session evidence...</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Input Field */}
      <div className="pt-2 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputText);
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="What can I help you with?"
            className="w-full py-2.5 pl-4 pr-10 rounded-2xl bg-[#101012] border border-white/[0.1] text-xs text-white placeholder-[#686868] focus:border-[#FF7A32] focus:ring-1 focus:ring-[#FF7A32]/30 outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="absolute right-1.5 w-7 h-7 rounded-xl bg-[#FF7A32] disabled:opacity-40 disabled:bg-neutral-800 text-black flex items-center justify-center transition-all cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>
      </div>
    </div>
  );
};
