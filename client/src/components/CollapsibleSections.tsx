import { useState } from 'react';
import { ChevronDown, MapPin, Copy, Check } from 'lucide-react';

interface SubSection {
  title: string;
  content: string;
}

interface TipRow {
  label: string;
  value: string;
}

interface TipGroup {
  name: string;
  badge?: string;
  link?: { href: string; label: string };
  rows: TipRow[];
}

interface Tip {
  eyebrow?: string;
  title: string;
  content: string;
  groups?: TipGroup[];
}

export interface CollapsibleSection {
  title: string;
  preview: string;
  subsections: SubSection[];
  image?: string;
  imageOrientation?: 'vertical' | 'horizontal';
  address?: string;
  addressMapUrl?: string;
  tip?: Tip;
}

interface CollapsibleSectionsProps {
  sections: CollapsibleSection[];
}

function AddressRow({ address, mapUrl }: { address: string; mapUrl: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex items-center gap-2 pt-2">
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
        data-testid="link-address-maps"
        title="Open in Google Maps"
      >
        <MapPin className="w-4 h-4" />
      </a>
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-sans text-muted-foreground text-sm leading-relaxed hover:underline underline-offset-4 transition-all"
        data-testid="link-address-text"
      >
        {address}
      </a>
      <button
        onClick={handleCopy}
        className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
        data-testid="button-copy-address"
        title="Copy address"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}

function SubSectionList({ subsections }: { subsections: SubSection[] }) {
  return (
    <div className="space-y-6">
      {subsections.map((sub, i) => (
        <div key={i} data-testid={`subsection-${sub.title.toLowerCase().replace(/\s+/g, '-').slice(0, 30)}`}>
          <h4 className="font-sans font-semibold text-foreground text-sm uppercase tracking-widest mb-2">
            {sub.title}
          </h4>
          <p className="font-sans text-muted-foreground leading-relaxed">
            {sub.content}
          </p>
        </div>
      ))}
    </div>
  );
}

function TipBox({ tip }: { tip: Tip }) {
  return (
    <div className="border-t border-black/10 pt-6 space-y-4">
      {tip.eyebrow && (
        <div className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
          {tip.eyebrow}
        </div>
      )}
      <h4 className="font-sans font-semibold text-foreground text-sm uppercase tracking-widest">
        {tip.title}
      </h4>
      <p className="font-sans text-muted-foreground leading-relaxed">{tip.content}</p>
      {tip.groups && tip.groups.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {tip.groups.map((g, i) => (
            <div key={i} className="border border-black/10 rounded-lg px-4 py-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-sans font-semibold text-foreground">{g.name}</span>
                {g.badge && (
                  <span className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground border border-black/15 rounded px-1.5 py-0.5">
                    {g.badge}
                  </span>
                )}
              </div>
              {g.link && (
                <a
                  href={g.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-sans text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
                >
                  {g.link.label}
                </a>
              )}
              <div className="space-y-1 pt-1">
                {g.rows.map((r, j) => (
                  <div key={j} className="flex justify-between gap-4 font-sans text-sm">
                    <span className="text-muted-foreground">{r.label}</span>
                    <span className="text-foreground font-medium text-right">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
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
        className="w-full text-left px-5 py-5 md:px-10 md:py-8 flex items-start justify-between gap-4 md:gap-6 group"
        data-testid={`button-toggle-${section.title.toLowerCase().replace(/\s+/g, '-').slice(0, 30)}`}
        aria-expanded={open}
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-xl md:text-3xl font-medium text-foreground leading-snug">
            {section.title}
          </h3>
          {section.preview && (
            <p className="text-muted-foreground font-sans text-sm md:text-base leading-relaxed mt-1 line-clamp-1 md:line-clamp-2">
              {section.preview}
            </p>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground flex-shrink-0 mt-1 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 pb-8 md:px-10 md:pb-10" style={{ backgroundColor: '#faf8f2' }}>
          <div className="border-t border-black/10 pt-6 space-y-6">
            {section.image && section.imageOrientation === 'horizontal' ? (
              <>
                <div className="w-full h-56 md:h-72 overflow-hidden rounded-sm">
                  <img
                    src={section.image}
                    alt=""
                    className="w-full h-full object-cover object-center"
                    data-testid="img-section-photo"
                  />
                </div>
                {section.subsections.length > 0 && <SubSectionList subsections={section.subsections} />}
              </>
            ) : section.image ? (
              <div className="flex flex-col md:flex-row gap-8 md:gap-10">
                <div className="flex-shrink-0 md:w-56 lg:w-64">
                  <img
                    src={section.image}
                    alt=""
                    className="w-full md:h-full object-cover rounded-sm max-h-80 md:max-h-none"
                    data-testid="img-section-photo"
                  />
                </div>
                <div className="flex-1">
                  {section.subsections.length > 0 && <SubSectionList subsections={section.subsections} />}
                  {section.address && section.addressMapUrl && (
                    <AddressRow address={section.address} mapUrl={section.addressMapUrl} />
                  )}
                </div>
              </div>
            ) : (
              <>
                {section.subsections.length > 0 ? (
                  <SubSectionList subsections={section.subsections} />
                ) : (
                  <p className="font-sans text-muted-foreground leading-relaxed italic">
                    {section.preview}
                  </p>
                )}
              </>
            )}

            {section.address && section.addressMapUrl && section.imageOrientation === 'horizontal' && (
              <AddressRow address={section.address} mapUrl={section.addressMapUrl} />
            )}
            {section.address && section.addressMapUrl && !section.image && (
              <AddressRow address={section.address} mapUrl={section.addressMapUrl} />
            )}
            {section.tip && <TipBox tip={section.tip} />}
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
