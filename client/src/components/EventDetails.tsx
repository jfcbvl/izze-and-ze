interface EventDetailsProps {
  title: string;
  description: string;
  dateLabel: string;
  date: string;
  locationLabel: string;
  location: string;
  rsvpDeadline?: string;
}

export default function EventDetails({
  title,
  description,
  dateLabel,
  date,
  locationLabel,
  location,
  rsvpDeadline,
}: EventDetailsProps) {
  return (
    <section className="py-24 px-6 bg-background" data-testid="section-event-details">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {rsvpDeadline && (
          <p className="text-foreground text-sm font-sans md:hidden -mt-[50px]" data-testid="text-rsvp-deadline-mobile">
            {rsvpDeadline}
          </p>
        )}
        <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground" data-testid="heading-event-details">
          {title}
        </h2>
        
        <p className="text-muted-foreground font-sans text-lg leading-relaxed" data-testid="text-event-description">
          {description}
        </p>
        
        <div className="flex flex-wrap justify-center gap-8 pt-6">
          <div className="text-center">
            <p className="text-sm font-sans font-medium text-muted-foreground uppercase tracking-wide mb-2" data-testid="label-event-date">
              {dateLabel}
            </p>
            <p className="text-foreground font-serif text-xl" data-testid="text-event-date">
              {date}
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-sm font-sans font-medium text-muted-foreground uppercase tracking-wide mb-2" data-testid="label-event-location">
              {locationLabel}
            </p>
            <p className="text-foreground font-serif text-xl" data-testid="text-event-location">
              {location}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
