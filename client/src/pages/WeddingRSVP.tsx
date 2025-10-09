import { useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import EventDetails from '@/components/EventDetails';
import RSVPForm from '@/components/RSVPForm';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface WeddingContent {
  hero: {
    saveTheDate?: string;
    coupleNames: string;
    location: string;
    date: string;
    ctaText: string;
  };
  details: {
    title: string;
    dateLabel: string;
    date: string;
    locationLabel: string;
    location: string;
    additionalInfo: string;
    rsvpDeadline?: string;
  };
}

interface WeddingRSVPProps {
  content: WeddingContent;
  lang: string;
}

export default function WeddingRSVP({ content, lang }: WeddingRSVPProps) {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background">
      <LanguageSwitcher />
      
      <HeroSection
        saveTheDate={content.hero.saveTheDate}
        coupleNames={content.hero.coupleNames}
        location={content.hero.location}
        date={content.hero.date}
        ctaText={content.hero.ctaText}
        onCtaClick={scrollToForm}
      />
      
      <EventDetails
        title={content.details.title}
        dateLabel={content.details.dateLabel}
        date={content.details.date}
        locationLabel={content.details.locationLabel}
        location={content.details.location}
        additionalInfo={content.details.additionalInfo}
        rsvpDeadline={content.details.rsvpDeadline}
      />
      
      <div ref={formRef}>
        <RSVPForm iframeSrc="https://airtable.com/embed/app5BN54ZOQHHWwxj/pagyjHpr2QSBvfVEe/form" />
      </div>
    </div>
  );
}
