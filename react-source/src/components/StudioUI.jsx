import { useEffect, useState } from 'react';

export const Arrow = ({ direction = 'up' }) => <span aria-hidden="true" className="arrow">{direction === 'left' ? '←' : direction === 'right' ? '→' : '↗'}</span>;
export function SectionHeading({ label, title, children }) {
  return <header className="section-heading"><div><p className="eyebrow">{label}</p><h2>{title}</h2></div>{children && <p className="section-intro">{children}</p>}</header>;
}
export function useClock() {
  const [clock, setClock] = useState('Europe/London');
  useEffect(() => {
    const update = () => setClock(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }).format(new Date()));
    update(); const timer = setInterval(update, 60000); return () => clearInterval(timer);
  }, []);
  return clock;
}
export function NavIcon({ type }) {
  const shapes = {
    work: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    journey: <><circle cx="6" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><path d="M6 7v7a5 5 0 0 0 5 5h5M6 5h9a4 4 0 0 1 0 8H9"/></>,
    toolkit: <><path d="m12 2 8 5v10l-8 5-8-5V7zM4 7l8 5 8-5M12 12v10"/></>,
    education: <><path d="m2 8 10-5 10 5-10 5zM6 10v7c4 3 8 3 12 0v-7M22 8v8"/></>,
    about: <><circle cx="12" cy="8" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/></>,
    contact: <><rect x="2" y="5" width="20" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shapes[type]}</svg>;
}
