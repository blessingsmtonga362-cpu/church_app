"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────────
   SVG ICONS
────────────────────────────────────────────────────────────── */
const CrossSVG = ({ style = {} }: { style?: React.CSSProperties }) => (
  <svg viewBox="0 0 44 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <rect x="16" y="0" width="12" height="60" rx="2" fill="currentColor" />
    <rect x="0"  y="16" width="44" height="12" rx="2" fill="currentColor" />
  </svg>
);
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 22, height: 22 }}>
    <path d="M8 5v14l11-7z" />
  </svg>
);
const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"
    style={{ width: 16, height: 16 }}>
    <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    style={{ width: 15, height: 15 }}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" strokeLinecap="round" />
  </svg>
);

/* ──────────────────────────────────────────────────────────────
   STATIC DATA
────────────────────────────────────────────────────────────── */
const VERSES = [
  { text: "For God so loved the world that He gave His one and only Son.", ref: "John 3:16" },
  { text: "I can do all things through Christ who strengthens me.", ref: "Philippians 4:13" },
  { text: "The Lord is my shepherd; I shall not want.", ref: "Psalm 23:1" },
  { text: "Trust in the Lord with all your heart.", ref: "Proverbs 3:5" },
];

const STATS = [
  { n: "12+", label: "Years of Ministry" },
  { n: "800+", label: "Church Family" },
  { n: "4",   label: "Weekly Services" },
  { n: "10+", label: "Active Ministries" },
];

const MINISTRIES = [
  { name: "Youth Ministry",      desc: "Empowering the next generation with faith, purpose and belonging.", emoji: "✦", accent: "#6B2737" },
  { name: "Worship Team",        desc: "Crafting encounters with God through anointed praise and music.", emoji: "♪",  accent: "#B8922A" },
  { name: "Prayer Warriors",     desc: "Standing in intercession for our church, city, and the nations.", emoji: "🕊", accent: "#4A6FA3" },
  { name: "Community Outreach",  desc: "Extending God's love beyond our walls to serve our neighbours.", emoji: "♥", accent: "#5C8A5C" },
];

const SERMONS = [
  { title: "Walking by Faith, Not by Sight",   ref: "2 Cor 5:7",  date: "Mar 9",  featured: true,
    img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=1200&q=80" },
  { title: "The Power of the Holy Spirit",      ref: "Acts 1:8",   date: "Mar 2",
    img: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&q=80" },
  { title: "Forgiveness: A Gift Freely Given",  ref: "Eph 4:32",   date: "Feb 23",
    img: "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=600&q=80" },
  { title: "Hope in the Darkest Valley",        ref: "Ps 23:4",    date: "Feb 16",
    img: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600&q=80" },
];

const EVENTS = [
  { day: "SUN", date: "16", month: "MAR", title: "Sunday Worship Service",       time: "9:30 AM – 12:00 PM", tag: "Weekly",   color: "#6B2737" },
  { day: "WED", date: "19", month: "MAR", title: "Midweek Prayer & Bible Study", time: "6:30 PM – 8:00 PM",  tag: "Prayer",   color: "#4A6FA3" },
  { day: "SAT", date: "22", month: "MAR", title: "Youth Fellowship Gathering",   time: "3:00 PM – 6:00 PM",  tag: "Youth",    color: "#B8922A" },
  { day: "SUN", date: "29", month: "MAR", title: "Community Outreach Day",       time: "8:00 AM – 1:00 PM",  tag: "Outreach", color: "#5C8A5C" },
];

/* ──────────────────────────────────────────────────────────────
   HOME PAGE
────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const [verseIdx, setVerseIdx] = useState(0);
  const [fadeIn,   setFadeIn]   = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => { setVerseIdx(i => (i + 1) % VERSES.length); setFadeIn(true); }, 500);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        .page-section { padding: 96px 40px; }

        /* ── HERO ── */
        .hero-section {
          min-height: 100vh;
          background-image:
            linear-gradient(160deg, rgba(250,247,242,0.0) 0%, rgba(250,247,242,0.0) 40%, rgba(250,247,242,0.65) 100%),
            url('https://images.unsplash.com/photo-1438232992991-995b671a1b8e?w=1800&q=80');
          background-size: cover;
          background-position: center top;
          position: relative;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 0 0 80px;
          overflow: hidden;
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(44,24,16,0.38) 0%, rgba(44,24,16,0.22) 45%, rgba(250,247,242,0.90) 100%);
        }
        .hero-content {
          position: relative; z-index: 2;
          max-width: 1200px; margin: 0 auto; padding: 0 40px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: flex-end;
        }
        .hero-eyebrow {
          font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.4em;
          text-transform: uppercase; color: #B8922A;
          margin-bottom: 16px; display: flex; align-items: center; gap: 10px;
        }
        .hero-eyebrow-line { width: 36px; height: 1px; background: #B8922A; }
        .hero-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(3.2rem, 8vw, 6.5rem); font-weight: 700;
          line-height: 0.95; color: #2C1810; margin-bottom: 6px;
        }
        .hero-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.3rem, 3vw, 2rem); font-weight: 300; font-style: italic;
          color: #6B2737; letter-spacing: 0.15em; margin-bottom: 28px;
        }
        .hero-desc {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem; color: #5C3D2E; line-height: 1.8; max-width: 420px; margin-bottom: 36px;
        }
        .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }

        .hero-verse-card {
          background: rgba(253,251,248,0.96); backdrop-filter: blur(10px);
          border: 1px solid #DDD0BC; border-left: 4px solid #6B2737;
          padding: 32px 36px; align-self: flex-end; margin-bottom: 8px;
        }
        .hero-verse-label {
          font-family: 'Cinzel', serif; font-size: 8px; letter-spacing: 0.35em;
          color: #B8922A; text-transform: uppercase;
          margin-bottom: 16px; display: flex; align-items: center; gap: 8px;
        }
        .verse-text {
          font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-style: italic;
          color: #2C1810; line-height: 1.65; margin-bottom: 14px; transition: opacity 0.5s ease;
        }
        .verse-ref { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.22em; color: #6B2737; }
        .verse-dots { display: flex; gap: 6px; margin-top: 20px; }
        .verse-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #DDD0BC; border: none; padding: 0; cursor: pointer; transition: background 0.3s;
        }
        .verse-dot.active { background: #6B2737; }

        /* ── STATS ── */
        .stats-band { background: #6B2737; padding: 40px; }
        .stats-inner {
          max-width: 1000px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4,1fr); text-align: center; gap: 16px;
        }
        .stat-num { font-family: 'Cinzel', serif; font-size: clamp(1.8rem,4vw,2.8rem); font-weight: 700; color: #FAF7F2; }
        .stat-sep { width: 30px; height: 2px; background: #D4AF5A; margin: 8px auto; }
        .stat-label { font-family: 'Lato', sans-serif; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(212,175,90,0.75); }

        /* ── ABOUT ── */
        .about-grid {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center;
        }
        .about-img-mosaic { position: relative; height: 520px; }
        .mosaic-img-1 { position: absolute; top: 0; left: 0; width: 68%; height: 62%; object-fit: cover; box-shadow: 0 8px 32px rgba(44,24,16,0.12); }
        .mosaic-img-2 { position: absolute; bottom: 0; right: 0; width: 62%; height: 55%; object-fit: cover; box-shadow: 0 8px 32px rgba(44,24,16,0.12); }
        .mosaic-badge {
          position: absolute; bottom: 28%; left: 5%; background: #6B2737;
          padding: 18px 22px; box-shadow: 0 6px 24px rgba(107,39,55,0.25); z-index: 2;
        }
        .mosaic-badge-num { font-family: 'Cinzel', serif; font-size: 2rem; font-weight: 700; color: #FAF7F2; line-height: 1; }
        .mosaic-badge-label { font-family: 'Lato', sans-serif; font-size: 9px; letter-spacing: 0.2em; color: #D4AF5A; text-transform: uppercase; margin-top: 4px; }
        .mosaic-cross { position: absolute; top: 44%; left: 36%; color: #6B2737; opacity: 0.08; width: 64px; height: 86px; z-index: 1; }

        .ornament-row { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .orn-line { width: 48px; height: 1px; background: linear-gradient(to right, #B8922A, transparent); }

        .mission-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 32px 0 40px; }
        .mission-card { background: #FAF7F2; border: 1px solid #EDE5D8; border-top: 3px solid #6B2737; padding: 20px; }
        .mission-card-title { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase; color: #6B2737; margin-bottom: 8px; }
        .mission-card-text { font-family: 'Cormorant Garamond', serif; font-size: 1rem; color: #6B4E3D; line-height: 1.65; }

        /* ── SERMONS ── */
        .sermons-section { background: #FAF7F2; }
        .sermon-featured { position: relative; height: 420px; overflow: hidden; margin-bottom: 24px; cursor: pointer; }
        .sermon-featured img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
        .sermon-featured:hover img { transform: scale(1.04); }
        .sermon-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(44,24,16,0.92) 35%, rgba(44,24,16,0.1) 100%); }
        .sermon-play-btn {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
          width: 68px; height: 68px; border-radius: 50%; background: rgba(107,39,55,0.9);
          border: 2px solid rgba(253,251,248,0.6); color: #FAF7F2;
          display: flex; align-items: center; justify-content: center; transition: background 0.3s, transform 0.2s;
        }
        .sermon-play-btn:hover { background: #6B2737; transform: translate(-50%,-50%) scale(1.08); }
        .sermon-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 28px 36px; z-index: 2; }
        .sermon-badge { display: inline-block; font-family: 'Cinzel', serif; font-size: 8px; letter-spacing: 0.25em; text-transform: uppercase; color: #2C1810; background: #D4AF5A; padding: 4px 12px; margin-bottom: 12px; }
        .sermon-title { font-family: 'Cinzel', serif; font-size: clamp(1.2rem,2.5vw,1.9rem); font-weight: 600; color: #FAF7F2; margin-bottom: 8px; }
        .sermon-meta { font-family: 'Lato', sans-serif; font-size: 11px; letter-spacing: 0.12em; color: rgba(212,175,90,0.8); text-transform: uppercase; }

        .sermon-card { position: relative; overflow: hidden; height: 220px; cursor: pointer; background: #EDE5D8; }
        .sermon-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
        .sermon-card:hover img { transform: scale(1.06); }
        .sermon-card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(44,24,16,0.9) 40%, rgba(44,24,16,0.1) 100%); z-index: 1; }
        .sermon-card-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 16px 18px; z-index: 2; }
        .sermon-card-ref { font-family: 'Cinzel', serif; font-size: 8px; letter-spacing: 0.22em; color: #D4AF5A; margin-bottom: 6px; text-transform: uppercase; }
        .sermon-card-title { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-weight: 600; color: #FAF7F2; line-height: 1.3; }
        .sermon-card-play {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
          width: 44px; height: 44px; border-radius: 50%; background: rgba(107,39,55,0.85);
          border: 1.5px solid rgba(253,251,248,0.5); color: #FAF7F2;
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.3s; z-index: 2;
        }
        .sermon-card:hover .sermon-card-play { opacity: 1; }

        /* ── VERSE BANNER ── */
        .verse-banner {
          background: linear-gradient(135deg, #6B2737 0%, #4A1826 100%);
          padding: 80px 40px; text-align: center; position: relative; overflow: hidden;
        }
        .verse-banner::before {
          content: '';
          position: absolute; inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FAF7F2' fill-opacity='0.03'%3E%3Cpath d='M20 0L0 20 20 40 40 20z'/%3E%3C/g%3E%3C/svg%3E");
        }

        /* ── MINISTRIES ── */
        .ministries-grid {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4,1fr); gap: 20px;
        }
        .ministry-card {
          background: #FDFBF8; border: 1px solid #EDE5D8; padding: 36px 28px;
          position: relative; transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s; overflow: hidden;
        }
        .ministry-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(44,24,16,0.1); border-color: transparent; }
        .ministry-icon { font-size: 28px; margin-bottom: 20px; width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; border-radius: 2px; }
        .ministry-name { font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: 0.14em; font-weight: 600; text-transform: uppercase; color: #2C1810; margin-bottom: 12px; }
        .ministry-desc { font-family: 'Cormorant Garamond', serif; font-size: 1rem; color: #9C7A6A; line-height: 1.75; margin-bottom: 20px; }
        .ministry-link { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; display: inline-flex; align-items: center; gap: 6px; transition: gap 0.2s; text-decoration: none; }
        .ministry-link:hover { gap: 10px; }

        /* ── EVENTS ── */
        .events-section { background: #F3EDE3; }
        .events-grid { max-width: 1000px; margin: 0 auto; }
        .event-row {
          display: flex; align-items: center; gap: 24px; padding: 22px 12px;
          border-bottom: 1px solid #DDD0BC; transition: background 0.2s; margin: 0 -12px;
        }
        .event-row:hover { background: rgba(107,39,55,0.04); }
        .event-date-block { min-width: 68px; text-align: center; background: #FDFBF8; border: 1px solid #EDE5D8; padding: 10px 6px; flex-shrink: 0; }
        .event-day { font-family: 'Cinzel', serif; font-size: 8px; letter-spacing: 0.22em; color: #9C7A6A; }
        .event-num { font-family: 'Cinzel', serif; font-size: 26px; font-weight: 700; color: #2C1810; line-height: 1.1; }
        .event-mon { font-family: 'Lato', sans-serif; font-size: 8px; letter-spacing: 0.18em; color: #9C7A6A; text-transform: uppercase; margin-top: 2px; }
        .event-info { flex: 1; min-width: 0; }
        .event-title-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 6px; }
        .event-title-text { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 600; color: #2C1810; }
        .event-tag { font-family: 'Cinzel', serif; font-size: 7.5px; letter-spacing: 0.2em; text-transform: uppercase; padding: 3px 9px; color: #FAF7F2; }
        .event-time { font-family: 'Lato', sans-serif; font-size: 11.5px; color: #9C7A6A; letter-spacing: 0.06em; display: flex; align-items: center; gap: 5px; }

        /* ── GIVE ── */
        .give-section { background: #FDFBF8; text-align: center; }
        .give-inner { max-width: 680px; margin: 0 auto; position: relative; z-index: 1; }
        .give-cross { color: #6B2737; opacity: 0.06; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 300px; height: 400px; }

        /* ── SECTION HEADER ── */
        .section-header { text-align: center; margin-bottom: 56px; }
        .section-header .orn { display: flex; align-items: center; gap: 12px; justify-content: center; margin-bottom: 16px; }
        .section-header .orn-l { width: 50px; height: 1px; background: linear-gradient(to right, transparent, #B8922A); }
        .section-header .orn-l.r { background: linear-gradient(to left, transparent, #B8922A); }
        .section-label { font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.35em; text-transform: uppercase; color: #B8922A; }
        .section-title { font-family: 'Cinzel', serif; font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 600; color: #2C1810; line-height: 1.2; }
        .section-title .accent { color: #6B2737; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .ministries-grid { grid-template-columns: 1fr 1fr; }
          .about-grid { grid-template-columns: 1fr; gap: 48px; }
          .about-img-mosaic { height: 380px; }
        }
        @media (max-width: 768px) {
          .hero-content { grid-template-columns: 1fr; }
          .stats-inner { grid-template-columns: 1fr 1fr; gap: 24px; }
          .page-section { padding: 72px 20px; }
          .mission-grid { grid-template-columns: 1fr; }
          .ministries-grid { grid-template-columns: 1fr 1fr; }
          .stats-band { padding: 36px 20px; }
          .sermon-featured { height: 320px; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 3rem !important; }
          .hero-content { padding: 0 20px; }
          .ministries-grid { grid-template-columns: 1fr; }
          .event-row { flex-wrap: wrap; }
        }
      `}</style>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          <div>
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-line" />
              Welcome to
            </div>
            <h1 className="hero-title">BIMTO</h1>
            <p className="hero-subtitle">Church</p>
            <p className="hero-desc">
              A community rooted in Scripture, united in love, and sent to make
              disciples in every generation. You belong here.
            </p>
            <div className="hero-btns">
              <Link href="/visit" style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:"0.22em", textTransform:"uppercase", color:"#FAF7F2", background:"#6B2737", padding:"14px 36px", border:"2px solid #6B2737", display:"inline-block", transition:"all 0.3s", textDecoration:"none" }}>
                Plan Your Visit
              </Link>
              <Link href="/sermons" style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:"0.22em", textTransform:"uppercase", color:"#6B2737", background:"transparent", padding:"14px 36px", border:"2px solid #6B2737", display:"inline-block", transition:"all 0.3s", textDecoration:"none" }}>
                Watch Sermons
              </Link>
            </div>
          </div>

          <div className="hero-verse-card">
            <div className="hero-verse-label">
              <CrossSVG style={{ width: 12, height: 16, color: "#B8922A" }} />
              Verse of the Day
            </div>
            <p className="verse-text" style={{ opacity: fadeIn ? 1 : 0 }}>
              "{VERSES[verseIdx].text}"
            </p>
            <p className="verse-ref">— {VERSES[verseIdx].ref}</p>
            <div className="verse-dots">
              {VERSES.map((_, i) => (
                <button key={i} className={`verse-dot ${i === verseIdx ? "active" : ""}`}
                  onClick={() => { setVerseIdx(i); setFadeIn(true); }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <div className="stats-band">
        <div className="stats-inner">
          {STATS.map(({ n, label }) => (
            <div key={label}>
              <div className="stat-num">{n}</div>
              <div className="stat-sep" />
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════ ABOUT ═══════════════ */}
      <section className="page-section" id="about">
        <div className="about-grid">
          <div className="about-img-mosaic">
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&q=80" alt="Bimto Church worship" className="mosaic-img-1" />
            <img src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=700&q=80" alt="Community" className="mosaic-img-2" />
            <div className="mosaic-badge">
              <div className="mosaic-badge-num">2012</div>
              <div className="mosaic-badge-label">Est. Founded</div>
            </div>
            <div className="mosaic-cross"><CrossSVG style={{ width: "100%", height: "100%" }} /></div>
          </div>
          <div>
            <div className="ornament-row">
              <span className="orn-line" />
              <span className="section-label">Our Story</span>
            </div>
            <h2 className="section-title" style={{ marginBottom: 20 }}>
              A Place of <span className="accent">Love,</span><br />Faith &amp; Community
            </h2>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.15rem", color:"#6B4E3D", lineHeight:1.85, marginBottom:16 }}>
              Bimto Church was founded on the simple yet profound belief that every person deserves to
              experience the transforming love of God. For over a decade, we have been a home for
              seekers, believers, and those searching for something deeper.
            </p>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.15rem", color:"#6B4E3D", lineHeight:1.85 }}>
              We are a multicultural, multigenerational family united by grace, shaped by faith, and sent
              to serve our city and the world.
            </p>
            <div className="mission-grid">
              {[
                { t: "Our Mission", d: "To love God, love people, and make disciples in every generation." },
                { t: "Our Vision",  d: "A thriving church where every soul finds belonging and purpose." },
              ].map(({ t, d }) => (
                <div key={t} className="mission-card">
                  <div className="mission-card-title">{t}</div>
                  <p className="mission-card-text">{d}</p>
                </div>
              ))}
            </div>
            <Link href="/about" style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:"0.22em", textTransform:"uppercase", color:"#FAF7F2", background:"#6B2737", padding:"14px 36px", border:"2px solid #6B2737", display:"inline-block", transition:"all 0.3s", textDecoration:"none" }}>
              Discover Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ SERMONS ═══════════════ */}
      <section className="page-section sermons-section" id="sermons">
        <div className="section-header">
          <div className="orn">
            <span className="orn-l r" />
            <CrossSVG style={{ width: 18, height: 24, color: "#B8922A" }} />
            <span className="orn-l" />
          </div>
          <p className="section-label" style={{ marginBottom: 10 }}>From the Pulpit</p>
          <h2 className="section-title">Latest <span className="accent">Sermons</span></h2>
        </div>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="sermon-featured">
            <img src={SERMONS[0].img} alt={SERMONS[0].title} />
            <div className="sermon-overlay" />
            <button className="sermon-play-btn"><PlayIcon /></button>
            <div className="sermon-info">
              <span className="sermon-badge">Featured Sermon</span>
              <h3 className="sermon-title">{SERMONS[0].title}</h3>
              <p className="sermon-meta">Pastor James Mbewe &nbsp;·&nbsp; {SERMONS[0].date}, 2025 &nbsp;·&nbsp; {SERMONS[0].ref}</p>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:40 }}>
            {SERMONS.slice(1).map(s => (
              <div key={s.title} className="sermon-card">
                <img src={s.img} alt={s.title} />
                <div className="sermon-card-overlay" />
                <button className="sermon-card-play"><PlayIcon /></button>
                <div className="sermon-card-info">
                  <div className="sermon-card-ref">{s.date} · {s.ref}</div>
                  <h4 className="sermon-card-title">{s.title}</h4>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center" }}>
            <Link href="/sermons" style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:"0.22em", textTransform:"uppercase", color:"#6B2737", padding:"14px 36px", border:"2px solid #6B2737", display:"inline-block", transition:"all 0.3s", textDecoration:"none" }}>
              View All Sermons
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ VERSE BANNER ═══════════════ */}
      <div className="verse-banner">
        <div style={{ position:"relative", zIndex:1 }}>
          <CrossSVG style={{ width:24, height:32, color:"#D4AF5A", margin:"0 auto 20px", display:"block" }} />
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.4rem,3.5vw,2.2rem)", fontStyle:"italic", fontWeight:300, color:"#FAF7F2", maxWidth:720, margin:"0 auto 14px", lineHeight:1.65 }}>
            "Come to me, all you who are weary and burdened, and I will give you rest."
          </p>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:11, letterSpacing:"0.28em", color:"#D4AF5A" }}>— MATTHEW 11:28</p>
        </div>
      </div>

      {/* ═══════════════ MINISTRIES ═══════════════ */}
      <section className="page-section" id="ministries">
        <div className="section-header">
          <p className="section-label" style={{ marginBottom:10 }}>Get Involved</p>
          <h2 className="section-title">Our <span className="accent">Ministries</span></h2>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.1rem", fontStyle:"italic", color:"#9C7A6A", marginTop:12 }}>
            Find your place to serve and grow within the body of Christ
          </p>
        </div>
        <div className="ministries-grid">
          {MINISTRIES.map(({ name, desc, emoji, accent }) => (
            <div key={name} className="ministry-card" style={{ borderTop: `3px solid ${accent}` }}>
              <div className="ministry-icon" style={{ background: `${accent}12` }}>
                <span style={{ fontSize:24, color:accent }}>{emoji}</span>
              </div>
              <h3 className="ministry-name">{name}</h3>
              <p className="ministry-desc">{desc}</p>
              <Link href="/ministries" className="ministry-link" style={{ color:accent }}>
                Learn More <ArrowIcon />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ EVENTS ═══════════════ */}
      <section className="page-section events-section" id="events">
        <div className="section-header">
          <p className="section-label" style={{ marginBottom:10 }}>Mark Your Calendar</p>
          <h2 className="section-title">Upcoming <span className="accent">Events</span></h2>
        </div>
        <div className="events-grid">
          {EVENTS.map(({ day, date, month, title, time, tag, color }) => (
            <div key={title} className="event-row">
              <div className="event-date-block">
                <div className="event-day">{day}</div>
                <div className="event-num">{date}</div>
                <div className="event-mon">{month}</div>
              </div>
              <div className="event-info">
                <div className="event-title-row">
                  <span className="event-title-text">{title}</span>
                  <span className="event-tag" style={{ background:color }}>{tag}</span>
                </div>
                <div className="event-time"><ClockIcon />{time}</div>
              </div>
              <Link href="/events" style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:"0.22em", textTransform:"uppercase", color:"#6B2737", padding:"8px 18px", border:"2px solid #6B2737", display:"inline-block", transition:"all 0.3s", textDecoration:"none", whiteSpace:"nowrap", flexShrink:0 }}>
                Details
              </Link>
            </div>
          ))}
          <div style={{ textAlign:"center", marginTop:40 }}>
            <Link href="/events" style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:"0.22em", textTransform:"uppercase", color:"#FAF7F2", background:"#6B2737", padding:"14px 36px", border:"2px solid #6B2737", display:"inline-block", transition:"all 0.3s", textDecoration:"none" }}>
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ GIVE ═══════════════ */}
      <section className="page-section give-section" style={{ position:"relative", overflow:"hidden" }}>
        <div className="give-cross"><CrossSVG style={{ width:"100%", height:"100%" }} /></div>
        <div className="give-inner">
          <p className="section-label" style={{ marginBottom:12 }}>Support the Ministry</p>
          <CrossSVG style={{ width:24, height:32, color:"#6B2737", margin:"0 auto 20px", display:"block" }} />
          <h2 className="section-title" style={{ marginBottom:16 }}>Give with a <span className="accent">Cheerful Heart</span></h2>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", fontStyle:"italic", color:"#B8922A", marginBottom:8 }}>
            "Each one must give as he has decided in his heart."
          </p>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:"0.25em", color:"#9C7A6A", marginBottom:28 }}>— 2 CORINTHIANS 9:7</p>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.1rem", color:"#6B4E3D", lineHeight:1.85, marginBottom:40 }}>
            Your generosity fuels our mission — from local outreach to global missions.
            Every gift, no matter the size, makes an eternal difference in someone's life.
          </p>
          <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
            <Link href="/give" style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:"0.22em", textTransform:"uppercase", color:"#FAF7F2", background:"#6B2737", padding:"14px 36px", border:"2px solid #6B2737", display:"inline-block", transition:"all 0.3s", textDecoration:"none" }}>Give Online</Link>
            <Link href="/give#tithing" style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:"0.22em", textTransform:"uppercase", color:"#6B2737", padding:"14px 36px", border:"2px solid #6B2737", display:"inline-block", transition:"all 0.3s", textDecoration:"none" }}>Learn About Tithing</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ JOIN CTA ═══════════════ */}
      <section style={{ position:"relative", height:460, display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center", overflow:"hidden" }}>
        <img src="https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?w=1600&q=80" alt="Join our family"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(107,39,55,0.88) 0%, rgba(44,24,16,0.78) 100%)" }} />
        <div style={{ position:"relative", zIndex:1, padding:"0 24px" }}>
          <CrossSVG style={{ width:22, height:30, color:"#D4AF5A", margin:"0 auto 16px", display:"block" }} />
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:"0.4em", color:"#D4AF5A", textTransform:"uppercase", marginBottom:16 }}>You Belong Here</p>
          <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:"clamp(1.8rem,4vw,3.2rem)", fontWeight:600, color:"#FAF7F2", marginBottom:16 }}>
            Join the Bimto Family
          </h2>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.2rem", fontStyle:"italic", color:"rgba(253,251,248,0.8)", maxWidth:480, margin:"0 auto 36px", lineHeight:1.7 }}>
            Whether you're new to faith or returning home — there is a place for you here.
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <Link href="/visit" style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:"0.22em", textTransform:"uppercase", color:"#2C1810", background:"#D4AF5A", padding:"14px 36px", border:"2px solid #D4AF5A", display:"inline-block", transition:"all 0.3s", textDecoration:"none" }}>Plan Your Visit</Link>
            <Link href="/contact" style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:"0.22em", textTransform:"uppercase", color:"#FAF7F2", padding:"14px 36px", border:"2px solid rgba(253,251,248,0.45)", display:"inline-block", transition:"all 0.3s", textDecoration:"none" }}>Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}