import { useEffect, useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import EventDetails from '@/components/EventDetails';
import DaySchedule from '@/components/DaySchedule';
import CollapsibleSections, { CollapsibleSection } from '@/components/CollapsibleSections';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Header from '@/components/Header';
import GiftsSection from '@/components/GiftsSection';
import { registryContent } from '@/lib/registryContent';
import videoSrc from '@assets/Fiesta_-_Horizontal_1766433192319.mp4';
import videoSrcMobile from '@assets/Fiesta_-_Vertical_1766433192320.mp4';
import evoraPhoto from '@assets/evora-photo.png';
import explorePortugalPhoto from '@assets/explore-portugal.jpg';
import venuePhoto from '@assets/venue-photo.png';
import cocktailDresscode from '@assets/Day_1_cocktail-Photoroom_1786464177287.png';
import weddingDresscode from '@assets/Day_2_Wedding-Photoroom_1786464177292.png';

interface Event {
  time: string;
  name: string;
  description: string;
  location?: string;
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
  anchor?: string;
}

const anchorIds: Record<string, string> = {
  program: 'program',
  travel: 'travel',
  'venue-dresscode': 'venue-dresscode',
  gifts: 'gifts',
};

export default function WeddingRSVP({ content, lang, anchor }: WeddingRSVPProps) {
  const openForm = () => {
    window.open(content.formUrl, '_blank', 'noopener,noreferrer');
  };

  // Keep the section in the URL so it can be shared. Only scroll when the
  // anchor itself changes — switching language on the same section stays put.
  const lastScrolledAnchor = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!anchor || !anchorIds[anchor]) {
      lastScrolledAnchor.current = undefined;
      return;
    }
    if (anchor === lastScrolledAnchor.current) return;
    const timer = setTimeout(() => {
      document.getElementById(anchorIds[anchor])?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      lastScrolledAnchor.current = anchor;
    }, 150);
    return () => clearTimeout(timer);
  }, [anchor]);

  const openIndex = anchor === 'travel' ? 0 : anchor === 'venue-dresscode' ? 1 : null;

  return (
    <div className="min-h-screen bg-background">
      <Header lang={lang} />
      <LanguageSwitcher />
      
      <HeroSection
        saveTheDate={content.hero.saveTheDate}
        coupleNames={content.hero.coupleNames}
        location={content.hero.location}
        date={content.hero.date}
        navLinks={[
          { label: (registryContent[lang] ?? registryContent.en).navProgram, href: `/program/${lang}` },
          { label: (registryContent[lang] ?? registryContent.en).navTravel,  href: `/travel/${lang}` },
          { label: (registryContent[lang] ?? registryContent.en).navVenue,   href: `/venue-dresscode/${lang}` },
          { label: (registryContent[lang] ?? registryContent.en).navGifts,   href: `/gifts/${lang}` },
        ]}
        videoSrc={videoSrc}
        videoSrcMobile={videoSrcMobile}
      />
      
      <div id="program" className="-mt-[20vh] md:mt-0 relative z-10 scroll-mt-16">
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
        locationUrl="https://maps.app.goo.gl/c2zp2qWPMy9ijsQV9"
        events={content.day1.events}
        variant="default"
      />
      
      <DaySchedule
        title={content.day2.title}
        subtitle={content.day2.subtitle}
        location={content.day2.location}
        locationUrl="https://maps.app.goo.gl/sdxiDqAqXzqhAfUf9"
        events={content.day2.events}
        variant="alternate"
      />
      
      <CollapsibleSections
        ids={['travel', 'venue-dresscode', undefined]}
        openIndex={openIndex}
        expandAllLabel={(registryContent[lang] ?? registryContent.en).expandAll}
        collapseAllLabel={(registryContent[lang] ?? registryContent.en).collapseAll}
        sections={content.infoSections.map((section, i) => {
          if (i === 0) return { ...section, image: evoraPhoto, imageOrientation: 'vertical' as const };
          if (i === 1) return {
            ...section,
            image: venuePhoto,
            imageOrientation: 'horizontal' as const,
            address: 'Rua da Mouraria 26, Évora, Portugal',
            addressMapUrl: 'https://maps.app.goo.gl/sdxiDqAqXzqhAfUf9',
            dresscode: section.dresscode ? {
              ...section.dresscode,
              cards: section.dresscode.cards.map(c => ({
                ...c,
                image: c.image === '__COCKTAIL__' ? cocktailDresscode : c.image === '__WEDDING__' ? weddingDresscode : c.image,
              })),
            } : undefined,
          };
          if (i === 2) return { ...section, image: explorePortugalPhoto, imageOrientation: 'horizontal' as const };
          return section;
        })}
      />

      <GiftsSection lang={lang} />
      
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
