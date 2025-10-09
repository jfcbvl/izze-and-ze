interface EventDetailsProps {
  title: string;
  dateLabel: string;
  date: string;
  locationLabel: string;
  location: string;
  additionalInfo: string;
  rsvpDeadline?: string;
}

export default function EventDetails({
  title,
  dateLabel,
  date,
  locationLabel,
  location,
  additionalInfo,
  rsvpDeadline,
}: EventDetailsProps) {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
          {title}
        </h2>
        
        <div className="space-y-4 text-lg">
          <p className="text-foreground">
            <span className="font-sans font-medium">{dateLabel}:</span>{' '}
            <span className="font-sans">{date}</span>
          </p>
          
          <p className="text-foreground">
            <span className="font-sans font-medium">{locationLabel}:</span>{' '}
            <span className="font-sans">{location}</span>
          </p>
        </div>
        
        <p className="text-muted-foreground font-sans pt-4">
          {additionalInfo}
        </p>
        
        {rsvpDeadline && (
          <p className="text-foreground font-sans font-medium pt-2">
            {rsvpDeadline}
          </p>
        )}
      </div>
    </section>
  );
}
