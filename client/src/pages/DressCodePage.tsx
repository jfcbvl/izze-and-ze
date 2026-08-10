import LanguageSwitcher from '@/components/LanguageSwitcher';
import SiteTabs from '@/components/SiteTabs';
import { registryContent } from '@/lib/registryContent';

export default function DressCodePage({ lang }: { lang: string }) {
  const t = registryContent[lang] ?? registryContent.en;

  return (
    <div className="min-h-screen bg-background">
      <SiteTabs lang={lang} />
      <LanguageSwitcher />
      <div className="max-w-2xl mx-auto px-6 pt-32 pb-24 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">{t.tabDressCode}</h1>
        <p className="font-sans text-muted-foreground">{t.comingSoon}</p>
      </div>
    </div>
  );
}
