import { useEffect, useState, useRef, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  saveTheDate?: string;
  coupleNames: string;
  location: string;
  date: string;
  ctaText: string;
  onCtaClick: () => void;
  videoSrc?: string;
  videoSrcMobile?: string;
}

export default function HeroSection({
  saveTheDate,
  coupleNames,
  location,
  date,
  ctaText,
  onCtaClick,
  videoSrc,
  videoSrcMobile,
}: HeroSectionProps) {
  const [showScrollHint, setShowScrollHint] = useState(false);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);

  const tryPlay = useCallback((video: HTMLVideoElement | null) => {
    if (!video) return;
    video.muted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.removeAttribute('controls');
    video.controls = false;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = true;
        video.controls = false;
        video.play().catch(() => {});
      });
    }
  }, []);

  useEffect(() => {
    const videos = [mobileVideoRef.current, desktopVideoRef.current];
    
    videos.forEach((video) => {
      if (!video) return;
      video.load();
      tryPlay(video);
      
      const onCanPlay = () => {
        tryPlay(video);
        video.removeEventListener('canplay', onCanPlay);
      };
      video.addEventListener('canplay', onCanPlay);
      
      const onLoadedData = () => {
        tryPlay(video);
        video.removeEventListener('loadeddata', onLoadedData);
      };
      video.addEventListener('loadeddata', onLoadedData);
    });

    const handleInteraction = () => {
      videos.forEach(tryPlay);
    };
    document.addEventListener('touchstart', handleInteraction, { once: true });
    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('scroll', handleInteraction, { once: true });

    return () => {
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, [tryPlay]);

  useEffect(() => {
    // Only run scroll animation on desktop (768px and above)
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (!isDesktop) return;

    let hasUserInteracted = false;
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const cancelAnimation = () => {
      hasUserInteracted = true;
      window.removeEventListener('scroll', cancelAnimation);
      window.removeEventListener('click', cancelAnimation);
      window.removeEventListener('touchstart', cancelAnimation);
      window.removeEventListener('keydown', cancelAnimation);
    };
    
    // Listen for any user interaction
    window.addEventListener('scroll', cancelAnimation);
    window.addEventListener('click', cancelAnimation);
    window.addEventListener('touchstart', cancelAnimation);
    window.addEventListener('keydown', cancelAnimation);
    
    timeoutId = setTimeout(() => {
      // Only run animation if user hasn't interacted
      if (hasUserInteracted) return;
      
      setShowScrollHint(true);
      cancelAnimation(); // Remove listeners after animation starts
      
      // Perform "attempted scroll" - scroll down a bit and back, twice
      const scrollDown = () => {
        window.scrollTo({ top: 120, behavior: 'smooth' });
      };
      const scrollBack = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      
      // First attempt
      scrollDown();
      setTimeout(scrollBack, 1200);
      
      // Second attempt
      setTimeout(scrollDown, 2800);
      setTimeout(scrollBack, 4000);
    }, 5500);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimation();
    };
  }, []);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {videoSrcMobile && (
        <video
          ref={mobileVideoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          src={videoSrcMobile}
          className="hero-video absolute inset-0 w-full h-full object-cover object-center md:hidden pointer-events-none"
        />
      )}
      {videoSrc && (
        <video
          ref={desktopVideoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          src={videoSrc}
          className="hero-video absolute inset-0 w-full h-full object-cover object-center hidden md:block pointer-events-none"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/20 to-black/10" />
      <div className="absolute inset-0 shadow-[inset_0_0_100px_40px_rgba(0,0,0,0.3)]" />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-transparent via-white/30 via-white/60 to-white hidden md:block" />
      <div className="absolute bottom-0 left-0 right-0 h-[60vh] bg-gradient-to-b from-transparent from-0% via-white/55 via-30% via-white/85 via-50% via-white/95 via-70% to-white to-85% md:hidden" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {saveTheDate && (
          <p className="text-white/90 text-sm md:text-base tracking-widest uppercase mb-6 font-sans font-medium">
            {saveTheDate}
          </p>
        )}

        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-light text-white mb-8 tracking-tight">
          {coupleNames}
        </h1>

        <div className="mb-12">
          <p className="text-white text-lg md:text-xl tracking-widest uppercase font-sans mb-2">
            {date}
          </p>
          <a 
            href="https://www.google.com/maps/place/Évora,+Portugal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-base md:text-lg tracking-widest uppercase font-sans hover:underline underline-offset-4 transition-all"
            data-testid="link-hero-location"
          >
            {location}
          </a>
        </div>

        <button
          onClick={onCtaClick}
          data-testid="button-scroll-to-rsvp"
          className="px-8 py-4 rounded-full text-foreground bg-white font-sans font-medium text-lg hover-elevate active-elevate-2 transition-all"
        >
          {ctaText}
        </button>

      </div>

      {showScrollHint && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 scroll-hint hidden md:block" data-testid="scroll-hint">
          <div className="scroll-hint-inner flex flex-col items-center">
            <ChevronDown className="w-8 h-8 text-black" />
            <ChevronDown className="w-8 h-8 text-black/70 -mt-5" />
          </div>
        </div>
      )}
    </section>
  );
}