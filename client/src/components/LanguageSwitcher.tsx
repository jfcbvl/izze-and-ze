import { useLocation } from 'wouter';

const languages = [
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'pt', label: 'PT', flag: '🇵🇹' },
  { code: 'mx', label: 'ES', flag: '🇲🇽' },
];

const langCodes = languages.map((l) => l.code);

export default function LanguageSwitcher() {
  const [location, setLocation] = useLocation();

  // Language is always the LAST path segment, e.g. /venue-dresscode/en
  const segments = location.split('/').filter(Boolean);
  const last = segments[segments.length - 1];
  const currentLang = langCodes.includes(last) ? last : 'en';
  const prefix = langCodes.includes(last)
    ? segments.slice(0, -1).join('/')
    : segments.join('/');
  const pathFor = (code: string) => `/${prefix ? `${prefix}/` : ''}${code}`;

  return (
    <>
      <div className="fixed top-1.5 right-4 z-[60] hidden md:flex gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLocation(pathFor(lang.code))}
            data-testid={`button-lang-${lang.code}`}
            className={`
              px-2 py-1 rounded-md font-sans text-sm font-medium transition-all
              ${currentLang === lang.code 
                ? 'bg-white/90 text-foreground border border-border' 
                : 'bg-white/20 text-foreground/60 border border-white/20 hover-elevate active-elevate-2'
              }
            `}
          >
            <span className="mr-1">{lang.flag}</span>
            {lang.label}
          </button>
        ))}
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-gray-100/90 border-t border-black/10 py-[6px]">
        <div className="flex justify-center gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLocation(pathFor(lang.code))}
              data-testid={`button-lang-mobile-${lang.code}`}
              className={`
                px-3 py-1 rounded-md font-sans text-sm font-medium transition-all
                ${currentLang === lang.code 
                  ? 'bg-black text-white' 
                  : 'bg-transparent text-foreground/60 hover-elevate active-elevate-2'
                }
              `}
            >
              <span className="mr-1">{lang.flag}</span>
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
