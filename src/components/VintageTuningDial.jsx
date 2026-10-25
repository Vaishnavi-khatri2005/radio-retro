import React from 'react';
import { RETRO_TRACKS } from '../data/playlist';

export default function VintageTuningDial({ currentTrack, onTuneTrack, isPlaying }) {
  // Calculate needle position based on currentTrack index (0 to RETRO_TRACKS.length - 1)
  const total = RETRO_TRACKS.length || 71;
  const currentIndex = currentTrack ? currentTrack.index : 0;
  // Percentage from 5% to 95%
  const needlePercent = 5 + (currentIndex / (total - 1)) * 90;

  // Handle clicking anywhere on the dial scale to tune to nearest song
  const handleDialClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetIdx = Math.round(ratio * (total - 1));
    if (onTuneTrack) {
      onTuneTrack(targetIdx);
    }
  };

  return (
    <div className="w-full relative my-3 select-none">
      
      {/* Dial Bezel & Frame */}
      <div className="relative rounded-xl p-2 bg-gradient-to-b from-[#2E1810] via-[#1B1009] to-[#120A06] border-2 border-[#D4AF37]/40 shadow-[0_5px_20px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(212,175,55,0.3)]">
        
        {/* Glass Window with Warm Amber Backlight */}
        <div 
          onClick={handleDialClick}
          className={`h-20 sm:h-24 w-full rounded-lg bg-gradient-to-b from-[#1C1008] via-[#2A180E] to-[#120A06] border border-[#D4AF37]/30 relative overflow-hidden cursor-pointer transition-all duration-700 ${
            isPlaying ? 'shadow-[inset_0_0_25px_rgba(212,175,55,0.4),0_0_15px_rgba(212,175,55,0.2)]' : ''
          }`}
          title="Click along the tuning scale to tune to any classic song"
        >
          {/* Subtle Warm Amber Dial Light Glow */}
          <div 
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#F2D06B]/15 to-transparent transition-opacity duration-1000 ${
              isPlaying ? 'opacity-100' : 'opacity-30'
            }`} 
          />

          {/* Medium Wave (MW) Scale */}
          <div className="absolute top-2 left-3 right-3 flex items-center justify-between text-[9px] sm:text-[11px] font-mono text-[#D4AF37] font-semibold border-b border-[#D4AF37]/25 pb-1">
            <span className="font-hindi text-[10px] text-[#F2D06B]">MW मध्यम तरंग</span>
            <span>550</span>
            <span>600</span>
            <span className="text-[#F2D06B] font-bold underline decoration-amber-400">800 विविध भारती</span>
            <span>1000</span>
            <span className="text-[#F2D06B] font-bold">1200 रेडियो सिलोन</span>
            <span>1400</span>
            <span>1600 kHz</span>
          </div>

          {/* Short Wave (SW) Stations Scale */}
          <div className="absolute top-10 left-3 right-3 flex items-center justify-between text-[8px] sm:text-[10px] font-mono text-[#D1C4AD]/60">
            <span className="font-hindi text-[9px] text-[#D4AF37]">SW लघु तरंग</span>
            <span>19m</span>
            <span>25m</span>
            <span className="text-[#F2D06B] font-medium">31m आकाशवाणी (AIR)</span>
            <span>41m</span>
            <span>49m</span>
          </div>

          {/* Subtle Frequency Scale Tick Marks */}
          <div className="absolute bottom-2 left-4 right-4 flex justify-between items-end h-3 opacity-40">
            {[...Array(35)].map((_, i) => (
              <span
                key={i}
                className={`w-0.5 bg-[#D4AF37] ${i % 5 === 0 ? 'h-3' : 'h-1.5'}`}
              />
            ))}
          </div>

          {/* Animated Tuning Needle (Vertical bright amber pointer with shadow) */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#F2D06B] via-red-500 to-[#F2D06B] shadow-[0_0_8px_#F2D06B,0_0_15px_red] transition-all duration-500 pointer-events-none"
            style={{ left: `${needlePercent}%` }}
          >
            {/* Top Needle Pip */}
            <div className="w-2.5 h-2.5 -ml-[3px] bg-red-600 border border-[#F2D06B] rounded-full shadow-md" />
          </div>

          {/* Glass Specular Reflection Highlight */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />

        </div>

        {/* Dial Footer Info */}
        <div className="flex items-center justify-between mt-1.5 px-2 text-[9px] sm:text-[10px] text-[#D1C4AD]/60 font-hindi">
          <span>📻 सुई पर क्लिक करके कोई भी स्टेशन ट्यून करें (Click to Tune)</span>
          <span className="font-mono text-[#D4AF37]">
            {currentTrack ? `STATION № ${String(currentTrack.index + 1).padStart(2, '0')}` : 'AM 800 kHz'}
          </span>
        </div>

      </div>

    </div>
  );
}
