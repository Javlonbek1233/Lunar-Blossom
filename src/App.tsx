/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { Sparkles, Moon, Flower2, Music2, Volume2, VolumeX, ArrowRight } from "lucide-react";

// Particle component for floating petals and magical bits
interface FloatingAssetProps {
  delay: number;
  duration: number;
  x: string;
  size: number;
  type: 'petal' | 'sparkle';
}

const FloatingAsset = ({ delay, duration, x, size, type }: FloatingAssetProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        y: "110vh", 
        x: [`${parseFloat(x) - 5}%`, `${parseFloat(x) + 5}%`, `${parseFloat(x) - 2}%`],
        opacity: [0, 1, 1, 0],
        rotate: [0, 180, 360]
      }}
      transition={{ 
        duration: duration, 
        delay: delay, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      className="absolute pointer-events-none z-10"
      style={{ left: x }}
    >
      {type === 'petal' ? (
        <Flower2 size={size} className="text-sakura-pink/40" />
      ) : (
        <Sparkles size={size} className="text-blue-300/40" />
      )}
    </motion.div>
  );
};

export default function App() {
  const [narrative, setNarrative] = useState<string>("");
  const [isMuted, setIsMuted] = useState(true);
  const [showStory, setShowStory] = useState(false);

  useEffect(() => {
    fetch("/api/narrative")
      .then((res) => res.json())
      .then((data) => setNarrative(data.text))
      .catch(() => setNarrative("Under the silver moon, the Sakura Maiden awaits the passing of an age. Her eyes reflect the depths of a forgotten sky."));
  }, []);

  const petals = Array.from({ length: 20 }).map((_, i) => (
    <FloatingAsset 
      key={`petal-${i}`} 
      type="petal" 
      delay={i * 1.5} 
      duration={10 + Math.random() * 10} 
      x={`${Math.random() * 100}%`} 
      size={12 + Math.random() * 12} 
    />
  ));

  const sparkles = Array.from({ length: 15 }).map((_, i) => (
    <FloatingAsset 
      key={`sparkle-${i}`} 
      type="sparkle" 
      delay={i * 2} 
      duration={5 + Math.random() * 5} 
      x={`${Math.random() * 100}%`} 
      size={8 + Math.random() * 8} 
    />
  ));

  return (
    <div className="relative min-h-screen w-full bg-night-sky overflow-hidden flex flex-col">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-night-sky via-deep-blue to-celestial opacity-100" />
        <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-blue-400 rounded-full blur-[180px] opacity-20" />
        
        {/* Main Character Showcase Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40 mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=2070" 
            alt="Night garden"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Floating Particles */}
      {petals}
      {sparkles}

      {/* UI Header */}
      <header className="relative z-20 flex justify-between items-center px-12 pt-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase opacity-60 font-semibold">Celestial Archive</span>
          <div className="h-[1px] w-12 bg-blue-400 mt-2 opacity-50"></div>
        </motion.div>
        <div className="flex gap-8 items-center">
          <div className="text-right">
            <span className="text-[10px] tracking-[0.2em] uppercase block opacity-40 text-moonlight">Phase</span>
            <span className="text-sm font-light text-moonlight/80">Waxing Crescent</span>
          </div>
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="relative z-10 flex-1 grid grid-cols-12 px-12">
        {/* Left Column: Character Stats */}
        <div className="col-span-12 lg:col-span-4 flex flex-col justify-center py-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-block px-3 py-1 border border-blue-400/50 bg-blue-400/10 rounded-sm mb-4">
              <span className="text-[10px] tracking-widest uppercase text-blue-300 font-bold">Legendary Unit</span>
            </div>
            <h1 className="text-7xl font-light tracking-tight leading-none mb-2 font-serif">Shirosuki</h1>
            <p className="text-blue-200/60 italic text-lg tracking-wide mb-8">Silver Moon Disciple</p>
          </motion.div>

          <div className="space-y-6 max-w-xs">
            {[
              { label: "Spirit Affinity", value: "94%", color: "bg-blue-400" },
              { label: "Ethereal Resonance", value: "81%", color: "bg-pink-400" }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="group"
              >
                <div className="flex justify-between text-[11px] uppercase tracking-tighter mb-2 opacity-60 text-moonlight">
                  <span>{stat.label}</span>
                  <span>{stat.value}</span>
                </div>
                <div className="h-[2px] bg-white/10 w-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: stat.value }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 + i * 0.1 }}
                    className={`h-full ${stat.color}`} 
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <button 
              onClick={() => setShowStory(!showStory)}
              className="px-8 py-4 bg-white text-night-sky font-bold text-xs uppercase tracking-widest rounded-full hover:bg-blue-100 transition-all hover:scale-105 active:scale-95"
            >
              {showStory ? "Hide Archive" : "Summon Spirit"}
            </button>
          </div>
        </div>

        {/* Middle/Right Column: Artistic Focal Point */}
        <div className="hidden lg:col-span-8 relative lg:flex items-center justify-center">
          <div className="relative w-[500px] h-[600px]">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-full blur-3xl opacity-20 transform -translate-y-20"></div>
            
            {/* Glowing Eyes */}
            <div className="absolute top-[35%] left-1/2 -translate-x-1/2 flex gap-12 z-30">
              <div className="w-2 h-2 bg-blue-300 rounded-full shadow-[0_0_15px_#8ab4f8] animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-300 rounded-full shadow-[0_0_15px_#8ab4f8] animate-pulse"></div>
            </div>

            {/* Abstract Character Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[450px] bg-gradient-to-t from-white/5 to-transparent border-t border-white/10 rounded-t-full"
            />
            
            <div className="absolute -left-10 top-20 w-40 h-1 bg-white/5 rotate-45 blur-sm"></div>
            <div className="absolute -right-20 bottom-40 w-60 h-1 bg-white/5 -rotate-12 blur-sm"></div>
          </div>

          <AnimatePresence>
            {showStory && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 20 }}
                className="absolute right-0 top-1/4 w-80 glass p-8 rounded-2xl z-40"
              >
                <span className="text-[10px] uppercase tracking-widest text-blue-300 block mb-4">Lore Fragment</span>
                <p className="font-serif italic text-lg leading-relaxed text-moonlight/90">
                  {narrative || "The petals fall like memories, dancing in the light of a moon that never forgets."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Cinematic Overlay */}
      <footer className="relative z-20 px-12 pb-12">
        <div className="flex flex-col md:flex-row items-end justify-between border-t border-white/10 pt-8 gap-6">
          <div className="max-w-md">
            <p className="text-lg leading-relaxed text-blue-100/80 italic font-serif">
              "The silence of the blossoms tells a story of a thousand years, written in moonlight."
            </p>
            <span className="block mt-2 text-[10px] tracking-widest uppercase opacity-40">- Chapter IV: The Silver Garden</span>
          </div>
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity">←</button>
            <button className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors">→</button>
          </div>
        </div>
      </footer>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] z-40"></div>
    </div>
  );
}

