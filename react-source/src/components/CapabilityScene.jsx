import { NavIcon } from './StudioUI.jsx';

// Workflow illustrations, not incident data or proficiency scores.
const workflows = {
  '01': { word:'TRACE', title:'From the endpoint to the wider network', icon:'journey',
    steps:[{title:'Map the path', detail:'LAN / WAN · segmentation'},{title:'Find the fault', detail:'Routing · VPN · QoS'},{title:'Verify the change', detail:'Connectivity · continuity'}],
    output:'A network path I can explain.' },
  '02': { word:'EXAMINE', title:'From observed activity to a finding', icon:'work',
    steps:[{title:'Inspect activity', detail:'Packets · detection tests'},{title:'Preserve evidence', detail:'Artefacts · integrity'},{title:'Explain the finding', detail:'Timeline · remediation'}],
    output:'Evidence others can review.' },
  '03': { word:'REPEAT', title:'From configuration to a reviewable report', icon:'toolkit',
    steps:[{title:'Configure', detail:'PyYAML · safe loading'},{title:'Run the checks', detail:'Python · JSON-RPC'},{title:'Write the evidence', detail:'Jinja2 · Markdown'}],
    output:'Checks that are easier to repeat.' },
  '04': { word:'PRIORITISE', title:'From technical exposure to a control', icon:'education',
    steps:[{title:'Assess exposure', detail:'CTEM · risk context'},{title:'Map the controls', detail:'Frameworks · secure SDLC'},{title:'Plan the response', detail:'Remediation · evidence'}],
    output:'A clearer next action.' },
};

export default function CapabilityScene({ number }) {
  const workflow = workflows[number];
  return <figure className={'capability-scene capability-scene--' + number}>
    <div className="capability-scene-top"><span className="eyebrow">How I apply it</span><span className="workflow-direction" aria-hidden="true">↘</span></div>
    <div className="workflow-art" aria-hidden="true"><span className="workflow-orbit workflow-orbit--outer"/><span className="workflow-orbit workflow-orbit--inner"/><span className="workflow-core"><NavIcon type={workflow.icon}/></span><span className="workflow-word">{workflow.word}</span><svg viewBox="0 0 600 80" fill="none" preserveAspectRatio="none"><path d="M0 40H160L190 12H350L382 68H600"/><path className="workflow-signal" d="M0 40H160L190 12H350L382 68H600"/></svg></div>
    <figcaption className="sr-only">{workflow.title}</figcaption>
    <ol className="workflow-steps">{workflow.steps.map((step, i) => <li key={step.title}><span className="workflow-step-number">0{i + 1}</span><div><strong>{step.title}</strong><small>{step.detail}</small></div><span className="workflow-step-arrow" aria-hidden="true">→</span></li>)}</ol>
    <p className="workflow-output"><span aria-hidden="true">↗</span>{workflow.output}</p>
  </figure>;
}
