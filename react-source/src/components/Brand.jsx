export function Monogram({className=''}) {
 return <svg className={'monogram '+className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
  <rect className="monogram-plate" x="1" y="1" width="62" height="62" rx="17"/>
  <path className="monogram-letter monogram-s" pathLength="100" d="M29 17H21a7.5 7.5 0 0 0 0 15h3a7.5 7.5 0 0 1 0 15H13"/>
  <path className="monogram-letter monogram-r" pathLength="100" d="M36 47V17h8a8 8 0 0 1 0 16h-8m8 0 9 14"/>
  <path className="monogram-link" pathLength="100" d="M13 54H51"/>
  <circle className="monogram-node" cx="52" cy="12" r="3"/>
 </svg>;
}

export default function Brand({footer=false}) {
 return <a className={'brand'+(footer?' footer-brand':'')} href="#home" aria-label="Sarowar Raaja Manikandan home">
  <Monogram/>
  <span className="brand-name" aria-hidden="true"><span className="brand-line"><span>SAROWAR</span></span><span className="brand-line"><span>RAAJA<span className="brand-stop">.</span></span></span></span>
 </a>;
}
