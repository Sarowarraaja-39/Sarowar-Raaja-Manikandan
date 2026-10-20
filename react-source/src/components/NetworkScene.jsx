import { useEffect, useRef } from 'react';

export default function NetworkScene({ motion = true }) {
  const mount=useRef(null);
  useEffect(()=>{
    if(!motion || !mount.current) return;
    let disposed=false, cleanup=()=>{};
    import('three').then(THREE=>{
      if(disposed || !mount.current)return;
      const host=mount.current;
      let renderer;
      try { renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'}); }
      catch { return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));
      const scene=new THREE.Scene();
      const camera=new THREE.PerspectiveCamera(42,1,.1,80);camera.position.z=8;
      const group=new THREE.Group();scene.add(group);
      const resources=[];
      const keep=x=>(resources.push(x),x);
      const orbitMat=keep(new THREE.LineBasicMaterial({color:0x9ca9e8,transparent:true,opacity:.26}));
      [0,1,2].forEach((n)=>{
        const pts=[];for(let i=0;i<=100;i++){const a=i/100*Math.PI*2;pts.push(new THREE.Vector3(Math.cos(a)*2.65,Math.sin(a)*2.65,0));}
        const g=keep(new THREE.BufferGeometry().setFromPoints(pts));
        const ring=new THREE.LineLoop(g,orbitMat);ring.rotation.x=.7+n*.55;ring.rotation.y=n*.8;group.add(ring);
      });
      const shape=keep(new THREE.IcosahedronGeometry(.095,0));
      const amber=keep(new THREE.MeshBasicMaterial({color:0xc5ceff,wireframe:true}));
      const cyan=keep(new THREE.MeshBasicMaterial({color:0xa7b5ff,wireframe:true}));
      const nodes=[];
      for(let i=0;i<18;i++){
        const angle=i/18*Math.PI*2;const radius=2.35+(i%3)*.18;
        const node=new THREE.Mesh(shape,i%4===0?amber:cyan);
        node.position.set(Math.cos(angle)*radius,Math.sin(angle)*radius,Math.sin(angle*3)*1.1);
        group.add(node);nodes.push(node);
      }
      const netPoints=[];nodes.forEach((n,i)=>{const next=nodes[(i+5)%nodes.length];netPoints.push(n.position,next.position);});
      const netGeo=keep(new THREE.BufferGeometry().setFromPoints(netPoints));
      const netMat=keep(new THREE.LineBasicMaterial({color:0xa7b5ff,transparent:true,opacity:.13}));group.add(new THREE.LineSegments(netGeo,netMat));
      const stars=[];for(let i=0;i<130;i++){stars.push(Math.sin(i*12.989)*7,Math.cos(i*7.31)*5,-2-Math.abs(Math.sin(i*4.17))*5);}
      const sg=keep(new THREE.BufferGeometry());sg.setAttribute('position',new THREE.Float32BufferAttribute(stars,3));
      const sm=keep(new THREE.PointsMaterial({color:0xe5e9ff,size:.013,transparent:true,opacity:.6}));scene.add(new THREE.Points(sg,sm));
      host.appendChild(renderer.domElement);
      const resize=()=>{const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();};
      const ro=new ResizeObserver(resize);ro.observe(host);resize();
      let visible=true;let inView=true;let raf;let previous=0;
      const draw=(time)=>{if(disposed)return;raf=requestAnimationFrame(draw);if(!visible||!inView||time-previous<32)return;previous=time;group.rotation.y=time*.000055;group.rotation.z=Math.sin(time*.00009)*.08;nodes.forEach((n,i)=>n.rotation.y=time*.0004+i);renderer.render(scene,camera);};
      const onVisibility=()=>{visible=!document.hidden;};document.addEventListener('visibilitychange',onVisibility);
      const io=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;});io.observe(host);
      raf=requestAnimationFrame(draw);
      cleanup=()=>{cancelAnimationFrame(raf);ro.disconnect();io.disconnect();document.removeEventListener('visibilitychange',onVisibility);resources.forEach(x=>x.dispose());renderer.dispose();renderer.domElement.remove();};
    }).catch(()=>{});
    return()=>{disposed=true;cleanup();};
  },[motion]);
  return <div className="network-scene" ref={mount} aria-hidden="true"><div className="orbit-fallback"><i/><i/><i/></div></div>;
}
