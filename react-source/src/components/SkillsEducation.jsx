import { education, mechanicalFoundation, profile, projects, skills } from '../data/portfolio.js';
import ProjectGlyph from './ProjectGlyph.jsx';
import SlidingFrames from './SlidingFrames.jsx';
import CapabilityScene from './CapabilityScene.jsx';
import { Arrow, NavIcon, SectionHeading } from './StudioUI.jsx';

export function SkillsSection({ motion, blocked, onOpen }) {
  const open = id => onOpen(projects.find(project => project.id === id));
  const titles = { '01': ['Keep networks','connected.'], '02': ['Protect','the network.'], '03': ['Make checks','repeatable.'], '04': ['Control','the change.'] };
  const previews = { '01':'Cisco · BGP · MPLS', '02':'FMC · Wireshark · Nessus', '03':'Python · Bash · Git', '04':'AT · MOP · rollback' };
  const toolRoles = {
    '01':['Network platforms','Core routing','Interior routing','Connected services','Traffic control'],
    '02':['Security controls','Traffic analysis','Vulnerability checks','Protected communications','Academic detection labs'],
    '03':['Scripting','Connectivity checks','Configuration & templates','Versioning & evidence','Working knowledge'],
    '04':['Change procedures','Service validation','Framework knowledge','Secure development','Risk & remediation'],
  };
  return <section className="section skills-section" id="toolkit"><div className="wrap">
    <SectionHeading label="Capabilities / network engineering & security" title={<>The tools I use,<br/><span>and what I use them for.</span></>}>Routing and switching keep services connected. Security controls protect access. Repeatable checks and clear change procedures help me verify that both work as intended.</SectionHeading>
    <SlidingFrames id="skills" label="Skills and applied workflows" items={skills} getLabel={s => s.title} motion={motion} blocked={blocked} interval={11000} className="capability-carousel" renderTab={s => <><span className="capability-tab-icon" aria-hidden="true">{s.number === '01' ? '↔' : s.number === '02' ? '⌕' : s.number === '03' ? '>_' : '◎'}</span><span><small>{s.number} / CAPABILITY</small><strong>{s.title}</strong><span className="capability-tab-summary">{previews[s.number]}</span></span><span className="capability-tab-arrow" aria-hidden="true">↗</span></>}>
      {(s, i, active) => <article className="capability-slide" data-active={active}><div className="capability-content"><div className="capability-copy"><span className="eyebrow">{s.note}</span><h3>{titles[s.number][0]}<br/><span>{titles[s.number][1]}</span></h3><p>{s.description}</p>{s.evidence.href ? <a className="button primary-button" href={s.evidence.href}>{s.evidence.label}<Arrow/></a> : <button className="button primary-button" onClick={() => open(s.evidence.project)}>{s.evidence.label}<Arrow/></button>}<span className="capability-scope">{s.note}</span></div><CapabilityScene number={s.number}/></div><div className="capability-tools"><h4><span className="eyebrow">The tools behind it</span><span>{s.title}</span></h4><ul aria-label={s.title + ' tools and methods'}>{s.items.map((item, itemIndex) => <li key={item}><small>{toolRoles[s.number][itemIndex]}</small><strong>{item}</strong></li>)}</ul></div></article>}
    </SlidingFrames>
    <MechanicalFoundation/>
    <div className="certifications"><div><p className="eyebrow">Credentials & learning</p><h3>Knowledge.<br/>Kept current.</h3></div><div className="certification-list">{profile.credentials.map(credential => {
      const {href} = credential; const Tag = href ? 'a' : 'div';
      return <Tag className="cert-card" data-kind={credential.kind} key={credential.name} {...(href ? { href, target: '_blank', rel: 'noreferrer', 'aria-label': 'View ' + credential.name + ' credential' } : {})}><span className="cert-icon">{credential.badge}</span><span><strong>{credential.name}</strong><small>{credential.issuer} · {credential.status}</small></span>{href ? <Arrow/> : <span className="credential-type">Study</span>}</Tag>;
    })}</div></div>
  </div></section>;
}

function MechanicalFoundation() {
  return <aside className="mechanical-foundation" aria-labelledby="mechanical-foundation-title">
    <div><p className="eyebrow">Academic foundation / Anna University · Regulation 2013</p><h3 id="mechanical-foundation-title">Mechanical engineering.<br/><span>A practical starting point.</span></h3><p>Building a Bell helicopter model from reclaimed materials made this foundation practical: work with the parts available, understand how they fit together and complete a model that others can inspect.</p><a className="text-link" href="#education">Explore my education<Arrow/></a></div>
    <ul>{mechanicalFoundation.summary.map(area => <li key={area.title}><strong>{area.title}</strong><p>{area.detail}</p></li>)}</ul>
  </aside>;
}

function LearningGroups({ groups, narrative }) {
  return <div className={narrative ? "learning-groups learning-groups--narrative" : "learning-groups"}>{groups.map(group => <section key={group.title}><h5>{group.title}</h5><p>{group.description}</p>{group.items && <ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul>}</section>)}</div>;
}

function EducationProjectCard({ project, onOpen }) {
  return <article className="education-project-card">
    <header><ProjectGlyph type={project.visual}/><div><h5>{project.title}</h5><span>{project.type} · {project.status}</span></div></header>
    <p>{project.description}</p>
    <ul className="project-evidence-points" aria-label={project.title + ' deliverables'}>{project.deliverables.map(item => <li key={item}>{item}</li>)}</ul>
    <div className="education-project-meaning"><h6>What it demonstrates</h6><p>{project.analystValue}</p></div>
    <ul className="tool-list" aria-label={project.title + ' tools'}>{project.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
    <button className="education-project" onClick={() => onOpen(project)}>Explore case study<Arrow/></button>
  </article>;
}

function StudentProject({ project }) {
  return <figure className="student-project">
    <a className="student-project-photo-link" href={project.photo.src} target="_blank" rel="noreferrer" aria-label="View original Bell helicopter project photograph"><img className="student-project-photo" src={project.photo.src} alt={project.photo.alt} width={project.photo.width} height={project.photo.height} loading="lazy"/></a>
    <figcaption><div><strong>{project.title}</strong><span>{project.award}</span></div><a className="text-link" href={project.photo.src} target="_blank" rel="noreferrer">View original photo<Arrow/></a></figcaption>
    <dl className="student-project-story">{project.details.map(detail => <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.text}</dd></div>)}</dl>
  </figure>;
}

export function EducationSection({ motion, blocked, onOpen }) {
  return <section className="section education-section" id="education"><div className="wrap">
    <SectionHeading label="Education / places that shaped my thinking" title={<>Different places.<br/><span>A connected foundation.</span></>}>Mechanical engineering, computer applications and cybersecurity. The technical knowledge, practical work and thinking behind my progression.</SectionHeading>
    <SlidingFrames id="education" label="Education, skills and related projects" items={education} getLabel={e => e.shortSchool} getDetail={e => e.level + ' · ' + e.period} motion={motion} blocked={blocked} interval={30000} className="education-carousel">
      {e => <article className="education-vista">
        <img className="campus-background" src={e.photo.src} alt={e.photo.alt} width={e.photo.width} height={e.photo.height} loading="lazy"/>
        <div className="campus-shade" aria-hidden="true"/>
        <div className="campus-title"><span className="eyebrow"><NavIcon type="education"/>{e.photo.caption}</span><h3>{e.school}</h3><p>{e.degree}</p><div className="campus-meta"><span className="campus-period">{e.period}</span>{e.regulation && <span className="campus-regulation">{e.regulation}</span>}</div></div>
        <div className="campus-information">
          <div className="campus-focus">
            <span className="eyebrow">The foundation</span><p>{e.focus}</p><p className="campus-overview">{e.overview}</p>
            {e.showAppliedSkills && <><h4>{e.skillsLabel}</h4><ul className="campus-skills" aria-label={e.degree + ' skills'}>{e.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></>}
            <h4>{e.learningLabel}</h4><LearningGroups groups={e.learningGroups} narrative={!e.showAppliedSkills}/>
            {e.curriculumSource && <a className="curriculum-source text-link" href={e.curriculumSource.href} target="_blank" rel="noreferrer">{e.curriculumSource.label}<Arrow/></a>}
            <aside className="degree-connection"><h4>What I bring to network engineering</h4><p>{e.engineeringConnection}</p></aside>
          </div>
          <div className="campus-projects"><h4 className="eyebrow">{e.projectLabel}</h4><p>{e.projectNote}</p>
            {e.studentProject && <StudentProject project={e.studentProject}/>}
            {e.projectIds.map(id => <EducationProjectCard key={id} project={projects.find(project => project.id === id)} onOpen={onOpen}/>)}
          </div>
        </div>
        <div className="campus-credit"><span>{e.campusNote || 'University campus photograph'}</span><div><a href={e.photo.source} target="_blank" rel="noreferrer">Photo: {e.photo.author}</a><a href={e.photo.licenseUrl} target="_blank" rel="noreferrer">{e.photo.license}</a><span>Display crop</span></div></div>
      </article>}
    </SlidingFrames>
  </div></section>;
}
