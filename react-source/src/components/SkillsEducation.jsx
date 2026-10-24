import { education, profile, projects, skills } from '../data/portfolio.js';
import ProjectGlyph from './ProjectGlyph.jsx';
import SlidingFrames from './SlidingFrames.jsx';
import { Arrow, NavIcon, SectionHeading } from './StudioUI.jsx';

export function SkillsSection({ motion, blocked, onOpen }) {
  const open = id => onOpen(projects.find(project => project.id === id));
  return <section className="section skills-section" id="toolkit"><div className="wrap">
    <SectionHeading label="Capabilities / tools with context" title={<>The right tools.<br/><span>A clear reason to use them.</span></>}>Network operations, security investigation, repeatable engineering and risk. Explore the tools alongside the work that gives them context.</SectionHeading>
    <SlidingFrames id="skills" label="Skills and tools" items={skills} getLabel={s => s.title} getDetail={s => s.note} motion={motion} blocked={blocked} interval={9000} className="skills-carousel">
      {s => <article className="skill-card"><div className="skill-lead"><span className="skill-symbol" aria-hidden="true">{s.number === '01' ? '↔' : s.number === '02' ? '◈' : s.number === '03' ? '>_' : '✓'}</span><span className="eyebrow">{s.note}</span><h3>{s.title}</h3><p>{s.description}</p>{s.evidence.href ? <a className="text-link" href={s.evidence.href}>{s.evidence.label}<Arrow/></a> : <button className="text-link" onClick={() => open(s.evidence.project)}>{s.evidence.label}<Arrow/></button>}</div><div className="skill-methods"><h4 className="eyebrow">Tools & methods</h4><ul className="skill-tools" aria-label={s.title + ' tools and methods'}>{s.items.map((item, i) => <li key={item}><span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>{item}<span className="tool-line" aria-hidden="true"/></li>)}</ul></div></article>}
    </SlidingFrames>
    <div className="certifications"><div><p className="eyebrow">Professional credentials</p><h3>Knowledge.<br/>Validated.</h3></div><div className="certification-list">{profile.certificates.map((certificate, i) => {
      const href = profile.certificateLinks?.[certificate]; const Tag = href ? 'a' : 'div';
      return <Tag className="cert-card" key={certificate} {...(href ? { href, target: '_blank', rel: 'noreferrer', 'aria-label': 'View ' + certificate + ' credential' } : {})}><span className="cert-icon">{i === 0 ? 'CEH' : 'S+'}</span><span><strong>{certificate}</strong><small>{i === 0 ? 'EC-Council' : 'CompTIA'} · {href ? 'View credential' : 'Certified'}</small></span>{href ? <Arrow/> : <span className="cert-check" aria-label="Certified">✓</span>}</Tag>;
    })}</div></div>
  </div></section>;
}

export function EducationSection({ motion, blocked, onOpen }) {
  return <section className="section education-section" id="education"><div className="wrap">
    <SectionHeading label="Education / places that shaped my thinking" title={<>Different places.<br/><span>A connected foundation.</span></>}>Engineering, computer applications and cybersecurity. The places, skills and projects behind the progression.</SectionHeading>
    <SlidingFrames id="education" label="Education, skills and related projects" items={education} getLabel={e => e.shortSchool} getDetail={e => e.level + ' · ' + e.period} motion={motion} blocked={blocked} interval={14000} className="education-carousel">
      {(e, i) => <article className="education-vista">
        <img className="campus-background" src={e.photo.src} alt={e.photo.alt} width={e.photo.width} height={e.photo.height} loading="lazy"/>
        <div className="campus-shade" aria-hidden="true"/>
        <div className="campus-title"><span className="eyebrow"><NavIcon type="education"/>{e.photo.caption}</span><h3>{e.school}</h3><p>{e.degree}</p><span className="campus-period">{e.period}</span></div>
        <div className="campus-information"><div className="campus-focus"><span className="eyebrow">The foundation</span><p>{e.focus}</p><h4>Skills & focus</h4><ul className="campus-skills" aria-label={e.degree + ' skills'}>{e.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></div><div className="campus-projects"><h4 className="eyebrow">{e.projectLabel}</h4><p>{e.projectNote}</p>{e.projectIds.map(id => { const project = projects.find(p => p.id === id); return <button key={id} className="education-project" onClick={() => onOpen(project)}><ProjectGlyph type={project.visual}/><span><strong>{project.title}</strong><small>{project.status}</small></span><Arrow/></button>; })}</div></div>
        <div className="campus-credit"><span>{e.campusNote || 'University campus photograph'}</span><div><a href={e.photo.source} target="_blank" rel="noreferrer">Photo: {e.photo.author}</a><a href={e.photo.licenseUrl} target="_blank" rel="noreferrer">{e.photo.license}</a><span>Display crop</span></div></div>
      </article>}
    </SlidingFrames>
  </div></section>;
}
