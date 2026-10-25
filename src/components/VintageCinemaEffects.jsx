import React from 'react';

export default function VintageCinemaEffects() {
  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none"
    >
      {/* Warm Corner Light Leak (Like 35mm Eastman color projector lens flare) */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(242, 208, 107, 0.45) 0%, rgba(212, 175, 55, 0.15) 50%, transparent 75%)'
        }}
      />
      
      <div 
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(106, 27, 41, 0.6) 0%, rgba(74, 14, 23, 0.2) 60%, transparent 80%)'
        }}
      />

      {/* Subtle Vertical Film Scratches (Pure lightweight CSS animation) */}
      <div className="vintage-scratches absolute inset-0 opacity-15 mix-blend-screen pointer-events-none" />

      {/* Subtle Ambient Film Dust Specks */}
      <div className="vintage-dust absolute inset-0 opacity-20 pointer-events-none" />
    </div>
  );
}
