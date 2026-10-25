import { education, profile, projects, skills } from '../data/portfolio.js';
import ProjectGlyph from './ProjectGlyph.jsx';
import SlidingFrames from './SlidingFrames.jsx';
import CapabilityScene from './CapabilityScene.jsx';
import { Arrow, NavIcon, SectionHeading } from './StudioUI.jsx';

export function SkillsSection({ motion, blocked, onOpen }) {
  const open = id => onOpen(projects.find(project => project.id === id));
  const titles = { '01': ['Understand','the traffic.'], '02': ['Follow','the evidence.'], '03': ['Make the checks','repeatable.'], '04': ['Turn findings','into priorities.'] };
  const toolRoles = {
    '01':['Network platforms','Core routing','Interior routing','Connected services','Traffic control'],
    '02':['Traffic & vulnerability analysis','Detection & test traffic','Trust & encryption','Artefact investigation','Investigation workflow'],
    '03':['Scripting','Connectivity checks','Configuration & templates','Versioning & evidence','Working knowledge'],
    '04':['Control frameworks','Compliance concepts','Exposure management','Secure development','Testing concepts'],
  };
  return <section className="section skills-section" id="toolkit"><div className="wrap">
    <SectionHeading label="Capabilities / the analyst toolkit" title={<>Tools are the start.<br/><span>How I use them matters.</span></>}>An operational foundation, practical security projects and a habit of leaving clear evidence. Explore the methods behind the tool names.</SectionHeading>
    <SlidingFrames id="skills" label="Skills and applied workflows" items={skills} getLabel={s => s.title} motion={motion} blocked={blocked} interval={11000} className="capability-carousel" renderTab={s => <><span className="capability-tab-icon" aria-hidden="true">{s.number === '01' ? '↔' : s.number === '02' ? '⌕' : s.number === '03' ? '>_' : '◎'}</span><span><small>{s.number} / CAPABILITY</small><strong>{s.title}</strong></span><span className="capability-tab-arrow" aria-hidden="true">↗</span></>}>
      {(s, i, active) => <article className="capability-slide" data-active={active}><div className="capability-content"><div className="capability-copy"><span className="eyebrow">{s.note}</span><h3>{titles[s.number][0]}<br/><span>{titles[s.number][1]}</span></h3><p>{s.description}</p>{s.evidence.href ? <a className="button primary-button" href={s.evidence.href}>{s.evidence.label}<Arrow/></a> : <button className="button primary-button" onClick={() => open(s.evidence.project)}>{s.evidence.label}<Arrow/></button>}<span className="capability-scope">{s.number === '04' ? 'Working knowledge and design exposure' : s.number === '02' ? 'Operational experience + academic labs' : s.note}</span></div><CapabilityScene number={s.number}/></div><div className="capability-tools"><h4><span className="eyebrow">The tools behind it</span><span>{s.title}</span></h4><ul aria-label={s.title + ' tools and methods'}>{s.items.map((item, itemIndex) => <li key={item}><small>{toolRoles[s.number][itemIndex]}</small><strong>{item}</strong></li>)}</ul></div></article>}
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
        <div className="campus-information"><div className="campus-focus"><span className="eyebrow">The foundation</span><p>{e.focus}</p><h4>Skills & focus</h4><ul className="campus-skills" aria-label={e.degree + ' skills'}>{e.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></div><div className="campus-projects"><h4 className="eyebrow">{e.projectLabel}</h4><p>{e.projectNote}</p>{e.studentProject && <figure className="student-project"><a className="student-project-photo-link" href={e.studentProject.photo.src} target="_blank" rel="noreferrer" aria-label="View original Bell helicopter project photograph"><img className="student-project-photo" src={e.studentProject.photo.src} alt={e.studentProject.photo.alt} width={e.studentProject.photo.width} height={e.studentProject.photo.height} loading="lazy"/></a><figcaption><div><strong>{e.studentProject.title}</strong><span>{e.studentProject.award}</span></div><a className="text-link" href={e.studentProject.photo.src} target="_blank" rel="noreferrer">View original photo<Arrow/></a></figcaption></figure>}{e.projectIds.map(id => { const project = projects.find(p => p.id === id); return <button key={id} className="education-project" onClick={() => onOpen(project)}><ProjectGlyph type={project.visual}/><span><strong>{project.title}</strong><small>{project.status}</small></span><Arrow/></button>; })}</div></div>
        <div className="campus-credit"><span>{e.campusNote || 'University campus photograph'}</span><div><a href={e.photo.source} target="_blank" rel="noreferrer">Photo: {e.photo.author}</a><a href={e.photo.licenseUrl} target="_blank" rel="noreferrer">{e.photo.license}</a><span>Display crop</span></div></div>
      </article>}
    </SlidingFrames>
  </div></section>;
}
