"use client";

import { useState, useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Sermon {
  id: number;
  title: string;
  speaker: string;
  series: string;
  date: string;
  duration: string;
  scripture: string;
  description: string;
  tags: string[];
  audioSrc?: string; // replace with real URLs
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERMONS: Sermon[] = [
  {
    id: 1,
    title: "Walking in the Light of His Word",
    speaker: "Pastor John Bimto",
    series: "Foundations of Faith",
    date: "March 9, 2025",
    duration: "42 min",
    scripture: "Psalm 119:105",
    description:
      "A powerful message on how God's Word serves as a lamp to our feet and a light to our path in every season of life. Discover how daily immersion in Scripture transforms your thinking and anchors your soul.",
    tags: ["Faith", "Scripture", "Growth"],
    audioSrc: "",
  },
  {
    id: 2,
    title: "The Power of Faith in Hard Seasons",
    speaker: "Pastor John Bimto",
    series: "Foundations of Faith",
    date: "March 2, 2025",
    duration: "38 min",
    scripture: "Hebrews 11:1",
    description:
      "When life becomes difficult, faith is not optional — it is essential. This message explores how the heroes of faith in Hebrews 11 trusted God through impossible circumstances.",
    tags: ["Faith", "Perseverance", "Hope"],
    audioSrc: "",
  },
  {
    id: 3,
    title: "Renewed Strength Through Prayer",
    speaker: "Deacon Grace Phiri",
    series: "The Praying Church",
    date: "February 23, 2025",
    duration: "35 min",
    scripture: "Isaiah 40:31",
    description:
      "Prayer is the engine of the Christian life. This message calls us back to the place of dependence on God, where our strength is renewed and our vision is sharpened.",
    tags: ["Prayer", "Strength", "Renewal"],
    audioSrc: "",
  },
  {
    id: 4,
    title: "The Church that Prays Together",
    speaker: "Deacon Grace Phiri",
    series: "The Praying Church",
    date: "February 16, 2025",
    duration: "40 min",
    scripture: "Acts 2:42",
    description:
      "Corporate prayer is one of the most powerful tools given to the body of Christ. We look at how the early church devoted itself to prayer and what that means for us today.",
    tags: ["Prayer", "Community", "Church"],
    audioSrc: "",
  },
  {
    id: 5,
    title: "Grace Greater Than Our Sin",
    speaker: "Pastor John Bimto",
    series: "The Gospel of Grace",
    date: "February 9, 2025",
    duration: "45 min",
    scripture: "Romans 5:20",
    description:
      "No matter how far you've fallen, God's grace reaches further. This message unpacks the scandalous, beautiful, all-sufficient grace of Jesus Christ for sinners.",
    tags: ["Grace", "Gospel", "Redemption"],
    audioSrc: "",
  },
  {
    id: 6,
    title: "Justified by Faith Alone",
    speaker: "Pastor John Bimto",
    series: "The Gospel of Grace",
    date: "February 2, 2025",
    duration: "44 min",
    scripture: "Romans 3:21-24",
    description:
      "What does it mean to be justified before a holy God? This foundational message on the doctrine of justification shows us that righteousness is a gift, not an achievement.",
    tags: ["Grace", "Justification", "Doctrine"],
    audioSrc: "",
  },
];

const SERIES = ["All Series", "Foundations of Faith", "The Praying Church", "The Gospel of Grace"];
const SPEAKERS = ["All Speakers", "Pastor John Bimto", "Deacon Grace Phiri"];

// ─── Styles ───────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&display=swap');

  :root {
    --navy:      #0d1f3c;
    --navy-deep: #080f1e;
    --navy-mid:  #112244;
    --gold:      #e8c96d;
    --gold-dark: #c9a84c;
    --gold-pale: #f5e6b8;
    --cream:     #faf6ef;
    --cream-mid: #f0e9da;
    --muted: #5f6f8f;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Crimson Text', serif; background: var(--cream); color: var(--navy); overflow-x: hidden; }

  @keyframes fadeUp   { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:none } }
  @keyframes fadeIn   { from { opacity:0 } to { opacity:1 } }
  @keyframes progress { from { width:0 } to { width:100% } }
  @keyframes spin     { to { transform: rotate(360deg) } }
  @keyframes pulse    { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }

  .fade-up { animation: fadeUp 0.6s ease both; }
  .d1 { animation-delay:.1s } .d2 { animation-delay:.2s }
  .d3 { animation-delay:.3s } .d4 { animation-delay:.4s }

  /* ── PAGE HERO ── */
  .sermons-hero {
    background: var(--navy-deep);
    padding: 140px 2rem 80px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .sermons-hero::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 70% 60% at 50% 40%, rgba(26,55,100,0.9), transparent 70%),
      radial-gradient(ellipse 40% 40% at 20% 80%, rgba(201,168,76,0.06), transparent);
  }
  .hero-cross-bg {
    position: absolute; top:50%; left:50%;
    transform: translate(-50%,-50%);
    opacity: 0.035; pointer-events:none;
  }
  .hero-eyebrow {
    font-family:'Cinzel',serif;
    font-size:.7rem; letter-spacing:.3em;
    text-transform:uppercase; color:var(--gold);
    display:block; margin-bottom:.8rem; position:relative;
  }
  .hero-title {
    font-family:'Cinzel',serif;
    font-size:clamp(2.4rem,5vw,4rem);
    font-weight:900; color:#fff; line-height:1.1;
    position:relative; margin-bottom:1rem;
  }
  .hero-title span {
    background: linear-gradient(135deg, var(--gold-pale), var(--gold), var(--gold-dark));
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  }
  .hero-desc {
    font-size:1.15rem; font-style:italic; color:#b8c7e0;
    max-width:480px; margin:0 auto 0; line-height:1.65; position:relative;
  }

  /* ── STICKY PLAYER BAR ── */
  .player-bar {
    position: sticky; top: 0; z-index: 200;
    background: var(--navy);
    border-bottom: 1px solid rgba(232,201,109,0.15);
    padding: 0 2rem;
    transition: transform 0.3s;
  }
  .player-bar.hidden { transform: translateY(-100%); }
  .player-inner {
    max-width: 1100px; margin: 0 auto;
    display: flex; align-items: center; gap: 1.4rem;
    height: 72px;
  }
  .player-art {
    width: 44px; height: 44px; border-radius: 3px; flex-shrink:0;
    background: linear-gradient(135deg, var(--navy-mid), #1a3a70);
    display: flex; align-items:center; justify-content:center;
    border: 1px solid rgba(232,201,109,0.2);
  }
  .player-info { flex:1; min-width:0; }
  .player-title {
    font-family:'Cinzel',serif; font-size:.8rem; font-weight:700;
    color:#ffffff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  }
  .player-speaker { font-size:.78rem; color:#a9bbd6; }
  .player-controls { display:flex; align-items:center; gap:.6rem; }
  .ctrl-btn {
    background:none; border:none; cursor:pointer;
    color:#8aa0c0; padding:.35rem; border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    transition: color .2s, background .2s;
  }
  .ctrl-btn:hover { color:var(--gold); background:rgba(232,201,109,0.08); }
  .play-ctrl {
    width:40px; height:40px;
    background:var(--gold); border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    border:none; cursor:pointer;
    transition: background .2s, transform .15s;
    flex-shrink:0;
  }
  .play-ctrl:hover { background:var(--gold-pale); transform:scale(1.07); }
  .player-progress { flex:1; display:flex; flex-direction:column; gap:.3rem; min-width:120px; max-width:320px; }
  .progress-track {
    height:3px; background:rgba(255,255,255,0.1); border-radius:2px;
    cursor:pointer; position:relative;
  }
  .progress-fill {
    height:100%; border-radius:2px;
    background: linear-gradient(to right, var(--gold-dark), var(--gold));
    transition: width .1s linear;
  }
  .progress-times { display:flex; justify-content:space-between; font-family:'Cinzel',serif; font-size:.6rem; color:#9fb3d1; letter-spacing:.06em; }
  .volume-wrap { display:flex; align-items:center; gap:.5rem; }
  .volume-slider {
    -webkit-appearance:none; appearance:none;
    width:70px; height:3px;
    background:rgba(255,255,255,0.12); border-radius:2px; cursor:pointer; outline:none;
  }
  .volume-slider::-webkit-slider-thumb {
    -webkit-appearance:none; width:12px; height:12px;
    border-radius:50%; background:var(--gold); cursor:pointer;
  }

  /* ── FILTER BAR ── */
  .filter-bar {
    background: #fff;
    border-bottom: 1px solid rgba(201,168,76,0.12);
    padding: .9rem 2rem;
    position: sticky; top: 72px; z-index: 100;
  }
  .filter-inner {
    max-width: 1100px; margin: 0 auto;
    display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
  }
  .filter-label {
    font-family:'Cinzel',serif; font-size:.65rem;
    letter-spacing:.2em; text-transform:uppercase; color:var(--muted);
    flex-shrink:0;
  }
  .filter-select {
    font-family:'Crimson Text',serif; font-size:.95rem;
    color:var(--navy); background:#fff;
    border: 1px solid rgba(201,168,76,0.3); border-radius:2px;
    padding:.4rem .8rem; outline:none; cursor:pointer;
    transition: border-color .2s;
  }
  .filter-select:focus { border-color:var(--gold-dark); }
  .search-wrap {
    display:flex; align-items:center; gap:.5rem;
    border:1px solid rgba(201,168,76,0.3); border-radius:2px;
    padding:.4rem .8rem; flex:1; max-width:280px;
    transition: border-color .2s;
  }
  .search-wrap:focus-within { border-color:var(--gold-dark); }
  .search-input {
    border:none; outline:none; background:transparent;
    font-family:'Crimson Text',serif; font-size:.95rem; color:var(--navy); width:100%;
  }
  .search-input::placeholder { color:var(--muted); }
  .results-count {
    margin-left:auto; font-family:'Cinzel',serif; font-size:.65rem;
    letter-spacing:.15em; text-transform:uppercase; color:var(--muted);
  }

  /* ── MAIN LAYOUT ── */
  .sermons-layout {
    max-width:1100px; margin:0 auto; padding:3.5rem 2rem 5rem;
    display:grid; grid-template-columns:1fr 300px; gap:3rem; align-items:start;
  }

  /* ── SERMON CARDS ── */
  .sermon-grid { display:flex; flex-direction:column; gap:1.25rem; }
  .sermon-card {
    background:#fff;
    border:1px solid rgba(201,168,76,0.15);
    border-radius:4px; overflow:hidden;
    transition: transform .25s, box-shadow .25s, border-color .25s;
    cursor:pointer;
    position:relative;
  }
  .sermon-card:hover {
    transform:translateY(-3px);
    box-shadow:0 10px 32px rgba(13,31,60,0.09);
    border-color:rgba(232,201,109,0.35);
  }
  .sermon-card.active {
    border-color:var(--gold-dark);
    box-shadow:0 6px 28px rgba(201,168,76,0.18);
  }
  .sermon-card.active::before {
    content:''; position:absolute; top:0; left:0; bottom:0;
    width:3px; background:linear-gradient(to bottom,var(--gold-dark),var(--gold));
  }
  .card-inner { display:flex; gap:1.2rem; padding:1.5rem; align-items:flex-start; }
  .card-num {
    font-family:'Cinzel',serif; font-size:.65rem; font-weight:700;
    letter-spacing:.1em; color:rgba(201,168,76,0.5); flex-shrink:0; padding-top:3px;
  }
  .card-body { flex:1; min-width:0; }
  .card-series {
    font-family:'Cinzel',serif; font-size:.62rem; letter-spacing:.18em;
    text-transform:uppercase; color:var(--gold-dark); margin-bottom:.35rem; display:block;
  }
  .card-title {
    font-family:'Cinzel',serif; font-size:1.05rem; font-weight:700;
    color:var(--navy); line-height:1.3; margin-bottom:.45rem;
  }
  .card-desc {
    font-size:.95rem; color:var(--muted); line-height:1.6;
    margin-bottom:.8rem; display:-webkit-box;
    -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
  }
  .card-meta {
    display:flex; flex-wrap:wrap; gap:.5rem .9rem;
    font-family:'Cinzel',serif; font-size:.62rem;
    letter-spacing:.1em; text-transform:uppercase; color:#6b7c99;
  }
  .card-meta span { display:flex; align-items:center; gap:.3rem; }
  .card-tags { display:flex; flex-wrap:wrap; gap:.4rem; margin-top:.7rem; }
  .tag {
    font-family:'Cinzel',serif; font-size:.58rem; letter-spacing:.1em;
    text-transform:uppercase; color:var(--navy); background:rgba(201,168,76,0.12);
    border:1px solid rgba(201,168,76,0.2); border-radius:2px; padding:.2rem .55rem;
  }
  .card-play {
    width:44px; height:44px; flex-shrink:0;
    background:var(--navy); border-radius:50%; border:none; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    transition:background .2s, transform .15s; margin-top:2px;
  }
  .card-play:hover { background:var(--gold-dark); transform:scale(1.08); }
  .card-play.playing { background:var(--gold); animation:pulse 2s ease infinite; }

  /* ── SIDEBAR ── */
  .sidebar { display:flex; flex-direction:column; gap:1.75rem; }
  .sidebar-widget {
    background:#fff; border:1px solid rgba(201,168,76,0.15); border-radius:4px; overflow:hidden;
  }
  .widget-head {
    padding:1rem 1.4rem; background:var(--navy);
    border-bottom:2px solid var(--gold-dark);
  }
  .widget-head h3 {
    font-family:'Cinzel',serif; font-size:.75rem; font-weight:700;
    letter-spacing:.18em; text-transform:uppercase; color:var(--gold);
  }
  .widget-body { padding:1.2rem 1.4rem; }

  /* series list */
  .series-list { display:flex; flex-direction:column; gap:.5rem; list-style:none; }
  .series-item {
    display:flex; justify-content:space-between; align-items:center;
    padding:.5rem .7rem; border-radius:2px; cursor:pointer;
    font-size:.92rem; color:var(--navy);
    transition:background .2s;
  }
  .series-item:hover, .series-item.active { background:rgba(201,168,76,0.1); }
  .series-item.active { font-weight:600; }
  .series-count {
    font-family:'Cinzel',serif; font-size:.6rem; letter-spacing:.08em;
    background:rgba(201,168,76,0.15); color:var(--gold-dark);
    padding:.15rem .45rem; border-radius:10px;
  }

  /* scripture of week */
  .scripture-box {
    background:linear-gradient(135deg,var(--navy-mid),var(--navy));
    padding:1.5rem; border-radius:3px; text-align:center;
  }
  .scripture-text {
    font-family:'Crimson Text',serif; font-size:1.05rem; font-style:italic;
    color:#e3ecfa; line-height:1.65; margin-bottom:.6rem;
  }
  .scripture-ref {
    font-family:'Cinzel',serif; font-size:.62rem; letter-spacing:.18em;
    text-transform:uppercase; color:var(--gold);
  }

  /* speaker cards */
  .speaker-list { display:flex; flex-direction:column; gap:.8rem; }
  .speaker-row {
    display:flex; align-items:center; gap:.8rem;
  }
  .speaker-avatar {
    width:42px; height:42px; border-radius:50%; flex-shrink:0;
    background:linear-gradient(135deg,var(--navy-mid),var(--navy));
    display:flex; align-items:center; justify-content:center;
    font-family:'Cinzel',serif; font-size:.8rem; font-weight:700; color:var(--gold);
    border:1px solid rgba(232,201,109,0.2);
  }
  .speaker-name { font-family:'Cinzel',serif; font-size:.78rem; font-weight:700; color:var(--navy); }
  .speaker-role { font-size:.82rem; color:var(--muted); }

  /* ── EMPTY STATE ── */
  .empty-state { text-align:center; padding:4rem 2rem; color:var(--muted); }
  .empty-state svg { margin:0 auto 1rem; display:block; opacity:.3; }
  .empty-state h3 { font-family:'Cinzel',serif; font-size:1rem; color:var(--navy); margin-bottom:.4rem; }

  /* ── RESPONSIVE ── */
  @media(max-width:860px) {
    .sermons-layout { grid-template-columns:1fr; }
    .sidebar { order:-1; display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
  }
  @media(max-width:580px) {
    .sidebar { grid-template-columns:1fr; }
    .player-inner { gap:.8rem; }
    .volume-wrap { display:none; }
    .progress-wrap-desktop { display:none; }
    .filter-inner { gap:.6rem; }
  }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function initials(name: string) {
  return name.split(" ").map(w => w[0]).filter((_, i) => i === 0 || i === name.split(" ").length - 1).join("");
}

// ─── Player Hook ──────────────────────────────────────────────────────────────
function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;
    audioRef.current = audio;

    audio.addEventListener("timeupdate", () => setCurrentTime(audio.currentTime));
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("ended", () => setPlaying(false));

    return () => { audio.pause(); };
  }, []);

  const load = (sermon: Sermon) => {
    const audio = audioRef.current!;
    if (activeId === sermon.id) {
      playing ? audio.pause() : audio.play();
      setPlaying(!playing);
      return;
    }
    audio.src = sermon.audioSrc || "";
    audio.load();
    // Simulate playback for demo (no real src)
    setActiveId(sermon.id);
    setCurrentTime(0);
    setDuration(sermon.id * 300 + 800); // fake duration
    setPlaying(true);
    if (sermon.audioSrc) audio.play().catch(() => {});
  };

  const togglePlay = () => {
    const audio = audioRef.current!;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play().catch(() => {}); setPlaying(true); }
  };

  const seek = (pct: number) => {
    const audio = audioRef.current!;
    const t = pct * duration;
    audio.currentTime = t;
    setCurrentTime(t);
  };

  const changeVolume = (v: number) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const skip = (sec: number) => {
    const audio = audioRef.current!;
    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + sec));
  };

  return { playing, currentTime, duration, volume, activeId, load, togglePlay, seek, changeVolume, skip };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SermonsPage() {
  const [search, setSearch] = useState("");
  const [seriesFilter, setSeriesFilter] = useState("All Series");
  const [speakerFilter, setSpeakerFilter] = useState("All Speakers");
  const player = useAudioPlayer();

  const activeSermon = SERMONS.find(s => s.id === player.activeId);

  const filtered = SERMONS.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = !q || s.title.toLowerCase().includes(q) || s.speaker.toLowerCase().includes(q) || s.scripture.toLowerCase().includes(q);
    const matchSeries = seriesFilter === "All Series" || s.series === seriesFilter;
    const matchSpeaker = speakerFilter === "All Speakers" || s.speaker === speakerFilter;
    return matchSearch && matchSeries && matchSpeaker;
  });

  const seriesCounts = SERIES.slice(1).map(s => ({ s, count: SERMONS.filter(x => x.series === s).length }));
  const progress = player.duration ? (player.currentTime / player.duration) * 100 : 0;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="sermons-hero">
        <svg className="hero-cross-bg" width="500" height="500" viewBox="0 0 500 500" fill="none">
          <rect x="225" y="50" width="50" height="400" rx="6" fill="white"/>
          <rect x="50" y="175" width="400" height="50" rx="6" fill="white"/>
        </svg>
        <span className="hero-eyebrow fade-up">Bimto Church</span>
        <h1 className="hero-title fade-up d1">The <span>Word</span> Preached</h1>
        <p className="hero-desc fade-up d2">
          Browse, listen, and be transformed by messages rooted in Scripture and delivered with the Spirit's power.
        </p>
      </section>

      {/* ── STICKY PLAYER ─────────────────────────────────────────────────── */}
      <div className={`player-bar${player.activeId ? "" : " hidden"}`}>
        <div className="player-inner">
          {/* Art */}
          <div className="player-art">
            <svg width="20" height="20" viewBox="0 0 44 44" fill="none">
              <rect x="20" y="4" width="4" height="28" rx="1" fill="#e8c96d"/>
              <rect x="10" y="12" width="24" height="4" rx="1" fill="#e8c96d"/>
            </svg>
          </div>

          {/* Info */}
          <div className="player-info">
            <div className="player-title">{activeSermon?.title ?? "—"}</div>
            <div className="player-speaker">{activeSermon?.speaker}</div>
          </div>

          {/* Controls */}
          <div className="player-controls">
            <button className="ctrl-btn" onClick={() => player.skip(-15)} title="Back 15s">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
                <text x="8" y="14" fontSize="6" fill="currentColor" fontFamily="sans-serif">15</text>
              </svg>
            </button>
            <button className="play-ctrl" onClick={player.togglePlay}>
              {player.playing
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="#0d1f3c"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="#0d1f3c"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              }
            </button>
            <button className="ctrl-btn" onClick={() => player.skip(15)} title="Forward 15s">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-.49-3.51"/>
                <text x="8" y="14" fontSize="6" fill="currentColor" fontFamily="sans-serif">15</text>
              </svg>
            </button>
          </div>

          {/* Progress */}
          <div className="player-progress progress-wrap-desktop">
            <div
              className="progress-track"
              onClick={e => {
                const r = (e.target as HTMLElement).getBoundingClientRect();
                player.seek((e.clientX - r.left) / r.width);
              }}
            >
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="progress-times">
              <span>{formatTime(player.currentTime)}</span>
              <span>{formatTime(player.duration)}</span>
            </div>
          </div>

          {/* Volume */}
          <div className="volume-wrap">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6a83a2" strokeWidth="2" strokeLinecap="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
            <input
              type="range" min="0" max="1" step="0.02"
              value={player.volume}
              onChange={e => player.changeVolume(parseFloat(e.target.value))}
              className="volume-slider"
            />
          </div>
        </div>
      </div>

      {/* ── FILTER BAR ────────────────────────────────────────────────────── */}
      <div className="filter-bar">
        <div className="filter-inner">
          <span className="filter-label">Filter:</span>

          <select className="filter-select" value={seriesFilter} onChange={e => setSeriesFilter(e.target.value)}>
            {SERIES.map(s => <option key={s}>{s}</option>)}
          </select>

          <select className="filter-select" value={speakerFilter} onChange={e => setSpeakerFilter(e.target.value)}>
            {SPEAKERS.map(s => <option key={s}>{s}</option>)}
          </select>

          <div className="search-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9baec4" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="search-input"
              placeholder="Search sermons…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <span className="results-count">{filtered.length} message{filtered.length !== 1 ? "s" : ""}</span>
        </div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────── */}
      <div className="sermons-layout">

        {/* Sermon list */}
        <div>
          {filtered.length === 0 ? (
            <div className="empty-state">
              <svg width="48" height="48" viewBox="0 0 44 44" fill="none">
                <rect x="20" y="4" width="4" height="28" rx="1" fill="#0d1f3c"/>
                <rect x="10" y="12" width="24" height="4" rx="1" fill="#0d1f3c"/>
              </svg>
              <h3>No Sermons Found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="sermon-grid">
              {filtered.map((sermon, i) => {
                const isActive = player.activeId === sermon.id;
                return (
                  <div
                    key={sermon.id}
                    className={`sermon-card fade-up${isActive ? " active" : ""}`}
                    style={{ animationDelay: `${i * 0.07}s` }}
                  >
                    <div className="card-inner">
                      <span className="card-num">
                        {String(SERMONS.findIndex(s => s.id === sermon.id) + 1).padStart(2, "0")}
                      </span>
                      <div className="card-body">
                        <span className="card-series">{sermon.series}</span>
                        <div className="card-title">{sermon.title}</div>
                        <div className="card-desc">{sermon.description}</div>
                        <div className="card-meta">
                          <span>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            {sermon.speaker}
                          </span>
                          <span>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            {sermon.date}
                          </span>
                          <span>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            {sermon.duration}
                          </span>
                          <span>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                            {sermon.scripture}
                          </span>
                        </div>
                        <div className="card-tags">
                          {sermon.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                        </div>
                      </div>

                      {/* Play button */}
                      <button
                        className={`card-play${isActive && player.playing ? " playing" : ""}`}
                        onClick={() => player.load(sermon)}
                        aria-label={isActive && player.playing ? "Pause" : "Play"}
                      >
                        {isActive && player.playing
                          ? <svg width="16" height="16" viewBox="0 0 24 24" fill="#0d1f3c"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                          : <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                        }
                      </button>
                    </div>

                    {/* Inline progress bar when active */}
                    {isActive && (
                      <div style={{ height: "3px", background: "rgba(201,168,76,0.1)" }}>
                        <div style={{
                          height: "100%",
                          width: `${progress}%`,
                          background: "linear-gradient(to right,var(--gold-dark),var(--gold))",
                          transition: "width .15s linear",
                        }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="sidebar">

          {/* Series */}
          <div className="sidebar-widget">
            <div className="widget-head"><h3>Sermon Series</h3></div>
            <div className="widget-body">
              <ul className="series-list">
                <li
                  className={`series-item${seriesFilter === "All Series" ? " active" : ""}`}
                  onClick={() => setSeriesFilter("All Series")}
                >
                  All Series
                  <span className="series-count">{SERMONS.length}</span>
                </li>
                {seriesCounts.map(({ s, count }) => (
                  <li
                    key={s}
                    className={`series-item${seriesFilter === s ? " active" : ""}`}
                    onClick={() => setSeriesFilter(s)}
                  >
                    {s}
                    <span className="series-count">{count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Scripture of the week */}
          <div className="sidebar-widget">
            <div className="widget-head"><h3>Scripture of the Week</h3></div>
            <div className="widget-body">
              <div className="scripture-box">
                <p className="scripture-text">
                  "Your word is a lamp for my feet, a light on my path."
                </p>
                <span className="scripture-ref">Psalm 119 : 105</span>
              </div>
            </div>
          </div>

          {/* Speakers */}
          <div className="sidebar-widget">
            <div className="widget-head"><h3>Our Speakers</h3></div>
            <div className="widget-body">
              <div className="speaker-list">
                {[
                  { name: "Pastor John Bimto", role: "Lead Pastor" },
                  { name: "Deacon Grace Phiri", role: "Associate Minister" },
                ].map(sp => (
                  <div
                    className="speaker-row"
                    key={sp.name}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSpeakerFilter(speakerFilter === sp.name ? "All Speakers" : sp.name)}
                  >
                    <div className="speaker-avatar">{initials(sp.name)}</div>
                    <div>
                      <div className="speaker-name">{sp.name}</div>
                      <div className="speaker-role">{sp.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </aside>
      </div>
    </>
  );
}