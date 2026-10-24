import { useEffect, useRef, useState } from 'react';
import { profile, career, projects, skills, education, analystStrengths } from './data/portfolio.js';
import Brand, { Monogram } from './components/Brand.jsx';
import ProjectGlyph from './components/ProjectGlyph.jsx';
import NetworkScene from './components/NetworkScene.jsx';
import ProjectVisual from './components/ProjectVisual.jsx';
import CareerVisual from './components/CareerVisual.jsx';
import SlidingFrames from './components/SlidingFrames.jsx';
import HeroBackground from './components/HeroBackground.jsx';

const portrait='./assets/sarowar-editorial.png';
const original='./assets/sarowar-original.jpg';
const Arrow=({direction='up'})=><span className="arrow" aria-hidden="true">{direction==='left'?'←':direction==='right'?'→':direction==='down'?'↓':'↗'}</span>;
function SectionLabel({number,children}){return <p className="section-label"><span>{number}</span><i/>{children}</p>;}
function useMotion(){
 const [motion,setMotion]=useState(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return false;try{return localStorage.getItem('sarowar-motion')!=='off';}catch{return true;}});
 useEffect(()=>{document.documentElement.dataset.motion=motion?'on':'off';try{localStorage.setItem('sarowar-motion',motion?'on':'off');}catch{}},[motion]);
 useEffect(()=>{const m=window.matchMedia('(prefers-reduced-motion: reduce)');const change=()=>{if(m.matches)setMotion(false);};m.addEventListener('change',change);return()=>m.removeEventListener('change',change);},[]);
 return [motion,setMotion];
}
function useClock(){
 const [clock,setClock]=useState('UK LOCAL TIME');
 useEffect(()=>{const update=()=>setClock(new Intl.DateTimeFormat('en-GB',{timeZone:profile.timezone,hour:'2-digit',minute:'2-digit',timeZoneName:'short'}).format(new Date()));update();const id=setInterval(update,60000);return()=>clearInterval(id);},[]);
 return clock;
}
function useReveal(){
 useEffect(()=>{if(!('IntersectionObserver' in window))return;const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');io.unobserve(e.target);}}),{threshold:.08});document.querySelectorAll('[data-reveal]').forEach(el=>io.observe(el));return()=>io.disconnect();},[]);
}
function useCompactProjects(){
 const [compact,setCompact]=useState(()=>window.matchMedia('(max-width:900px)').matches);
 useEffect(()=>{const media=window.matchMedia('(max-width:900px)');const change=()=>setCompact(media.matches);media.addEventListener('change',change);return()=>media.removeEventListener('change',change);},[]);
 return compact;
}
function Header({motion,setMotion}){
 const [menu,setMenu]=useState(false),[active,setActive]=useState('home');const bar=useRef(null);const menuTrigger=useRef(null);
 useEffect(()=>{const key=e=>{if(e.key==='Escape'&&menu){setMenu(false);menuTrigger.current?.focus();}};document.addEventListener('keydown',key);return()=>document.removeEventListener('keydown',key);},[menu]);
 useEffect(()=>{const scroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;if(bar.current)bar.current.style.transform='scaleX('+(max>0?scrollY/max:0)+')';};scroll();addEventListener('scroll',scroll,{passive:true});return()=>removeEventListener('scroll',scroll);},[]);
 useEffect(()=>{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setActive(e.target.id);}),{rootMargin:'-10% 0px -60% 0px'});document.querySelectorAll('main>section[id]').forEach(el=>io.observe(el));return()=>io.disconnect();},[]);
 return <><a className="skip-link" href="#main">Skip to content</a><header className="header"><div className="header-inner container">
  <Brand/>
  <nav className={menu?'nav menu-open':'nav'} id="main-nav" aria-label="Main navigation">{[['work','Work'],['journey','Journey'],['about','About'],['toolkit','Skills'],['contact','Contact']].map(([id,label])=><a key={id} href={'#'+id} onClick={()=>setMenu(false)} aria-current={active===id?'location':undefined}>{label}<span aria-hidden="true">↗</span></a>)}</nav>
  <div className="header-actions"><button className="motion-control" onClick={()=>setMotion(!motion)} aria-pressed={motion} aria-label={motion?'Pause decorative motion':'Enable decorative motion'}><span aria-hidden="true">{motion?'Ⅱ':'▷'}</span><span className="motion-label">Motion {motion?'on':'off'}</span></button><button className="menu-toggle" ref={menuTrigger} aria-controls="main-nav" aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?'Close':'Menu'}<span aria-hidden="true">{menu?'×':'☰'}</span></button></div>
 </div><div className="page-progress" ref={bar}/></header></>;
}
function Hero({motion}){
 const [isOriginal,setOriginal]=useState(false);const clock=useClock();
 return <section className="hero poster-hero" id="home"><HeroBackground motion={motion}/><div className="hero-ambient"/><div className="hero-grid container">
  <div className="hero-copy"><p className="overline">NETWORK & SECURITY PROFESSIONAL</p><h1>ANALYST</h1><p className="hero-tagline">Analyse the traffic<br/>Detect the threat<br/>Built a safer tomorrow</p><div className="hero-buttons"><a className="button button-amber" href="#work">View the work <span className="button-icon"><Arrow/></span></a></div></div>
  <div className="portrait-stage"><NetworkScene motion={motion}/><div className="portrait-frame"><img className={isOriginal?'portrait-img original-photo':'portrait-img'} src={isOriginal?original:portrait} alt="Sarowar Raaja Manikandan in a navy suit" fetchPriority="high" width="1024" height="1536"/></div><button className="portrait-switch" onClick={()=>setOriginal(!isOriginal)} aria-pressed={isOriginal}>{isOriginal?'View editorial portrait':'View original photo'} <Arrow/></button></div>
  <div className="hero-side"><div className="hero-side-intro"><p className="hero-availability"><span className="status-dot"/>OPEN TO UK OPPORTUNITIES</p><h2><span>Cybersecurity analysis.</span><span>Built on networks.</span></h2><div className="hero-person"><p>I’m <strong>{profile.name}</strong>, {profile.intro}</p></div><p className="hero-summary">{profile.introDetail}</p></div><div className="hero-side-meta"><div className="hero-location"><span className="location-pin" aria-hidden="true">⌖</span><span>{profile.location}</span><span className="meta-divider"/><span>{clock}</span></div><div className="portrait-caption"><Monogram/><div><strong>SAROWAR RAAJA</strong><span>Engineer Behind the work</span></div><span className="caption-cross" aria-hidden="true">↗</span></div></div></div>
  <div className="hero-focus"><div className="hero-focus-icons" aria-hidden="true">{['01','02','03'].map(n=><span key={n}><SkillIcon number={n}/></span>)}</div><p>Networks. Security. Automation.<br/><span>Operational roots. An analyst’s mindset.</span></p></div>
 </div></section>;
}
function Credibility(){
 return <div className="credibility-strip"><div className="credibility-content container">
  <p>Clear evidence.<br/><strong>A stronger foundation.</strong></p>
  <div><b>100s</b><span>SITES WITH AT DOCUMENTATION</span></div>
  <div><b>365+</b><span>ROUTERS COVERED BY MOPs</span></div>
  <div><b>CEH / SECURITY+</b><span>PROFESSIONAL CERTIFICATIONS</span></div>
 </div></div>;
}
function ProjectSlide({project:p,outgoing=false,entering=false,onOpen}){
 return <article id={outgoing?undefined:'project-panel'} role={outgoing?undefined:'tabpanel'} aria-labelledby={outgoing?undefined:'project-tab-'+p.id} aria-hidden={outgoing||undefined} inert={outgoing||undefined} tabIndex={outgoing?undefined:0} className={'project-slide '+(outgoing?'project-slide-outgoing':entering?'project-slide-entering':'')}>
  <div className="project-image"><div className="project-image-heading"><span>{p.category}</span><span>{p.year}</span></div><ProjectVisual type={p.visual} large/><div className="project-visual-story"><span>EVIDENCE & DELIVERABLES</span><ul>{p.deliverables.map(item=><li key={item}><span aria-hidden="true">↗</span>{item}</li>)}</ul>{p.detail&&<p className="project-visual-detail">{p.detail}</p>}</div><div className="project-image-footer"><span>{p.number} / {String(projects.length).padStart(2,'0')}</span></div></div>
  <div className="project-content"><div className="project-status"><span className="status-dot"/>{p.type}<span>{p.status}</span></div><h3>{p.title}</h3><p className="project-subtitle">{p.subtitle}</p><p className="project-description">{p.description}</p>
   <div className="project-metrics">{p.metrics.slice(0,2).map(m=><div key={m.label}><strong>{m.value}</strong><span>{m.label}</span></div>)}</div>
   <p className="metric-caption">{p.id==='twinshield'?'Reported research scores · evaluation context in case study':p.metricNote}</p>
   <div className="project-analyst-value"><span>ANALYST RELEVANCE</span><p>{p.analystValue}</p></div><ul className="tags" aria-label={p.title+' tools and methods'}>{p.tools.slice(0,4).map(t=><li key={t}>{t}</li>)}</ul>
   <button className="case-button" tabIndex={outgoing?-1:undefined} onClick={outgoing?undefined:()=>onOpen(p)}>Explore the case study <Arrow/></button>
  </div>
 </article>;
}
function Projects({onOpen,motion}){
 const compact=useCompactProjects();
 const [slide,setSlide]=useState({index:0,previous:null,direction:1,serial:0});const touch=useRef(null);const {index,previous,direction,serial}=slide;const p=projects[index];
 const select=(target,travel)=>setSlide(current=>{const next=typeof target==='function'?target(current.index):target;if(next===current.index)return current;return {index:next,previous:motion?current.index:null,direction:travel??(next>current.index?1:-1),serial:current.serial+1};});
 const go=delta=>select(i=>(i+delta+projects.length)%projects.length,Math.sign(delta));
 useEffect(()=>{if(previous===null)return;if(!motion){setSlide(current=>({...current,previous:null}));return;}const timer=setTimeout(()=>setSlide(current=>current.serial===serial?{...current,previous:null}:current),1100);return()=>clearTimeout(timer);},[serial,previous,motion]);
 const swipe=e=>{if(touch.current===null)return;const dx=e.changedTouches[0].clientX-touch.current;if(Math.abs(dx)>60)go(dx<0?1:-1);touch.current=null;};
 const tabKey=(e,i)=>{let next,travel;if(e.key==='ArrowRight'||e.key==='ArrowLeft'||e.key==='ArrowDown'||e.key==='ArrowUp'){travel=['ArrowRight','ArrowDown'].includes(e.key)?1:-1;next=(i+travel+projects.length)%projects.length;}else if(e.key==='Home'||e.key==='End')next=e.key==='Home'?0:projects.length-1;else return;e.preventDefault();select(next,travel);document.getElementById('project-tab-'+projects[next].id)?.focus();};
 return <section className="work section container" id="work" data-reveal>
  <div className="section-heading"><div><SectionLabel number="01">SELECTED PROJECTS</SectionLabel><h2>Selected work.<br/><span>A closer look.</span></h2></div><p className="section-intro">Six case studies. Practical investigations, research and professional documentation—with the evidence and scope made clear.</p></div>
  <div className="work-layout"><div className="project-selector" style={{'--project-count':projects.length}} role="tablist" aria-label="Select a project" aria-orientation={compact?'horizontal':'vertical'}>{projects.map((item,i)=><button key={item.id} id={'project-tab-'+item.id} role="tab" aria-controls="project-panel" aria-selected={index===i} tabIndex={index===i?0:-1} onClick={()=>select(i)} onKeyDown={e=>tabKey(e,i)}><span className="project-tab-icon"><ProjectGlyph type={item.visual}/></span><span className="project-tab-copy"><small>{item.number} / {item.year}</small><strong>{item.title}</strong><em>{item.status}</em></span><Arrow direction="right"/></button>)}</div>
   <div className="project-deck" role="region" aria-roledescription="carousel" aria-label="Project case studies" onTouchStart={e=>{touch.current=e.touches[0].clientX;}} onTouchEnd={swipe} onTouchCancel={()=>{touch.current=null;}}>
    <div className="project-viewport" data-direction={direction===1?'next':'previous'} data-transitioning={previous!==null}>
     {previous!==null&&<ProjectSlide key={'out-'+serial} project={projects[previous]} outgoing/>}
     <ProjectSlide key={'in-'+serial} project={p} entering={previous!==null} onOpen={onOpen}/>
    </div>
    <div className="deck-control"><div className="deck-meta"><span className="deck-counter">{p.number}<span> / {String(projects.length).padStart(2,'0')}</span></span><span className="deck-category">{p.category}</span></div><div className="deck-navigation"><div className="deck-progress" aria-hidden="true">{projects.map((item,i)=><span key={item.id} className={i===index?'is-current':''}/>)}</div><div className="carousel-controls"><button aria-label="Previous project" onClick={()=>go(-1)}><Arrow direction="left"/><span className="control-label">Prev</span></button><button aria-label="Next project" onClick={()=>go(1)}><span className="control-label">Next</span><Arrow direction="right"/></button></div></div></div>
   </div>
  </div>
  <div className="case-snapshot" aria-label={p.title+' at a glance'}><div><span>01 / PROBLEM</span><p>{p.problem}</p></div><div><span>02 / APPROACH</span><p>{p.approach[0]}</p></div><div><span>03 / RESULT</span><p>{p.results}</p></div></div>
  <p className="sr-only" aria-live="polite">Project {index+1} of {projects.length}: {p.title}</p><div className="work-footer"><span>Professional work, academic projects and research concepts are labelled with their scope.</span><a href={profile.github} target="_blank" rel="noreferrer">Explore my GitHub <Arrow/></a></div>
 </section>;
}
function Journey(){
 const [index,setIndex]=useState(0);const touch=useRef(null);const c=career[index];const go=d=>setIndex(i=>(i+d+career.length)%career.length);
 const tabKey=(e,i)=>{if(!['ArrowDown','ArrowUp','ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?career.length-1:(i+(['ArrowDown','ArrowRight'].includes(e.key)?1:-1)+career.length)%career.length;setIndex(next);document.getElementById('career-tab-'+career[next].id)?.focus();};
 return <section className="journey section" id="journey" data-reveal><div className="container">
  <div className="section-heading"><div><SectionLabel number="02">THE EXPERIENCE</SectionLabel><h2>Every connection<br/><span>shaped the next.</span></h2></div><p className="section-intro">Network operations, cybersecurity study and UK work experience. Each chapter adds to how I investigate, document and communicate.</p></div>
  <div className="journey-layout"><div className="chapter-nav" style={{'--career-count':career.length}} role="tablist" aria-label="Career chapters">{career.map((item,i)=><button key={item.id} role="tab" id={'career-tab-'+item.id} aria-selected={index===i} tabIndex={index===i?0:-1} aria-controls="career-panel" onClick={()=>setIndex(i)} onKeyDown={e=>tabKey(e,i)}><span className="timeline-dot"/><span className="chapter-num">0{i+1}</span><span><small>{item.year}</small><strong>{item.title}</strong>{item.id.startsWith('presto')&&<em>{item.id==='presto-l1'?'PRESTO / L1':'PRESTO / L2'}</em>}</span></button>)}</div>
   <div className="career-panel" key={c.id} role="tabpanel" id="career-panel" aria-labelledby={'career-tab-'+c.id} tabIndex="0" onTouchStart={e=>{touch.current=e.touches[0].clientX;}} onTouchCancel={()=>{touch.current=null;}} onTouchEnd={e=>{if(touch.current!==null){const dx=e.changedTouches[0].clientX-touch.current;if(Math.abs(dx)>70)go(dx<0?1:-1);touch.current=null;}}}>
    <div className="career-top"><span>{c.chapter}</span><span>{c.location}</span><div className="carousel-controls"><button aria-label="Previous career chapter" onClick={()=>go(-1)}><Arrow direction="left"/></button><button aria-label="Next career chapter" onClick={()=>go(1)}><Arrow direction="right"/></button></div></div>
    <div className="career-content"><div className="career-text"><span className="career-period">{c.period}</span><h3>{c.role}</h3><p className="career-company">{c.company}</p><p className="career-lead">{c.lead}</p>{c.paragraphs.map(t=><p key={t}>{t}</p>)}</div><div className="career-side"><CareerVisual type={c.visual}/><ul className="career-bullets">{c.bullets.map(b=><li key={b}><span aria-hidden="true">↗</span>{b}</li>)}</ul></div></div>
    <div className="career-bottom"><div className="career-facts">{c.facts.map(f=><div key={f.label}><strong>{f.value}</strong><span>{f.label}</span></div>)}</div><ul className="tags">{c.tools.map(t=><li key={t}>{t}</li>)}</ul></div>
   </div>
  </div>
  <div className="presto-note"><div><span className="small-label">PRESTO INFO SOLUTIONS</span><p>One employment.<br/><strong>Two distinct responsibilities.</strong></p><small>Jun 2022 – Jul 2025 · Bangalore · BSNL</small></div><div className="presto-options"><button onClick={()=>setIndex(career.findIndex(item=>item.id==='presto-l1'))} aria-pressed={c.id==='presto-l1'}><span>01</span>L1 / Tickets & customer RCA <Arrow/></button><button onClick={()=>setIndex(career.findIndex(item=>item.id==='presto-l2'))} aria-pressed={c.id==='presto-l2'}><span>02</span>L2 / Engineering & migrations <Arrow/></button></div></div>
  <p className="sr-only" aria-live="polite">Career chapter {index+1} of {career.length}: {c.role} at {c.company}</p>
 </div></section>;
}
function About({onOpen}){
 return <section className="about section" id="about" data-reveal><div className="about-layout container">
  <div className="about-portrait"><img src={original} alt="Original photograph of Sarowar at the University of Surrey" loading="lazy" width="1368" height="1824"/><div className="about-photo-label"><span>BEYOND THE NETWORK</span><strong>Still curious.<br/>Always learning.</strong></div></div>
  <div className="about-copy"><SectionLabel number="03">THE PERSON BEHIND THE WORK</SectionLabel><h2>An engineer.<br/>And a human.</h2><p className="about-lead">I’m {profile.name}. I like understanding how things connect — and helping people when they don’t.</p><p>My path runs from surveillance and banking networks to national telecoms infrastructure, then into cybersecurity research. Traffic analysis, incident handling and controlled changes shape how I approach investigation.</p><p>I value clear communication and evidence that other people can review. My AT and MOP documentation work taught me to record checks, explain operational risks and make handovers useful. Alongside my studies, I’ve volunteered with The Cyber Helpline to make online-safety guidance more accessible.</p><p>Outside the work, you’ll find me on a tennis court or taking a long walk to reset.</p><div className="about-principles"><span><b>01</b>Follow the evidence.</span><span><b>02</b>Explain the decision.</span><span><b>03</b>Keep learning.</span></div><a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">The full story on LinkedIn <Arrow/></a></div>
 </div><div className="analyst-contribution container" aria-labelledby="analyst-title"><div className="analyst-heading"><span className="small-label">FROM EXPERIENCE TO INVESTIGATION</span><h3 id="analyst-title">What I bring to an analyst role.</h3><p>Network context, a structured approach and findings that others can act on.</p></div><div className="analyst-cards">{analystStrengths.map(strength=><article className="analyst-card" key={strength.number}><div className="analyst-card-top"><span>{strength.number}</span><ProjectGlyph type={strength.visual}/></div><h4>{strength.title}</h4><p>{strength.description}</p>{strength.href?<a href={strength.href}>{strength.linkLabel}<Arrow/></a>:<button onClick={()=>onOpen(projects.find(project=>project.id===strength.project))}>{strength.linkLabel}<Arrow/></button>}</article>)}</div></div></section>;
}
function SkillIcon({number}){
 const paths={
  '01':<><rect x="11" y="3" width="10" height="7" rx="1"/><path d="M16 10v6M5 22v-6h22v6"/><rect x="1" y="22" width="8" height="7" rx="1"/><rect x="12" y="22" width="8" height="7" rx="1"/><rect x="23" y="22" width="8" height="7" rx="1"/></>,
  '02':<><path d="M16 2l11 5v9c0 7-6 11-11 14C11 27 5 23 5 16V7z"/><path d="M10 16l4 4 8-9"/></>,
  '03':<><rect x="2" y="5" width="28" height="23" rx="2"/><path d="M8 12l5 5-5 5M17 22h8"/></>,
  '04':<><rect x="6" y="5" width="21" height="25" rx="2"/><path d="M11 2h11v6H11zM11 15l2 2 4-4M20 15h3M11 23l2 2 4-4M20 23h3"/></>,
 };
 return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[number]}</svg>;
}
function Toolkit({onOpen,motion,blocked}){
 const openProject=id=>{const project=projects.find(item=>item.id===id);if(project)onOpen(project);};
 return <section className="toolkit section" id="toolkit" data-reveal><div className="container">
  <div className="section-heading"><div><SectionLabel number="04">SKILLS & QUALIFICATIONS</SectionLabel><h2>The toolkit.<br/><span>Always in motion.</span></h2></div><p className="section-intro">Four connected disciplines. Explore the tools, the thinking and the work behind each one.</p></div>
  <SlidingFrames id="skills" label="Skills and tools" items={skills} getLabel={s=>s.title} getDetail={s=>s.note} motion={motion} blocked={blocked} interval={8000} className="skills-carousel">
   {s=><article className="skill-card"><div className="skill-lead"><div className="skill-card-top"><span className="skill-icon"><SkillIcon number={s.number}/></span><span className="skill-number">CAPABILITY / {s.number}</span></div><h3>{s.title}</h3><p className="skill-description">{s.description}</p><div className="skill-card-bottom"><span className="skill-context">{s.note}</span>{s.evidence.href?<a className="skill-evidence" href={s.evidence.href}>{s.evidence.label}<Arrow/></a>:<button className="skill-evidence" onClick={()=>openProject(s.evidence.project)}>{s.evidence.label}<Arrow/></button>}</div></div><div className="skill-methods"><h4>TOOLS & METHODS</h4><ul className="skill-tools" aria-label={s.title+' tools and methods'}>{s.items.map((t,i)=><li key={t}><span aria-hidden="true">{String(i+1).padStart(2,'0')}</span>{t}<Arrow/></li>)}</ul></div></article>}
  </SlidingFrames>
  <div className="credentials"><section className="education" aria-labelledby="education-title"><header className="qualification-heading"><div><span className="small-label">ACADEMIC FOUNDATION</span><h3 id="education-title">A path built on learning.</h3></div><p>From engineering fundamentals to cybersecurity research.</p></header>
   <SlidingFrames id="education" label="Education, skills and related projects" items={education} getLabel={e=>e.shortSchool} getDetail={e=>e.level+' · '+e.period} motion={motion} blocked={blocked} interval={11000} className="education-carousel">
    {e=><article className="education-card"><figure className="campus-visual"><div className="campus-image"><img src={e.photo.src} alt={e.photo.alt} width={e.photo.width} height={e.photo.height} loading="lazy"/><div className="campus-caption"><span>{e.campusNote||'CAMPUS / UNIVERSITY LIFE'}</span><strong>{e.school}</strong><p>{e.photo.caption}</p></div></div><figcaption className="campus-credit"><a href={e.photo.source} target="_blank" rel="noreferrer">Photo: {e.photo.author}</a><a href={e.photo.licenseUrl} target="_blank" rel="noreferrer">{e.photo.license}</a><span>Resized · display crop</span></figcaption></figure><div className="education-detail"><div className="education-meta"><span className="degree-badge">{e.level}</span><span className="education-period">{e.period}</span></div><h4>{e.degree}</h4><p className="education-school">{e.school}</p><p className="education-focus">{e.focus}</p><div className="education-skills"><h5>SKILLS & FOCUS</h5><ul className="tags" aria-label={e.degree+' skills'}>{e.skills.map(skill=><li key={skill}>{skill}</li>)}</ul></div><div className="education-projects"><h5>{e.projectLabel}</h5><p>{e.projectNote}</p>{e.projectIds.map(id=>{const project=projects.find(p=>p.id===id);return <button key={id} className="education-project" onClick={()=>openProject(id)}><span className="education-project-icon"><ProjectGlyph type={project.visual}/></span><span><strong>{project.title}</strong><small>{project.status}</small></span><Arrow/></button>;})}</div></div></article>}
   </SlidingFrames>
  </section><section className="certifications" aria-labelledby="certification-title"><header className="qualification-heading"><span className="small-label">PROFESSIONAL CREDENTIALS</span><h3 id="certification-title">Knowledge. Validated.</h3></header><div className="certification-grid">{profile.certificates.map((c,i)=>{const href=profile.certificateLinks?.[c];const Tag=href?'a':'div';return <Tag className={'cert-card '+(href?'cert-linked':'')} key={c} {...(href?{href,target:'_blank',rel:'noopener noreferrer','aria-label':'View '+c+' credential'}:{})}><span className="cert-icon">{i===0?'CEH':'S+'}</span><span className="cert-details"><strong>{c}</strong><small>{i===0?'EC-Council':'CompTIA'}</small><span className="cert-action">{href?'View credential':'Certified'}</span></span>{href?<Arrow/>:<span className="cert-mark" aria-label="Certified">✓</span>}</Tag>;})}<div className="language-card"><h4>Good communication travels.</h4><p>Languages I work with</p><ul>{profile.languages.map(language=><li key={language}>{language}</li>)}</ul></div></div></section></div>
 </div></section>;
}
function Contact(){
 const [copied,setCopied]=useState('Copy email');const clock=useClock();const timer=useRef(null);
 useEffect(()=>()=>clearTimeout(timer.current),[]);
 const copy=async()=>{try{await navigator.clipboard.writeText(profile.email);setCopied('Copied ✓');}catch{setCopied('Use the email link');}clearTimeout(timer.current);timer.current=setTimeout(()=>setCopied('Copy email'),3500);};
 return <section className="contact section" id="contact" data-reveal><div className="container">
  <div className="contact-top"><SectionLabel number="05">GET IN TOUCH</SectionLabel><span className="contact-status"><span className="status-dot"/>OPEN TO THE RIGHT CONVERSATION</span></div>
  <div className="contact-main"><div><h2>Let’s connect.</h2><p>Cybersecurity analyst opportunities, security operations, or a project that needs an evidence-led approach.<br/>I’d like to hear what you’re working on.</p></div><a className="contact-arrow" href={'mailto:'+profile.email} aria-label="Email Sarowar"><span className="contact-avatar-wrap" aria-hidden="true"><span className="avatar-orbit"/><img className="contact-avatar" src="./assets/sarowar-avatar-v1.png" alt="" width="1254" height="1254" loading="lazy"/><span className="contact-arrow-mark"><Arrow/></span></span></a></div>
  <div className="contact-body"><a className="email-link" href={'mailto:'+profile.email}>{profile.email}<Arrow/></a><button className="copy-email" onClick={copy} aria-live="polite">{copied}</button></div>
  <div className="contact-links"><span>{profile.location}<small>{clock} · {profile.timezone}</small></span><div><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow/></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow/></a><a href="#home">Back to top <Arrow direction="up"/></a></div></div>
 </div></section>;
}
function ProjectDialog({project,onClose}){
 const ref=useRef(null);const close=useRef(null);
 useEffect(()=>{if(!project)return;const previous=document.activeElement;const dialog=ref.current;dialog.showModal();close.current?.focus();document.body.style.overflow='hidden';return()=>{if(dialog.open)dialog.close();document.body.style.overflow='';previous?.focus();};},[project]);
 return <dialog className="case-dialog" ref={ref} onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===ref.current){const r=ref.current.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)onClose();}}} aria-labelledby="case-title">{project&&<><div className="dialog-top"><span>CASE FILE / {project.number} / {project.category}</span><button ref={close} onClick={onClose} aria-label="Close case study">×</button></div><div className="dialog-heading"><span className="dialog-status">{project.type} · {project.status}</span><h2 id="case-title">{project.title}</h2><p className="dialog-subtitle">{project.subtitle}</p></div><ProjectVisual type={project.visual}/><div className="dialog-block"><span>01 / THE PROBLEM</span><p>{project.problem}</p></div><div className="dialog-block"><span>02 / THE APPROACH</span><ul>{project.approach.map(a=><li key={a}>{a}</li>)}</ul></div><div className="dialog-block"><span>03 / THE RESULT & SCOPE</span><p>{project.results}</p><div className="dialog-metrics">{project.metrics.map(m=><div key={m.label}><strong>{m.value}</strong><span>{m.label}</span></div>)}</div><p className="dialog-evidence-note">{project.metricNote}</p></div><div className="dialog-block dialog-analyst"><span>04 / ANALYST RELEVANCE</span><p>{project.analystValue}</p><ul>{project.deliverables.map(item=><li key={item}>{item}</li>)}</ul></div><div className="dialog-block"><span>TOOLS & METHODS</span><ul className="tags">{project.tools.map(t=><li key={t}>{t}</li>)}</ul></div><div className="dialog-evidence"><span>EVIDENCE & NEXT STEP</span><p>{project.evidence}</p><a href={profile.github} target="_blank" rel="noreferrer">{project.evidenceLinkLabel||'Browse my GitHub profile'} <Arrow/></a></div></>}</dialog>;
}
export default function App(){
 const [motion,setMotion]=useMotion();const [project,setProject]=useState(null);useReveal();
 return <><Header motion={motion} setMotion={setMotion}/><main id="main"><Hero motion={motion}/><Credibility/><Projects onOpen={setProject} motion={motion}/><Journey/><About onOpen={setProject}/><Toolkit onOpen={setProject} motion={motion} blocked={!!project}/><Contact/></main><footer className="footer container"><Brand footer/><p>Thoughtful engineering.<br/><span>Clear decisions. Better connections.</span></p><span>© {new Date().getFullYear()} {profile.name}</span></footer><ProjectDialog project={project} onClose={()=>setProject(null)}/></>;
}
