import React, { useState, useRef } from 'react';
import BackgroundVideo from './components/BackgroundVideo';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import RetroPlayer from './components/RetroPlayer';
import PlaylistDrawer from './components/PlaylistDrawer';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import FilmProjectorIntro from './components/FilmProjectorIntro';
import VintageCinemaEffects from './components/VintageCinemaEffects';
import VintageLettersSection from './components/VintageLettersSection';
import { RETRO_TRACKS } from './data/playlist';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(RETRO_TRACKS[0]);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0.65);
  const [showIntro, setShowIntro] = useState(true);
  
  const playerControlsRef = useRef(null);

  // Play/Pause toggle from Hero or master button
  const handleTogglePlay = () => {
    if (playerControlsRef.current && playerControlsRef.current.togglePlay) {
      playerControlsRef.current.togglePlay();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Jump to track from playlist or letters
  const handleSelectTrack = (trackIndex) => {
    const selectedSong = RETRO_TRACKS[trackIndex];
    if (selectedSong) {
      setCurrentTrack(selectedSong);
      setIsPlaying(true);
      if (playerControlsRef.current && playerControlsRef.current.loadTrack) {
        playerControlsRef.current.loadTrack(selectedSong.id);
      }
    }
  };

  // Scroll to about section
  const handleOpenAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Replay cinema projector intro
  const handleReplayIntro = () => {
    sessionStorage.removeItem('radio_retro_intro_seen');
    setShowIntro(true);
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between selection:bg-[#D4AF37]/30 selection:text-[#FFF8E7] overflow-x-hidden">
      
      {/* 1970s Bollywood Film Projector Leader Intro (Skippable) */}
      {showIntro && (
        <FilmProjectorIntro onComplete={() => setShowIntro(false)} />
      )}

      {/* Vintage Cinema Dust, Film Scratches & Warm Light Leak Overlay */}
      <VintageCinemaEffects />

      {/* Background Video Component */}
      <BackgroundVideo overlayOpacity={overlayOpacity} />

      {/* Top Navbar */}
      <Navbar
        onOpenPlaylist={() => setIsPlaylistOpen(true)}
        onOpenAbout={handleOpenAbout}
        onReplayIntro={handleReplayIntro}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        overlayOpacity={overlayOpacity}
        setOverlayOpacity={setOverlayOpacity}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center relative z-20">
        
        {/* Hero Section */}
        <HeroSection
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          currentTrack={currentTrack}
          onOpenPlaylist={() => setIsPlaylistOpen(true)}
        />

        {/* Central Vintage Wooden Radio Music Player */}
        <RetroPlayer
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentTrack={currentTrack}
          setCurrentTrack={setCurrentTrack}
          onOpenPlaylist={() => setIsPlaylistOpen(true)}
          playerControlsRef={playerControlsRef}
        />

        {/* Nostalgic Typewriter Letters, Minerva Cinema Tickets & Postmarks */}
        <VintageLettersSection 
          onSelectTrack={handleSelectTrack} 
        />

        {/* Nostalgic Tribute / Golden Era Legends Section */}
        <AboutSection />

      </main>

      {/* Footer */}
      <Footer />

      {/* Playlist Drawer (Browsing & Selection within predefined playlist) */}
      <PlaylistDrawer
        isOpen={isPlaylistOpen}
        onClose={() => setIsPlaylistOpen(false)}
        currentTrack={currentTrack}
        onSelectTrack={handleSelectTrack}
        isPlaying={isPlaying}
      />

    </div>
  );
}
