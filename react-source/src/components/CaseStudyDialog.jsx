import { useEffect, useRef } from 'react';
import { profile } from '../data/portfolio.js';
import ProjectVisual from './ProjectVisual.jsx';
import { Arrow } from './StudioUI.jsx';

export default function CaseStudyDialog({ project, onClose }) {
  const ref = useRef(null); const close = useRef(null);
  useEffect(() => {
    if (!project) return;
    const previous = document.activeElement; const dialog = ref.current;
    dialog.showModal(); close.current?.focus(); document.body.style.overflow = 'hidden';
    return () => { if (dialog.open) dialog.close(); document.body.style.overflow = ''; previous?.focus(); };
  }, [project]);
  return <dialog className="case-dialog" ref={ref} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target !== ref.current) return; const rect = ref.current.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose(); }} aria-labelledby="case-title">{project && <>
    <div className="dialog-top"><span>CASE FILE / {project.number} / {project.category}</span><button className="icon-button" ref={close} onClick={onClose} aria-label="Close case study">×</button></div>
    <div className="dialog-heading"><span className="eyebrow">{project.type} · {project.status}</span><h2 id="case-title">{project.title}</h2><p>{project.subtitle}</p></div><ProjectVisual type={project.visual}/>
    <section className="dialog-block"><h3>The problem</h3><p>{project.problem}</p></section><section className="dialog-block"><h3>The approach</h3><ul>{project.approach.map(item => <li key={item}>{item}</li>)}</ul></section><section className="dialog-block"><h3>The result & scope</h3><p>{project.results}</p><div className="dialog-metrics">{project.metrics.map(metric => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div><p className="metric-note">{project.metricNote}</p></section><section className="dialog-block"><h3>Analyst relevance</h3><p>{project.analystValue}</p><ul>{project.deliverables.map(item => <li key={item}>{item}</li>)}</ul></section><section className="dialog-block"><h3>Tools & methods</h3><ul className="tool-list">{project.tools.map(tool => <li key={tool}>{tool}</li>)}</ul></section><div className="dialog-evidence"><p className="eyebrow">Evidence & next step</p><p>{project.evidence}</p><a className="text-link" href={profile.github} target="_blank" rel="noreferrer">{project.evidenceLinkLabel || 'Browse my GitHub profile'}<Arrow/></a></div>
  </>}</dialog>;
}
