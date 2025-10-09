import HeroSection from '../HeroSection';

export default function HeroSectionExample() {
  const handleCtaClick = () => {
    console.log('CTA clicked - would scroll to RSVP form');
  };

  return (
    <HeroSection
      saveTheDate="Save The Date"
      coupleNames="Izzy & Zé"
      location="ÉVORA · PORTUGAL"
      date="05 · 09 · 2026"
      ctaText="RSVP"
      onCtaClick={handleCtaClick}
    />
  );
}
