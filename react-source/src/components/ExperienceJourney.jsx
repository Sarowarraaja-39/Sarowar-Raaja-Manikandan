import { useEffect, useRef } from 'react';
import { career } from '../data/portfolio.js';
import SlidingFrames from './SlidingFrames.jsx';
import { SectionHeading } from './StudioUI.jsx';

const chapters = {
  cameras: { file:'lan-topology.svg', sector:'Local networks', short:'LAN & surveillance', mark:'LAN',
    alt:'LAN topology with a VPN gateway and managed switch connecting office and surveillance devices on separate VLANs.',
    relevance:'Understand normal network paths, isolate faults and recognise why segmentation matters when investigating unusual traffic.' },
  bank: { file:'bank-backend.webp', sector:'Banking infrastructure', short:'Banking networks', mark:'WAN',
    alt:'Concept illustration of a banking backend with server racks, a gateway, branches and ATM connections.',
    relevance:'Work from connectivity symptoms to packet evidence, coordinate escalation and document corrective actions clearly.' },
  'presto-l1': { file:'telecom-operations.webp', sector:'Telecommunications / first line', short:'Presto · L1', mark:'L1',
    alt:'Concept illustration of engineers monitoring nationwide telecom connectivity in a network operations centre.',
    relevance:'Triage with context, explain customer impact and leave a clear resolution record for the next person to review.' },
  satellite: { file:'leo-communications.webp', sector:'Satellite communications', short:'Satellite links', mark:'LEO',
    alt:'Concept illustration of a low-Earth-orbit satellite, orbital communication links and a ground station.',
    relevance:'Question resilience, map dependencies and identify single points of failure before proposing a control.' },
  'presto-l2': { file:'telecom-backbone.webp', sector:'National telecom infrastructure', short:'Presto · L2', mark:'L2',
    alt:'Concept illustration of a nationwide telecom backbone connecting cities, core exchanges, towers and data centres.',
    relevance:'Validate findings, assess operational risk and connect a technical recommendation with a controlled, verifiable change.' },
  surrey: { file:'cyber-analyst.webp', sector:'Cybersecurity / academic practice', short:'Cybersecurity', mark:'MSc',
    alt:'Concept illustration of a cybersecurity analyst examining event timelines, packets and network relationships.',
    relevance:'Combine an operational network foundation with structured investigation, evidence preservation and security research.' },
  bp: { file:'bp-operations.svg', sector:'United Kingdom / current role', short:'UK operations', mark:'UK',
    alt:'Role illustration of point-of-sale systems, equipment readings and structured operational records.',
    relevance:'Bring accurate records, clear communication and consistent follow-through to investigation and reporting tasks.' },
};

function ExperienceSlide({ item, active, index }) {
  const chapter = chapters[item.id];
  const notes = useRef(null);
  useEffect(() => { if (!active && notes.current) notes.current.open = false; }, [active]);
  return <article className={'role-slide role-slide--' + item.id} data-active={active}>
    <div className="role-stage">
      <div className="role-scenery">
        <span className="role-scene-mark" aria-hidden="true">{chapter.mark}</span>
        <figure>
          <img src={'./assets/career/' + chapter.file} alt={chapter.alt} width="1280" height="720" loading="lazy" decoding="async"/>
          <figcaption>{item.id === 'cameras' ? 'LAN topology' : item.id === 'bp' ? 'Operational systems illustration' : 'Concept illustration'}</figcaption>
        </figure>
      </div>
      <div className="role-stage-top"><span className="eyebrow">{chapter.sector}</span><span className="role-chapter-count">{String(index + 1).padStart(2,'0')} <span>/ 07</span></span></div>
      <div className="role-heading">
        <p className="role-employer">{item.company}</p><h3>{item.role}</h3>
        <p className="role-period"><span>{item.period}</span><span>{item.location}</span></p>
      </div>
      <div className="role-introduction"><p>{item.lead}</p><div className="role-facts">{item.facts.map(f => <div key={f.label}><strong>{f.value}</strong><span>{f.label}</span></div>)}</div></div>
    </div>
    <div className="role-transfer"><span className="eyebrow">What I bring to an analyst role</span><p>{chapter.relevance}</p><span className="role-transfer-arrow" aria-hidden="true">↗</span></div>
    <details ref={notes} className="role-notes">
      <summary><span>Responsibilities & approach</span><span className="role-notes-plus" aria-hidden="true">+</span></summary>
      <div className="role-notes-body"><div>{item.paragraphs.map(text => <p key={text}>{text}</p>)}</div><div><h4 className="eyebrow">In practice</h4><ul>{item.bullets.map(text => <li key={text}>{text}</li>)}</ul><ul className="tool-list" aria-label={item.role + ' tools'}>{item.tools.map(tool => <li key={tool}>{tool}</li>)}</ul></div></div>
    </details>
  </article>;
}

export default function ExperienceJourney({ motion, blocked }) {
  return <section className="section journey-section" id="journey">
    <div className="wrap"><SectionHeading label="Experience / from operations to analysis" title={<>Real infrastructure.<br/><span>A security mindset.</span></>}>Banking, telecoms and the networks in between. Explore the roles behind my approach to investigation, validation and clear evidence.</SectionHeading></div>
    <div className="experience-shell"><SlidingFrames id="career" label="Professional experience" items={career} getLabel={item => item.role + ' · ' + item.company} initialIndex={4} motion={motion} blocked={blocked} interval={12000} className="experience-carousel" renderTab={(item, i) => <><span className="chapter-preview" aria-hidden="true"><img src={'./assets/career/' + chapters[item.id].file} alt="" width="240" height="135" loading="lazy"/><span>{String(i + 1).padStart(2,'0')}</span></span><span className="chapter-label"><small>{item.year}</small><strong>{chapters[item.id].short}</strong><span>{item.title}</span></span></>}>
      {(item, i, active) => <ExperienceSlide item={item} active={active} index={i}/>}
    </SlidingFrames></div>
    <div className="wrap experience-footnote"><p><strong>Presto Info Solutions</strong><span>June 2022 – July 2025 · One employment, distinct L1 and L2 responsibilities.</span></p><p>341 routers personally migrated.<br/>365+ routers covered by MOP documentation.</p></div>
  </section>;
}
