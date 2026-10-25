import React, { useState, useEffect } from 'react';
import { Film, FastForward, Sparkles } from 'lucide-react';

export default function FilmProjectorIntro({ onComplete }) {
  const [countdown, setCountdown] = useState(3);
  const [showCertificate, setShowCertificate] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if intro was already seen in this session
    const seen = sessionStorage.getItem('radio_retro_intro_seen');
    if (seen === 'true') {
      setDismissed(true);
      if (onComplete) onComplete();
      return;
    }

    // Step 1: Countdown 3, 2, 1
    const timer3 = setTimeout(() => setCountdown(2), 900);
    const timer2 = setTimeout(() => setCountdown(1), 1800);
    const timer1 = setTimeout(() => {
      setCountdown(0);
      setShowCertificate(true);
    }, 2700);

    // Step 2: Auto fade-out after certificate preview
    const autoFinish = setTimeout(() => {
      handleSkip();
    }, 4500);

    return () => {
      clearTimeout(timer3);
      clearTimeout(timer2);
      clearTimeout(timer1);
      clearTimeout(autoFinish);
    };
  }, []);

  const handleSkip = () => {
    sessionStorage.setItem('radio_retro_intro_seen', 'true');
    setDismissed(true);
    if (onComplete) onComplete();
  };

  if (dismissed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0704] text-[#FBF6EB] select-none overflow-hidden transition-opacity duration-700 animate-fadeIn">
      
      {/* Vintage Projector Screen Grain & Flicker */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-25 pointer-events-none film-grain" />

      {/* Subtle Projector Beam Flicker */}
      <div className="absolute inset-0 bg-amber-500/5 mix-blend-screen pointer-events-none animate-pulse" />

      {/* Skip Button - ALWAYS PROMINENT AND INSTANT */}
      <div className="absolute top-6 right-6 z-30">
        <button
          onClick={handleSkip}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B1009]/90 border border-[#D4AF37]/50 text-[#F2D06B] hover:bg-[#D4AF37] hover:text-[#120A06] transition-all text-xs tracking-widest uppercase font-mono shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer"
        >
          <span>सीधे रेडियो पर जाएं (Skip Intro)</span>
          <FastForward className="w-4 h-4" />
        </button>
      </div>

      {/* Step 1: Vintage Film Leader Countdown (3, 2, 1) */}
      {!showCertificate && countdown > 0 && (
        <div className="relative flex flex-col items-center justify-center">
          
          {/* Outer Rotating Film Gate Target */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-4 border-[#D4AF37]/40 flex items-center justify-center">
            
            {/* Crosshairs */}
            <div className="absolute w-full h-0.5 bg-[#D4AF37]/30" />
            <div className="absolute h-full w-0.5 bg-[#D4AF37]/30" />

            {/* Inner Ring */}
            <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-dashed border-[#F2D06B]/50 flex items-center justify-center relative">
              
              {/* Rotating Projector Clock Hand */}
              <div 
                className="absolute inset-0 rounded-full border-t-4 border-[#D4AF37] animate-spin" 
                style={{ animationDuration: '0.9s' }}
              />

              {/* The Countdown Number */}
              <span className="font-serif text-8xl sm:text-9xl font-bold text-[#F2D06B] font-cinzel drop-shadow-[0_0_25px_rgba(212,175,55,0.6)]">
                {countdown}
              </span>
            </div>
          </div>

          <p className="mt-6 font-mono text-xs text-[#D1C4AD]/60 tracking-[0.3em] uppercase">
            35mm Eastman Color • Film Leader
          </p>
        </div>
      )}

      {/* Step 2: Vintage Censor Certificate (केंद्रीय फिल्म प्रमाण बोर्ड) */}
      {showCertificate && (
        <div className="relative max-w-xl mx-4 p-6 sm:p-8 rounded-xl bg-gradient-to-b from-[#24150E] via-[#1B1009] to-[#120A06] border-2 border-[#D4AF37]/60 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-center animate-scaleIn">
          
          {/* Certificate Header Emblem */}
          <div className="inline-flex items-center gap-2 mb-3">
            <Film className="w-5 h-5 text-[#D4AF37]" />
            <span className="font-yatra text-sm text-[#F2D06B] tracking-wider">
              केंद्रीय फिल्म प्रमाण बोर्ड • CENTRAL BOARD OF FILM CERTIFICATION
            </span>
          </div>

          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-3" />

          {/* Large 'अ' / 'U' Universal Certificate Badge */}
          <div className="my-4 inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-[#D4AF37] bg-[#4A0E17]/60 text-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            <span className="font-yatra text-4xl text-[#F2D06B] leading-none">अ</span>
          </div>

          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FBF6EB] tracking-widest uppercase">
            RADIO RETRO • आकाशवाणी
          </h3>
          <p className="text-xs text-[#D4AF37] font-hindi mt-1">
            प्रमाण पत्र संख्या: बी-1972/08 • सर्वसाधारण के लिए (Universal Exhibition)
          </p>

          <p className="font-hindi text-sm text-[#EAE0CC]/80 mt-4 leading-relaxed max-w-md mx-auto">
            "भारतीय सिनेमा के सुनहरे दौर के 71 अमर नगमे—श्रोताओं की रूह में उतरने के लिए प्रमाणित।"
          </p>

          {/* Quick Start CTA */}
          <div className="mt-6">
            <button
              onClick={handleSkip}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#8C6F19] text-[#120A06] font-hindi font-bold text-sm tracking-wider shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>सिनेमा शुरू करें (Enter Cinema)</span>
              <Sparkles className="w-4 h-4 fill-current" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
