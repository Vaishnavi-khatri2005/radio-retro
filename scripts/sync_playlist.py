import urllib.request
import re
import json
import os

PLAYLIST_ID = 'PLOLUawFIHw8k'
PLAYLIST_URL = f'https://www.youtube.com/playlist?list={PLAYLIST_ID}'

print(f"Fetching latest playlist items from: {PLAYLIST_URL}")

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8'
}

req = urllib.request.Request(PLAYLIST_URL, headers=headers)
with urllib.request.urlopen(req, timeout=20) as res:
    html = res.read().decode('utf-8', errors='ignore')

idx = html.find('ytInitialData = ')
if idx == -1:
    print("Could not find ytInitialData in response")
    exit(1)

decoder = json.JSONDecoder()
data, _ = decoder.raw_decode(html[idx + len('ytInitialData = '):])

# Find all lockupViewModel items (YouTube's current layout)
tabs = data.get('contents', {}).get('twoColumnBrowseResultsRenderer', {}).get('tabs', [])
if not tabs:
    print("No tabs found")
    exit(1)

sec = tabs[0].get('tabRenderer', {}).get('content', {}).get('sectionListRenderer', {})
items = sec.get('contents', [])

videos = []
for item in items:
    for si in item.get('itemSectionRenderer', {}).get('contents', []):
        lvm = si.get('lockupViewModel', {})
        if lvm:
            content_id = lvm.get('contentId')
            metadata = lvm.get('metadata', {}).get('lockupMetadataViewModel', {})
            title = metadata.get('title', {}).get('content', '')
            metadata_rows = metadata.get('metadataRows', [])
            subtitle = ""
            for row in metadata_rows:
                parts = [p.get('text', {}).get('content', '') for p in row.get('metadataParts', [])]
                if parts:
                    subtitle += " • ".join(p for p in parts if p)
            if content_id and title:
                videos.append({
                    'id': content_id,
                    'title': title,
                    'artist': subtitle
                })

print(f"Found {len(videos)} songs in playlist!")

clean_songs = []
for idx, s in enumerate(videos):
    raw_title = s['title']
    vid = s['id']
    raw_artist = s.get('artist', '')
    
    t = raw_title.replace('&amp;', '&').replace('&#39;', "'").replace('&quot;', '"')
    parts = [p.strip() for p in re.split(r'\||–|-', t) if p.strip()]
    main_title = parts[0] if parts else t
    main_title = re.sub(r'\(.*?(lyrics|video|song|hd|4k|audio|remaster).*?\)', '', main_title, flags=re.I).strip()
    main_title = re.sub(r'\[.*?(lyrics|video|song|hd|4k|audio|remaster).*?\]', '', main_title, flags=re.I).strip()
    main_title = re.sub(r'with\s+lyrics', '', main_title, flags=re.I).strip()
    
    artist = ""
    if len(parts) > 1:
        candidate = " • ".join(parts[1:3])
        candidate = re.sub(r'\(.*?\)|\[.*?\]', '', candidate).strip()
        artist = candidate
    if not artist:
        artist = raw_artist.split('•')[0].strip() if raw_artist else "Vintage Classic"

    clean_songs.append({
        'index': idx,
        'id': vid,
        'title': main_title or raw_title,
        'fullTitle': raw_title,
        'artist': artist or "Bollywood Golden Era",
        'thumbnail': f"https://i.ytimg.com/vi/{vid}/hqdefault.jpg"
    })

# Format playlist.js output
target_path = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'playlist.js')
js_content = f"""// Predefined YouTube Playlist: {PLAYLIST_URL}
// Auto-synchronized archive for RADIO RETRO.

export const PLAYLIST_ID = '{PLAYLIST_ID}';
export const PLAYLIST_URL = '{PLAYLIST_URL}';

export const RETRO_TRACKS = {json.dumps(clean_songs, indent=2, ensure_ascii=False)};
"""

with open(target_path, "w", encoding="utf-8") as out:
    out.write(js_content)

print(f"Successfully saved {len(clean_songs)} songs to src/data/playlist.js!")
