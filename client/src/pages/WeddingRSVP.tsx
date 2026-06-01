import HeroSection from '@/components/HeroSection';
import EventDetails from '@/components/EventDetails';
import DaySchedule from '@/components/DaySchedule';
import CollapsibleSections, { CollapsibleSection } from '@/components/CollapsibleSections';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import videoSrc from '@assets/Fiesta_-_Horizontal_1766433192319.mp4';
import videoSrcMobile from '@assets/Fiesta_-_Vertical_1766433192320.mp4';
import evoraPhoto from '@assets/evora-photo.png';
import explorePortugalPhoto from '@assets/explore-portugal.jpg';

interface Event {
  time: string;
  name: string;
  description: string;
  location: string;
}

interface WeddingContent {
  hero: {
    saveTheDate?: string;
    coupleNames: string;
    location: string;
    date: string;
    ctaText: string;
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
    location?: string;
    events: Event[];
  };
  day2: {
    title: string;
    subtitle: string;
    location?: string;
    events: Event[];
  };
  infoSections: CollapsibleSection[];
  formUrl: string;
}

interface WeddingRSVPProps {
  content: WeddingContent;
  lang: string;
}

export default function WeddingRSVP({ content, lang }: WeddingRSVPProps) {
  const openForm = () => {
    window.open(content.formUrl, '_blank', 'noopener,noreferrer');
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
        onCtaClick={openForm}
        videoSrc={videoSrc}
        videoSrcMobile={videoSrcMobile}
      />
      
      <div className="-mt-[20vh] md:mt-0 relative z-10">
        <EventDetails
          title={content.eventDetails.title}
          description={content.eventDetails.description}
          dateLabel={content.eventDetails.dateLabel}
          date={content.eventDetails.date}
          locationLabel={content.eventDetails.locationLabel}
          location={content.eventDetails.location}
        />
      </div>
      
      <div className="max-w-xs mx-auto">
        <hr className="border-t border-black/30" />
      </div>
      
      <DaySchedule
        title={content.day1.title}
        subtitle={content.day1.subtitle}
        location={content.day1.location}
        events={content.day1.events}
        variant="default"
      />
      
      <DaySchedule
        title={content.day2.title}
        subtitle={content.day2.subtitle}
        location={content.day2.location}
        events={content.day2.events}
        variant="alternate"
      />
      
      <CollapsibleSections
        sections={content.infoSections.map((section, i) => {
          if (i === 0) return { ...section, image: evoraPhoto, imageOrientation: 'vertical' as const };
          if (i === 1) return { ...section, image: explorePortugalPhoto, imageOrientation: 'horizontal' as const };
          return section;
        })}
      />
      
      <div className="pb-20 md:pb-8 text-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          data-testid="button-back-to-top"
          className="text-muted-foreground hover:text-foreground font-sans text-sm underline underline-offset-4 transition-colors"
        >
          Back to top
        </button>
      </div>
    </div>
  );
}
