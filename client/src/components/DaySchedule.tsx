import { Clock, MapPin, ExternalLink } from 'lucide-react';
import LinkifyEvora from './LinkifyEvora';

interface Event {
  time: string;
  name: string;
  description?: string;
}

interface DayScheduleProps {
  title: string;
  subtitle: string;
  location?: string;
  locationUrl?: string;
  events: Event[];
  variant?: 'default' | 'alternate';
}

export default function DaySchedule({
  title,
  subtitle,
  location,
  locationUrl,
  events,
  variant = 'default',
}: DayScheduleProps) {
  const bgClass = variant === 'alternate' ? 'bg-muted/30' : 'bg-background';
  const dayId = title.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <section className={`py-24 px-6 ${bgClass}`} data-testid={`section-${dayId}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4" data-testid={`heading-${dayId}`}>
            {title}
          </h2>
          <p className="text-muted-foreground font-sans text-lg" data-testid={`text-${dayId}-subtitle`}>
            {subtitle}
          </p>
          {location && (
            <div className="flex items-center justify-center gap-2 text-muted-foreground mt-3">
              <MapPin className="w-4 h-4" />
              <span className="font-sans" data-testid={`text-${dayId}-location`}>
                {locationUrl ? (
                  <a
                    href={locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 transition-all"
                  >
                    {location}<ExternalLink className="inline w-3.5 h-3.5 ml-1 align-[-1px]" aria-hidden="true" />
                  </a>
                ) : (
                  <LinkifyEvora text={location} />
                )}
              </span>
            </div>
          )}
        </div>
        
        <div className="space-y-12">
          {events.map((event, index) => {
            const eventId = event.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
            return (
              <div
                key={index}
                data-testid={`card-${dayId}-event-${eventId}`}
                className="flex flex-col md:flex-row gap-6 md:gap-12"
              >
                <div className="md:w-32 flex-shrink-0">
                  <div className="flex items-center gap-2 text-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="font-sans font-medium text-lg" data-testid={`text-${dayId}-${eventId}-time`}>{event.time}</span>
                  </div>
                </div>
                
                <div className="flex-1 space-y-3">
                  <h3 className="font-serif text-2xl md:text-3xl text-foreground" data-testid={`heading-${dayId}-${eventId}`}>
                    {event.name}
                  </h3>
                  
                  {event.description && (
                    <p className="text-muted-foreground font-sans leading-relaxed" data-testid={`text-${dayId}-${eventId}-description`}>
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
