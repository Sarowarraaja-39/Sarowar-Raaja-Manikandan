import { useEffect, useRef, useState } from 'react';
import { career } from '../data/portfolio.js';
import CareerVisual from './CareerVisual.jsx';
import { Arrow, SectionHeading } from './StudioUI.jsx';

export default function ExperienceJourney() {
  const [index, setIndex] = useState(4); const tabs = useRef([]); const c = career[index];
  const [vertical, setVertical] = useState(() => window.matchMedia('(min-width:1100px)').matches);
  useEffect(() => { const media = window.matchMedia('(min-width:1100px)'); const change = () => setVertical(media.matches); media.addEventListener('change', change); return () => media.removeEventListener('change', change); }, []);
  const go = delta => setIndex(i => (i + delta + career.length) % career.length);
  const keyboard = (event, i) => {
    const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (delta === undefined && !['Home', 'End'].includes(event.key)) return;
    event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? career.length - 1 : (i + delta + career.length) % career.length;
    setIndex(next); tabs.current[next]?.focus();
  };
  return <section className="section journey-section" id="journey"><div className="wrap">
    <SectionHeading label="Experience / the operational foundation" title={<>Every connection<br/><span>shaped the next.</span></>}>From local networks to national infrastructure, then into cybersecurity. Seven chapters in how I investigate, document and communicate.</SectionHeading>
    <div className="journey-layout"><div className="chapter-nav" role="tablist" aria-label="Career chapters" aria-orientation={vertical ? 'vertical' : 'horizontal'}>{career.map((item, i) => <button ref={el => tabs.current[i] = el} key={item.id} role="tab" id={'career-tab-' + item.id} aria-controls="career-panel" aria-selected={index === i} tabIndex={index === i ? 0 : -1} onClick={() => setIndex(i)} onKeyDown={event => keyboard(event, i)}><span className="timeline-dot"/><small>{item.year}</small><strong>{item.title}</strong>{item.id.startsWith('presto') && <em>{item.id === 'presto-l1' ? 'PRESTO / L1' : 'PRESTO / L2'}</em>}</button>)}</div>
      <article className="career-panel" key={c.id} id="career-panel" role="tabpanel" aria-labelledby={'career-tab-' + c.id} tabIndex={0}>
        <div className="career-top"><span className="eyebrow">{c.chapter}</span><div><button className="icon-button" aria-label="Previous career chapter" onClick={() => go(-1)}>←</button><button className="icon-button" aria-label="Next career chapter" onClick={() => go(1)}>→</button></div></div>
        <div className="career-title"><span>{c.period}</span><h3>{c.role}</h3><p>{c.company}<span> / {c.location}</span></p></div>
        <div className="career-content"><div className="career-copy"><p className="career-lead">{c.lead}</p>{c.paragraphs.map(text => <p key={text}>{text}</p>)}</div><div className="career-evidence"><CareerVisual type={c.visual}/><ul>{c.bullets.map(text => <li key={text}>{text}</li>)}</ul></div></div>
        <div className="career-bottom"><div className="career-facts">{c.facts.map(f => <div key={f.label}><strong>{f.value}</strong><span>{f.label}</span></div>)}</div><ul className="tool-list">{c.tools.map(tool => <li key={tool}>{tool}</li>)}</ul></div>
      </article>
    </div>
    <div className="presto-note"><div><p className="eyebrow">Presto Info Solutions / Jun 2022 – Jul 2025</p><h3>One employment. Two responsibilities.</h3></div><div>{['presto-l1', 'presto-l2'].map((id, i) => <button key={id} aria-pressed={c.id === id} onClick={() => setIndex(career.findIndex(item => item.id === id))}><span>L{i + 1}</span>{i === 0 ? 'Tickets & customer RCA' : 'Engineering & migrations'}<Arrow/></button>)}</div></div>
    <p className="sr-only" aria-live="polite">Career chapter {index + 1} of {career.length}: {c.role} at {c.company}</p>
  </div></section>;
}
