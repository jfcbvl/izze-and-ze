import { useLocation } from 'wouter';

const languages = [
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'pt', label: 'PT', flag: '🇵🇹' },
  { code: 'mx', label: 'ES', flag: '🇲🇽' },
];

export default function LanguageSwitcher() {
  const [location, setLocation] = useLocation();
  
  const currentLang = location.substring(1) || 'en';

  return (
    <div className="fixed top-6 right-6 z-50 flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLocation(`/${lang.code}`)}
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
  );
}
