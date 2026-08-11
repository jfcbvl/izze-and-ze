import { useLocation } from 'wouter';
import { registryContent } from '@/lib/registryContent';
import bookImg from '@assets/ChatGPT_Image_Aug_10,_2026,_07_20_40_PM_1786414973643.png';

const OLIVE = '#565b48';
const GIFTS_BG = '#f3efe3';

interface GiftsSectionProps {
  lang: string;
}

export default function GiftsSection({ lang }: GiftsSectionProps) {
  const t = registryContent[lang] ?? registryContent.en;
  const [, navigate] = useLocation();

  const cardClass = 'border border-black/12 rounded-xl bg-white/60';
  const primaryBtn =
    'inline-flex items-center justify-center font-sans text-sm md:text-base px-8 py-3 rounded-md text-white transition-all hover-elevate active-elevate-2';

  return (
    <section id="gifts" className="py-16 md:py-24 px-6" style={{ backgroundColor: GIFTS_BG }} data-testid="section-gifts">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-foreground mb-1 md:mb-3">{t.homeTitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-8 items-stretch">
          {/* Book request */}
          <div className={`${cardClass} overflow-hidden flex flex-row`}>
            <div className="w-[38%] flex-shrink-0 flex items-center justify-center overflow-hidden bg-white/40">
              <img src={bookImg} alt="" className="w-full h-auto object-contain" />
            </div>
            <div className="px-4 py-4 md:px-7 md:py-8 flex flex-col justify-center text-left min-w-0">
              <div className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground mb-1 md:mb-2">
                {t.bookEyebrow}
              </div>
              <h3 className="font-serif text-lg md:text-3xl font-medium text-foreground mb-0.5 md:mb-1">{t.bookTitle}</h3>
              <div className="font-serif italic text-sm md:text-2xl font-medium text-foreground mb-2 md:mb-4">
                {t.bookSubtitle}
              </div>
              <p className="font-sans text-xs md:text-base text-muted-foreground leading-snug mb-1 md:mb-3">{t.bookCopy1}</p>
              <p className="font-sans text-xs md:text-base text-muted-foreground leading-snug">{t.bookCopy2}</p>
            </div>
          </div>

          {/* Elegant and/or divider */}
          <div className="hidden md:flex flex-col items-center justify-center gap-3" aria-hidden="true">
            <div className="w-px flex-1 bg-black/15" />
            <div className="font-serif italic text-lg text-muted-foreground leading-tight text-center">
              {t.dividerAnd}
              <span className="block text-black/30 text-sm not-italic">/</span>
              {t.dividerOr}
            </div>
            <div className="w-px flex-1 bg-black/15" />
          </div>
          <div className="md:hidden flex items-center gap-4" aria-hidden="true">
            <div className="h-px flex-1 bg-black/15" />
            <span className="font-serif italic text-sm text-muted-foreground">
              {t.dividerAnd} / {t.dividerOr}
            </span>
            <div className="h-px flex-1 bg-black/15" />
          </div>

          {/* Monetary gift */}
          <div className={`${cardClass} px-5 py-5 md:px-8 md:py-8 text-center flex flex-col justify-center`}>
            <h3 className="font-serif text-xl md:text-3xl font-medium text-foreground mb-2 md:mb-4">{t.presenceTitle}</h3>
            <p className="hidden md:block font-sans text-base text-muted-foreground leading-relaxed mb-3">
              {t.presenceCopy1}
            </p>
            <p className="font-sans text-xs md:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">
              {t.presenceCopy2}
            </p>
            <div>
              <button
                onClick={() => navigate(`/${lang}/gifts/give`)}
                className={primaryBtn}
                style={{ backgroundColor: OLIVE }}
                data-testid="button-give-gift"
              >
                {t.giftCta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
