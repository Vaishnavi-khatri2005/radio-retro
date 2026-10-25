import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Tv, 
  Disc, 
  ListMusic, 
  AlertCircle,
  Shuffle,
  Radio,
  Sparkles,
  Power
} from 'lucide-react';
import { PLAYLIST_ID, RETRO_TRACKS } from '../data/playlist';
import VUMeter from './VUMeter';
import VintageTuningDial from './VintageTuningDial';
import VinylTurntable from './VinylTurntable';

export default function RetroPlayer({
  isPlaying,
  setIsPlaying,
  currentTrack,
  setCurrentTrack,
  onOpenPlaylist,
  playerControlsRef
}) {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(300);
  const [volume, setVolume] = useState(85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackError, setPlaybackError] = useState(null);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [activeMood, setActiveMood] = useState(null);
  const [activeDeck, setActiveDeck] = useState('vinyl'); // 'vinyl', 'cassette', 'tv'
  const [radioPowerGlow, setRadioPowerGlow] = useState(false);

  const iframeRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const progressTimerRef = useRef(null);

  // Curated Hindi Mood Shortcuts within the fixed playlist
  const hindiMoods = [
    { label: "दर्द और ग़ज़ल", sub: "Ghazals", trackIndex: 0, icon: "🌙", song: "तुम इतना जो मुस्कुरा रहे हो" },
    { label: "पहला प्यार", sub: "Romance", trackIndex: 1, icon: "💖", song: "तुम को देखा तो ये ख़याल आया" },
    { label: "वादा और उम्मीद", sub: "Soulful", trackIndex: 2, icon: "🤝", song: "तुम अगर साथ देने का वादा करो" },
    { label: "मासूमियत और यादें", sub: "Nostalgia", trackIndex: 3, icon: "✨", song: "बड़े अच्छे लगते हैं" },
    { label: "सदाबहार मस्ती", sub: "Evergreen", trackIndex: 4, icon: "🌹", song: "क्या खूब लगती हो" },
  ];

  // Dispatch command to YouTube
  const sendYTCommand = (func, args = []) => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current[func] === 'function') {
      try {
        ytPlayerRef.current[func](...args);
      } catch (e) {
        console.warn('YT.Player method call fallback:', e);
      }
    }
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: func,
          args: args
        }), '*');
      } catch (e) {
        console.warn('postMessage call fallback:', e);
      }
    }
  };

  // Expose controls to parent App component
  useEffect(() => {
    if (playerControlsRef) {
      playerControlsRef.current = {
        play: () => {
          setIsPlaying(true);
          setHasStarted(true);
          setRadioPowerGlow(true);
          sendYTCommand('playVideo');
        },
        pause: () => {
          setIsPlaying(false);
          sendYTCommand('pauseVideo');
        },
        togglePlay: () => {
          togglePlay();
        },
        loadTrack: (videoId) => {
          setIsPlaying(true);
          setHasStarted(true);
          setRadioPowerGlow(true);
          setCurrentTime(0);
          sendYTCommand('loadVideoById', [videoId]);
          sendYTCommand('playVideo');
        }
      };
    }
  }, [isPlaying, currentTrack]);

  // Listen to postMessage events from YouTube
  useEffect(() => {
    const handleWindowMessage = (event) => {
      try {
        if (!event.data) return;
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data && data.event === 'onStateChange') {
          if (data.info === 1) {
            setIsPlaying(true);
            setIsBuffering(false);
            setPlaybackError(null);
            setRadioPowerGlow(true);
          } else if (data.info === 2) {
            setIsPlaying(false);
            setIsBuffering(false);
          } else if (data.info === 3) {
            setIsBuffering(true);
          } else if (data.info === 0) {
            handleNext();
          }
        }
      } catch (e) {}
    };

    window.addEventListener('message', handleWindowMessage);
    return () => window.removeEventListener('message', handleWindowMessage);
  }, [currentTrack]);

  // Progress Bar timer
  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = setInterval(() => {
        if (ytPlayerRef.current && ytPlayerRef.current.getCurrentTime) {
          try {
            const cur = ytPlayerRef.current.getCurrentTime() || 0;
            const dur = ytPlayerRef.current.getDuration() || 0;
            if (cur > 0) setCurrentTime(cur);
            if (dur > 0) setDuration(dur);
            return;
          } catch (e) {}
        }
        setCurrentTime((prev) => {
          if (prev >= duration) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    }

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying, duration]);

  // Switch on old radio / Toggle Play
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      sendYTCommand('pauseVideo');
    } else {
      setIsPlaying(true);
      setHasStarted(true);
      setRadioPowerGlow(true);
      sendYTCommand('playVideo');
      if (!hasStarted) {
        sendYTCommand('loadVideoById', [currentTrack ? currentTrack.id : RETRO_TRACKS[0].id]);
        sendYTCommand('playVideo');
      }
    }
  };

  // Handle Next Track
  const handleNext = () => {
    let nextIdx = (currentTrack ? currentTrack.index + 1 : 1) % RETRO_TRACKS.length;
    if (isShuffle) {
      nextIdx = Math.floor(Math.random() * RETRO_TRACKS.length);
    }
    const nextSong = RETRO_TRACKS[nextIdx];
    setCurrentTrack(nextSong);
    setIsPlaying(true);
    setHasStarted(true);
    setCurrentTime(0);
    sendYTCommand('loadVideoById', [nextSong.id]);
    sendYTCommand('playVideo');
  };

  // Handle Previous Track
  const handlePrev = () => {
    if (currentTime > 4) {
      setCurrentTime(0);
      sendYTCommand('seekTo', [0, true]);
      return;
    }
    const prevIdx = (currentTrack ? currentTrack.index - 1 + RETRO_TRACKS.length : 0) % RETRO_TRACKS.length;
    const prevSong = RETRO_TRACKS[prevIdx];
    setCurrentTrack(prevSong);
    setIsPlaying(true);
    setHasStarted(true);
    setCurrentTime(0);
    sendYTCommand('loadVideoById', [prevSong.id]);
    sendYTCommand('playVideo');
  };

  // Direct Tuning via Dial
  const handleTuneToTrack = (trackIndex) => {
    const song = RETRO_TRACKS[trackIndex];
    if (song) {
      setCurrentTrack(song);
      setIsPlaying(true);
      setHasStarted(true);
      setCurrentTime(0);
      sendYTCommand('loadVideoById', [song.id]);
      sendYTCommand('playVideo');
    }
  };

  // Handle Seek
  const handleSeek = (e) => {
    const seekSecs = parseFloat(e.target.value);
    setCurrentTime(seekSecs);
    sendYTCommand('seekTo', [seekSecs, true]);
  };

  // Handle Volume Change
  const handleVolumeChange = (e) => {
    const newVol = parseInt(e.target.value, 10);
    setVolume(newVol);
    setIsMuted(newVol === 0);
    sendYTCommand('setVolume', [newVol]);
    if (newVol > 0 && isMuted) {
      sendYTCommand('unMute');
    }
  };

  // Handle Mute Toggle
  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      sendYTCommand('unMute');
      sendYTCommand('setVolume', [volume || 85]);
    } else {
      setIsMuted(true);
      sendYTCommand('mute');
    }
  };

  // Select Mood
  const handleSelectMood = (mood) => {
    setActiveMood(mood.label);
    const track = RETRO_TRACKS[mood.trackIndex];
    if (track) {
      setCurrentTrack(track);
      setIsPlaying(true);
      setHasStarted(true);
      setCurrentTime(0);
      sendYTCommand('loadVideoById', [track.id]);
      sendYTCommand('playVideo');
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const activeVideoId = currentTrack ? currentTrack.id : RETRO_TRACKS[0].id;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 my-8 select-none">
      
      {/* Quick Hindi Mood Chips */}
      <div className="mb-6 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-3 text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-hindi">
          <Sparkles className="w-3.5 h-3.5" />
          <span>सदाबहार मूड चुनें (Choose Retro Mood)</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {hindiMoods.map((m, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectMood(m)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs transition-all border cursor-pointer ${
                activeMood === m.label
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#8C6F19] text-[#120A06] font-semibold border-[#F2D06B] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'bg-[#1B1009]/80 text-[#FBF6EB] border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#29180E]'
              }`}
            >
              <span>{m.icon}</span>
              <span className="font-hindi font-medium">{m.label}</span>
              <span className="text-[10px] opacity-70">({m.sub})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Vintage Wooden Radio Cabinet (Solid Teak & Walnut with Brass Brackets) */}
      <div className="relative rounded-3xl p-2 bg-gradient-to-b from-[#4A2612] via-[#2A150B] to-[#140A06] border-4 border-[#241208] shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_60px_rgba(212,175,55,0.25)]">
        
        {/* Brass Corner Reinforcements (Classic 1970s radio hardware) */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none" />

        {/* Interior Wood Cabinet */}
        <div className="rounded-[20px] bg-gradient-to-b from-[#24130A] via-[#1B0E07] to-[#120804] border border-[#D4AF37]/30 p-5 sm:p-8 relative overflow-hidden">
          
          {/* Top Panel: Brand Plate, Vacuum Tubes & Power Switch */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#D4AF37]/25 pb-5 mb-6 gap-4">
            
            {/* Left: Radio Brand Crest & Akasvani Tag */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#4A0E17] to-[#1F090D] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <h3 className="font-yatra text-2xl text-[#F2D06B] tracking-wide drop-shadow-md">
                    रेडियो रेट्रो
                  </h3>
                  <span className="text-[11px] font-cinzel text-[#D1C4AD]/80 tracking-[0.2em] uppercase font-bold">
                    • MURPHY DE LUXE
                  </span>
                </div>
                <p className="text-[10px] text-[#D4AF37]/80 font-hindi -mt-0.5">
                  आकाशवाणी विविध भारती • 5-वाल्व सुपरहेटेरोडाइन रिसीवर (1974)
                </p>
              </div>
            </div>

            {/* Center: 3 Glowing Vacuum Tubes (Warm Amber Filaments) */}
            <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-[#0D0603] border border-[#D4AF37]/30 shadow-inner">
              <span className="text-[9px] font-mono text-[#D4AF37]/70 uppercase">VALVES:</span>
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="relative w-4 h-9 rounded-t-full border border-amber-500/40 bg-gradient-to-t from-black via-amber-950/40 to-black flex items-center justify-center overflow-hidden"
                  title="Vacuum Tube (वाल्व ट्यूब)"
                >
                  {/* Glowing Filament Wire */}
                  <div 
                    className={`w-0.5 h-6 rounded-full transition-all duration-700 ${
                      isPlaying 
                        ? 'bg-amber-400 shadow-[0_0_8px_#F2D06B,0_0_15px_#f97316] animate-pulse' 
                        : 'bg-amber-800/60'
                    }`}
                  />
                  {/* Glass highlight */}
                  <div className="absolute top-1 left-0.5 w-1 h-3 bg-white/20 rounded-full" />
                </div>
              ))}
            </div>

            {/* Right: Master Power Toggle & Tracklist */}
            <div className="flex items-center gap-3">
              
              {/* Master Power Toggle Button (Old Radio Click Switch) */}
              <button
                onClick={togglePlay}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-hindi transition-all border shadow-md cursor-pointer ${
                  isPlaying 
                    ? 'bg-gradient-to-r from-emerald-900 to-[#120A06] text-emerald-300 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                    : 'bg-[#2A150B] text-[#D1C4AD] border-[#D4AF37]/40 hover:border-[#D4AF37]'
                }`}
                title="स्विच ऑन / ऑफ (Radio Power Switch)"
              >
                <Power className={`w-3.5 h-3.5 ${isPlaying ? 'text-emerald-400' : 'text-[#D4AF37]'}`} />
                <span>{isPlaying ? 'रेडियो चालू (ON)' : 'स्विच ऑन (OFF)'}</span>
              </button>

              {/* Tracklist Button */}
              <button
                onClick={onOpenPlaylist}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider bg-[#4A0E17]/80 hover:bg-[#6A1B29] text-[#FBF6EB] border border-[#D4AF37]/40 transition-all font-hindi cursor-pointer"
              >
                <ListMusic className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline">गीत सूची (71)</span>
              </button>
            </div>

          </div>

          {/* Analog Tuning Dial Scale (Akashvani / Ceylon / Vividh Bharati with Active Needle) */}
          <VintageTuningDial 
            currentTrack={currentTrack} 
            onTuneTrack={handleTuneToTrack}
            isPlaying={isPlaying} 
          />

          {/* Deck Selector Tabs: Vinyl Turntable vs Doordarshan CRT TV */}
          <div className="flex items-center justify-between mb-4 mt-2 px-1">
            <span className="text-[11px] font-hindi text-[#D4AF37] font-semibold flex items-center gap-1.5">
              <Disc className="w-3.5 h-3.5" />
              <span>विंटेज डेक व्यू (Select Player View):</span>
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveDeck('vinyl')}
                className={`px-3 py-1 rounded-full text-xs font-hindi transition-all border cursor-pointer ${
                  activeDeck === 'vinyl'
                    ? 'bg-[#D4AF37] text-[#120A06] font-bold border-[#F2D06B]'
                    : 'bg-[#1B1009] text-[#D1C4AD] border-[#D4AF37]/30 hover:border-[#D4AF37]'
                }`}
              >
                ग्रामोफोन (Vinyl 78 RPM)
              </button>

              <button
                onClick={() => setActiveDeck('tv')}
                className={`px-3 py-1 rounded-full text-xs font-hindi transition-all border cursor-pointer ${
                  activeDeck === 'tv'
                    ? 'bg-[#D4AF37] text-[#120A06] font-bold border-[#F2D06B]'
                    : 'bg-[#1B1009] text-[#D1C4AD] border-[#D4AF37]/30 hover:border-[#D4AF37]'
                }`}
              >
                दूरदर्शन टीवी (Doordarshan TV)
              </button>
            </div>
          </div>

          {/* Main Stage Grid: Selected Visual (Vinyl or TV) + Controls & VU Meter */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Visual Column: Vinyl or Doordarshan CRT */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              
              {/* Option A: Vinyl Turntable */}
              {activeDeck === 'vinyl' ? (
                <div className="p-4 rounded-2xl bg-gradient-to-b from-[#1E1008] to-[#120A06] border border-[#D4AF37]/30 shadow-xl flex flex-col items-center">
                  <VinylTurntable isPlaying={isPlaying} currentTrack={currentTrack} />
                  <p className="font-hindi text-[11px] text-[#D1C4AD]/70 mt-3 text-center">
                    {isPlaying ? 'सुई रिकॉर्ड पर घूम रही है (Playing 78 RPM)' : 'ग्रामोफोन रुका हुआ है (Turntable Idle)'}
                  </p>
                </div>
              ) : (
                /* Option B: Doordarshan CRT Television */
                <div className="w-full relative rounded-2xl p-3 bg-gradient-to-b from-[#3A1E13] via-[#24130A] to-[#170B06] border-2 border-[#D4AF37]/40 shadow-xl">
                  
                  <div className="flex items-center justify-between px-2 pb-1.5 text-[10px] font-hindi text-[#D4AF37]/80">
                    <span className="flex items-center gap-1">
                      <Tv className="w-3 h-3 text-[#D4AF37]" />
                      <span>दूरदर्शन • DOORDARSHAN CRT</span>
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-wider bg-[#120A06] px-1.5 py-0.5 rounded border border-[#D4AF37]/20">
                      CH-4 BOMBAY
                    </span>
                  </div>

                  <div className="relative rounded-xl overflow-hidden bg-black aspect-video border border-[#D4AF37]/30 shadow-inner">
                    <iframe
                      ref={iframeRef}
                      id="youtube-player-element"
                      title="Radio Retro Live Broadcast"
                      key={activeVideoId}
                      src={`https://www.youtube.com/embed/${activeVideoId}?enablejsapi=1&autoplay=${hasStarted ? 1 : 0}&origin=${encodeURIComponent(window.location.origin)}&rel=0&modestbranding=1&playsinline=1`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-15" />
                  </div>
                </div>
              )}

              {/* Keep YouTube iframe always mounted in background DOM when vinyl is viewed */}
              {activeDeck !== 'tv' && (
                <div className="w-1 h-1 opacity-0 overflow-hidden absolute pointer-events-none">
                  <iframe
                    ref={iframeRef}
                    id="youtube-player-element"
                    title="Radio Retro Background"
                    key={activeVideoId}
                    src={`https://www.youtube.com/embed/${activeVideoId}?enablejsapi=1&autoplay=${hasStarted ? 1 : 0}&origin=${encodeURIComponent(window.location.origin)}&rel=0&modestbranding=1&playsinline=1`}
                    allow="accelerometer; autoplay"
                  />
                </div>
              )}

            </div>

            {/* Right: Track Info, VU Meter & Master Knobs */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
              
              {/* VU Meter & Track Index Header */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] px-2.5 py-0.5 rounded border border-[#D4AF37]/30 bg-[#120A06] font-mono">
                  {currentTrack ? `TRACK № ${String(currentTrack.index + 1).padStart(2, '0')} / ${RETRO_TRACKS.length}` : 'VINTAGE'}
                </span>

                {/* The Analog Mechanical VU Meter */}
                <VUMeter isPlaying={isPlaying} />
              </div>

              {/* Title & Artist with Vintage Calligraphy */}
              <div>
                <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#FBF6EB] line-clamp-1 leading-snug">
                  {currentTrack ? currentTrack.title : 'Loading Vintage Playlist...'}
                </h3>
                <p className="font-hindi text-xs sm:text-sm text-[#D1C4AD]/85 mt-0.5 line-clamp-1">
                  {currentTrack ? currentTrack.artist : 'Jagjit Singh, Kishore Kumar, Mohammed Rafi'}
                </p>
              </div>

              {/* Live Soundwave Equalizer */}
              <div className="flex items-center gap-1 h-6 py-1">
                {[...Array(18)].map((_, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-t-sm transition-all duration-300 ${
                      isPlaying 
                        ? 'bg-gradient-to-t from-[#8C6F19] via-[#D4AF37] to-[#F2D06B]' 
                        : 'bg-[#4A0E17]/60 h-1.5'
                    }`}
                    style={
                      isPlaying 
                        ? { 
                            height: `${Math.max(20, (Math.sin(i * 0.7 + currentTime * 3) + 1) * 45)}%`,
                            animation: `eqBounce ${0.6 + (i % 6) * 0.15}s ease-in-out infinite` 
                          } 
                        : {}
                    }
                  />
                ))}
              </div>

              {/* Progress Bar & Timestamps */}
              <div className="space-y-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-[#29180E] rounded-lg appearance-none cursor-pointer accent-[#D4AF37] hover:h-2 transition-all"
                />
                <div className="flex justify-between text-[11px] text-[#D1C4AD]/60 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{duration ? formatTime(duration) : '--:--'}</span>
                </div>
              </div>

            </div>

          </div>

          {/* Master Rotary Knobs & Transport Controls Bar */}
          <div className="mt-8 pt-6 border-t-2 border-[#D4AF37]/25 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#160C06]/60 p-4 rounded-xl">
            
            {/* Left Antique-Gold Rotary Knob: TUNING */}
            <div className="flex items-center gap-3">
              <div 
                onClick={handleNext}
                className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#F2D06B] via-[#D4AF37] to-[#8C6F19] border-2 border-[#FFE8A3] shadow-[0_4px_12px_rgba(0,0,0,0.8)] cursor-pointer hover:scale-105 active:rotate-45 transition-transform flex items-center justify-center"
                title="Tuning Knob (अगले स्टेशन के लिए घुमाएं)"
              >
                {/* Pointer Notch */}
                <div className="absolute top-1 w-1 h-3 bg-[#120A06] rounded-full" />
                <div className="w-4 h-4 rounded-full bg-[#120A06] border border-[#FFE8A3]" />
              </div>
              <div className="text-left font-hindi">
                <span className="text-[10px] text-[#D4AF37] font-bold block uppercase tracking-wider">
                  ट्यूनिंग नॉब (TUNING)
                </span>
                <span className="text-[9px] text-[#D1C4AD]/60">स्टेशन बदलने के लिए घुमाएं</span>
              </div>
            </div>

            {/* Center: Main Playback Controls */}
            <div className="flex items-center gap-3 sm:gap-4">
              
              <button
                onClick={() => setIsShuffle(!isShuffle)}
                className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                  isShuffle 
                    ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#F2D06B]' 
                    : 'border-[#D4AF37]/30 text-[#D1C4AD]/70 hover:text-[#D4AF37] hover:border-[#D4AF37]'
                }`}
                title="Shuffle Tracks"
              >
                <Shuffle className="w-4 h-4" />
              </button>

              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-[#1B1009] border border-[#D4AF37]/40 text-[#FBF6EB] hover:border-[#D4AF37] hover:bg-[#29180E] active:scale-95 transition-all shadow-md cursor-pointer"
                title="पिछला गीत (Previous)"
              >
                <SkipBack className="w-5 h-5 fill-current" />
              </button>

              {/* Master Play Button with Antique Gold Halo */}
              <button
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#F2D06B] to-[#997D29] text-[#120A06] flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:shadow-[0_0_40px_rgba(212,175,55,0.9)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title={isPlaying ? "रोकें (Pause)" : "बजाएं (Play)"}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-current" />
                ) : (
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                )}
              </button>

              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-[#1B1009] border border-[#D4AF37]/40 text-[#FBF6EB] hover:border-[#D4AF37] hover:bg-[#29180E] active:scale-95 transition-all shadow-md cursor-pointer"
                title="अगला गीत (Next)"
              >
                <SkipForward className="w-5 h-5 fill-current" />
              </button>
            </div>

            {/* Right Antique-Gold Rotary Knob & Volume Slider */}
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleMute}
                className="text-[#D4AF37] hover:text-[#F2D06B] transition-colors p-1 cursor-pointer"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-24 sm:w-28 h-1.5 bg-[#29180E] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                title="Volume"
              />

              <div className="text-right font-hindi">
                <span className="text-[10px] text-[#D4AF37] font-bold block uppercase tracking-wider">
                  वॉल्यूम {isMuted ? '0%' : `${volume}%`}
                </span>
                <span className="text-[9px] text-[#D1C4AD]/60 font-mono">50Hz - 15kHz</span>
              </div>
            </div>

          </div>

          {/* Hindi Radio Dialogue Bar */}
          <div className="mt-4 pt-3 border-t border-[#D4AF37]/15 flex flex-wrap items-center justify-between text-[11px] text-[#D1C4AD]/65 font-hindi">
            <span className="flex items-center gap-1.5">
              <Disc className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>"बहनों और भाइयों... रेडियो सिलोन और बिनाका गीतमाला की मीठी यादें"</span>
            </span>
            <span className="text-[#D4AF37]/90 font-medium">
              {RETRO_TRACKS.length} अमर सदाबहार नगमे • 1950s—1980s
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
