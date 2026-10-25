import React, { useState, useEffect } from 'react';
import { Feather, Ticket, Sparkles, Mail, Disc } from 'lucide-react';

export default function VintageLettersSection({ onSelectTrack }) {
  const letters = [
    {
      writer: "कैफ़ी आज़मी (Kaifi Azmi)",
      film: "अर्थ (Arth, 1982)",
      song: "तुम इतना जो मुस्कुरा रहे हो",
      trackIndex: 0,
      quote: "तुम इतना जो मुस्कुरा रहे हो, क्या ग़म है जिसको छुपा रहे हो? आँखों में नमी, हँसी लबों पर, क्या हाल है दिल का सुना रहे हो...",
      postmark: "G.P.O. BOMBAY • 14 OCT 1982",
      postagePrice: "25 PAISE"
    },
    {
      writer: "साहिर लुधियानवी (Sahir Ludhianvi)",
      film: "हमराज़ (Hamraaz, 1967)",
      song: "तुम अगर साथ देने का वादा करो",
      trackIndex: 2,
      quote: "तुम अगर साथ देने का वादा करो, मैं यूँ ही मस्त नगमे लुटाता रहूँ। तुम मुझे देख कर मुस्कुराती रहो, मैं तुम्हारे लिए गीत गाता रहूँ...",
      postmark: "CALCUTTA G.P.O. • 22 MAR 1967",
      postagePrice: "15 PAISE"
    },
    {
      writer: "आनंद बख्शी (Anand Bakshi)",
      film: "बालिका बधू (Balika Badhu, 1976)",
      song: "बड़े अच्छे लगते हैं",
      trackIndex: 3,
      quote: "बड़े अच्छे लगते हैं, ये धरती, ये नदियाँ, ये रैना... और तुम। हम-तुम कितने पास हैं कितने दूर हैं चाँद-सितारे...",
      postmark: "NEW DELHI • 09 AUG 1976",
      postagePrice: "20 PAISE"
    },
    {
      writer: "इंदीवर (Indeevar)",
      film: "धर्मात्मा (Dharmatma, 1975)",
      song: "क्या खूब लगती हो",
      trackIndex: 4,
      quote: "क्या खूब लगती हो, बड़ी सुंदर दिखती हो। फिर से कहो, कहते रहो, अच्छा लगता है। जीवन का हर सपना अब सच्चा लगता है...",
      postmark: "LUCKNOW • 17 NOV 1975",
      postagePrice: "20 PAISE"
    }
  ];

  const [activeLetterIdx, setActiveLetterIdx] = useState(0);
  const [displayedQuote, setDisplayedQuote] = useState('');

  // Subtle typewriter effect for the active letter
  useEffect(() => {
    const fullText = letters[activeLetterIdx].quote;
    let charIdx = 0;
    setDisplayedQuote('');

    const interval = setInterval(() => {
      if (charIdx < fullText.length) {
        setDisplayedQuote(fullText.slice(0, charIdx + 1));
        charIdx++;
      } else {
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [activeLetterIdx]);

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto select-none">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF37]/30 bg-[#1B1009]/80 text-xs text-[#D4AF37] uppercase tracking-[0.2em] mb-4 font-hindi">
          <Feather className="w-3.5 h-3.5" />
          <span>पुरानी डायरी और अंतर्देशीय पत्र (Vintage Letters & Tickets)</span>
        </div>
        <h2 className="font-yatra text-3xl sm:text-5xl text-[#FBF6EB] mb-2">
          स्याही, शायरी और सुनहरी यादें
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-3" />
        <p className="font-hindi text-sm text-[#D1C4AD]/80 max-w-xl mx-auto">
          उस दौर के ख़त जिनमें खुशबू होती थी, और सिनेमा के वो टिकट जो डायरी के पन्नों में सहेजे जाते थे।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Aged Inland Letter / Postcard with Typewriter Quote */}
        <div className="lg:col-span-8">
          
          {/* Aged Letter Container */}
          <div className="relative rounded-2xl p-6 sm:p-10 bg-gradient-to-b from-[#F7E7C4] via-[#EFE3C3] to-[#DFCEAA] text-[#22140D] border-2 border-[#D4AF37]/60 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden">
            
            {/* Burnt / Stained Paper Edges Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(92,53,24,0.35)_100%)] pointer-events-none" />

            {/* Top Postmark and Vintage Stamp */}
            <div className="flex items-start justify-between border-b-2 border-[#8C6F19]/30 pb-4 mb-6">
              
              {/* Circular Postal Postmark Cancel Stamp */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-dashed border-[#5C3518] flex flex-col items-center justify-center p-1 text-center -rotate-6 opacity-85 shadow-sm">
                  <span className="text-[7.5px] sm:text-[8px] font-mono font-bold leading-none uppercase text-[#4A2610]">
                    {letters[activeLetterIdx].postmark.split('•')[0]}
                  </span>
                  <div className="w-8 h-0.5 bg-[#5C3518] my-0.5" />
                  <span className="text-[7px] font-mono leading-none text-[#5C3518]">
                    POSTED 1970s
                  </span>
                </div>

                <div>
                  <span className="font-cinzel text-xs font-bold tracking-widest text-[#4A2610] uppercase block">
                    INDIA POSTAGE • अंतर्देशीय पत्र
                  </span>
                  <span className="font-mono text-[10px] text-[#5C3518]/70">
                    {letters[activeLetterIdx].postmark}
                  </span>
                </div>
              </div>

              {/* Vintage Indian Postage Stamp Graphic */}
              <div className="relative w-14 h-16 sm:w-16 sm:h-20 rounded bg-gradient-to-br from-[#8C1D2A] to-[#4A0E17] border-2 border-white/60 p-1 flex flex-col items-center justify-between text-white text-center shadow-md rotate-3">
                <span className="text-[7px] font-mono tracking-tighter uppercase">BHARAT भारत</span>
                <Disc className="w-5 h-5 text-[#F2D06B] animate-spin-slow" />
                <span className="text-[8px] font-mono font-bold text-[#F2D06B]">
                  {letters[activeLetterIdx].postagePrice}
                </span>
                {/* Perforated edge marks */}
                <div className="absolute -top-1 left-0 right-0 flex justify-between px-1">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-[#EFE3C3] rounded-full" />
                  ))}
                </div>
              </div>

            </div>

            {/* Letter Body - Subtle Typewriter Effect */}
            <div className="min-h-[140px] sm:min-h-[160px]">
              <p className="font-hindi text-base sm:text-2xl text-[#1E100A] leading-relaxed font-medium">
                "{displayedQuote}"
                <span className="inline-block w-2 h-5 bg-[#4A2610] ml-1 animate-pulse align-middle" />
              </p>
            </div>

            {/* Letter Sign-off Footer */}
            <div className="mt-8 pt-4 border-t-2 border-[#8C6F19]/30 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="font-hindi text-xs sm:text-sm text-[#4A2610] font-bold block">
                  — {letters[activeLetterIdx].writer}
                </span>
                <span className="font-hindi text-xs text-[#5C3518]/80">
                  फ़िल्म: {letters[activeLetterIdx].film} • गीत: {letters[activeLetterIdx].song}
                </span>
              </div>

              {/* Direct Play This Melody Button */}
              <button
                onClick={() => onSelectTrack(letters[activeLetterIdx].trackIndex)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3B1E10] text-[#FBF6EB] hover:bg-[#D4AF37] hover:text-[#120A06] transition-all text-xs font-hindi font-medium shadow-md cursor-pointer"
              >
                <Disc className="w-3.5 h-3.5" />
                <span>यह गीत रेडियो पर बजाएं (Play)</span>
              </button>
            </div>

            {/* Letter Selector Tabs */}
            <div className="flex items-center justify-center gap-2 mt-6 pt-2">
              {letters.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveLetterIdx(i)}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    activeLetterIdx === i ? 'bg-[#4A2610] w-6' : 'bg-[#8C6F19]/40 hover:bg-[#8C6F19]'
                  }`}
                  title={`View letter ${i + 1}`}
                />
              ))}
            </div>

          </div>

        </div>

        {/* Right: Vintage Cinema Balcony Tickets & Radio Badge */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Vintage Minerva Talkies Cinema Ticket */}
          <div className="relative rounded-xl p-5 bg-gradient-to-r from-[#D97706]/20 via-[#B45309]/30 to-[#D97706]/20 border-2 border-dashed border-[#D4AF37]/60 backdrop-blur-md shadow-xl select-none">
            
            {/* Cutout Notches on ticket sides */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#120A06] border-r-2 border-[#D4AF37]/60" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#120A06] border-l-2 border-[#D4AF37]/60" />

            <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-2 mb-3">
              <span className="font-cinzel text-xs font-bold text-[#F2D06B] tracking-widest uppercase">
                MINERVA TALKIES, BOMBAY
              </span>
              <span className="font-mono text-[10px] text-[#D1C4AD]">№ 04821</span>
            </div>

            <div className="text-center py-2">
              <h4 className="font-yatra text-xl text-[#FBF6EB]">
                बालकनी टिकट (BALCONY)
              </h4>
              <p className="font-hindi text-xs text-[#F2D06B] mt-1">
                शो समय: सायं 6:30 बजे • 70mm स्टीरियोफोनिक साउंड
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-[#D4AF37]/30 pt-2.5 mt-3 text-[11px] font-mono text-[#D4AF37]">
              <span>दर: रु. 2.75 मात्र</span>
              <span className="font-hindi">सदाबहार सिनेमा</span>
            </div>

          </div>

          {/* Authentic Vintage Radio Brass Badge */}
          <div className="rounded-xl p-5 bg-gradient-to-b from-[#24150E] to-[#120A06] border border-[#D4AF37]/40 shadow-lg text-center">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#4A0E17]/60 border border-[#D4AF37]/30 text-[10px] font-mono text-[#F2D06B] uppercase mb-2">
              <Sparkles className="w-3 h-3" />
              <span>MURPHY RADIO • MADE IN BHARAT</span>
            </div>

            <h5 className="font-cinzel text-base font-bold text-[#FBF6EB] tracking-wider">
              VALVE CHASSIS 1974
            </h5>
            
            <p className="font-hindi text-xs text-[#D1C4AD]/70 mt-1 leading-relaxed">
              "आकाशवाणी विविध भारती और रेडियो सिलोन के अमर प्रसारण के लिए विशेष रूप से ट्यून्ड।"
            </p>

            <div className="mt-3 flex justify-center gap-1.5 text-[9px] font-mono text-[#D4AF37]/80">
              <span className="px-2 py-0.5 rounded bg-[#1B1009] border border-[#D4AF37]/20">5 VALVES</span>
              <span className="px-2 py-0.5 rounded bg-[#1B1009] border border-[#D4AF37]/20">3 BANDS</span>
              <span className="px-2 py-0.5 rounded bg-[#1B1009] border border-[#D4AF37]/20">78 RPM</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
