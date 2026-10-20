export default function ProjectGlyph({type}) {
 return <svg className="project-glyph" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  {type==='orbital'&&<><circle cx="24" cy="24" r="10"/><ellipse cx="24" cy="24" rx="21" ry="9" transform="rotate(-35 24 24)"/><path d="m34 5 7 7-5 5-7-7zM20 15c7 5 9 11 7 18"/></>}
  {type==='packets'&&<><rect x="3" y="17" width="11" height="14" rx="3"/><rect x="19" y="8" width="11" height="14" rx="3"/><rect x="34" y="22" width="11" height="14" rx="3"/><path d="M14 24h5V15M30 15h9v7M8 22v4M24 13v4M39 27v4"/></>}
  {type==='shield'&&<><path d="m24 4 16 7v13c0 11-10 17-16 21C18 41 8 35 8 24V11z"/><path d="m16 24 6 6 11-13"/><circle cx="24" cy="24" r="20" strokeDasharray="2 6"/></>}
  {type==='risk'&&<><rect x="4" y="7" width="40" height="34" rx="5"/><path d="M4 16h40M11 12h2M18 12h2M11 25h12M11 33h17M32 28l3 3 5-8"/></>}
  {type==='terminal'&&<><rect x="4" y="7" width="40" height="34" rx="5"/><path d="M4 16h40M11 12h2M18 12h2M12 23l6 5-6 5M24 33h11"/></>}
  {type==='evidence'&&<><path d="M15 4h19l8 8v31H15zM34 4v9h8M15 10H7v31h8"/><path d="m21 21 3 3 5-6M32 22h5m-16 11 3 3 5-6M32 34h5"/></>}
 </svg>;
}
