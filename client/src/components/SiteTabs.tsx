import { useLocation } from 'wouter';
import { registryContent } from '@/lib/registryContent';

interface SiteTabsProps {
  lang: string;
}

export default function SiteTabs({ lang }: SiteTabsProps) {
  const [location, setLocation] = useLocation();
  const t = registryContent[lang] ?? registryContent.en;

  const tabs = [
    { id: 'itinerary', label: t.tabItinerary, path: `/${lang}` },
    { id: 'dress-code', label: t.tabDressCode, path: `/${lang}/dress-code` },
    { id: 'gifts', label: t.tabGifts, path: `/${lang}/gifts` },
  ];

  const isActive = (path: string) =>
    path === `/${lang}` ? location === path : location.startsWith(path);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex gap-1 bg-white/80 backdrop-blur-sm border border-black/10 rounded-full px-1.5 py-1 shadow-sm max-w-[calc(100vw-1.5rem)] overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setLocation(tab.path)}
          data-testid={`tab-${tab.id}`}
          className={`
            px-3 md:px-4 py-1.5 rounded-full font-sans text-xs md:text-sm font-medium whitespace-nowrap transition-all
            ${isActive(tab.path)
              ? 'bg-black text-white'
              : 'text-foreground/60 hover:text-foreground'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
