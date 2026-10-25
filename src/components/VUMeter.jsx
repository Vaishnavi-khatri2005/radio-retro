import React, { useEffect, useState } from 'react';

export default function VUMeter({ isPlaying }) {
  const [needleAngle, setNeedleAngle] = useState(-42); // Resting at -20dB

  useEffect(() => {
    let animFrame;
    let targetAngle = -42;
    let currentAngle = -42;

    if (!isPlaying) {
      setNeedleAngle(-42);
      return;
    }

    const updateNeedle = () => {
      // Generate rhythmic analog bounce with random fluctuations
      const basePulse = Math.sin(Date.now() / 160) * 18;
      const beatKick = Math.sin(Date.now() / 420) * 15;
      const jitter = (Math.random() - 0.5) * 8;
      
      // Calculate angle between -35 (low) to +28 (high/peak)
      targetAngle = Math.min(32, Math.max(-38, -5 + basePulse + beatKick + jitter));

      // Smooth mechanical needle inertia
      currentAngle += (targetAngle - currentAngle) * 0.35;
      setNeedleAngle(currentAngle);

      animFrame = requestAnimationFrame(updateNeedle);
    };

    animFrame = requestAnimationFrame(updateNeedle);

    return () => cancelAnimationFrame(animFrame);
  }, [isPlaying]);

  return (
    <div className="relative w-36 sm:w-44 h-24 rounded-lg p-1.5 bg-gradient-to-b from-[#2A1810] to-[#120A06] border border-[#D4AF37]/50 shadow-[0_4px_15px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.1)] select-none">
      
      {/* Backlit Meter Face (Warm Amber Glow when playing) */}
      <div 
        className={`w-full h-full rounded bg-gradient-to-b from-[#F7E7C4] to-[#DFCEAA] p-1.5 relative overflow-hidden transition-all duration-700 ${
          isPlaying ? 'shadow-[inset_0_0_15px_rgba(212,175,55,0.8),0_0_10px_rgba(212,175,55,0.3)]' : 'opacity-75'
        }`}
      >
        {/* Arc Scale Graphic */}
        <svg viewBox="0 0 160 80" className="w-full h-full">
          {/* Black Normal Scale Arc */}
          <path
            d="M 20 65 A 65 65 0 0 1 115 22"
            fill="none"
            stroke="#1b120c"
            strokeWidth="1.5"
          />
          {/* Red Peak Danger Arc */}
          <path
            d="M 115 22 A 65 65 0 0 1 142 32"
            fill="none"
            stroke="#b91c1c"
            strokeWidth="2.5"
          />

          {/* Scale Markings */}
          <text x="18" y="72" fontSize="6" fontFamily="monospace" fill="#2A1810" fontWeight="bold">-20</text>
          <text x="36" y="52" fontSize="6" fontFamily="monospace" fill="#2A1810">-10</text>
          <text x="62" y="38" fontSize="6" fontFamily="monospace" fill="#2A1810">-5</text>
          <text x="88" y="32" fontSize="6" fontFamily="monospace" fill="#2A1810">-3</text>
          <text x="110" y="32" fontSize="7" fontFamily="monospace" fill="#1b120c" fontWeight="bold">0</text>
          <text x="124" y="35" fontSize="6" fontFamily="monospace" fill="#b91c1c" fontWeight="bold">+1</text>
          <text x="136" y="44" fontSize="6" fontFamily="monospace" fill="#b91c1c" fontWeight="bold">+3</text>

          {/* VU Header Text */}
          <text x="80" y="48" fontSize="10" fontFamily="'Cinzel', serif" fill="#1b120c" textAnchor="middle" fontWeight="bold" letterSpacing="1">
            VU
          </text>
          <text x="80" y="56" fontSize="4.5" fontFamily="sans-serif" fill="#66503b" textAnchor="middle" letterSpacing="0.5">
            VOLUME UNIT • BHARAT
          </text>

          {/* The Mechanical Needle */}
          <g transform={`rotate(${needleAngle}, 80, 85)`} className="transition-transform duration-75">
            {/* Needle Line */}
            <line x1="80" y1="85" x2="80" y2="15" stroke="#120A06" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="80" y1="20" x2="80" y2="14" stroke="#b91c1c" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Pivot Pivot Cap */}
          <circle cx="80" cy="82" r="10" fill="#1b120c" stroke="#D4AF37" strokeWidth="1" />
          <circle cx="80" cy="82" r="3" fill="#D4AF37" />
        </svg>

        {/* Meter Glass Bezel Reflection */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10 pointer-events-none rounded" />
      </div>

      {/* Brass Label under meter */}
      <div className="text-center mt-1">
        <span className="text-[8px] font-mono tracking-widest text-[#D4AF37]/80 uppercase">
          AUDIO SIGNAL LEVEL
        </span>
      </div>

    </div>
  );
}
