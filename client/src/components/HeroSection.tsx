interface HeroSectionProps {
  saveTheDate?: string;
  coupleNames: string;
  location: string;
  date: string;
  ctaText: string;
  rsvpDeadline?: string;
  onCtaClick: () => void;
  videoSrc?: string;
}

export default function HeroSection({
  saveTheDate,
  coupleNames,
  location,
  date,
  ctaText,
  rsvpDeadline,
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

      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/20 to-black/10" />
      <div className="absolute inset-0 shadow-[inset_0_0_100px_40px_rgba(0,0,0,0.3)]" />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-transparent via-white/30 via-white/60 to-white" />

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
          <p className="text-white text-base md:text-lg tracking-widest uppercase font-sans">
            {location}
          </p>
        </div>

        <button
          onClick={onCtaClick}
          data-testid="button-scroll-to-rsvp"
          className="px-8 py-4 rounded-full text-foreground bg-white font-sans font-medium text-lg hover-elevate active-elevate-2 transition-all"
        >
          {ctaText}
        </button>

        {rsvpDeadline && (
          <p className="text-black text-sm md:text-base font-sans mt-6">
            {rsvpDeadline}
          </p>
        )}
      </div>
    </section>
  );
}