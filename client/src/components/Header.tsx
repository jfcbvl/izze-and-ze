import { Link } from 'wouter';
import { registryContent } from '@/lib/registryContent';
import { useEffect, useState } from 'react';

interface HeaderProps {
  lang: string;
}

export default function Header({ lang }: HeaderProps) {
  const t = registryContent[lang] ?? registryContent.en;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  const links = [
    { id: 'program', label: t.navProgram },
    { id: 'travel', label: t.navTravel },
    { id: 'venue-dresscode', label: t.navVenue },
    { id: 'gifts', label: t.navGifts },
    { id: 'thankyou', label: lang === 'pt' ? 'Obrigado' : lang === 'mx' ? 'Gracias' : 'Thank You' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-sm border-b border-black/10 transition-all duration-300 ease-in-out ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <nav className="flex items-center gap-4 md:gap-7 px-4 md:px-8 h-12 overflow-x-auto no-scrollbar pr-32 md:pr-64">
        {links.map((l) => (
          <Link
            key={l.id}
            href={l.id === 'thankyou' ? '/thankyou' : `/${l.id}/${lang}`}
            data-testid={`nav-${l.id}`}
            className="font-sans text-xs md:text-sm font-medium text-foreground/70 hover:text-foreground whitespace-nowrap transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
