import { useEffect, useRef, useState } from 'react';

const videoSource = './assets/background/london-skyline.mp4';
const posterSource = './assets/background/london-skyline-poster.jpg';

export default function HeroBackground({ motion }) {
  const container = useRef(null);
  const video = useRef(null);
  const [hasSource, setHasSource] = useState(motion);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const [ready, setReady] = useState(false);

  // A reduced-motion visit shows the poster without downloading the video.
  useEffect(() => {
    if (motion) setHasSource(true);
  }, [motion]);

  useEffect(() => {
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    if (!('IntersectionObserver' in window)) {
      return () => document.removeEventListener('visibilitychange', visibility);
    }
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    });
    observer.observe(container.current);
    return () => {
      document.removeEventListener('visibilitychange', visibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const player = video.current;
    if (!player || !hasSource) return;
    let cancelled = false;
    if (motion && inView && pageVisible) {
      player.play()?.catch(() => {
        if (!cancelled) setReady(false);
      });
    } else {
      player.pause();
    }
    return () => {
      cancelled = true;
      player.pause();
    };
  }, [motion, inView, pageVisible, hasSource]);

  return (
    <div
      className="hero-video-background"
      ref={container}
      aria-hidden="true"
      data-ready={ready}
      style={{ backgroundImage: `url("${posterSource}")` }}
    >
      <video
        ref={video}
        src={hasSource ? videoSource : undefined}
        poster={posterSource}
        muted
        loop
        playsInline
        preload="none"
        tabIndex={-1}
        disablePictureInPicture
        disableRemotePlayback
        onPlaying={() => setReady(true)}
        onError={() => setReady(false)}
      />
    </div>
  );
}
