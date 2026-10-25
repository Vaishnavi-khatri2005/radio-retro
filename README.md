# RADIO RETRO 📻
### Timeless Bollywood Melodies • Golden Era of Hindi Cinema

A functional, cinematic, vintage-themed web application dedicated to golden-era Bollywood music (1950s–1980s). Powered by the official **YouTube IFrame Player API** and animated with a looping background video.

---

## ✨ Features

- **Cinematic Looping Video Background**: Powered by your custom background video (`retro_bg.mp4`) with `object-fit: cover`, silent looping, film grain texture, and an interactive brightness dimmer.
- **Fixed Predefined Playlist (`PLOLUawFIHw8k`)**: Hardcoded directly in source code (`src/data/playlist.js`). Completely locked down with **no** upload fields, URL inputs, or configuration forms.
- **Authentic Valve Tube Radio & Vinyl Player**:
  - Rotating 78 RPM vinyl record with tone-arm needle tracking.
  - Brass-accented Murphy/Philips-inspired tube radio cabinet.
  - Interactive Transport controls: **Play / Pause**, **Previous Track**, **Next Track**, and **Shuffle**.
  - Interactive Progress Bar with real-time timestamps and seeking.
  - Smooth Rotary Volume Slider and Instant Mute toggle.
  - Live sound-wave equalizer visualizer bars.
  - Optional **CRT Vintage TV Screen toggle** to view the YouTube video broadcast.
- **71 Curated Melodies Archive**:
  - Slide-out tracklist drawer displaying all 71 songs from the playlist.
  - Instant search & filter by song title or legendary singer (Jagjit Singh, Kishore Kumar, Lata Mangeshkar, Mohammed Rafi, Mukesh, etc.).
  - One-click track jumping (`player.playVideoAt(index)`).
- **Graceful Broadcast Error Handling**: Automatically skips geo-restricted or unavailable YouTube videos.
- **Vintage Typography & Color Palette**: Warm sepia, muted gold, burgundy, cream, and dark brown paired with Google Fonts (*Playfair Display*, *Cinzel*, *Marcellus*).

---

## 🚀 How to Run Locally

1. Open your terminal in the project directory:
   ```bash
   cd c:\Users\A\OneDrive\Desktop\radio-retro
   ```

2. If dependencies need to be installed:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

5. Click **"Play Music"** to tune in and let the timeless memories begin!
