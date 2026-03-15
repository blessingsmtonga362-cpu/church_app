"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

/* ── Icons ─────────────────────────────────── */
const Cross = ({ style = {} }: { style?: React.CSSProperties }) => (
  <svg viewBox="0 0 44 60" fill="none" style={style}>
    <rect x="16" y="0"  width="12" height="60" rx="2.5" fill="currentColor"/>
    <rect x="0"  y="17" width="44" height="12" rx="2.5" fill="currentColor"/>
  </svg>
);
const Play = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:26,height:26 }}>
    <path d="M8 5v14l11-7z"/>
  </svg>
);
const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"
    style={{ width:18,height:18 }}>
    <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const Clock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    style={{ width:17,height:17,flexShrink:0 }}>
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 7v5l3 3" strokeLinecap="round"/>
  </svg>
);

/* ── Data ──────────────────────────────────── */
const VERSES = [
  { text:"For God so loved the world that He gave His one and only Son, that whoever believes in Him shall not perish but have eternal life.", ref:"John 3:16" },
  { text:"I can do all things through Christ who strengthens me.", ref:"Philippians 4:13" },
  { text:"The Lord is my shepherd; I shall not want. He makes me lie down in green pastures.", ref:"Psalm 23:1–2" },
  { text:"Trust in the Lord with all your heart and lean not on your own understanding.", ref:"Proverbs 3:5" },
];

const STATS = [
  { n:"12+",  l:"Years of Ministry" },
  { n:"800+", l:"Church Family" },
  { n:"4",    l:"Weekly Services" },
  { n:"10+",  l:"Active Ministries" },
];

const MINISTRIES = [
  { name:"Youth Ministry",      desc:"Empowering the next generation with faith, identity, and God-given purpose.", icon:"✦", color:"#8B1A2E" },
  { name:"Worship Team",        desc:"Creating atmospheres of praise and intimate encounter with the living God.",   icon:"♪", color:"#B8882A" },
  { name:"Prayer Warriors",     desc:"Standing in intercession for our church, our city, and the nations.",         icon:"🕊", color:"#2E5F8A" },
  { name:"Community Outreach",  desc:"Extending God's love beyond our walls through compassionate service.",         icon:"♥", color:"#2E7A52" },
];

const SERMONS = [
  { title:"Walking by Faith, Not by Sight",  ref:"2 Corinthians 5:7", date:"March 9, 2025",
    img:"https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=1400&q=85", feat:true },
  { title:"The Power of the Holy Spirit",    ref:"Acts 1:8",          date:"March 2",
    img:"https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=700&q=80" },
  { title:"Forgiveness: A Gift Freely Given",ref:"Ephesians 4:32",    date:"Feb 23",
    img:"https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=700&q=80" },
  { title:"Hope in the Darkest Valley",      ref:"Psalm 23:4",        date:"Feb 16",
    img:"https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=700&q=80" },
];

const EVENTS = [
  { day:"SUN", date:"16", mo:"MAR", title:"Sunday Worship Service",        time:"9:30 AM – 12:00 PM", tag:"Weekly",   color:"#8B1A2E" },
  { day:"WED", date:"19", mo:"MAR", title:"Midweek Prayer & Bible Study",  time:"6:30 PM – 8:00 PM",  tag:"Prayer",   color:"#2E5F8A" },
  { day:"SAT", date:"22", mo:"MAR", title:"Youth Fellowship Gathering",    time:"3:00 PM – 6:00 PM",  tag:"Youth",    color:"#B8882A" },
  { day:"SUN", date:"29", mo:"MAR", title:"Community Outreach Day",        time:"8:00 AM – 1:00 PM",  tag:"Outreach", color:"#2E7A52" },
];

/* ── Reusable inline button styles ─────────── */
const BTN = {
  solid: { fontFamily:"'Cinzel',serif", fontSize:13, letterSpacing:"0.24em", textTransform:"uppercase" as const, color:"#FAF6F0", background:"#8B1A2E", padding:"18px 48px", border:"2px solid #8B1A2E", display:"inline-block", textDecoration:"none", transition:"all 0.28s", cursor:"pointer" },
  outline: { fontFamily:"'Cinzel',serif", fontSize:13, letterSpacing:"0.24em", textTransform:"uppercase" as const, color:"#8B1A2E", background:"transparent", padding:"18px 48px", border:"2px solid #8B1A2E", display:"inline-block", textDecoration:"none", transition:"all 0.28s", cursor:"pointer" },
  gold: { fontFamily:"'Cinzel',serif", fontSize:13, letterSpacing:"0.24em", textTransform:"uppercase" as const, color:"#1C0A0F", background:"#B8882A", padding:"18px 48px", border:"2px solid #B8882A", display:"inline-block", textDecoration:"none", transition:"all 0.28s", cursor:"pointer" },
  ghost: { fontFamily:"'Cinzel',serif", fontSize:13, letterSpacing:"0.24em", textTransform:"uppercase" as const, color:"#FAF6F0", background:"transparent", padding:"18px 48px", border:"2px solid rgba(250,246,240,0.45)", display:"inline-block", textDecoration:"none", transition:"all 0.28s", cursor:"pointer" },
  sm: { fontFamily:"'Cinzel',serif", fontSize:11, letterSpacing:"0.22em", textTransform:"uppercase" as const, color:"#8B1A2E", background:"transparent", padding:"11px 26px", border:"2px solid #8B1A2E", display:"inline-block", textDecoration:"none", transition:"all 0.28s", cursor:"pointer", whiteSpace:"nowrap" as const, flexShrink:0 },
};

/* ── Component ─────────────────────────────── */
export default function HomePage() {
  const [vi, setVi] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => { setVi(i => (i+1) % VERSES.length); setFade(true); }, 500);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        /* ──────────── HERO ──────────── */
        .hero {
          min-height: 100vh;
          background:
            linear-gradient(170deg, rgba(28,10,15,0.42) 0%, rgba(28,10,15,0.20) 44%, rgba(250,246,240,0.95) 100%),
            url('https://images.unsplash.com/photo-1438232992991-995b671a1b8e?w=1900&q=85') center top / cover no-repeat;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding-bottom: 96px; position: relative;
        }
        .hero-grid {
          max-width: 1280px; margin: 0 auto; padding: 0 56px;
          display: grid; grid-template-columns: 1.15fr 0.85fr;
          gap: 64px; align-items: flex-end;
        }
        .hero-eye {
          font-family:'Cinzel',serif; font-size:12px; letter-spacing:0.44em;
          text-transform:uppercase; color:#B8882A;
          display:flex; align-items:center; gap:14px; margin-bottom:20px;
        }
        .hero-eye-line { width:44px; height:1.5px; background:#B8882A; }
        .hero-h1 {
          font-family:'Cinzel',serif; font-weight:700;
          font-size:clamp(5rem,11vw,9.5rem);
          line-height:0.92; color:#1C0A0F; margin-bottom:10px;
        }
        .hero-church {
          font-family:'Cormorant Garamond',serif; font-weight:400; font-style:italic;
          font-size:clamp(1.7rem,3.8vw,3rem); letter-spacing:0.24em;
          color:#8B1A2E; margin-bottom:30px;
        }
        .hero-desc {
          font-family:'Cormorant Garamond',serif;
          font-size:clamp(1.15rem,1.8vw,1.38rem); color:#4D2A1A;
          line-height:1.85; max-width:460px; margin-bottom:44px;
        }
        .hero-btns { display:flex; gap:18px; flex-wrap:wrap; }

        /* Verse card */
        .verse-card {
          background:rgba(255,255,255,0.97); backdrop-filter:blur(16px);
          border:1px solid #D4C0A8; border-left:5px solid #8B1A2E;
          padding:40px 44px; align-self:flex-end; margin-bottom:12px;
        }
        .vc-eye {
          font-family:'Cinzel',serif; font-size:10px; letter-spacing:0.42em;
          text-transform:uppercase; color:#B8882A;
          display:flex; align-items:center; gap:10px; margin-bottom:20px;
        }
        .vc-text {
          font-family:'Cormorant Garamond',serif; font-style:italic;
          font-size:clamp(1.25rem,2vw,1.55rem);
          color:#1C0A0F; line-height:1.7; margin-bottom:16px;
          transition:opacity 0.5s ease;
        }
        .vc-ref { font-family:'Cinzel',serif; font-size:11px; letter-spacing:0.26em; color:#8B1A2E; }
        .vc-dots { display:flex; gap:8px; margin-top:24px; }
        .vdot {
          width:8px; height:8px; border-radius:50%;
          background:#D4C0A8; border:none; padding:0;
          cursor:pointer; transition:background 0.3s;
        }
        .vdot.on { background:#8B1A2E; }

        /* ──────────── STATS ──────────── */
        .stats { background:#8B1A2E; padding:48px 56px; }
        .stats-grid {
          max-width:1040px; margin:0 auto;
          display:grid; grid-template-columns:repeat(4,1fr); text-align:center; gap:16px;
        }
        .stat-n { font-family:'Cinzel',serif; font-size:clamp(2.2rem,5vw,3.4rem); font-weight:700; color:#FAF6F0; line-height:1; }
        .stat-bar { width:36px; height:2.5px; background:#D4A840; margin:12px auto; }
        .stat-l { font-family:'Inter',sans-serif; font-size:12px; letter-spacing:0.18em; text-transform:uppercase; color:rgba(212,168,64,0.72); }

        /* ──────────── ABOUT ──────────── */
        .about-grid {
          max-width:1280px; margin:0 auto;
          display:grid; grid-template-columns:1fr 1fr; gap:88px; align-items:center;
        }
        .mosaic { position:relative; height:560px; }
        .m1 { position:absolute; top:0; left:0; width:70%; height:63%; object-fit:cover; box-shadow:0 12px 40px rgba(28,10,15,0.14); }
        .m2 { position:absolute; bottom:0; right:0; width:63%; height:56%; object-fit:cover; box-shadow:0 12px 40px rgba(28,10,15,0.14); }
        .m-badge {
          position:absolute; bottom:26%; left:3%; background:#8B1A2E;
          padding:22px 26px; z-index:2; box-shadow:0 10px 32px rgba(139,26,46,0.3);
        }
        .m-badge-n { font-family:'Cinzel',serif; font-size:2.5rem; font-weight:700; color:#FAF6F0; line-height:1; }
        .m-badge-l { font-family:'Inter',sans-serif; font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:#E2BF6A; margin-top:6px; }
        .m-cross { position:absolute; top:42%; left:34%; color:#8B1A2E; opacity:0.07; width:72px; height:96px; z-index:1; }

        .abt-eye { display:flex; align-items:center; gap:14px; margin-bottom:24px; }
        .abt-eye-line { width:52px; height:1.5px; background:linear-gradient(to right,#B8882A,transparent); }

        .mission-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin:36px 0 48px; }
        .mission-card { background:#F2E9DC; border:1px solid #D4C0A8; border-top:4px solid #8B1A2E; padding:24px; }
        .mc-title { font-family:'Cinzel',serif; font-size:11px; letter-spacing:0.3em; text-transform:uppercase; color:#8B1A2E; margin-bottom:10px; }
        .mc-text { font-family:'Cormorant Garamond',serif; font-size:clamp(1rem,1.3vw,1.15rem); color:#4D2A1A; line-height:1.72; }

        /* ──────────── SERMONS ──────────── */
        .sermons-bg { background:#F2E9DC; }
        .feat { position:relative; height:480px; overflow:hidden; cursor:pointer; margin-bottom:24px; }
        .feat img { width:100%; height:100%; object-fit:cover; transition:transform 0.65s; }
        .feat:hover img { transform:scale(1.04); }
        .feat-ov { position:absolute; inset:0; background:linear-gradient(to top,rgba(28,10,15,0.94) 32%,rgba(28,10,15,0.07) 100%); }
        .feat-play {
          position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
          width:84px; height:84px; border-radius:50%;
          background:rgba(139,26,46,0.90); border:3px solid rgba(250,246,240,0.65);
          color:#FAF6F0; display:flex; align-items:center; justify-content:center;
          transition:background 0.28s, transform 0.25s;
        }
        .feat-play:hover { background:#8B1A2E; transform:translate(-50%,-50%) scale(1.1); }
        .feat-info { position:absolute; bottom:0; left:0; right:0; padding:36px 44px; z-index:2; }
        .feat-badge {
          display:inline-block; font-family:'Cinzel',serif; font-size:10px;
          letter-spacing:0.3em; text-transform:uppercase;
          color:#1C0A0F; background:#D4A840; padding:6px 16px; margin-bottom:16px;
        }
        .feat-title { font-family:'Cinzel',serif; font-size:clamp(1.5rem,3vw,2.3rem); font-weight:600; color:#FAF6F0; margin-bottom:12px; line-height:1.2; }
        .feat-meta { font-family:'Inter',sans-serif; font-size:13px; letter-spacing:0.12em; color:rgba(212,168,64,0.85); text-transform:uppercase; }

        .scard { position:relative; height:260px; overflow:hidden; cursor:pointer; background:#E8D9C4; }
        .scard img { width:100%; height:100%; object-fit:cover; transition:transform 0.55s; }
        .scard:hover img { transform:scale(1.07); }
        .scard-ov { position:absolute; inset:0; background:linear-gradient(to top,rgba(28,10,15,0.92) 36%,rgba(28,10,15,0.06) 100%); z-index:1; }
        .scard-info { position:absolute; bottom:0; left:0; right:0; padding:20px 22px; z-index:2; }
        .scard-ref { font-family:'Cinzel',serif; font-size:10px; letter-spacing:0.26em; text-transform:uppercase; color:#D4A840; margin-bottom:8px; }
        .scard-title { font-family:'Cormorant Garamond',serif; font-size:clamp(1.05rem,1.6vw,1.22rem); font-weight:600; color:#FAF6F0; line-height:1.35; }
        .scard-play {
          position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
          width:52px; height:52px; border-radius:50%;
          background:rgba(139,26,46,0.88); border:2px solid rgba(250,246,240,0.55);
          color:#FAF6F0; display:flex; align-items:center; justify-content:center;
          opacity:0; transition:opacity 0.28s; z-index:2;
        }
        .scard:hover .scard-play { opacity:1; }

        /* ──────────── VERSE BANNER ──────────── */
        .vbanner {
          background:linear-gradient(145deg,#8B1A2E 0%,#3B1322 100%);
          padding:96px 56px; text-align:center; position:relative; overflow:hidden;
        }
        .vbanner::before {
          content:''; position:absolute; inset:0;
          background:
            radial-gradient(ellipse at 15% 50%, rgba(184,136,42,0.14) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 50%, rgba(184,136,42,0.10) 0%, transparent 55%);
        }
        .vb-inner { position:relative; z-index:1; max-width:800px; margin:0 auto; }
        .vb-q {
          font-family:'Cormorant Garamond',serif; font-style:italic; font-weight:400;
          font-size:clamp(1.55rem,3.2vw,2.5rem);
          color:#FAF6F0; line-height:1.65; margin-bottom:20px;
        }
        .vb-ref { font-family:'Cinzel',serif; font-size:12px; letter-spacing:0.34em; color:#E2BF6A; }

        /* ──────────── MINISTRIES ──────────── */
        .min-grid {
          max-width:1280px; margin:0 auto;
          display:grid; grid-template-columns:repeat(4,1fr); gap:24px;
        }
        .min-card {
          background:#FFFFFF; border:1px solid #EAE0D0; padding:40px 32px;
          transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s;
        }
        .min-card:hover { transform:translateY(-8px); box-shadow:0 24px 56px rgba(28,10,15,0.11); border-color:transparent; }
        .min-icon { font-size:30px; margin-bottom:24px; width:62px; height:62px; display:flex; align-items:center; justify-content:center; }
        .min-name { font-family:'Cinzel',serif; font-size:14px; letter-spacing:0.16em; font-weight:600; text-transform:uppercase; color:#1C0A0F; margin-bottom:14px; line-height:1.3; }
        .min-desc { font-family:'Cormorant Garamond',serif; font-size:clamp(1.05rem,1.4vw,1.18rem); color:#6B3D2E; line-height:1.78; margin-bottom:24px; }
        .min-lnk { font-family:'Cinzel',serif; font-size:11px; letter-spacing:0.26em; text-transform:uppercase; display:inline-flex; align-items:center; gap:8px; transition:gap 0.22s; text-decoration:none; }
        .min-lnk:hover { gap:13px; }

        /* ──────────── EVENTS ──────────── */
        .events-bg { background:#F2E9DC; }
        .events-list { max-width:1080px; margin:0 auto; }
        .ev-row {
          display:flex; align-items:center; gap:28px; padding:26px 16px;
          border-bottom:1px solid #D4C0A8; transition:background 0.22s; margin:0 -16px;
        }
        .ev-row:hover { background:rgba(139,26,46,0.04); }
        .ev-date { min-width:76px; text-align:center; background:#FFFFFF; border:1px solid #D4C0A8; padding:12px 8px; flex-shrink:0; }
        .ev-d { font-family:'Cinzel',serif; font-size:10px; letter-spacing:0.24em; color:#9A6A55; }
        .ev-n { font-family:'Cinzel',serif; font-size:30px; font-weight:700; color:#1C0A0F; line-height:1.1; }
        .ev-m { font-family:'Inter',sans-serif; font-size:9px; letter-spacing:0.22em; color:#9A6A55; text-transform:uppercase; margin-top:3px; }
        .ev-info { flex:1; min-width:0; }
        .ev-top { display:flex; align-items:center; gap:14px; flex-wrap:wrap; margin-bottom:8px; }
        .ev-title { font-family:'Cormorant Garamond',serif; font-size:clamp(1.15rem,1.8vw,1.35rem); font-weight:600; color:#1C0A0F; }
        .ev-tag { font-family:'Cinzel',serif; font-size:9px; letter-spacing:0.24em; text-transform:uppercase; padding:4px 12px; color:#FAF6F0; }
        .ev-time { font-family:'Inter',sans-serif; font-size:13px; color:#9A6A55; letter-spacing:0.06em; display:flex; align-items:center; gap:7px; }

        /* ──────────── GIVE ──────────── */
        .give-bg { background:#FFFFFF; text-align:center; }
        .give-inner { max-width:720px; margin:0 auto; position:relative; z-index:1; }
        .give-q { font-family:'Cormorant Garamond',serif; font-style:italic; font-size:clamp(1.25rem,2vw,1.55rem); color:#B8882A; margin-bottom:10px; }
        .give-ref { font-family:'Cinzel',serif; font-size:11px; letter-spacing:0.28em; text-transform:uppercase; color:#9A6A55; margin-bottom:32px; display:block; }
        .give-body { font-family:'Cormorant Garamond',serif; font-size:clamp(1.1rem,1.6vw,1.3rem); color:#4D2A1A; line-height:1.88; margin-bottom:48px; }

        /* ──────────── JOIN CTA ──────────── */
        .join {
          position:relative; min-height:500px;
          display:flex; align-items:center; justify-content:center; text-align:center; overflow:hidden;
        }
        .join-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
        .join-ov  { position:absolute; inset:0; background:linear-gradient(145deg,rgba(139,26,46,0.88),rgba(59,19,34,0.82)); }
        .join-inner { position:relative; z-index:1; padding:64px 24px; max-width:600px; margin:0 auto; }
        .join-eye { font-family:'Cinzel',serif; font-size:11px; letter-spacing:0.44em; text-transform:uppercase; color:#E2BF6A; display:block; margin-bottom:20px; }
        .join-h { font-family:'Cinzel',serif; font-size:clamp(2.2rem,5vw,3.8rem); font-weight:600; color:#FAF6F0; margin-bottom:20px; line-height:1.1; }
        .join-sub { font-family:'Cormorant Garamond',serif; font-style:italic; font-size:clamp(1.15rem,1.8vw,1.38rem); color:rgba(250,246,240,0.82); line-height:1.76; margin-bottom:44px; }

        /* ──────────── SECTION HEADER ──────────── */
        .sec-hdr { text-align:center; margin-bottom:64px; }
        .sec-hdr .eye { font-family:'Cinzel',serif; font-size:12px; letter-spacing:0.42em; text-transform:uppercase; color:#B8882A; display:block; margin-bottom:14px; }
        .sec-hdr .h2  { font-family:'Cinzel',serif; font-size:clamp(2.2rem,4.2vw,3.4rem); font-weight:600; color:#1C0A0F; line-height:1.16; }
        .sec-hdr .h2 .acc { color:#8B1A2E; }
        .sec-hdr .sub { font-family:'Cormorant Garamond',serif; font-style:italic; font-size:clamp(1.1rem,1.6vw,1.28rem); color:#6B3D2E; margin-top:16px; }
        .sec-hdr .ornrow { display:flex; align-items:center; gap:14px; justify-content:center; margin-bottom:18px; }
        .sec-hdr .ol { width:56px; height:1.5px; background:linear-gradient(to right,transparent,#B8882A); }
        .sec-hdr .ol.r { background:linear-gradient(to left,transparent,#B8882A); }

        /* ──────────── PAGE SECTIONS ──────────── */
        .pg { padding:112px 56px; }

        /* ──────────── RESPONSIVE ──────────── */
        @media (max-width:1100px) {
          .about-grid { grid-template-columns:1fr; gap:56px; }
          .mosaic { height:440px; }
          .min-grid { grid-template-columns:1fr 1fr; }
        }
        @media (max-width:900px) {
          .hero-grid { grid-template-columns:1fr; padding:0 32px; }
          .verse-card { margin-bottom:0; }
          .stats-grid { grid-template-columns:1fr 1fr; gap:28px; }
          .stats { padding:44px 32px; }
          .sg3 { grid-template-columns:1fr 1fr !important; }
          .pg { padding:80px 32px; }
        }
        @media (max-width:600px) {
          .hero-grid { padding:0 24px; }
          .hero-h1 { font-size:4.5rem !important; }
          .mission-grid { grid-template-columns:1fr; }
          .min-grid { grid-template-columns:1fr; }
          .sg3 { grid-template-columns:1fr !important; }
          .ev-row { flex-wrap:wrap; }
          .pg { padding:64px 20px; }
          .vbanner, .join-inner { padding-left:24px; padding-right:24px; }
        }
      `}</style>

      {/* ═══════════════════════════════════
          HERO
      ═══════════════════════════════════ */}
      <section className="hero">
        <div className="hero-grid">

          {/* Left — headline */}
          <div>
            <div className="hero-eye">
              <span className="hero-eye-line"/>
              Welcome to
            </div>
            <h1 className="hero-h1">BIMTO</h1>
            <p className="hero-church">Church</p>
            <p className="hero-desc">
              A community rooted in Scripture, united in love, and sent to make
              disciples in every generation. You belong here.
            </p>
            <div className="hero-btns">
              <Link href="/visit"   style={BTN.solid}>Plan Your Visit</Link>
              <Link href="/sermons" style={BTN.outline}>Watch Sermons</Link>
            </div>
          </div>

          {/* Right — verse card */}
          <div className="verse-card">
            <div className="vc-eye">
              <Cross style={{ width:14,height:19,color:"#B8882A" }}/>
              Verse of the Day
            </div>
            <p className="vc-text" style={{ opacity: fade ? 1 : 0 }}>
              "{VERSES[vi].text}"
            </p>
            <p className="vc-ref">— {VERSES[vi].ref}</p>
            <div className="vc-dots">
              {VERSES.map((_,i) => (
                <button key={i} className={`vdot ${i===vi?"on":""}`}
                  onClick={() => { setVi(i); setFade(true); }}
                  aria-label={`Verse ${i+1}`}/>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          STATS
      ═══════════════════════════════════ */}
      <div className="stats">
        <div className="stats-grid">
          {STATS.map(({ n, l }) => (
            <div key={l}>
              <div className="stat-n">{n}</div>
              <div className="stat-bar"/>
              <div className="stat-l">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════
          ABOUT
      ═══════════════════════════════════ */}
      <section className="pg" id="about">
        <div className="about-grid">

          {/* Mosaic */}
          <div className="mosaic">
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80" alt="Worship" className="m1"/>
            <img src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=800&q=80" alt="Community" className="m2"/>
            <div className="m-badge">
              <div className="m-badge-n">2012</div>
              <div className="m-badge-l">Est. Founded</div>
            </div>
            <div className="m-cross"><Cross style={{ width:"100%",height:"100%" }}/></div>
          </div>

          {/* Text */}
          <div>
            <div className="abt-eye">
              <span className="abt-eye-line"/>
              <span style={{ fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:"0.42em",textTransform:"uppercase",color:"#B8882A" }}>Our Story</span>
            </div>
            <h2 style={{ fontFamily:"'Cinzel',serif",fontSize:"clamp(2.2rem,4.2vw,3.4rem)",fontWeight:600,color:"#1C0A0F",lineHeight:1.16,marginBottom:24 }}>
              A Place of <span style={{ color:"#8B1A2E" }}>Love,</span><br/>Faith &amp; Community
            </h2>
            <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.15rem,1.7vw,1.32rem)",color:"#3D1F16",lineHeight:1.88,marginBottom:18 }}>
              Bimto Church was founded on the belief that every person deserves to
              experience the transforming love of God. For over a decade we have been
              a home for seekers, believers, and those searching for something deeper.
            </p>
            <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.15rem,1.7vw,1.32rem)",color:"#3D1F16",lineHeight:1.88 }}>
              We are a multicultural, multigenerational family united by grace, shaped
              by faith, and sent to serve our city and the world.
            </p>
            <div className="mission-grid">
              {[
                { t:"Our Mission", d:"To love God, love people, and make disciples in every generation." },
                { t:"Our Vision",  d:"A thriving church where every soul finds belonging and purpose." },
              ].map(({ t,d }) => (
                <div key={t} className="mission-card">
                  <div className="mc-title">{t}</div>
                  <p className="mc-text">{d}</p>
                </div>
              ))}
            </div>
            <Link href="/about" style={BTN.solid}>Discover Our Story</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SERMONS
      ═══════════════════════════════════ */}
      <section className="pg sermons-bg" id="sermons">
        <div className="sec-hdr">
          <div className="ornrow">
            <span className="ol r"/><Cross style={{ width:22,height:29,color:"#B8882A" }}/><span className="ol"/>
          </div>
          <span className="eye">From the Pulpit</span>
          <h2 className="h2">Latest <span className="acc">Sermons</span></h2>
        </div>
        <div style={{ maxWidth:1280,margin:"0 auto" }}>
          {/* Featured */}
          <div className="feat">
            <img src={SERMONS[0].img} alt={SERMONS[0].title}/>
            <div className="feat-ov"/>
            <button className="feat-play"><Play/></button>
            <div className="feat-info">
              <span className="feat-badge">Featured Sermon</span>
              <h3 className="feat-title">{SERMONS[0].title}</h3>
              <p className="feat-meta">Pastor James Mbewe &nbsp;·&nbsp; {SERMONS[0].date} &nbsp;·&nbsp; {SERMONS[0].ref}</p>
            </div>
          </div>
          {/* Cards */}
          <div className="sg3" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20,marginBottom:52 }}>
            {SERMONS.slice(1).map(s => (
              <div key={s.title} className="scard">
                <img src={s.img} alt={s.title}/>
                <div className="scard-ov"/>
                <button className="scard-play"><Play/></button>
                <div className="scard-info">
                  <div className="scard-ref">{s.date} · {s.ref}</div>
                  <h4 className="scard-title">{s.title}</h4>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center" }}>
            <Link href="/sermons" style={BTN.outline}>View All Sermons</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          VERSE BANNER
      ═══════════════════════════════════ */}
      <div className="vbanner">
        <div className="vb-inner">
          <Cross style={{ width:28,height:38,color:"#E2BF6A",margin:"0 auto 26px",display:"block" }}/>
          <p className="vb-q">"Come to me, all you who are weary and burdened, and I will give you rest."</p>
          <p className="vb-ref">— MATTHEW 11:28</p>
        </div>
      </div>

      {/* ═══════════════════════════════════
          MINISTRIES
      ═══════════════════════════════════ */}
      <section className="pg" id="ministries">
        <div className="sec-hdr">
          <span className="eye">Get Involved</span>
          <h2 className="h2">Our <span className="acc">Ministries</span></h2>
          <p className="sub">Find your place to serve and grow within the body of Christ</p>
        </div>
        <div className="min-grid">
          {MINISTRIES.map(({ name,desc,icon,color }) => (
            <div key={name} className="min-card" style={{ borderTop:`4px solid ${color}` }}>
              <div className="min-icon" style={{ background:`${color}14` }}>
                <span style={{ fontSize:28,color }}>{icon}</span>
              </div>
              <h3 className="min-name">{name}</h3>
              <p className="min-desc">{desc}</p>
              <Link href="/ministries" className="min-lnk" style={{ color }}>
                Learn More <Arrow/>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════
          EVENTS
      ═══════════════════════════════════ */}
      <section className="pg events-bg" id="events">
        <div className="sec-hdr">
          <span className="eye">Mark Your Calendar</span>
          <h2 className="h2">Upcoming <span className="acc">Events</span></h2>
        </div>
        <div className="events-list">
          {EVENTS.map(({ day,date,mo,title,time,tag,color }) => (
            <div key={title} className="ev-row">
              <div className="ev-date">
                <div className="ev-d">{day}</div>
                <div className="ev-n">{date}</div>
                <div className="ev-m">{mo}</div>
              </div>
              <div className="ev-info">
                <div className="ev-top">
                  <span className="ev-title">{title}</span>
                  <span className="ev-tag" style={{ background:color }}>{tag}</span>
                </div>
                <div className="ev-time"><Clock/>{time}</div>
              </div>
              <Link href="/events" style={BTN.sm}>Details</Link>
            </div>
          ))}
          <div style={{ textAlign:"center",marginTop:52 }}>
            <Link href="/events" style={BTN.solid}>View All Events</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          GIVE
      ═══════════════════════════════════ */}
      <section className="pg give-bg" style={{ position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",color:"#8B1A2E",opacity:0.05,width:340,height:454,pointerEvents:"none" }}>
          <Cross style={{ width:"100%",height:"100%" }}/>
        </div>
        <div className="give-inner">
          <span style={{ fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:"0.42em",textTransform:"uppercase",color:"#B8882A",display:"block",marginBottom:16 }}>
            Support the Ministry
          </span>
          <Cross style={{ width:28,height:38,color:"#8B1A2E",margin:"0 auto 24px",display:"block" }}/>
          <h2 style={{ fontFamily:"'Cinzel',serif",fontSize:"clamp(2.2rem,4.2vw,3.4rem)",fontWeight:600,color:"#1C0A0F",lineHeight:1.16,marginBottom:20 }}>
            Give with a <span style={{ color:"#8B1A2E" }}>Cheerful Heart</span>
          </h2>
          <p className="give-q">"Each one must give as he has decided in his heart, not reluctantly or under compulsion."</p>
          <span className="give-ref">— 2 Corinthians 9:7</span>
          <p className="give-body">
            Your generosity fuels our mission — from local outreach to global missions.
            Every gift, no matter the size, makes an eternal difference in someone's life.
          </p>
          <div style={{ display:"flex",gap:18,justifyContent:"center",flexWrap:"wrap" }}>
            <Link href="/give"         style={BTN.solid}>Give Online</Link>
            <Link href="/give#tithing" style={BTN.outline}>Learn About Tithing</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          JOIN CTA
      ═══════════════════════════════════ */}
      <section className="join">
        <img src="https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?w=1900&q=85" alt="Join our family" className="join-img"/>
        <div className="join-ov"/>
        <div className="join-inner">
          <Cross style={{ width:26,height:35,color:"#E2BF6A",margin:"0 auto 20px",display:"block" }}/>
          <span className="join-eye">You Belong Here</span>
          <h2 className="join-h">Join the Bimto Family</h2>
          <p className="join-sub">
            Whether you're new to faith or returning home — there is a place for you
            here, and we cannot wait to welcome you.
          </p>
          <div style={{ display:"flex",gap:18,justifyContent:"center",flexWrap:"wrap" }}>
            <Link href="/visit"   style={BTN.gold}>Plan Your Visit</Link>
            <Link href="/contact" style={BTN.ghost}>Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}