import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SubSection {
  title: string;
  content: string;
}

export interface CollapsibleSection {
  title: string;
  preview: string;
  subsections: SubSection[];
}

interface CollapsibleSectionsProps {
  sections: CollapsibleSection[];
}

function CollapsibleCard({ section, isLast }: { section: CollapsibleSection; isLast: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border border-black/15 ${isLast ? '' : 'border-b-0'} ${isLast ? 'rounded-b-md' : ''} first:rounded-t-md`}
      data-testid={`card-collapsible-${section.title.toLowerCase().replace(/\s+/g, '-').slice(0, 30)}`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-6 py-6 md:px-10 md:py-8 flex items-start justify-between gap-6 group"
        data-testid={`button-toggle-${section.title.toLowerCase().replace(/\s+/g, '-').slice(0, 30)}`}
        aria-expanded={open}
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-2xl md:text-3xl font-medium text-foreground leading-snug">
            {section.title}
          </h3>
          {section.preview && (
            <p className="text-muted-foreground font-sans text-sm md:text-base leading-relaxed mt-2 line-clamp-2">
              {section.preview}
            </p>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground flex-shrink-0 mt-1 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 pb-8 md:px-10 md:pb-10 space-y-6">
          <div className="border-t border-black/10 pt-6 space-y-6">
            {section.subsections.length > 0 ? (
              section.subsections.map((sub, i) => (
                <div key={i} data-testid={`subsection-${sub.title.toLowerCase().replace(/\s+/g, '-').slice(0, 30)}`}>
                  <h4 className="font-sans font-semibold text-foreground text-sm uppercase tracking-widest mb-2">
                    {sub.title}
                  </h4>
                  <p className="font-sans text-muted-foreground leading-relaxed">
                    {sub.content}
                  </p>
                </div>
              ))
            ) : (
              <p className="font-sans text-muted-foreground leading-relaxed italic">
                {section.preview}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CollapsibleSections({ sections }: CollapsibleSectionsProps) {
  return (
    <section className="py-16 px-6 bg-background" data-testid="section-collapsible">
      <div className="max-w-3xl mx-auto rounded-md overflow-hidden border border-black/15">
        {sections.map((section, i) => (
          <CollapsibleCard
            key={i}
            section={section}
            isLast={i === sections.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
