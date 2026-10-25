import React, { useState } from 'react';
import { X, Search, Play, Disc3, Radio, Music2 } from 'lucide-react';
import { RETRO_TRACKS } from '../data/playlist';

export default function PlaylistDrawer({
  isOpen,
  onClose,
  currentTrack,
  onSelectTrack,
  isPlaying
}) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredTracks = RETRO_TRACKS.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.fullTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md transition-opacity">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#24150E] via-[#1B1009] to-[#120A06] h-full shadow-[0_0_50px_rgba(0,0,0,0.9)] border-l border-[#D4AF37]/30 flex flex-col z-10">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#D4AF37]/20 flex items-center justify-between bg-[#1B1009]/90">
          <div className="flex items-center gap-3">
            <Radio className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <h2 className="font-yatra text-lg text-[#FBF6EB] tracking-wide">
                अमर गीतों का ख़ज़ाना
              </h2>
              <p className="text-[11px] text-[#D1C4AD]/70 font-hindi">
                71 सदाबहार नगमे • आकाशवाणी विविध भारती
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#D1C4AD] hover:text-[#D4AF37] hover:bg-[#4A0E17]/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-[#D4AF37]/10 bg-[#120A06]/60">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37]/60" />
            <input
              type="text"
              placeholder="गीत या गायक खोजें (उदा: जगजीत, किशोर, रफ़ी, लता)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#1B1009] border border-[#D4AF37]/30 rounded-lg text-sm text-[#FBF6EB] placeholder-[#D1C4AD]/40 focus:outline-none focus:border-[#D4AF37] transition-colors font-hindi"
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-[11px] text-[#D1C4AD]/60 font-hindi">
            <span>कुल उपलब्ध: {filteredTracks.length} / {RETRO_TRACKS.length} नगमे</span>
            <span className="italic text-[#D4AF37]">स्थिर प्लेलिस्ट (Fixed YouTube Broadcast)</span>
          </div>
        </div>

        {/* Track List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredTracks.length === 0 ? (
            <div className="text-center py-12 text-[#D1C4AD]/60 font-hindi">
              <Music2 className="w-8 h-8 mx-auto mb-2 text-[#D4AF37]/40" />
              <p className="text-sm">कोई गीत नहीं मिला। कृपया दूसरा नाम खोजें।</p>
            </div>
          ) : (
            filteredTracks.map((track) => {
              const isCurrent = currentTrack && (currentTrack.id === track.id || currentTrack.index === track.index);
              return (
                <div
                  key={track.id + '-' + track.index}
                  onClick={() => {
                    onSelectTrack(track.index);
                    onClose();
                  }}
                  className={`group flex items-center gap-3.5 p-2.5 rounded-xl cursor-pointer transition-all border ${
                    isCurrent
                      ? 'bg-gradient-to-r from-[#4A0E17]/90 to-[#1B1009] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                      : 'bg-[#1B1009]/60 border-transparent hover:border-[#D4AF37]/40 hover:bg-[#29180E]/70'
                  }`}
                >
                  {/* Track Index or Play Icon */}
                  <div className="w-8 flex items-center justify-center shrink-0">
                    {isCurrent ? (
                      isPlaying ? (
                        <div className="flex items-end gap-0.5 h-4">
                          <span className="w-0.5 bg-[#D4AF37] animate-eq-1" />
                          <span className="w-0.5 bg-[#D4AF37] animate-eq-2" />
                          <span className="w-0.5 bg-[#D4AF37] animate-eq-3" />
                        </div>
                      ) : (
                        <Disc3 className="w-4 h-4 text-[#D4AF37]" />
                      )
                    ) : (
                      <span className="text-xs font-mono text-[#D1C4AD]/40 group-hover:hidden">
                        {String(track.index + 1).padStart(2, '0')}
                      </span>
                    )}
                    <Play className="w-3.5 h-3.5 text-[#D4AF37] fill-current hidden group-hover:block" />
                  </div>

                  {/* Thumbnail */}
                  <div className="relative w-14 h-10 rounded-md overflow-hidden bg-black shrink-0 border border-[#D4AF37]/20">
                    <img
                      src={track.thumbnail}
                      alt={track.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  </div>

                  {/* Metadata */}
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm truncate font-hindi ${
                      isCurrent ? 'text-[#F2D06B] font-semibold' : 'text-[#FBF6EB] group-hover:text-[#F2D06B]'
                    }`}>
                      {track.title}
                    </h4>
                    <p className="text-xs text-[#D1C4AD]/60 truncate mt-0.5 font-hindi">
                      {track.artist}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer Notice */}
        <div className="p-4 border-t border-[#D4AF37]/20 bg-[#1B1009]/90 text-center font-hindi text-[11px] text-[#D1C4AD]/60">
          आकाशवाणी विविध भारती प्रसारण • रेडियो रेट्रो स्पेशल
        </div>

      </div>
    </div>
  );
}
