import { useEffect, useRef, useState } from 'react';
import { analystStrengths, profile, projects } from '../data/portfolio.js';
import ProjectGlyph from './ProjectGlyph.jsx';
import { Monogram } from './Brand.jsx';
import { Arrow, SectionHeading, useClock } from './StudioUI.jsx';

export function AboutSection({ onOpen }) {
  return <section className="section about-section" id="about"><div className="wrap">
    <SectionHeading label="Beyond the work / the human part" title={<>Curiosity, with<br/><span>follow-through.</span></>}>I like understanding how things connect — and helping people when they don’t.</SectionHeading>
    <div className="about-layout"><figure className="mountain-panel"><img src="./assets/personal/himalayas-reminder.webp" alt="Sarowar’s chosen mountain-road poster, with the words Focus, Discipline and Consistency" width="853" height="1706" loading="lazy"/><figcaption><span className="eyebrow">The Himalayas / personal inspiration</span><span>A reminder I keep close.</span></figcaption></figure>
      <div className="about-copy"><div className="about-id"><img src="./assets/sarowar-original.jpg" alt="Original photograph of Sarowar at the University of Surrey" width="1368" height="1824" loading="lazy"/><div><strong>{profile.name}</strong><span>Engineer. Analyst mindset. Always learning.</span></div></div><h3>Focus. Discipline.<br/>Consistency.</h3><p className="about-lead">Progress is built in the details.</p><p>My path runs from surveillance and banking networks to national telecoms infrastructure, then into cybersecurity research. Traffic analysis, incident handling and controlled changes shape how I approach investigation.</p><p>I value clear communication and evidence that other people can review. My AT and MOP documentation work taught me to record checks, explain operational risks and make handovers useful.</p><p>Alongside my studies, I’ve volunteered with The Cyber Helpline to make online-safety guidance more accessible. Outside the work, you’ll find me on a tennis court or taking a long walk to reset.</p><div className="about-principles"><span>Follow the evidence.</span><span>Explain the decision.</span><span>Keep learning.</span></div><a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">The full story on LinkedIn<Arrow/></a><div className="languages"><span className="eyebrow">Good communication travels</span><ul>{profile.languages.map(language => <li key={language}>{language}</li>)}</ul></div></div>
    </div>
    <div className="analyst-heading"><p className="eyebrow">From experience to investigation</p><h3>What I bring to an analyst role.</h3></div>
    <div className="analyst-strengths">{analystStrengths.map(strength => <article key={strength.number}><ProjectGlyph type={strength.visual}/><h4>{strength.title}</h4><p>{strength.description}</p>{strength.href ? <a className="text-link" href={strength.href}>{strength.linkLabel}<Arrow/></a> : <button className="text-link" onClick={() => onOpen(projects.find(p => p.id === strength.project))}>{strength.linkLabel}<Arrow/></button>}</article>)}</div>
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
    <div className="contact-top"><p className="eyebrow">Let’s connect</p><span><i className="status-dot"/>Open to UK opportunities</span></div>
    <div className="contact-main"><div><h2>Good security starts<br/>with <span>good conversation.</span></h2><p>Cybersecurity analyst opportunities, security operations, or a project that needs an evidence-led approach. I’d like to hear what you’re working on.</p></div><a className="contact-avatar-link" href={'mailto:' + profile.email} aria-label="Email Sarowar"><span className="avatar-orbit" aria-hidden="true"/><img src="./assets/sarowar-avatar-v1.png" alt="" width="1254" height="1254" loading="lazy"/><span className="avatar-arrow" aria-hidden="true">↗</span></a></div>
    <div className="email-row"><a href={'mailto:' + profile.email}>{profile.email}<Arrow/></a><button className="copy-email" aria-live="polite" onClick={copy}>{feedback}</button></div>
    <div className="contact-links"><p>{profile.location}<span>{clock} · Europe/London</span></p><div><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn<Arrow/></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub<Arrow/></a><a href="#home">Back to top ↑</a></div></div>
  </div></section>;
}

export function StudioFooter() {
  return <footer className="studio-footer wrap"><a href="#home" aria-label="Sarowar Raaja Manikandan home"><Monogram/><span>Thoughtful engineering.<br/>Clear evidence.</span></a><p>© {new Date().getFullYear()} {profile.name}</p><span>Built with care. Always evolving.</span></footer>;
}
