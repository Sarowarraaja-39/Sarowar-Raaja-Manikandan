import { career } from '../data/portfolio.js';
import SlidingFrames from './SlidingFrames.jsx';
import { SectionHeading } from './StudioUI.jsx';

const chapters = {
  cameras: { file:'lan-topology.svg', sector:'Local networks', short:'LAN & surveillance', mark:'LAN',
    alt:'LAN topology with a VPN gateway and managed switch connecting office and surveillance devices on separate VLANs.',
    relevance:'Build clear LAN segments, check switch and PoE requirements, and isolate connectivity faults without disrupting unrelated devices.' },
  bank: { file:'bank-backend.webp', sector:'Banking infrastructure', short:'Banking networks', mark:'WAN',
    alt:'Concept illustration of a banking backend with server racks, a gateway, branches and ATM connections.',
    relevance:'Trace LAN/WAN faults using traffic evidence, coordinate with service providers and verify connectivity after corrective action.' },
  'presto-l1': { file:'telecom-operations.webp', sector:'Telecommunications / first line', short:'Presto · L1', mark:'L1',
    alt:'Concept illustration of engineers monitoring nationwide telecom connectivity in a network operations centre.',
    relevance:'Give L2 engineers useful diagnostics, keep customers informed and explain the cause and resolution in a clear handover.' },
  satellite: { file:'leo-communications.webp', sector:'Satellite communications', short:'Satellite links', mark:'LEO',
    alt:'Concept illustration of a low-Earth-orbit satellite, orbital communication links and a ground station.',
    relevance:'Map link dependencies, review capacity and identify single points of failure before recommending redundancy.' },
  'presto-l2': { file:'telecom-backbone.webp', sector:'National telecom infrastructure', short:'Presto · L2', mark:'L2',
    alt:'Concept illustration of a nationwide telecom backbone connecting cities, core exchanges, towers and data centres.',
    relevance:'Plan routing and VPN changes, prepare rollback steps, validate security findings and check service continuity after implementation.' },
  bp: { file:'bp-operations.svg', sector:'United Kingdom / current role', short:'UK operations', mark:'UK',
    alt:'Role illustration of point-of-sale systems, equipment readings and structured operational records.',
    relevance:'Keep operational records accurate, prioritise requests and communicate clearly with customers and colleagues during busy periods.' },
};

const explanationLabels = {
  cameras:['The environment','The network controls'],
  bank:['The faults I investigated','How I supported resolution'],
  'presto-l1':['Ticket ownership','The customer and engineering bridge'],
  satellite:['Topology and resilience','The connection to later research'],
  'presto-l2':['Routing and migrations','Change planning and verification','Coordination through recovery'],
  bp:['Customer operations','Operational records','What I carry into engineering'],
};

function ExperienceSlide({ item, active, index }) {
  const chapter = chapters[item.id];
  return <article className={'role-slide role-slide--' + item.id} data-active={active}>
    <div className="role-stage">
      <div className="role-scenery">
        <span className="role-scene-mark" aria-hidden="true">{chapter.mark}</span>
        <figure>
          <img src={'./assets/career/' + chapter.file} alt={chapter.alt} width="1280" height="720" loading="lazy" decoding="async"/>
          <figcaption>{item.id === 'cameras' ? 'LAN topology' : item.id === 'bp' ? 'Operational systems illustration' : 'Concept illustration'}</figcaption>
        </figure>
      </div>
      <div className="role-stage-top"><span className="eyebrow">{chapter.sector}</span><span className="role-chapter-count">{String(index + 1).padStart(2,'0')} <span>/ {String(career.length).padStart(2,'0')}</span></span></div>
      <div className="role-heading">
        <p className="role-employer">{item.company}</p><h3>{item.role}</h3>
        <p className="role-period"><span>{item.period}</span><span>{item.location}</span></p>
      </div>
      <div className="role-introduction"><div className="role-explanation"><p className="role-lead">{item.lead}</p><div className="role-description">{item.paragraphs.map((text, paragraphIndex) => <section key={text}><h4>{explanationLabels[item.id][paragraphIndex]}</h4><p>{text}</p></section>)}</div></div><div className="role-facts">{item.facts.map(f => <div key={f.label}><strong>{f.value}</strong><span>{f.label}</span></div>)}</div></div>
    </div>
    <div className="role-responsibilities"><h4 className="eyebrow">Responsibilities<br/>& tools</h4><div><ul className="role-responsibility-list">{item.bullets.map(text => <li key={text}>{text}</li>)}</ul><ul className="tool-list" aria-label={item.role + ' tools'}>{item.tools.map(tool => <li key={tool}>{tool}</li>)}</ul></div></div>
    <div className="role-transfer"><span className="eyebrow">What I bring to network & security teams</span><p>{chapter.relevance}</p><span className="role-transfer-arrow" aria-hidden="true">↗</span></div>
  </article>;
}

export default function ExperienceJourney({ motion, blocked }) {
  return <section className="section journey-section" id="journey">
    <div className="wrap"><SectionHeading label="Experience / network operations & engineering" title={<>From local networks<br/><span>to national backbones.</span></>}>Banking, telecoms and the networks in between. My work spans customer fault handling, routing and VPN troubleshooting, controlled migrations and service verification.</SectionHeading></div>
    <div className="experience-shell"><SlidingFrames id="career" label="Professional experience" items={career} getLabel={item => item.role + ' · ' + item.company} initialIndex={4} motion={motion} blocked={blocked} interval={30000} className="experience-carousel" renderTab={(item, i) => <><span className="chapter-preview" aria-hidden="true"><img src={'./assets/career/' + chapters[item.id].file} alt="" width="240" height="135" loading="lazy"/><span>{String(i + 1).padStart(2,'0')}</span></span><span className="chapter-label"><small>{item.year}</small><strong>{chapters[item.id].short}</strong><span>{item.title}</span></span></>}>
      {(item, i, active) => <ExperienceSlide item={item} active={active} index={i}/>}
    </SlidingFrames></div>
    <div className="wrap experience-footnote"><p><strong>Presto Info Solutions</strong><span>June 2022 – July 2025 · One employment, distinct L1 and L2 responsibilities.</span></p><p>341 routers personally migrated.<br/>365+ routers covered by MOP documentation.</p></div>
  </section>;
}
