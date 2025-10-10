interface RSVPFormProps {
  iframeSrc: string;
}

export default function RSVPForm({ iframeSrc }: RSVPFormProps) {
  return (
    <section id="rsvp-form" className="py-24 px-6 bg-background">
      <div className="max-w-2xl mx-auto">
        <iframe
          className="w-full h-[1850px] md:h-[1350px]"
          src={iframeSrc}
          frameBorder="0"
          style={{ background: 'transparent', border: '1px solid hsl(var(--border))' }}
          title="RSVP Form"
          data-testid="iframe-rsvp-form"
        />
      </div>
    </section>
  );
}
