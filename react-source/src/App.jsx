import { useEffect, useState } from 'react';
import StudioNav from './components/StudioNav.jsx';
import StudioHero, { CredibilityStrip } from './components/StudioHero.jsx';
import ProjectShowcase from './components/ProjectShowcase.jsx';
import ExperienceJourney from './components/ExperienceJourney.jsx';
import { SkillsSection, EducationSection } from './components/SkillsEducation.jsx';
import { AboutSection, ContactSection, StudioFooter } from './components/AboutContact.jsx';
import CaseStudyDialog from './components/CaseStudyDialog.jsx';

function useMotion() {
  const [motion, setMotion] = useState(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    try { return localStorage.getItem('sarowar-motion') !== 'off'; } catch { return true; }
  });
  useEffect(() => {
    document.documentElement.dataset.motion = motion ? 'on' : 'off';
    try { localStorage.setItem('sarowar-motion', motion ? 'on' : 'off'); } catch {}
  }, [motion]);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => { if (media.matches) setMotion(false); };
    media.addEventListener('change', change); return () => media.removeEventListener('change', change);
  }, []);
  return [motion, setMotion];
}

export default function App() {
  const [motion, setMotion] = useMotion();
  const [project, setProject] = useState(null);
  return <>
    <StudioNav motion={motion} setMotion={setMotion}/>
    <div className="portfolio-body">
      <main id="main">
        <StudioHero motion={motion}/>
        <AboutSection onOpen={setProject}/>
        <CredibilityStrip/>
        <ProjectShowcase onOpen={setProject}/>
        <ExperienceJourney motion={motion} blocked={!!project}/>
        <SkillsSection motion={motion} blocked={!!project} onOpen={setProject}/>
        <EducationSection motion={motion} blocked={!!project} onOpen={setProject}/>
        <ContactSection/>
      </main>
      <StudioFooter/>
    </div>
    <CaseStudyDialog project={project} onClose={() => setProject(null)}/>
  </>;
}
