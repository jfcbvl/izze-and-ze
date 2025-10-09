import EventDetails from '../EventDetails';

export default function EventDetailsExample() {
  return (
    <EventDetails
      title="Event Details"
      dateLabel="Date"
      date="September 5, 2026"
      locationLabel="Location"
      location="Évora, Portugal"
      additionalInfo="Évora is about 1 hour and 30 minutes from Lisbon — more details will be shared after you RSVP ✈️"
    />
  );
}
