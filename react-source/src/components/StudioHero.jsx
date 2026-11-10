import { useState } from 'react';
import { profile } from '../data/portfolio.js';
import HeroBackground from './HeroBackground.jsx';
import { Arrow } from './StudioUI.jsx';

export default function StudioHero({ motion }) {
  const [original, setOriginal] = useState(false);
  return <section className="studio-hero" id="home">
    <HeroBackground motion={motion}/>
    <div className="hero-coordinate" aria-hidden="true">CONNECTIVITY → RESILIENCE → SECURITY</div>
    <div className="hero-layout wrap">
      <div className="hero-copy">
        <p className="eyebrow hero-role">{profile.role}</p>
        <h1><span>Sarowar Raaja</span>{' '}<span>Manikandan<span className="name-stop">.</span></span></h1>
        <p className="hero-intro">{profile.intro}</p>
        <p className="hero-detail">{profile.introDetail}</p>
        <div className="hero-actions"><a className="button primary-button" href="#work">View projects<Arrow direction="right"/></a><a className="text-link" href="#journey">View experience<Arrow/></a></div>
        <div className="hero-values"><span>Connect reliably</span><span>Protect access</span><span>Verify every change</span></div>
      </div>
      <div className="hero-persona">
        <span className="engineering-backdrop" aria-hidden="true">ENGINEER</span>
        <div className="portrait-image"><img src={original ? './assets/sarowar-original.jpg' : './assets/sarowar-editorial.png'} className={original ? 'original-photo' : ''} alt={original ? 'Sarowar Raaja Manikandan at the University of Surrey' : 'Sarowar Raaja Manikandan in a navy suit'} width={original ? 1536 : 1086} height={original ? 2048 : 1448} fetchPriority="high"/></div>
        <div className="portrait-signature"><span className="signature-line"/><div><span>Engineer Behind the work</span><strong>Reliable networks.<br/>Security in every change.</strong></div><span className="signature-mark" aria-hidden="true">SR/</span></div>
        <button className="portrait-switch" aria-pressed={original} onClick={() => setOriginal(!original)}>{original ? 'View editorial portrait' : 'View original photo'}<Arrow/></button>
      </div>
    </div>
    <div className="hero-footer wrap"><p><span className="status-dot"/>Open to UK network & security roles</p><span>{profile.location} · Europe/London</span></div>
  </section>;
}

export function CredibilityStrip() {
  return <aside className="credibility-strip wrap" aria-label="Experience at a glance">
    <p className="credibility-intro"><span className="eyebrow">Experience at a glance</span><strong>Practical work.<br/>A clear record.</strong></p>
    <a href="#journey"><strong>341</strong><span>Routers personally migrated</span><small>Explore my experience <Arrow/></small></a>
    <a href="#journey"><strong>365+</strong><span>Routers covered by migration procedures</span><small>Planning, rollback & verification</small></a>
    <a href="#toolkit"><strong>CEH</strong><span>Certified Ethical Hacker</span><small>View skills & credentials <Arrow/></small></a>
  </aside>;
}
