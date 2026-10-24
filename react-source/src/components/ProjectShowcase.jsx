import { useRef, useState } from 'react';
import { projects } from '../data/portfolio.js';
import ProjectGlyph from './ProjectGlyph.jsx';
import { Monogram } from './Brand.jsx';
import { Arrow, SectionHeading } from './StudioUI.jsx';

const coordinates = [[2, 5], [2, 39], [2, 73], [69, 5], [69, 39], [69, 73]];
const paths = ['M370 250 C270 250 300 65 190 65', 'M370 250 C290 250 275 235 190 235', 'M370 250 C270 250 300 405 190 405', 'M370 250 C470 250 440 65 550 65', 'M370 250 C450 250 465 235 550 235', 'M370 250 C470 250 440 405 550 405'];

export default function ProjectShowcase({ onOpen }) {
  const [index, setIndex] = useState(0); const tabs = useRef([]); const p = projects[index];
  const go = direction => setIndex(i => (i + direction + projects.length) % projects.length);
  const keyboard = (event, i) => {
    const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (delta === undefined && !['Home', 'End'].includes(event.key)) return;
    event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? projects.length - 1 : (i + delta + projects.length) % projects.length;
    setIndex(next); tabs.current[next]?.focus();
  };
  return <section className="section work-section" id="work"><div className="wrap">
    <SectionHeading label="Selected work / six case studies" title={<>Follow the signal.<br/><span>Find the evidence.</span></>}>Research, practical investigations and professional documentation. Choose a connection to see the work behind it.</SectionHeading>
    <div className="work-layout">
      <div className="project-map" aria-label="Interactive portfolio map">
        <div className="map-heading"><span className="eyebrow">The evidence map</span><span>06 connected projects</span></div>
        <div className="map-canvas">
          <svg className="evidence-paths" viewBox="0 0 740 500" fill="none" aria-hidden="true">{paths.map((d, i) => <g key={d} className={i === index ? 'map-path active' : 'map-path'}><path d={d}/><path className="flow-run" d={d}/></g>)}</svg>
          <div className="map-hub" aria-hidden="true"><div className="hub-ring"/><div className="hub-core"><Monogram/></div><span>THE ANALYST<br/>MINDSET</span></div>
          <div className="map-tabs" role="tablist" aria-label="Select a project">{projects.map((project, i) => <button key={project.id} ref={el => tabs.current[i] = el} role="tab" id={'project-tab-' + project.id} aria-controls="project-panel" aria-selected={index === i} tabIndex={index === i ? 0 : -1} style={{ '--node-x': coordinates[i][0] + '%', '--node-y': coordinates[i][1] + '%' }} onClick={() => setIndex(i)} onKeyDown={event => keyboard(event, i)}><span className="map-node-icon"><ProjectGlyph type={project.visual}/></span><strong>{project.title}</strong><small>{project.type}</small><span className="node-point" aria-hidden="true"/></button>)}</div>
        </div>
        <div className="map-footnote"><span className="map-key"><i/>Selected case study</span><p>A map of my work, from network context to reviewable evidence.</p></div>
      </div>
      <article className="project-reader" key={p.id} id="project-panel" role="tabpanel" aria-labelledby={'project-tab-' + p.id} tabIndex={0}>
        <div className="project-reader-top"><span>{p.category}</span><span>{p.year}</span></div>
        <div className="reader-title"><ProjectGlyph type={p.visual}/><span>{p.type}<small>{p.status}</small></span></div>
        <h3>{p.title}</h3><p className="project-subtitle">{p.subtitle}</p><p className="project-description">{p.description}</p>
        <div className="project-metrics">{p.metrics.slice(0, 2).map(m => <div key={m.label}><strong>{m.value}</strong><span>{m.label}</span></div>)}</div>
        <p className="metric-note">{p.metricCaption || (p.id === 'twinshield' ? 'Reported research scores · evaluation context in the case study.' : p.metricNote)}</p>
        <ul className="tool-list" aria-label={p.title + ' tools and methods'}>{p.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
        <button className="button case-button" onClick={() => onOpen(p)}>Explore the case study<Arrow/></button>
        <div className="project-reader-controls"><span>{String(index + 1).padStart(2, '0')} <small>/ {String(projects.length).padStart(2, '0')}</small></span><div><button className="icon-button" onClick={() => go(-1)} aria-label="Previous project">←</button><button className="icon-button" onClick={() => go(1)} aria-label="Next project">→</button></div></div>
      </article>
    </div>
    <div className="case-walkthrough" aria-label={p.title + ' at a glance'}><article><span className="eyebrow">The problem</span><p>{p.problem}</p></article><article><span className="eyebrow">The approach</span><p>{p.approach[0]}</p></article><article><span className="eyebrow">The result & scope</span><p>{p.results}</p></article></div>
    <div className="work-caption"><p>Academic work, professional experience and research concepts keep their original scope.</p><a className="text-link" href="https://github.com/Sarowarraaja-39" target="_blank" rel="noreferrer">Explore my GitHub<Arrow/></a></div>
    <p className="sr-only" role="status" aria-live="polite">Project {index + 1} of {projects.length}: {p.title}</p>
  </div></section>;
}
