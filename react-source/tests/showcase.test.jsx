import assert from 'node:assert/strict';
import { afterEach, beforeEach, test } from 'node:test';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App.jsx';
import { JSDOM } from 'jsdom';
import ExperienceJourney from '../src/components/ExperienceJourney.jsx';
import { SkillsSection, EducationSection } from '../src/components/SkillsEducation.jsx';
import { career, education, projects, skills } from '../src/data/portfolio.js';

// Component DOM tests only. jsdom does not render CSS or prove browser layout.
let dom, container, root, observers;
class IntersectionStub {
  constructor(callback) { this.callback=callback; observers.push(this); }
  observe(target) { this.target=target; this.emit(true); }
  disconnect() {}
  emit(isIntersecting) { this.callback([{isIntersecting,target:this.target}]); }
}
beforeEach(() => {
  dom=new JSDOM('<!doctype html><html><body><div id="test-root"></div></body></html>',{pretendToBeVisual:true,url:'https://example.test/'});
  for(const name of ['window','document','HTMLElement','Event','MouseEvent','KeyboardEvent'])globalThis[name]=dom.window[name];
  globalThis.IS_REACT_ACT_ENVIRONMENT=true;
  Object.defineProperty(document,'hidden',{value:false,writable:true,configurable:true});
  observers=[]; window.IntersectionObserver=IntersectionStub; globalThis.IntersectionObserver=IntersectionStub;
  container=document.getElementById('test-root'); root=createRoot(container);
});
afterEach(async () => { await act(async () => root.unmount()); dom.window.close(); });
const mount = async element => { await act(async () => root.render(element)); };
const click = async element => { assert(element,'Expected a real control'); await act(async () => element.click()); };
const key = async (element,value) => { await act(async () => element.dispatchEvent(new KeyboardEvent('keydown',{key:value,bubbles:true}))); };
const active = () => container.querySelector('.sliding-frame:not([aria-hidden="true"])');
const selected = () => container.querySelector('[role="tab"][aria-selected="true"]');
const button = label => container.querySelector('button[aria-label="'+label+'"]');
const assertActive = index => {
  const tabs=[...container.querySelectorAll('[role="tab"]')];
  assert.equal(tabs.indexOf(selected()),index);
  assert.equal(active().id,selected().getAttribute('aria-controls'));
  assert.equal(active().getAttribute('aria-labelledby'),selected().id);
  assert.equal(active().getAttribute('tabindex'),'0');
  assert(!active().hasAttribute('inert'));
  for(const panel of container.querySelectorAll('.sliding-frame[aria-hidden="true"]'))assert(panel.hasAttribute('inert'));
};

test('Seven career chapters preserve source facts, responsibilities and original chronological order', async () => {
  await mount(<ExperienceJourney motion={false}/>);
  assert.equal(container.querySelectorAll('[role="tab"]').length,career.length);
  assertActive(4);
  for(const [i,item] of career.entries()){
    await click(document.getElementById('career-tab-'+i)); assertActive(i);
    const panel=active();
    assert.equal(panel.querySelector('h3').textContent,item.role);
    for(const text of [item.company,item.period,item.location,item.lead,...item.paragraphs,...item.bullets,...item.tools,...item.facts.flatMap(f=>[f.value,f.label])])assert(panel.textContent.includes(text),item.id+': missing '+text);
    assert(panel.querySelector('.role-scenery img').getAttribute('alt').length>30);
    const description=panel.querySelector('.role-stage .role-description');
    assert(description,item.id+': the full role explanation must be on the main slide');
    for(const text of item.paragraphs)assert(description.textContent.includes(text));
    assert(!description.closest('details,[hidden]'));
  }
  const tabs=[...container.querySelectorAll('[role="tab"]')].map(tab=>tab.textContent);
  assert(tabs[2].includes('L1')&&tabs[3].includes('Satellite')&&tabs[4].includes('L2'));
});

test('Career navigation wraps, announces selection, supports Home/End/arrows and restores tab focus', async () => {
  await mount(<ExperienceJourney motion={true}/>);
  await click(button('Next career slide')); assertActive(5);
  await click(button('Previous career slide')); assertActive(4);
  await key(selected(),'Home'); assertActive(0); assert.equal(document.activeElement,selected());
  await key(selected(),'ArrowLeft'); assertActive(6); assert.equal(document.activeElement,selected());
  await key(selected(),'ArrowRight'); assertActive(0);
  await key(selected(),'End'); assertActive(6);
  await click(button('Next career slide')); assertActive(0);
  assert(container.querySelector('[role="status"]').textContent.includes('Slide 1 of 7'));
  assert.equal(container.querySelector('[aria-roledescription="carousel"]').dataset.playing,'false');
});

test('Full role explanations and responsibilities are available without opening a disclosure', async () => {
  await mount(<ExperienceJourney motion={false}/>);
  for(let i=0;i<career.length;i++){
    await click(document.getElementById('career-tab-'+i));
    const panel=active();
    assert.equal(panel.querySelectorAll('details').length,0,'The role explanation must not require expansion.');
    const responsibilities=panel.querySelector('.role-responsibilities');
    assert(responsibilities,'Show responsibilities as part of the slide.');
    for(const text of career[i].bullets)assert(responsibilities.textContent.includes(text));
  }
});

test('Automatic career slides stop for hover, focus, hidden tabs, offscreen, modal and site motion off', async t => {
  t.mock.timers.enable({apis:['setTimeout']});
  await mount(<ExperienceJourney motion={true} blocked={false}/>);
  const deck=container.querySelector('[aria-roledescription="carousel"]');
  assert.equal(deck.dataset.playing,'true');
  await act(async () => t.mock.timers.tick(29999)); assertActive(4);
  await act(async () => t.mock.timers.tick(1)); assertActive(5);
  await act(async () => deck.dispatchEvent(new MouseEvent('mouseover',{bubbles:true,relatedTarget:document.body})));
  assert.equal(deck.dataset.playing,'false');
  await act(async () => t.mock.timers.tick(24000)); assertActive(5);
  await act(async () => deck.dispatchEvent(new MouseEvent('mouseout',{bubbles:true,relatedTarget:document.body})));
  assert.equal(deck.dataset.playing,'true');
  await act(async () => observers[0].emit(false)); assert.equal(deck.dataset.playing,'false');
  await act(async () => observers[0].emit(true)); assert.equal(deck.dataset.playing,'true');
  await act(async () => { document.hidden=true; document.dispatchEvent(new Event('visibilitychange')); });
  assert.equal(deck.dataset.playing,'false');
  await act(async () => { document.hidden=false; document.dispatchEvent(new Event('visibilitychange')); });
  await mount(<ExperienceJourney motion={true} blocked={true}/>); assert.equal(deck.dataset.playing,'false');
  await mount(<ExperienceJourney motion={false} blocked={false}/>); assert.equal(deck.dataset.playing,'false');
  assert(button('Enable site motion to play career slideshow').disabled);
  await mount(<ExperienceJourney motion={true} blocked={false}/>);
  await act(async () => active().focus()); assert.equal(deck.dataset.playing,'false');
  await click(button('Play career slideshow')); assert.equal(deck.dataset.playing,'true');
});

test('Horizontal swipes change career chapters; vertical gestures preserve the current role', async () => {
  await mount(<ExperienceJourney motion={false}/>);
  const viewport=container.querySelector('.frame-viewport');
  const touch=async (type,x,y) => {
    const event=new Event(type,{bubbles:true});
    Object.defineProperty(event,type==='touchstart'?'touches':'changedTouches',{value:[{clientX:x,clientY:y}]});
    await act(async () => viewport.dispatchEvent(event));
  };
  await touch('touchstart',200,200); await touch('touchend',80,205); assertActive(5);
  await touch('touchstart',200,200); await touch('touchend',205,60); assertActive(5);
});

test('Every capability has its source tools, three applied steps and correct evidence destination', async () => {
  const opened=[]; await mount(<SkillsSection motion={false} onOpen={project=>opened.push(project?.id)}/>);
  for(const [i,skill] of skills.entries()){
    await click(document.getElementById('skills-tab-'+i)); assertActive(i);
    const panel=active(); assert.equal(panel.querySelectorAll('.workflow-steps>li').length,3);
    assert.equal(panel.querySelectorAll('.capability-tools li').length,skill.items.length);
    for(const item of skill.items)assert(panel.textContent.includes(item));
    assert(panel.textContent.includes(skill.description));
    if(skill.evidence.project){
      await click(panel.querySelector('.capability-copy button'));
      assert.equal(opened.at(-1),skill.evidence.project);
    } else assert.equal(panel.querySelector('.capability-copy a').getAttribute('href'),'#journey');
  }
  assert(active().textContent.includes('Working knowledge and design exposure'));
  assert(container.querySelector('a[href="https://lnkd.in/p/edJ3cAif"]'));
  await key(selected(),'Home'); assertActive(0);
  await key(selected(),'ArrowLeft'); assertActive(3);
});

test('Shared carousel changes preserve three education frames, credits and project callbacks', async () => {
  const opened=[]; await mount(<EducationSection motion={false} onOpen={project=>opened.push(project?.id)}/>);
  for(const [i,item] of education.entries()){
    await click(document.getElementById('education-tab-'+i)); assertActive(i);
    assert(active().textContent.includes(item.school));
    assert(active().textContent.includes(item.photo.author));
    assert.equal(active().querySelector('.campus-background').getAttribute('src'),item.photo.src);
    for(const skill of item.skills)assert(active().textContent.includes(skill));
    for(const group of item.learningGroups)assert(active().querySelector('.learning-groups').textContent.includes(group.description));
    assert(active().textContent.includes(item.analystConnection));
    for(const [j,id] of item.projectIds.entries()){
      assert(projects.find(project=>project.id===id));
      await click(active().querySelectorAll('.education-project')[j]); assert.equal(opened.at(-1),id);
    }
  }
});


test('Bachelor education shows the scrap-built Bell model and college first-place award, with no SecureFI association', async () => {
  await mount(<EducationSection motion={false} onOpen={()=>{}}/>);
  await click(document.getElementById('education-tab-2'));
  const panel=active();
  assert(!panel.textContent.includes('SecureFI'));
  assert.equal(panel.querySelectorAll('.education-project').length,0);
  assert.equal(panel.querySelector('.campus-regulation').textContent,'Regulation 2013');
  assert.equal(panel.querySelector('.campus-period').textContent,'2016 — 2020');
  assert(panel.querySelector('a.curriculum-source').getAttribute('href').startsWith('https://cac.annauniv.edu/'));
  assert.match(panel.textContent,/Bell helicopter model/);
  assert.match(panel.textContent,/1st place/);
  assert.match(panel.textContent,/college symposium/);
  assert.match(panel.textContent,/scrap metals/);
  assert.match(panel.textContent,/recovered motors/);
  assert.match(panel.textContent,/no new parts or components/);
  const photo=panel.querySelector('.student-project-photo');
  assert(photo,'Show the supplied model photograph.');
  assert.equal(photo.getAttribute('src'),'./assets/education/bell-helicopter-scrap-model.jpg');
  assert.equal(panel.querySelector('.student-project-photo-link').getAttribute('href'),photo.getAttribute('src'));
});


test('About follows the introduction and comes first in desktop, menu and mobile navigation', () => {
  window.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});
  const fixture=document.createElement('div');
  fixture.innerHTML=renderToStaticMarkup(<App/>);
  assert.deepEqual([...fixture.querySelectorAll('main>section[id]')].map(section=>section.id),['home','about','work','journey','toolkit','education','contact']);
  for(const selector of ['nav[aria-label="Main navigation"]','nav[aria-label="Expanded navigation"]','nav[aria-label="Quick navigation"]']){
    const links=[...fixture.querySelector(selector).querySelectorAll('a')];
    assert.equal(links[0].getAttribute('href'),'#about');
    assert.equal(links.length,6);
    for(const link of links)assert(fixture.querySelector(link.getAttribute('href')));
  }
});
