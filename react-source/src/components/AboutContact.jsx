import { useEffect, useRef, useState } from 'react';
import { engineeringStrengths, profile, projects } from '../data/portfolio.js';
import ProjectGlyph from './ProjectGlyph.jsx';
import { Monogram } from './Brand.jsx';
import { Arrow, SectionHeading, useClock } from './StudioUI.jsx';

export function AboutSection({ onOpen }) {
  return <section className="section about-section" id="about"><div className="wrap">
    <SectionHeading label="About me / the engineer behind the work" title={<>Understand the problem.<br/><span>Follow it through.</span></>}>A network fault affects people before it reaches a ticket. I connect the technical investigation with the communication and checks needed to restore service.</SectionHeading>
    <div className="about-layout"><figure className="mountain-panel"><img src="./assets/personal/himalayas-reminder.webp" alt="Sarowar’s chosen mountain-road poster, with the words Focus, Discipline and Consistency" width="853" height="1706" loading="lazy"/><figcaption><span className="eyebrow">The Himalayas / personal inspiration</span><span>A reminder I keep close.</span></figcaption></figure>
      <div className="about-copy">
        <div className="about-id"><img src="./assets/sarowar-original.jpg" alt="Original photograph of Sarowar at the University of Surrey" width="1368" height="1824" loading="lazy"/><div><strong>{profile.name}</strong><span>{profile.role} · {profile.location}</span></div></div>
        <p className="about-lead">My background spans local surveillance networks, banking connectivity and national telecom infrastructure. The scale changes; my approach stays practical.</p>
        <div className="about-story">
          <section><h3>From the first ticket to the final check.</h3><p>At L1, I gathered customer symptoms, ran initial checks and passed useful diagnostics to L2. In engineering work, I investigated routing and VPN faults, coordinated with field teams and Cisco TAC, and verified service recovery. Keeping the customer informed was part of the work throughout.</p></section>
          <section><h3>A change should be understandable to the next engineer.</h3><p>I produced Acceptance Testing records for hundreds of sites and migration procedures covering more than 365 routers. I set out readiness checks, the change sequence, rollback steps and post-change verification so another engineer could review the work and understand the risks.</p></section>
          <section><h3>Engineering habits, strengthened by security knowledge.</h3><p>Mechanical engineering at Anna University taught me to understand how systems fit together. My first-place Bell helicopter model was built entirely from scrap metals and recovered motors. Computer applications and my MSc Cybersecurity at Surrey added knowledge of connected systems, secure communications and network defence.</p></section>
        </div>
        <p className="about-personal">Away from the network, I play tennis, take long walks and have volunteered with The Cyber Helpline to make online-safety guidance easier to use.</p>
        <a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">Read my background on LinkedIn<Arrow/></a><div className="languages"><span className="eyebrow">Languages</span><ul>{profile.languages.map(language => <li key={language}>{language}</li>)}</ul></div>
      </div>
    </div>
    <div className="engineering-heading"><p className="eyebrow">How I contribute</p><h3>What your team can count on.</h3></div>
    <div className="engineering-strengths">{engineeringStrengths.map(strength => <article key={strength.number}><ProjectGlyph type={strength.visual}/><h4>{strength.title}</h4><p>{strength.description}</p>{strength.href ? <a className="text-link" href={strength.href}>{strength.linkLabel}<Arrow/></a> : <button className="text-link" onClick={() => onOpen(projects.find(p => p.id === strength.project))}>{strength.linkLabel}<Arrow/></button>}</article>)}</div>
  </div></section>;
}

export function ContactSection() {
  const [feedback, setFeedback] = useState('Copy email'); const timer = useRef(null); const clock = useClock();
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setFeedback('Email copied'); } catch { setFeedback('Use the email link'); }
    clearTimeout(timer.current); timer.current = setTimeout(() => setFeedback('Copy email'), 3500);
  };
  return <section className="section contact-section" id="contact"><div className="wrap">
    <div className="contact-top"><p className="eyebrow">Let’s connect</p><span><i className="status-dot"/>Open to UK network & security roles</span></div>
    <div className="contact-main"><div><h2>Good security starts<br/>with <span>good conversation.</span></h2><p>I’m looking for Network Engineer and Network Security Specialist opportunities in the UK. If your team needs help with routing, network support, secure connectivity or infrastructure changes, I’d like to hear from you.</p></div><a className="contact-avatar-link" href={'mailto:' + profile.email} aria-label="Email Sarowar"><span className="avatar-orbit" aria-hidden="true"/><img src="./assets/sarowar-avatar-v1.png" alt="" width="1254" height="1254" loading="lazy"/><span className="avatar-arrow" aria-hidden="true">↗</span></a></div>
    <div className="email-row"><a href={'mailto:' + profile.email}>{profile.email}<Arrow/></a><button className="copy-email" aria-live="polite" onClick={copy}>{feedback}</button></div>
    <div className="contact-links"><p>{profile.location}<span>{clock} · Europe/London</span></p><div><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn<Arrow/></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub<Arrow/></a><a href="#home">Back to top ↑</a></div></div>
  </div></section>;
}

export function StudioFooter() {
  return <footer className="studio-footer wrap"><a href="#home" aria-label="Sarowar Raaja Manikandan home"><Monogram/><span>Reliable networks.<br/>Thoughtful security.</span></a><p>© {new Date().getFullYear()} {profile.name}</p><span>Built with care. Always evolving.</span></footer>;
}
