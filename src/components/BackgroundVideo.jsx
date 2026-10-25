import React, { useState } from 'react';
import retroBg from '../assets/retro_bg.mp4';

export default function BackgroundVideo({ overlayOpacity = 0.65 }) {
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none select-none">
      {/* Background Video */}
      {!videoError ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 scale-[1.02]"
        >
          <source src={retroBg} type="video/mp4" />
          <source src="./retro_bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        /* Fallback Vintage Gradient / Texture if video cannot play */
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#1b1009] via-[#2d120a] to-[#120a06]" />
      )}

      {/* Dark Sepia / Burgundy Tint Overlay */}
      <div
        className="absolute inset-0 bg-[#120A06] transition-opacity duration-500"
        style={{ opacity: overlayOpacity }}
      />

      {/* Warm Golden / Burgundy Radial Vignette for Cinematic Glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(18, 10, 6, 0.75) 75%, rgba(10, 5, 3, 0.95) 100%)'
        }}
      />

      {/* Subtle Film Grain Overlay */}
      <div className="absolute inset-0 film-grain pointer-events-none" />
    </div>
  );
}
