import { useEffect, useRef, useState } from 'react';
import { Copy, Check, Landmark } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import SiteTabs from '@/components/SiteTabs';
import { registryContent, paymentConfig, GiftOption } from '@/lib/registryContent';
import seattleImg from '@assets/Seattle_1786342608299_cropped.png';
import portugalImg from '@assets/Portugal_1786342608299_cropped.png';
import mexicoImg from '@assets/Mexico_1786342608296_cropped.png';
import newyorkImg from '@assets/New_York_1786342608298_cropped.png';
import bookImg from '@assets/ChatGPT_Image_Aug_9,_2026,_11_45_06_PM_1786344396263.png';
import bookMobileImg from '@assets/ChatGPT_Image_Aug_9,_2026,_11_53_12_PM_1786344828943.png';

const giftImages: Record<GiftOption['id'], string> = {
  seattle: seattleImg,
  portugal: portugalImg,
  mexico: mexicoImg,
  newyork: newyorkImg,
};

type Step =
  | 'home'
  | 'gift'
  | 'amount'
  | 'payment'
  | 'venmo'
  | 'mbway'
  | 'revolut'
  | 'bank'
  | 'bank-us'
  | 'bank-pt'
  | 'bank-intl'
  | 'thanks';

interface RegistryPageProps {
  lang: string;
}

// Wireframe palette: dark olive on warm cream
const OLIVE = '#565b48';
const CREAM = '#faf8f2';

function CopyButton({
  value,
  label,
  aria,
  copiedLabel,
}: {
  value: string;
  label?: string;
  aria?: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value.replace(/\s+/g, ' ').trim()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className="flex-shrink-0 inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
      aria-label={copied ? copiedLabel : label || aria || 'Copy'}
      title={copied ? copiedLabel : label || aria || 'Copy'}
      data-testid="button-copy-value"
    >
      {label && <span className="font-sans text-sm">{copied ? copiedLabel : label}</span>}
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

function DetailRow({
  label,
  value,
  copyLabel,
  copiedLabel,
}: {
  label: string;
  value: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border border-black/10 rounded-lg px-4 py-3 bg-white/70">
      <div className="min-w-0 text-left">
        <div className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-0.5">{label}</div>
        <div className="font-sans text-sm md:text-base text-foreground break-all">{value}</div>
      </div>
      <CopyButton value={value} aria={copyLabel} copiedLabel={copiedLabel} />
    </div>
  );
}

function BrandMark({ kind }: { kind: 'venmo' | 'mbway' | 'revolut' | 'bank' }) {
  const base = 'flex-shrink-0 w-9 h-9 rounded-md flex items-center justify-center font-sans font-bold text-sm';
  if (kind === 'venmo') return <span className={`${base} bg-[#3D95CE] text-white`}>V</span>;
  if (kind === 'mbway') return <span className={`${base} bg-[#D40511] text-white text-xs`}>MB</span>;
  if (kind === 'revolut') return <span className={`${base} bg-black text-white`}>R</span>;
  return (
    <span className={`${base} bg-black/5 text-foreground`}>
      <Landmark className="w-5 h-5" strokeWidth={1.5} />
    </span>
  );
}

export default function RegistryPage({ lang }: RegistryPageProps) {
  const t = registryContent[lang] ?? registryContent.en;

  const [step, setStep] = useState<Step>('home');
  const [giftVote, setGiftVote] = useState<GiftOption | null>(null);
  const [amount, setAmount] = useState('');

  const stepContainerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0 });
    stepContainerRef.current?.focus({ preventScroll: true });
  }, [step]);

  const amountNumber = parseFloat(amount);
  const amountValid = !isNaN(amountNumber) && amountNumber > 0;
  const formattedAmount = amountValid
    ? `€${amountNumber % 1 === 0 ? amountNumber.toFixed(0) : amountNumber.toFixed(2)}`
    : '';

  const resetAll = () => {
    setStep('home');
    setGiftVote(null);
    setAmount('');
  };

  // ---- Breadcrumb -----------------------------------------------------------
  const breadcrumb = (() => {
    const items: { label: string; target: Step | null }[] = [];
    if (step === 'home') return items;
    items.push({ label: t.breadcrumbRegistry, target: 'home' });
    if (step === 'thanks') return items;
    items.push({ label: t.breadcrumbGift, target: step !== 'gift' ? 'gift' : null });
    if (step === 'gift') return items;
    items.push({ label: t.breadcrumbAmount, target: step !== 'amount' ? 'amount' : null });
    if (step === 'amount') return items;
    items.push({ label: t.breadcrumbPayment, target: step !== 'payment' ? 'payment' : null });
    if (step === 'payment') return items;
    if (step === 'venmo') items.push({ label: 'Venmo', target: null });
    if (step === 'mbway') items.push({ label: 'MB WAY', target: null });
    if (step === 'revolut') items.push({ label: 'Revolut', target: null });
    if (step === 'bank' || step === 'bank-us' || step === 'bank-pt' || step === 'bank-intl') {
      items.push({ label: t.breadcrumbBankTransfer, target: step !== 'bank' ? 'bank' : null });
      if (step === 'bank-us') items.push({ label: t.bankUSLabel, target: null });
      if (step === 'bank-pt') items.push({ label: t.bankPTLabel, target: null });
      if (step === 'bank-intl') items.push({ label: t.bankIntlLabel, target: null });
    }
    return items;
  })();

  const Breadcrumb = () =>
    breadcrumb.length === 0 ? null : (
      <nav
        className="font-sans text-[11px] md:text-xs uppercase tracking-wider text-muted-foreground mb-10 flex flex-wrap items-center justify-center gap-1.5"
        data-testid="registry-breadcrumb"
      >
        {breadcrumb.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-black/25">›</span>}
            {item.target ? (
              <button
                onClick={() => setStep(item.target!)}
                className="hover:text-foreground underline-offset-4 hover:underline transition-colors uppercase tracking-wider"
                data-testid={`breadcrumb-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
              </button>
            ) : (
              <span className="text-foreground/70">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    );

  // Persistent contribution summary — "Our Honeymoon / €250" as in the wireframe
  const GiftSummary = () =>
    giftVote ? (
      <div className="text-center mb-10" data-testid="vote-summary">
        <div className="text-xl mb-1.5">{giftVote.emoji}</div>
        <div className="font-serif text-lg md:text-xl text-foreground">{giftVote.title}</div>
        {formattedAmount && step !== 'amount' && (
          <div className="font-sans text-sm text-muted-foreground mt-0.5">{formattedAmount}</div>
        )}
        <div className="w-10 h-px bg-black/15 mx-auto mt-4" />
      </div>
    ) : null;

  const BackToRegistry = ({ toThanks = false }: { toThanks?: boolean }) => (
    <div className="text-center pt-12">
      <button
        onClick={() => (toThanks ? setStep('thanks') : resetAll())}
        className="font-sans text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
        data-testid="button-back-to-registry"
      >
        {t.backToRegistry}
      </button>
    </div>
  );

  const primaryBtn =
    'inline-flex items-center justify-center font-sans text-sm md:text-base px-8 py-3 rounded-md text-white transition-all hover-elevate active-elevate-2';

  const cardClass = 'border border-black/12 rounded-xl bg-white/60';

  return (
    <div className="min-h-screen" style={{ backgroundColor: CREAM }}>
      <SiteTabs lang={lang} />
      <LanguageSwitcher />

      <div
        ref={stepContainerRef}
        tabIndex={-1}
        className={`${step === 'home' ? 'max-w-6xl' : 'max-w-2xl'} mx-auto px-6 pt-28 md:pt-32 pb-24 md:pb-16 focus:outline-none`}
      >
        <Breadcrumb />

        {/* ------------------------------------------------ Registry Home */}
        {step === 'home' && (
          <div data-testid="registry-home">
            <div className="text-center mb-8 md:mb-10">
              <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-3">{t.homeTitle}</h1>
              <p className="font-sans text-muted-foreground">{t.homeSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-stretch">
              {/* Book request */}
              <div className={`${cardClass} overflow-hidden flex flex-col sm:flex-row`}>
                <picture className="block w-full sm:w-2/5 flex-shrink-0">
                  <source media="(max-width: 639px)" srcSet={bookMobileImg} />
                  <img
                    src={bookImg}
                    alt=""
                    className="w-full h-44 sm:h-auto object-cover flex-shrink-0"
                  />
                </picture>
                <div className="px-6 py-7 md:px-7 md:py-8 flex flex-col justify-center text-left">
                  <div className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    {t.bookEyebrow}
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-4">{t.bookTitle}</h2>
                  <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
                    {t.bookCopy1}
                  </p>
                  <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">{t.bookCopy2}</p>
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
                <span className="font-serif italic text-muted-foreground">
                  {t.dividerAnd} / {t.dividerOr}
                </span>
                <div className="h-px flex-1 bg-black/15" />
              </div>

              {/* Monetary gift */}
              <div className={`${cardClass} px-6 py-7 md:px-8 md:py-8 text-center flex flex-col justify-center`}>
                <div className="font-serif text-3xl text-black/10 select-none mb-2" aria-hidden="true">❧</div>
                <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-4">{t.presenceTitle}</h2>
                <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
                  {t.presenceCopy1}
                </p>
                <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                  {t.presenceCopy2}
                </p>
                <div>
                  <button
                    onClick={() => setStep('gift')}
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
        )}

        {/* ------------------------------------------------ Gift selection */}
        {step === 'gift' && (
          <div data-testid="registry-gift">
            <div className="text-center mb-10">
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-3">{t.giftTitle}</h1>
              <p className="font-sans text-muted-foreground">{t.giftSubtitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {t.giftOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    if (giftVote?.id !== option.id) setAmount('');
                    setGiftVote(option);
                    setStep('amount');
                  }}
                  className={`${cardClass} p-2.5 md:p-3 hover-elevate active-elevate-2 transition-all`}
                  data-testid={`gift-option-${option.id}`}
                >
                  <img
                    src={giftImages[option.id]}
                    alt={`${option.title} — ${option.tagline}`}
                    className="w-full h-auto rounded-lg"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------ Amount */}
        {step === 'amount' && giftVote && (
          <div data-testid="registry-amount" className="text-center">
            <p className="font-sans text-sm text-muted-foreground mb-3">{t.amountLeadIn}</p>
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-2">{giftVote.title}</h1>
            <div className="w-10 h-px bg-black/15 mx-auto mb-10" />

            <label
              htmlFor="registry-amount-input"
              className="block font-sans text-sm text-muted-foreground mb-4"
            >
              {t.amountLabel}
            </label>
            <div className="flex items-center gap-2 max-w-xs mx-auto border border-black/15 rounded-lg bg-white/70 px-5 py-3 mb-3">
              <span className="font-serif text-2xl text-muted-foreground">€</span>
              <input
                id="registry-amount-input"
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => {
                  const v = e.target.value.replace(',', '.');
                  if (/^\d*\.?\d{0,2}$/.test(v)) setAmount(v);
                }}
                className="w-full bg-transparent font-serif text-2xl text-foreground focus:outline-none"
                autoFocus
                data-testid="input-amount"
              />
            </div>
            <p className="font-sans text-xs text-muted-foreground mb-10">{t.amountHint}</p>

            <button
              onClick={() => amountValid && setStep('payment')}
              disabled={!amountValid}
              className={`font-sans text-sm md:text-base w-full max-w-xs px-10 py-3 rounded-md transition-all ${
                amountValid ? 'text-white hover-elevate active-elevate-2' : 'bg-black/10 text-black/30 cursor-not-allowed'
              }`}
              style={amountValid ? { backgroundColor: OLIVE } : undefined}
              data-testid="button-continue-amount"
            >
              {t.continueCta}
            </button>
          </div>
        )}

        {/* ------------------------------------------------ Payment method */}
        {step === 'payment' && giftVote && (
          <div data-testid="registry-payment">
            <GiftSummary />
            <div className="text-center mb-10">
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-3">{t.paymentTitle}</h1>
              <p className="font-sans text-muted-foreground">{t.paymentSubtitle}</p>
            </div>
            <div className="space-y-3 max-w-md mx-auto">
              {[
                { id: 'venmo' as Step, name: 'Venmo', mark: 'venmo' as const, tag: t.venmoTag },
                { id: 'mbway' as Step, name: 'MB WAY', mark: 'mbway' as const, tag: t.mbwayTag },
                { id: 'revolut' as Step, name: 'Revolut', mark: 'revolut' as const, tag: t.revolutTag },
                { id: 'bank' as Step, name: t.breadcrumbBankTransfer, mark: 'bank' as const, tag: t.bankTag },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setStep(method.id)}
                  className={`${cardClass} w-full text-left flex items-center gap-4 px-5 py-4 hover-elevate active-elevate-2 transition-all`}
                  data-testid={`payment-option-${method.id}`}
                >
                  <BrandMark kind={method.mark} />
                  <span className="flex-1 min-w-0">
                    <span className="block font-serif text-lg md:text-xl font-medium text-foreground">{method.name}</span>
                    <span className="block font-sans text-sm text-muted-foreground">{method.tag}</span>
                  </span>
                  <span className="text-muted-foreground text-lg">›</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------ Bank location */}
        {step === 'bank' && giftVote && (
          <div data-testid="registry-bank">
            <GiftSummary />
            <div className="text-center mb-10">
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-3">{t.bankWhereTitle}</h1>
              <p className="font-sans text-muted-foreground">{t.bankWhereSubtitle}</p>
            </div>
            <div className="space-y-3 max-w-md mx-auto">
              {[
                { id: 'bank-us' as Step, emoji: '🇺🇸', label: t.bankUSLabel, tag: t.bankUSTag },
                { id: 'bank-pt' as Step, emoji: '🇵🇹', label: t.bankPTLabel, tag: t.bankPTTag },
                { id: 'bank-intl' as Step, emoji: '🌐', label: t.bankIntlLabel, tag: t.bankIntlTag },
              ].map((region) => (
                <button
                  key={region.id}
                  onClick={() => setStep(region.id)}
                  className={`${cardClass} w-full text-left flex items-center gap-4 px-5 py-4 hover-elevate active-elevate-2 transition-all`}
                  data-testid={`bank-region-${region.id}`}
                >
                  <span className="text-2xl">{region.emoji}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-serif text-lg md:text-xl font-medium text-foreground">{region.label}</span>
                    <span className="block font-sans text-sm text-muted-foreground">{region.tag}</span>
                  </span>
                  <span className="text-muted-foreground text-lg">›</span>
                </button>
              ))}
            </div>
            <div className="text-center pt-8">
              <button
                onClick={() => setStep('payment')}
                className="font-sans text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                data-testid="button-bank-back"
              >
                {t.back}
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------ Venmo */}
        {step === 'venmo' && giftVote && (
          <div data-testid="registry-venmo" className="text-center">
            <GiftSummary />
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-1">{t.venmoTitle}</h1>
            <p className="font-sans text-sm text-muted-foreground mb-10">{t.detailThanks}</p>
            <div className={`${cardClass} inline-block p-6 bg-white mb-8`}>
              <div className="font-sans text-lg text-foreground mb-4">{paymentConfig.venmo.username}</div>
              <QRCodeSVG value={paymentConfig.venmo.url} size={160} className="mx-auto" />
            </div>
            <div className="flex flex-col items-center gap-4">
              <a
                href={paymentConfig.venmo.url}
                target="_blank"
                rel="noopener noreferrer"
                className={primaryBtn}
                style={{ backgroundColor: OLIVE }}
                data-testid="button-open-venmo"
              >
                {t.openVenmo}
              </a>
              <CopyButton value={paymentConfig.venmo.username} label={t.copyUsername} copiedLabel={t.copied} />
            </div>
            <BackToRegistry toThanks />
          </div>
        )}

        {/* ------------------------------------------------ MB WAY */}
        {step === 'mbway' && giftVote && (
          <div data-testid="registry-mbway" className="text-center">
            <GiftSummary />
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-1">{t.mbwayTitle}</h1>
            <p className="font-sans text-sm text-muted-foreground mb-10">{t.detailThanks}</p>
            <div className="max-w-sm mx-auto mb-5">
              <DetailRow label={t.fieldPhoneNumber} value={paymentConfig.mbway.phone} copyLabel={t.copyLabel} copiedLabel={t.copied} />
            </div>
            <p className="font-sans text-sm text-muted-foreground max-w-xs mx-auto">{t.mbwayInstructions}</p>
            <BackToRegistry toThanks />
          </div>
        )}

        {/* ------------------------------------------------ Revolut */}
        {step === 'revolut' && giftVote && (
          <div data-testid="registry-revolut" className="text-center">
            <GiftSummary />
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-1">{t.revolutTitle}</h1>
            <p className="font-sans text-sm text-muted-foreground mb-10">{t.detailThanks}</p>
            <div className={`${cardClass} inline-block p-6 bg-white mb-8`}>
              <div className="font-sans text-lg text-foreground mb-4">{paymentConfig.revolut.revtag}</div>
              <QRCodeSVG value={paymentConfig.revolut.url} size={160} className="mx-auto" />
            </div>
            <div className="flex flex-col items-center gap-4">
              <a
                href={paymentConfig.revolut.url}
                target="_blank"
                rel="noopener noreferrer"
                className={primaryBtn}
                style={{ backgroundColor: OLIVE }}
                data-testid="button-open-revolut"
              >
                {t.openRevolut}
              </a>
              <CopyButton value={paymentConfig.revolut.revtag} label={t.copyUsername} copiedLabel={t.copied} />
            </div>
            <BackToRegistry toThanks />
          </div>
        )}

        {/* ------------------------------------------------ Bank details */}
        {step === 'bank-us' && giftVote && (
          <div data-testid="registry-bank-us" className="text-center">
            <GiftSummary />
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-1">{t.bankUSTitle}</h1>
            <p className="font-sans text-sm text-muted-foreground mb-10">{t.detailThanks}</p>
            <div className="space-y-3 max-w-md mx-auto">
              <DetailRow label={t.fieldAccountHolder} value={paymentConfig.bankUS.accountHolder} copyLabel={t.copyLabel} copiedLabel={t.copied} />
              <DetailRow label={t.fieldRoutingNumber} value={paymentConfig.bankUS.routingNumber} copyLabel={t.copyLabel} copiedLabel={t.copied} />
              <DetailRow label={t.fieldAccountNumber} value={paymentConfig.bankUS.accountNumber} copyLabel={t.copyLabel} copiedLabel={t.copied} />
              <DetailRow label={t.fieldAccountType} value={paymentConfig.bankUS.accountType} copyLabel={t.copyLabel} copiedLabel={t.copied} />
            </div>
            <BackToRegistry toThanks />
          </div>
        )}

        {step === 'bank-pt' && giftVote && (
          <div data-testid="registry-bank-pt" className="text-center">
            <GiftSummary />
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-1">{t.bankPTTitle}</h1>
            <p className="font-sans text-sm text-muted-foreground mb-10">{t.detailThanks}</p>
            <div className="space-y-3 max-w-md mx-auto">
              <DetailRow label={t.fieldAccountHolder} value={paymentConfig.bankPT.accountHolder} copyLabel={t.copyLabel} copiedLabel={t.copied} />
              <DetailRow label={t.fieldIban} value={paymentConfig.bankPT.iban} copyLabel={t.copyLabel} copiedLabel={t.copied} />
              <DetailRow label={t.fieldBicSwift} value={paymentConfig.bankPT.bicSwift} copyLabel={t.copyLabel} copiedLabel={t.copied} />
              <DetailRow label={t.fieldBankName} value={paymentConfig.bankPT.bankName} copyLabel={t.copyLabel} copiedLabel={t.copied} />
            </div>
            <BackToRegistry toThanks />
          </div>
        )}

        {step === 'bank-intl' && giftVote && (
          <div data-testid="registry-bank-intl" className="text-center">
            <GiftSummary />
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-1">{t.bankIntlTitle}</h1>
            <p className="font-sans text-sm text-muted-foreground mb-10">{t.detailThanks}</p>
            <div className="space-y-3 max-w-md mx-auto">
              <DetailRow label={t.fieldAccountHolder} value={paymentConfig.bankIntl.accountHolder} copyLabel={t.copyLabel} copiedLabel={t.copied} />
              <DetailRow label={t.fieldIban} value={paymentConfig.bankIntl.iban} copyLabel={t.copyLabel} copiedLabel={t.copied} />
              <DetailRow label={t.fieldBicSwift} value={paymentConfig.bankIntl.swift} copyLabel={t.copyLabel} copiedLabel={t.copied} />
              <DetailRow label={t.fieldBankName} value={paymentConfig.bankIntl.bankName} copyLabel={t.copyLabel} copiedLabel={t.copied} />
              <DetailRow label={t.fieldBankAddress} value={paymentConfig.bankIntl.bankAddress} copyLabel={t.copyLabel} copiedLabel={t.copied} />
            </div>
            <BackToRegistry toThanks />
          </div>
        )}

        {/* ------------------------------------------------ Thank you */}
        {step === 'thanks' && (
          <div data-testid="registry-thanks" className="text-center pt-8">
            <div className="font-serif text-4xl text-black/15 select-none mb-6" aria-hidden="true">
              ❦
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">{t.thankYouTitle}</h1>
            <p className="font-sans text-muted-foreground mb-12">{t.thankYouCopy}</p>
            <button
              onClick={resetAll}
              className={primaryBtn}
              style={{ backgroundColor: OLIVE }}
              data-testid="button-thanks-back"
            >
              {t.backToRegistry}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
