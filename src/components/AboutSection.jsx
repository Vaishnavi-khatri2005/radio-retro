import React from 'react';
import { Sparkles, Film, Radio, Music, Award } from 'lucide-react';

export default function AboutSection() {
  const legends = [
    { 
      name: "जगजीत सिंह (Jagjit Singh)", 
      title: "ग़ज़ल सम्राट • The Ghazal King", 
      desc: "कैफ़ी आज़मी और निदा फ़ाज़ली की रूहानी शायरी को जब जगजीत जी की पुरकशिश आवाज़ मिली, तो हर धड़कन ग़ज़ल बन गई।" 
    },
    { 
      name: "किशोर कुमार (Kishore Kumar)", 
      title: "अमर फनकार • The Genius", 
      desc: "रोमांस, मस्ती, याराना और उदासी—किशोर दा ने हर जज़्बात को एक ऐसा सुर दिया जो आज भी हर महफ़िल की जान है।" 
    },
    { 
      name: "लता मंगेशकर (Lata Mangeshkar)", 
      title: "स्वर कोकिला • Voice of the Millennium", 
      desc: "सात दशकों तक भारतीय सिनेमा के हर सुख-दुख को अपनी पावन आवाज़ देने वाली माँ सरस्वती की साक्षात साधिका।" 
    },
    { 
      name: "मोहम्मद रफ़ी (Mohammed Rafi)", 
      title: "सुरों के शहंशाह • The Golden Voice", 
      desc: "चाहे शास्त्रीय राग हो, कव्वाली हो, देशभक्ति का जज़्बा हो या महबूब की तारीफ़—रफ़ी साहब की आवाज़ में खुदा की रहमत थी।" 
    },
    { 
      name: "मुकेश (Mukesh)", 
      title: "सोज-ए-दिल • Voice of Soul", 
      desc: "राज कपूर का अक्स और ज़िंदगी के फलसफे को बयां करने वाली सबसे सादा, मगर सबसे गहरी आवाज़।" 
    },
    { 
      name: "आर.डी. बर्मन (R.D. Burman - Pancham Da)", 
      title: "धुन के जादूगर • Rhythm Innovator", 
      desc: "बॉन्गो, ब्रास और वेस्टर्न बीट्स के साथ हिंदुस्तानी रागों का ऐसा अनोखा जादू, जिसने संगीत की परिभाषा बदल दी।" 
    }
  ];

  return (
    <section id="about" className="py-16 px-4 max-w-5xl mx-auto">
      
      {/* Decorative Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF37]/30 bg-[#1B1009]/80 text-xs text-[#D4AF37] uppercase tracking-[0.2em] mb-4 font-hindi">
          <Film className="w-3.5 h-3.5" />
          <span>हिन्दी सिनेमा का सुनहरा दौर • 1950 - 1980</span>
        </div>
        <h2 className="font-yatra text-3xl sm:text-5xl text-[#FBF6EB] mb-3">
          जहाँ हर सुर एक अमर दास्तां था
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-4" />
        <p className="font-hindi text-sm sm:text-base text-[#D1C4AD]/80 max-w-2xl mx-auto leading-relaxed">
          न कोई ऑटो-ट्यून, न कोई डिजिटल शोर। 100 साज़िंदों का लाइव ऑर्केस्ट्रा, महलों जैसे स्टूडियो, 
          और साहिर, मजरूह, शैलेंद्र व कैफ़ी आज़मी के वो अल्फाज़ जो सदियों की तन्हाई मिटा देते थे।
        </p>
      </div>

      {/* Legends Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
        {legends.map((item, idx) => (
          <div 
            key={idx}
            className="p-5 rounded-2xl bg-gradient-to-b from-[#24150E]/85 via-[#1B1009]/90 to-[#120A06] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all hover:scale-[1.02] shadow-[0_10px_30px_rgba(0,0,0,0.5)] group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-full bg-[#4A0E17]/70 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#120A06] transition-colors">
                <Music className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37]/60 border border-[#D4AF37]/20 px-2 py-0.5 rounded">
                विंटेज लीजेंड
              </span>
            </div>
            
            <h3 className="font-hindi font-bold text-base sm:text-lg text-[#FBF6EB] group-hover:text-[#F2D06B] transition-colors">
              {item.name}
            </h3>
            
            <span className="text-[11px] text-[#D4AF37] block mt-0.5 mb-2 font-hindi">
              {item.title}
            </span>
            
            <p className="text-xs text-[#D1C4AD]/75 leading-relaxed font-hindi">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Iconic Bollywood Film Shayari Quote Banner */}
      <div className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-[#24150E] via-[#4A0E17]/50 to-[#1B1009] border border-[#D4AF37]/35 text-center overflow-hidden">
        <Sparkles className="w-5 h-5 text-[#D4AF37]/40 absolute top-4 left-6" />
        <Sparkles className="w-5 h-5 text-[#D4AF37]/40 absolute bottom-4 right-6" />
        
        <p className="font-hindi text-lg sm:text-2xl text-[#FBF6EB] max-w-2xl mx-auto leading-relaxed">
          "तुम इतना जो मुस्कुरा रहे हो, क्या ग़म है जिसको छुपा रहे हो..."
        </p>
        <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] mt-3 font-hindi">
          — कैफ़ी आज़मी • फ़िल्म: अर्थ (1982) • स्वर: जगजीत सिंह
        </p>
      </div>

    </section>
  );
}
