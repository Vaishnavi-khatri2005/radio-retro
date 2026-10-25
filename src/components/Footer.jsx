import React from 'react';
import { Heart, Radio } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#D4AF37]/20 bg-[#120A06]/90 backdrop-blur-md py-12 px-4 relative z-20">
      
      {/* Decorative Radio Frequency Scale */}
      <div className="max-w-2xl mx-auto mb-8 px-4">
        <div className="h-6 rounded border border-[#D4AF37]/30 bg-[#1B1009]/80 flex items-center justify-between px-3 text-[10px] font-mono text-[#D4AF37]/70">
          <span>540</span>
          <span>600</span>
          <span>700</span>
          <span className="text-[#F2D06B] font-bold">800 • VIVIDH BHARATI</span>
          <span>1000</span>
          <span>1200</span>
          <span>1400</span>
          <span>1600 kHz</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-4">
        
        {/* Vintage Wordmark */}
        <div className="font-cinzel text-xl tracking-[0.3em] font-bold text-[#F2D06B]">
          RADIO RETRO
        </div>

        {/* Required Message */}
        <p className="font-playfair text-lg text-[#FBF6EB] italic">
          "Made for the love of timeless melodies."
        </p>

        <p className="text-xs text-[#D1C4AD]/60 font-sans max-w-md mx-auto">
          Dedicated to the composers, lyricists, musicians, and singers of Indian cinema who turned emotions into immortal soundscapes.
        </p>

        {/* Attribution / YouTube Policy Notice */}
        <div className="pt-4 border-t border-[#D4AF37]/10 flex flex-wrap items-center justify-center gap-4 text-xs text-[#D1C4AD]/50">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span>Music playback powered by YouTube IFrame API</span>
          </span>
          <span>•</span>
          <span>Curated Playlist Archive</span>
          <span>•</span>
          <span>All rights belong to respective record labels & artists</span>
        </div>

      </div>
    </footer>
  );
}
