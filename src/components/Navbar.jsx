import React from 'react';
import { Radio, Music2, Info, Disc3, Sliders, Film } from 'lucide-react';

export default function Navbar({ 
  onOpenPlaylist, 
  onOpenAbout, 
  onReplayIntro,
  currentTrack, 
  isPlaying,
  overlayOpacity,
  setOverlayOpacity
}) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#120A06]/85 border-b border-[#D4AF37]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Vintage Wordmark with Hindi */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-full border border-[#D4AF37]/50 bg-gradient-to-br from-[#4A0E17] to-[#1B1009] flex items-center justify-center text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)] group-hover:scale-105 transition-transform">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-yatra text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#FBF6EB] via-[#F2D06B] to-[#D4AF37] bg-clip-text text-transparent">
                रेडियो रेट्रो
              </span>
              <span className="font-cinzel text-xs text-[#D1C4AD]/60 tracking-[0.2em] hidden sm:inline">
                RADIO RETRO
              </span>
            </div>
            <p className="text-[10px] text-[#D1C4AD]/70 font-hindi -mt-1">
              आकाशवाणी और सुनहरी यादें • 1950-1980
            </p>
          </div>
        </div>

        {/* Live Mini Ticker */}
        {currentTrack && (
          <div className="hidden lg:flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1B1009]/80 border border-[#D4AF37]/25 max-w-sm truncate">
            <Disc3 className={`w-4 h-4 text-[#D4AF37] shrink-0 ${isPlaying ? 'animate-spin-slow' : ''}`} />
            <div className="text-xs truncate font-hindi">
              <span className="text-[#FBF6EB] font-medium">{currentTrack.title}</span>
              <span className="text-[#D1C4AD]/60 ml-1.5">({currentTrack.artist})</span>
            </div>
          </div>
        )}

        {/* Navigation & Controls */}
        <nav className="flex items-center gap-3 sm:gap-6 font-hindi">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs uppercase tracking-wider text-[#D1C4AD] hover:text-[#D4AF37] transition-colors hidden sm:block cursor-pointer"
          >
            मुखपृष्ठ (Home)
          </button>
          
          <button 
            onClick={onOpenPlaylist}
            className="flex items-center gap-1.5 text-xs text-[#D1C4AD] hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            <Music2 className="w-4 h-4 text-[#D4AF37]" />
            <span className="hidden sm:inline">गीत सूची (Songs)</span>
            <span className="inline-block sm:hidden">गीत</span>
          </button>

          <button 
            onClick={onOpenAbout}
            className="flex items-center gap-1.5 text-xs text-[#D1C4AD] hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            <Info className="w-4 h-4 text-[#D4AF37]" />
            <span>सुनहरा दौर (About)</span>
          </button>

          {onReplayIntro && (
            <button 
              onClick={onReplayIntro}
              className="hidden md:flex items-center gap-1.5 text-xs text-[#F2D06B]/80 hover:text-[#D4AF37] transition-colors cursor-pointer"
              title="सिनेमा प्रोजेक्ट लीडर फिर से देखें"
            >
              <Film className="w-4 h-4 text-[#D4AF37]" />
              <span>प्रोजेक्टर (Intro)</span>
            </button>
          )}

          {/* Background Dimmer Toggle */}
          <div className="relative group pl-2 border-l border-[#D4AF37]/20 hidden lg:flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-[#D4AF37]/70" />
            <span className="text-[10px] text-[#D1C4AD]/60">पर्दा (Dimmer)</span>
            <input 
              type="range" 
              min="0.30" 
              max="0.85" 
              step="0.05"
              value={overlayOpacity}
              onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
              className="w-16 h-1 cursor-pointer accent-[#D4AF37] bg-[#29180E] rounded"
              title="Adjust background video visibility"
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
