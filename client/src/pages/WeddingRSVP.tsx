import { useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import EventDetails from '@/components/EventDetails';
import DaySchedule from '@/components/DaySchedule';
import AboutLocation from '@/components/AboutLocation';
import RSVPForm from '@/components/RSVPForm';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import videoSrc from '@assets/Header_v2_1764030455102.mp4';

interface Event {
  time: string;
  name: string;
  description: string;
  location: string;
}

interface Highlight {
  title: string;
  description: string;
}

interface WeddingContent {
  hero: {
    saveTheDate?: string;
    coupleNames: string;
    location: string;
    date: string;
    ctaText: string;
    rsvpDeadline?: string;
  };
  eventDetails: {
    title: string;
    description: string;
    dateLabel: string;
    date: string;
    locationLabel: string;
    location: string;
  };
  day1: {
    title: string;
    subtitle: string;
    events: Event[];
  };
  day2: {
    title: string;
    subtitle: string;
    events: Event[];
  };
  aboutEvora: {
    title: string;
    description: string;
    highlights: Highlight[];
  };
  formUrl: string;
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
        rsvpDeadline={content.hero.rsvpDeadline}
        onCtaClick={scrollToForm}
        videoSrc={videoSrc}
      />
      
      <EventDetails
        title={content.eventDetails.title}
        description={content.eventDetails.description}
        dateLabel={content.eventDetails.dateLabel}
        date={content.eventDetails.date}
        locationLabel={content.eventDetails.locationLabel}
        location={content.eventDetails.location}
      />
      
      <DaySchedule
        title={content.day1.title}
        subtitle={content.day1.subtitle}
        events={content.day1.events}
        variant="default"
      />
      
      <DaySchedule
        title={content.day2.title}
        subtitle={content.day2.subtitle}
        events={content.day2.events}
        variant="alternate"
      />
      
      <AboutLocation
        title={content.aboutEvora.title}
        description={content.aboutEvora.description}
        highlights={content.aboutEvora.highlights}
      />
      
      <div ref={formRef}>
        <RSVPForm iframeSrc={content.formUrl} />
      </div>
    </div>
  );
}
