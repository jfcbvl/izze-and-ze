interface RSVPFormProps {
  iframeSrc: string;
}

export default function RSVPForm({ iframeSrc }: RSVPFormProps) {
  return (
    <section id="rsvp-form" className="pt-24 pb-8 px-0 md:px-6 bg-background">
      <div className="max-w-none md:max-w-4xl mx-auto">
        <iframe
          className="w-full h-[2400px] md:h-[1850px]"
          src={iframeSrc}
          frameBorder="0"
          style={{ background: 'transparent', border: 'none' }}
          title="RSVP Form"
          data-testid="iframe-rsvp-form"
        />
      </div>
    </section>
  );
}
