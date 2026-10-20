const visuals = {
 cameras: {file:'lan-topology.svg',title:'LAN topology',detail:'Office + surveillance VLANs',alt:'LAN topology with a VPN gateway and managed switch connecting an office PC, Wi-Fi access point, IP camera and NVR across separate VLANs.'},
 bank: {file:'bank-backend.webp',title:'Banking network backend',detail:'Concept illustration',alt:'Illustration of a banking backend with server racks, a security gateway, branch banking and ATM connectivity.'},
 bridge: {file:'telecom-operations.webp',title:'Nationwide telecom operations',detail:'Concept illustration',alt:'Illustration of a telecom network operations centre monitoring nationwide connectivity from engineer workstations.'},
 satellite: {file:'leo-communications.webp',title:'LEO satellite communications',detail:'Concept illustration',alt:'Illustration of a low-Earth-orbit communications satellite above Earth with orbital links and a ground station.'},
 backbone: {file:'telecom-backbone.webp',title:'Nationwide telecom backbone',detail:'Concept illustration',alt:'Illustration of a nationwide telecommunications backbone linking city hubs, core exchanges, towers and data centres.'},
 surrey: {file:'cyber-analyst.webp',title:'Cyber analyst',detail:'Concept illustration',alt:'Illustration of a cyber security analyst investigating event timelines, packet activity and network relationships at a monitoring desk.'},
 bp: {file:'bp-operations.svg',title:'Systems, readings and operational records',detail:'Role illustration',alt:'Illustration of a point-of-sale terminal beside equipment status records and a structured operational log prepared for review.'},
};

export default function CareerVisual({type}) {
 const visual=visuals[type];
 if(!visual)return null;
 return <figure className={`career-visual career-picture cv-${type}`}>
  <img className="career-illustration" src={`./assets/career/${visual.file}`} alt={visual.alt} width="640" height="360" loading="lazy" decoding="async"/>
  <figcaption><span>{visual.title}</span><small>{visual.detail}</small></figcaption>
 </figure>;
}
