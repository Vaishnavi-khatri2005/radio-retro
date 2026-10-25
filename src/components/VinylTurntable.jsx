import React from 'react';
import { Disc } from 'lucide-react';

export default function VinylTurntable({ isPlaying, currentTrack }) {
  return (
    <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-2.5 bg-gradient-to-tr from-[#0a0604] via-[#22140D] to-[#0a0604] border-2 border-[#D4AF37]/40 shadow-[0_15px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.25)] flex items-center justify-center select-none">
      
      {/* Vinyl Outer Edge & Grooves */}
      <div 
        className={`w-full h-full rounded-full border-[6px] border-[#160D08] flex items-center justify-center relative shadow-inner transition-transform duration-500 ${
          isPlaying ? 'animate-spin-slow' : 'paused'
        }`}
        style={{
          background: 'repeating-radial-gradient(circle, #1a100a 0, #1a100a 2px, #0e0704 3px, #0e0704 5px)'
        }}
      >
        {/* Subtle Light Sheen reflection across grooves */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none opacity-20"
          style={{
            background: 'conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.2) 60deg, transparent 120deg, rgba(255,255,255,0.15) 240deg, transparent 300deg)'
          }}
        />

        {/* Center Golden & Burgundy Record Label */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#8C6F19] to-[#4A0E17] border-2 border-[#F2D06B] flex flex-col items-center justify-center p-1.5 text-center shadow-lg relative">
          
          <Disc className="w-3.5 h-3.5 text-[#120A06] mb-0.5" />
          
          <span className="font-cinzel text-[7.5px] font-bold text-[#120A06] uppercase tracking-tighter leading-none">
            HIS MASTER'S VOICE
          </span>
          
          <span className="font-hindi text-[7px] text-[#120A06] font-semibold mt-0.5 leading-none">
            आकाशवाणी
          </span>

          <span className="font-mono text-[6.5px] text-[#120A06]/90 mt-0.5">
            78 R.P.M.
          </span>

          {/* Center Spindle Hole */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#120A06] border border-[#F2D06B] mt-1 shadow-inner" />
        </div>
      </div>

      {/* Pivoting Tonearm with Needle */}
      <div 
        className={`absolute -top-2 right-2 w-14 h-24 origin-top-right transition-transform duration-1000 ease-out pointer-events-none z-10 ${
          isPlaying ? 'rotate-18' : '-rotate-12'
        }`}
      >
        {/* Arm Base / Pivot Pivot */}
        <div className="absolute top-0 right-0 w-5 h-5 rounded-full bg-gradient-to-b from-[#D4AF37] to-[#5C450E] border border-[#F2D06B] shadow-md" />
        
        {/* Curved Metal Arm Rod */}
        <div className="w-1.5 h-20 bg-gradient-to-b from-[#F2D06B] via-[#D4AF37] to-[#8C6F19] rounded-full mx-auto shadow-md" />
        
        {/* Tonearm Cartridge & Stylus Head */}
        <div className="w-3.5 h-4 bg-[#2A1810] border border-[#F2D06B] rounded-sm mx-auto -mt-1 shadow-md flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-red-500 shadow-[0_0_4px_red]" />
        </div>
      </div>

    </div>
  );
}
