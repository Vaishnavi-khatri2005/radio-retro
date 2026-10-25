import React from 'react';
import { Play, Pause, Disc3, Sparkles, Film, Music } from 'lucide-react';

export default function HeroSection({ 
  isPlaying, 
  onTogglePlay, 
  currentTrack, 
  onOpenPlaylist 
}) {
  return (
    <section className="relative py-10 md:py-16 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
      
      {/* Decorative Vintage Emblem with Hindi & English */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#1B1009]/80 backdrop-blur-md mb-6 text-xs text-[#F2D06B] shadow-[0_0_15px_rgba(212,175,55,0.15)]">
        <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span className="font-hindi font-medium">आकाशवाणी विविध भारती • बीनाका गीतमाला</span>
        <span className="opacity-50">|</span>
        <span className="tracking-widest uppercase font-mono text-[10px]">1950s — 1980s</span>
      </div>

      {/* Main Hindi Heading */}
      <h2 className="font-yatra text-3xl sm:text-5xl md:text-6xl text-[#FBF6EB] mb-2 leading-tight">
        कुछ नगमे कभी <span className="bg-gradient-to-r from-[#F2D06B] via-[#D4AF37] to-[#E6C280] bg-clip-text text-transparent">पुराने नहीं होते</span>
      </h2>

      {/* Main English Subtitle Heading */}
      <h1 className="font-playfair text-xl sm:text-3xl text-[#EAE0CC]/90 italic font-normal tracking-wide mb-5">
        "Some Melodies Never Fade."
      </h1>

      {/* Hindi & English Narrative */}
      <p className="font-hindi text-sm sm:text-lg text-[#EAE0CC]/80 max-w-2xl mx-auto leading-relaxed mb-8 font-light">
        जब शायरी दिल से निकलती थी और सुर सीधे रूह में उतर जाते थे। 
        किशोर दा की अल्हड़ मस्ती, रफ़ी साहब की पाकीज़ा आवाज़, लता दीदी की रूहानियत और जगजीत सिंह की ग़ज़लें।
      </p>

      {/* Prominent Play / Pause CTA Button & Tracklist Button */}
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
        
        {/* Prominent Master Play Button */}
        <button
          onClick={onTogglePlay}
          className="group relative inline-flex items-center gap-3.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F2D06B] to-[#C5A059] text-[#120A06] font-semibold text-sm sm:text-base tracking-wider shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 font-hindi"
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5 fill-current" />
              <span>रेडियो रोकें (Pause Music)</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current translate-x-0.5" />
              <span>रेडियो बजाएं (Play Music)</span>
            </>
          )}

          {/* Soundwave Bars */}
          <div className="flex items-end gap-1 h-4 ml-1">
            <span className={`w-1 bg-[#120A06] rounded-full ${isPlaying ? 'animate-eq-1' : 'h-1'}`} />
            <span className={`w-1 bg-[#120A06] rounded-full ${isPlaying ? 'animate-eq-2' : 'h-2'}`} />
            <span className={`w-1 bg-[#120A06] rounded-full ${isPlaying ? 'animate-eq-3' : 'h-3'}`} />
            <span className={`w-1 bg-[#120A06] rounded-full ${isPlaying ? 'animate-eq-4' : 'h-1'}`} />
          </div>
        </button>

        {/* View Tracklist Button */}
        <button
          onClick={onOpenPlaylist}
          className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full border border-[#D4AF37]/40 bg-[#1B1009]/70 backdrop-blur-sm text-[#FBF6EB] hover:bg-[#29180E] hover:border-[#D4AF37] transition-all text-xs sm:text-sm font-hindi tracking-wider"
        >
          <Disc3 className="w-4 h-4 text-[#D4AF37]" />
          <span>71 पुराने सदाबहार नगमे (Tracklist)</span>
        </button>
      </div>

      {/* Now Playing Teaser Badge */}
      {currentTrack && (
        <div className="mt-6 flex items-center gap-2 text-xs text-[#D1C4AD]/80 bg-[#1B1009]/60 px-4 py-1.5 rounded-full border border-[#D4AF37]/20 font-hindi">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
          <span className="text-[#D4AF37]">अभी बज रहा है:</span>
          <span className="text-[#F2D06B] font-medium">{currentTrack.title}</span>
        </div>
      )}
    </section>
  );
}
