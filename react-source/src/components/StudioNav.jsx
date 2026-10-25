import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/portfolio.js';
import { Monogram } from './Brand.jsx';
import { NavIcon, useClock } from './StudioUI.jsx';

const links = [['about', 'About'], ['work', 'Work'], ['journey', 'Journey'], ['toolkit', 'Skills'], ['education', 'Education'], ['contact', 'Contact']];
export default function StudioNav({ motion, setMotion }) {
  const [active, setActive] = useState('home');
  const [menu, setMenu] = useState(false);
  const trigger = useRef(null); const clock = useClock();
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: '-12% 0px -63% 0px' });
    document.querySelectorAll('main > section[id]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const escape = event => { if (event.key === 'Escape' && menu) { setMenu(false); trigger.current?.focus(); } };
    document.addEventListener('keydown', escape); return () => document.removeEventListener('keydown', escape);
  }, [menu]);
  const motionButton = <button className="motion-control" aria-label={motion ? 'Pause decorative motion' : 'Enable decorative motion'} aria-pressed={motion} onClick={() => setMotion(!motion)}><span aria-hidden="true">{motion ? 'Ⅱ' : '▷'}</span><span>Motion {motion ? 'on' : 'off'}</span></button>;
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <aside className="identity-rail" aria-label="Portfolio navigation">
      <a href="#home" className="rail-brand" aria-label="Sarowar Raaja Manikandan home"><Monogram/><span>SAROWAR<br/>RAAJA</span></a>
      <nav aria-label="Main navigation">{links.map(([id, label]) => <a key={id} href={'#' + id} aria-current={active === id ? 'location' : undefined}><NavIcon type={id}/><span>{label}</span><i/></a>)}</nav>
      <div className="rail-bottom">{motionButton}<span className="rail-edition">PORTFOLIO / 2026</span></div>
    </aside>
    <header className="context-header">
      <a className="mobile-brand" href="#home" aria-label="Sarowar Raaja Manikandan home"><Monogram/><span>Sarowar Raaja<span>Manikandan</span></span></a>
      <div className="context-name"><span className="status-dot"/>Sarowar Raaja Manikandan<span className="context-separator"/>Network & security</div>
      <div className="context-location"><span>{profile.location}</span><time>{clock}</time></div>
      <div className="mobile-actions">{motionButton}<button className="menu-toggle" ref={trigger} aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(!menu)} aria-label={menu ? 'Close navigation' : 'Open navigation'}><span/><span/></button></div>
      <nav id="mobile-menu" className={menu ? 'mobile-menu open' : 'mobile-menu'} aria-label="Expanded navigation" hidden={!menu}>{links.map(([id, label]) => <a key={id} href={'#' + id} onClick={() => setMenu(false)}><NavIcon type={id}/>{label}<span aria-hidden="true">↗</span></a>)}</nav>
    </header>
    <nav className="mobile-dock" aria-label="Quick navigation">{links.map(([id, label]) => <a href={'#' + id} key={id} aria-current={active === id ? 'location' : undefined}><NavIcon type={id}/><span>{label}</span></a>)}</nav>
  </>;
}
