import { useState } from 'react';
import { profile } from '../data/portfolio.js';
import HeroBackground from './HeroBackground.jsx';
import { Arrow } from './StudioUI.jsx';

export default function StudioHero({ motion }) {
  const [original, setOriginal] = useState(false);
  return <section className="studio-hero" id="home">
    <HeroBackground motion={motion}/>
    <div className="hero-coordinate" aria-hidden="true">NETWORKS → EVIDENCE → SECURITY</div>
    <div className="hero-layout wrap">
      <div className="hero-copy">
        <p className="eyebrow hero-role">Network & security professional</p>
        <h1><span>Sarowar Raaja</span>{' '}<span>Manikandan<span className="name-stop">.</span></span></h1>
        <p className="hero-intro">I’m a network and security professional building my career in <strong>cybersecurity analysis.</strong></p>
        <p className="hero-detail">{profile.introDetail}</p>
        <p className="hero-detail">{profile.studyDetail}</p>
        <a className="button primary-button" href="#work">Explore my work<Arrow direction="right"/></a>
        <div className="hero-values"><span>Analyse the traffic</span><span>Detect the threat</span><span>Built a safer tomorrow</span></div>
      </div>
      <div className="hero-persona">
        <span className="analyst-backdrop" aria-hidden="true">ANALYST</span>
        <div className="portrait-image"><img src={original ? './assets/sarowar-original.jpg' : './assets/sarowar-editorial.png'} className={original ? 'original-photo' : ''} alt="Sarowar Raaja Manikandan in a navy suit" width="1024" height="1536" fetchPriority="high"/></div>
        <div className="portrait-signature"><span className="signature-line"/><div><span>Engineer Behind the work</span><strong>Network roots.<br/>An analyst’s mindset.</strong></div><span className="signature-mark" aria-hidden="true">SR/</span></div>
        <button className="portrait-switch" aria-pressed={original} onClick={() => setOriginal(!original)}>{original ? 'View editorial portrait' : 'View original photo'}<Arrow/></button>
      </div>
    </div>
    <div className="hero-footer wrap"><p><span className="status-dot"/>Open to UK opportunities</p><span>{profile.location} · Europe/London</span><a href="#work">Discover the work<Arrow direction="right"/></a></div>
  </section>;
}

export function CredibilityStrip() {
  return <div className="credibility-strip wrap"><p>Built on operations.<br/><strong>Grounded in evidence.</strong></p><div><strong>100s</strong><span>Sites with AT documentation</span></div><div><strong>365+</strong><span>Routers covered by MOPs</span></div><div><strong>CEH + Security+</strong><span>Professional certifications</span></div></div>;
}
