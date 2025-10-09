interface HeroSectionProps {
  coupleNames: string;
  location: string;
  date: string;
  ctaText: string;
  onCtaClick: () => void;
  videoSrc?: string;
}

export default function HeroSection({
  coupleNames,
  location,
  date,
  ctaText,
  onCtaClick,
  videoSrc,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {videoSrc && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-light text-white mb-8 tracking-tight">
          {coupleNames}
        </h1>
        
        <p className="text-white text-lg md:text-xl tracking-widest uppercase mb-12 font-sans">
          {location} · {date}
        </p>
        
        <button
          onClick={onCtaClick}
          data-testid="button-scroll-to-rsvp"
          className="px-8 py-4 border-2 border-white/80 rounded-full text-white font-sans font-medium text-lg backdrop-blur-sm bg-white/10 hover-elevate active-elevate-2 transition-all"
        >
          {ctaText}
        </button>
      </div>
    </section>
  );
}
