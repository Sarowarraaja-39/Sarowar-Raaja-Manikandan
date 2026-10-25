import { useEffect, useRef, useState } from 'react';

// A single readable frame with optional, interruptible automatic movement.
export default function SlidingFrames({id, label, items, getLabel, getDetail, renderTab, initialIndex=0, children, motion, blocked=false, interval=8000, className=''}) {
  const [index,setIndex]=useState(initialIndex);
  const [paused,setPaused]=useState(false);
  const [hover,setHover]=useState(false);
  const [inView,setInView]=useState(false);
  const [visible,setVisible]=useState(()=>!document.hidden);
  const [announcement,setAnnouncement]=useState('');
  const root=useRef(null),touch=useRef(null),latest=useRef(initialIndex),tabRefs=useRef([]),tabList=useRef(null);
  const playing=motion&&!paused&&!hover&&inView&&visible&&!blocked;
  useEffect(()=>{
    const list=tabList.current,selected=tabRefs.current[index];
    if(list&&selected&&list.scrollWidth>list.clientWidth){
      const left=selected.offsetLeft-list.offsetLeft-(list.clientWidth-selected.offsetWidth)/2;
      list.scrollLeft=Math.max(0,left);
    }
  },[index]);
  useEffect(()=>{
    if(!('IntersectionObserver' in window)){setInView(true);return;}
    const observer=new IntersectionObserver(entries=>setInView(entries[0].isIntersecting),{threshold:.15});
    observer.observe(root.current);return()=>observer.disconnect();
  },[]);
  useEffect(()=>{const change=()=>setVisible(!document.hidden);document.addEventListener('visibilitychange',change);return()=>document.removeEventListener('visibilitychange',change);},[]);
  useEffect(()=>{
    if(!playing)return;
    const timer=setTimeout(()=>{latest.current=(latest.current+1)%items.length;setIndex(latest.current);},interval);
    return()=>clearTimeout(timer);
  },[index,playing,interval,items.length]);
  const select=target=>{
    const requested=typeof target==='function'?target(latest.current):target;
    const next=(requested+items.length)%items.length;
    latest.current=next;setPaused(true);setIndex(next);
    setAnnouncement(`${getLabel(items[next])}. Slide ${next+1} of ${items.length}.`);
  };
  const keyDown=(event,i)=>{
    let next;
    if(event.key==='ArrowRight')next=(i+1)%items.length;
    else if(event.key==='ArrowLeft')next=(i-1+items.length)%items.length;
    else if(event.key==='Home')next=0;
    else if(event.key==='End')next=items.length-1;
    else return;
    event.preventDefault();select(next);document.getElementById(`${id}-tab-${next}`)?.focus();
  };
  const swipe=event=>{
    if(!touch.current)return;
    const point=event.changedTouches[0];
    const dx=point.clientX-touch.current.x,dy=point.clientY-touch.current.y;
    if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy))select(current=>current+(dx<0?1:-1));
    touch.current=null;
  };
  return <div ref={root} className={`sliding-section ${className}`} id={`${id}-carousel`} role="region" aria-roledescription="carousel" aria-label={label} data-playing={playing} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onFocusCapture={event=>{if(!event.target.closest('.frame-play'))setPaused(true);}}>
    <div ref={tabList} className="frame-tabs" role="tablist" aria-label={`Choose ${id} slide`}>
      {items.map((item,i)=><button ref={el=>tabRefs.current[i]=el} key={i} id={`${id}-tab-${i}`} role="tab" aria-controls={`${id}-slide-${i}`} aria-selected={index===i} tabIndex={index===i?0:-1} onClick={()=>select(i)} onKeyDown={event=>keyDown(event,i)}>{renderTab?renderTab(item,i,index===i):<><span className="frame-tab-index">{String(i+1).padStart(2,'0')}</span><span><strong>{getLabel(item)}</strong>{getDetail&&<small>{getDetail(item)}</small>}</span><span className="frame-tab-arrow" aria-hidden="true">↗</span></>}</button>)}
    </div>
    <div className="frame-viewport" id={`${id}-viewport`} onTouchStart={event=>{if(event.target.closest('a,button,input,select,textarea'))return;touch.current={x:event.touches[0].clientX,y:event.touches[0].clientY};}} onTouchEnd={swipe} onTouchCancel={()=>{touch.current=null;}}>
      <div className="sliding-track" style={{transform:`translate3d(-${index*100}%,0,0)`}}>
        {items.map((item,i)=><div className="sliding-frame" role="tabpanel" id={`${id}-slide-${i}`} aria-labelledby={`${id}-tab-${i}`} aria-hidden={index!==i||undefined} inert={index!==i||undefined} tabIndex={index===i?0:undefined} key={i}>{children(item,i,index===i)}</div>)}
      </div>
    </div>
    <div className="frame-controls"><span className="frame-count"><strong>{String(index+1).padStart(2,'0')}</strong><span> / {String(items.length).padStart(2,'0')}</span></span><div className="frame-timer" aria-hidden="true"><i key={`${index}-${playing}`} style={{animationDuration:`${interval}ms`}}/></div><button className="frame-play" disabled={!motion} aria-label={motion?`${paused?'Play':'Pause'} ${id} slideshow`:`Enable site motion to play ${id} slideshow`} aria-pressed={motion&&!paused} onClick={()=>setPaused(current=>!current)}><span aria-hidden="true">{motion&&!paused?'Ⅱ':'▷'}</span><span>{motion?(paused?'Play':'Pause'):'Motion off'}</span></button><div className="frame-arrows"><button aria-label={`Previous ${id} slide`} aria-controls={`${id}-viewport`} onClick={()=>select(current=>current-1)}>←</button><button aria-label={`Next ${id} slide`} aria-controls={`${id}-viewport`} onClick={()=>select(current=>current+1)}>→</button></div></div>
    <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
  </div>;
}
