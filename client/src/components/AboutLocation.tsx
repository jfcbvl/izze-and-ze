interface Highlight {
  title: string;
  description: string;
}

interface AboutLocationProps {
  title: string;
  description: string;
  highlights: Highlight[];
}

export default function AboutLocation({
  title,
  description,
  highlights,
}: AboutLocationProps) {
  const sectionId = title.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <section className="py-24 px-6 bg-background" data-testid={`section-${sectionId}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-6" data-testid={`heading-${sectionId}`}>
            {title}
          </h2>
          <p className="text-muted-foreground font-sans text-lg leading-relaxed max-w-2xl mx-auto" data-testid={`text-${sectionId}-description`}>
            {description}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {highlights.map((highlight, index) => {
            const highlightId = highlight.title.toLowerCase().replace(/\s+/g, '-');
            return (
              <div key={index} data-testid={`card-${sectionId}-${highlightId}`} className="space-y-4">
                <h3 className="font-serif text-2xl text-foreground" data-testid={`heading-${sectionId}-${highlightId}`}>
                  {highlight.title}
                </h3>
                <p className="text-muted-foreground font-sans leading-relaxed" data-testid={`text-${sectionId}-${highlightId}-description`}>
                  {highlight.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
