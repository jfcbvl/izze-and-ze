import { useEffect, useRef, useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import SiteTabs from '@/components/SiteTabs';
import { registryContent, paymentConfig, GiftOption } from '@/lib/registryContent';

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
  | 'bank-intl';

interface RegistryPageProps {
  lang: string;
}

function CopyButton({ value, label, copiedLabel }: { value: string; label?: string; copiedLabel: string }) {
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
      aria-label={copied ? copiedLabel : label || 'Copy'}
      title={copied ? copiedLabel : label || 'Copy'}
      data-testid="button-copy-value"
    >
      {label && <span className="font-sans text-sm">{copied ? copiedLabel : label}</span>}
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

function DetailRow({ label, value, copiedLabel }: { label: string; value: string; copiedLabel: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border border-black/10 rounded-md px-4 py-3 bg-white/50">
      <div className="min-w-0">
        <div className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-0.5">{label}</div>
        <div className="font-sans text-sm md:text-base text-foreground break-all">{value}</div>
      </div>
      <CopyButton value={value} copiedLabel={copiedLabel} />
    </div>
  );
}

export default function RegistryPage({ lang }: RegistryPageProps) {
  const t = registryContent[lang] ?? registryContent.en;

  const [step, setStep] = useState<Step>('home');
  const [giftVote, setGiftVote] = useState<GiftOption | null>(null);
  const [amount, setAmount] = useState('');

  // Move focus to the step container on every transition so screen readers
  // announce the new view, and scroll back to the top.
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

  // ---- Breadcrumb -----------------------------------------------------------
  const breadcrumb = (() => {
    const items: { label: string; target: Step | null }[] = [];
    if (step === 'home') return items;
    items.push({ label: t.breadcrumbRegistry, target: 'home' });
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
      <nav className="font-sans text-xs md:text-sm text-muted-foreground mb-8 flex flex-wrap items-center gap-1.5" data-testid="registry-breadcrumb">
        {breadcrumb.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-black/30">›</span>}
            {item.target ? (
              <button
                onClick={() => setStep(item.target!)}
                className="hover:text-foreground underline-offset-4 hover:underline transition-colors"
                data-testid={`breadcrumb-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
              </button>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    );

  const VoteSummary = () =>
    giftVote ? (
      <div className="text-center mb-8" data-testid="vote-summary">
        <div className="font-sans text-sm text-muted-foreground">
          <span className="mr-1">{giftVote.emoji}</span>
          {giftVote.title}
          {formattedAmount && step !== 'amount' && (
            <span className="ml-2 text-foreground font-medium">{formattedAmount}</span>
          )}
        </div>
      </div>
    ) : null;

  const BackToRegistry = () => (
    <div className="text-center pt-10">
      <button
        onClick={() => {
          setStep('home');
          setGiftVote(null);
          setAmount('');
        }}
        className="font-sans text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
        data-testid="button-back-to-registry"
      >
        {t.backToRegistry}
      </button>
    </div>
  );

  const ThankYou = () => (
    <div className="text-center pt-10 space-y-2">
      <p className="font-serif text-2xl text-foreground">{t.thankYouTitle}</p>
      <p className="font-sans text-sm text-muted-foreground">{t.thankYouCopy}</p>
    </div>
  );

  const optionCardClass =
    'w-full text-left border border-black/15 rounded-md px-5 py-5 md:px-6 md:py-6 bg-white/40 hover-elevate active-elevate-2 transition-all';

  return (
    <div className="min-h-screen bg-background">
      <SiteTabs lang={lang} />
      <LanguageSwitcher />

      <div ref={stepContainerRef} tabIndex={-1} className="max-w-2xl mx-auto px-6 pt-28 md:pt-32 pb-24 md:pb-16 focus:outline-none">
        <Breadcrumb />

        {/* ------------------------------------------------ Registry Home */}
        {step === 'home' && (
          <div data-testid="registry-home">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">{t.homeTitle}</h1>
              <p className="font-sans text-muted-foreground">{t.homeSubtitle}</p>
            </div>

            <div className="border border-black/15 rounded-md px-6 py-10 md:px-12 md:py-12 bg-white/40 text-center mb-8">
              <div className="text-3xl mb-4">📚</div>
              <div className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3">{t.bookEyebrow}</div>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6">{t.bookTitle}</h2>
              <p className="font-sans text-muted-foreground leading-relaxed mb-4">{t.bookCopy1}</p>
              <p className="font-sans text-muted-foreground leading-relaxed">{t.bookCopy2}</p>
            </div>

            <div className="border border-black/15 rounded-md px-6 py-10 md:px-12 md:py-12 bg-white/40 text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-6">{t.presenceTitle}</h2>
              <p className="font-sans text-muted-foreground leading-relaxed mb-4">{t.presenceCopy1}</p>
              <p className="font-sans text-muted-foreground leading-relaxed mb-8">{t.presenceCopy2}</p>
              <button
                onClick={() => setStep('gift')}
                className="bg-black text-white font-sans text-sm md:text-base px-8 py-3 rounded-md hover-elevate active-elevate-2 transition-all"
                data-testid="button-give-gift"
              >
                {t.giftCta}
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------ Gift / Vote */}
        {step === 'gift' && (
          <div data-testid="registry-gift">
            <div className="text-center mb-10">
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-3">{t.giftTitle}</h1>
              <p className="font-sans text-muted-foreground">{t.giftSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.giftOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    if (giftVote?.id !== option.id) setAmount('');
                    setGiftVote(option);
                    setStep('amount');
                  }}
                  className={`${optionCardClass} text-center`}
                  data-testid={`gift-option-${option.id}`}
                >
                  <div className="text-3xl mb-3">{option.emoji}</div>
                  <div className="font-serif text-xl md:text-2xl font-medium text-foreground mb-1">{option.title}</div>
                  <div className="font-sans text-sm text-muted-foreground">{option.tagline}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------ Amount */}
        {step === 'amount' && giftVote && (
          <div data-testid="registry-amount" className="text-center">
            <div className="text-3xl mb-4">{giftVote.emoji}</div>
            <p className="font-sans text-sm text-muted-foreground mb-2">{t.amountLeadIn}</p>
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-10">{giftVote.title}</h1>

            <label htmlFor="registry-amount-input" className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-4">
              {t.amountLabel}
            </label>
            <div className="flex items-center justify-center gap-2 max-w-xs mx-auto border-b border-black/30 pb-2 mb-2">
              <span className="font-serif text-3xl text-foreground">€</span>
              <input
                id="registry-amount-input"
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => {
                  const v = e.target.value.replace(',', '.');
                  if (/^\d*\.?\d{0,2}$/.test(v)) setAmount(v);
                }}
                className="w-full bg-transparent font-serif text-3xl text-foreground text-center focus:outline-none"
                autoFocus
                data-testid="input-amount"
              />
            </div>
            <p className="font-sans text-xs text-muted-foreground mb-10">{t.amountHint}</p>

            <button
              onClick={() => amountValid && setStep('payment')}
              disabled={!amountValid}
              className={`font-sans text-sm md:text-base px-10 py-3 rounded-md transition-all ${
                amountValid
                  ? 'bg-black text-white hover-elevate active-elevate-2'
                  : 'bg-black/10 text-black/30 cursor-not-allowed'
              }`}
              data-testid="button-continue-amount"
            >
              {t.continueCta}
            </button>
          </div>
        )}

        {/* ------------------------------------------------ Payment method */}
        {step === 'payment' && giftVote && (
          <div data-testid="registry-payment">
            <VoteSummary />
            <div className="text-center mb-10">
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-3">{t.paymentTitle}</h1>
              <p className="font-sans text-muted-foreground">{t.paymentSubtitle}</p>
            </div>
            <div className="space-y-3 max-w-md mx-auto">
              {[
                { id: 'venmo' as Step, name: 'Venmo', emoji: '🇺🇸', tag: t.venmoTag },
                { id: 'mbway' as Step, name: 'MB WAY', emoji: '🇵🇹', tag: t.mbwayTag },
                { id: 'revolut' as Step, name: 'Revolut', emoji: '🌍', tag: t.revolutTag },
                { id: 'bank' as Step, name: t.breadcrumbBankTransfer, emoji: '🏦', tag: t.bankTag },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setStep(method.id)}
                  className={`${optionCardClass} flex items-center gap-4`}
                  data-testid={`payment-option-${method.id}`}
                >
                  <span className="text-2xl">{method.emoji}</span>
                  <span className="flex-1">
                    <span className="block font-serif text-xl font-medium text-foreground">{method.name}</span>
                    <span className="block font-sans text-sm text-muted-foreground">{method.tag}</span>
                  </span>
                  <span className="text-muted-foreground">›</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------ Bank location */}
        {step === 'bank' && giftVote && (
          <div data-testid="registry-bank">
            <VoteSummary />
            <div className="text-center mb-10">
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-3">{t.bankWhereTitle}</h1>
              <p className="font-sans text-muted-foreground">{t.bankWhereSubtitle}</p>
            </div>
            <div className="space-y-3 max-w-md mx-auto">
              {[
                { id: 'bank-us' as Step, emoji: '🇺🇸', label: t.bankUSLabel, tag: t.bankUSTag },
                { id: 'bank-pt' as Step, emoji: '🇵🇹', label: t.bankPTLabel, tag: t.bankPTTag },
                { id: 'bank-intl' as Step, emoji: '🌎', label: t.bankIntlLabel, tag: t.bankIntlTag },
              ].map((region) => (
                <button
                  key={region.id}
                  onClick={() => setStep(region.id)}
                  className={`${optionCardClass} flex items-center gap-4`}
                  data-testid={`bank-region-${region.id}`}
                >
                  <span className="text-2xl">{region.emoji}</span>
                  <span className="flex-1">
                    <span className="block font-serif text-xl font-medium text-foreground">{region.label}</span>
                    <span className="block font-sans text-sm text-muted-foreground">{region.tag}</span>
                  </span>
                  <span className="text-muted-foreground">›</span>
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
            <VoteSummary />
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-10">{t.venmoTitle}</h1>
            <div className="inline-block border border-black/15 rounded-md p-6 bg-white mb-6">
              <div className="font-sans text-lg text-foreground mb-4">{paymentConfig.venmo.username}</div>
              <QRCodeSVG value={paymentConfig.venmo.url} size={160} className="mx-auto" />
            </div>
            <div className="flex flex-col items-center gap-4">
              <a
                href={paymentConfig.venmo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black text-white font-sans text-sm px-8 py-3 rounded-md hover-elevate active-elevate-2 transition-all"
                data-testid="button-open-venmo"
              >
                {t.openVenmo} <ExternalLink className="w-4 h-4" />
              </a>
              <CopyButton value={paymentConfig.venmo.username} label={t.copyUsername} copiedLabel={t.copied} />
            </div>
            <ThankYou />
            <BackToRegistry />
          </div>
        )}

        {/* ------------------------------------------------ MB WAY */}
        {step === 'mbway' && giftVote && (
          <div data-testid="registry-mbway" className="text-center">
            <VoteSummary />
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-10">{t.mbwayTitle}</h1>
            <div className="max-w-sm mx-auto mb-6">
              <DetailRow label={t.fieldPhoneNumber} value={paymentConfig.mbway.phone} copiedLabel={t.copied} />
            </div>
            <p className="font-sans text-sm text-muted-foreground max-w-xs mx-auto">{t.mbwayInstructions}</p>
            <ThankYou />
            <BackToRegistry />
          </div>
        )}

        {/* ------------------------------------------------ Revolut */}
        {step === 'revolut' && giftVote && (
          <div data-testid="registry-revolut" className="text-center">
            <VoteSummary />
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-10">{t.revolutTitle}</h1>
            <div className="inline-block border border-black/15 rounded-md p-6 bg-white mb-6">
              <div className="font-sans text-lg text-foreground mb-4">{paymentConfig.revolut.revtag}</div>
              <QRCodeSVG value={paymentConfig.revolut.url} size={160} className="mx-auto" />
            </div>
            <div className="flex flex-col items-center gap-4">
              <a
                href={paymentConfig.revolut.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black text-white font-sans text-sm px-8 py-3 rounded-md hover-elevate active-elevate-2 transition-all"
                data-testid="button-open-revolut"
              >
                {t.openRevolut} <ExternalLink className="w-4 h-4" />
              </a>
              <CopyButton value={paymentConfig.revolut.revtag} label={t.copyUsername} copiedLabel={t.copied} />
            </div>
            <ThankYou />
            <BackToRegistry />
          </div>
        )}

        {/* ------------------------------------------------ Bank details */}
        {step === 'bank-us' && giftVote && (
          <div data-testid="registry-bank-us">
            <VoteSummary />
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-10 text-center">{t.bankUSTitle}</h1>
            <div className="space-y-3 max-w-md mx-auto">
              <DetailRow label={t.fieldAccountHolder} value={paymentConfig.bankUS.accountHolder} copiedLabel={t.copied} />
              <DetailRow label={t.fieldRoutingNumber} value={paymentConfig.bankUS.routingNumber} copiedLabel={t.copied} />
              <DetailRow label={t.fieldAccountNumber} value={paymentConfig.bankUS.accountNumber} copiedLabel={t.copied} />
              <DetailRow label={t.fieldAccountType} value={paymentConfig.bankUS.accountType} copiedLabel={t.copied} />
            </div>
            <ThankYou />
            <BackToRegistry />
          </div>
        )}

        {step === 'bank-pt' && giftVote && (
          <div data-testid="registry-bank-pt">
            <VoteSummary />
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-10 text-center">{t.bankPTTitle}</h1>
            <div className="space-y-3 max-w-md mx-auto">
              <DetailRow label={t.fieldAccountHolder} value={paymentConfig.bankPT.accountHolder} copiedLabel={t.copied} />
              <DetailRow label={t.fieldIban} value={paymentConfig.bankPT.iban} copiedLabel={t.copied} />
              <DetailRow label={t.fieldBicSwift} value={paymentConfig.bankPT.bicSwift} copiedLabel={t.copied} />
              <DetailRow label={t.fieldBankName} value={paymentConfig.bankPT.bankName} copiedLabel={t.copied} />
            </div>
            <ThankYou />
            <BackToRegistry />
          </div>
        )}

        {step === 'bank-intl' && giftVote && (
          <div data-testid="registry-bank-intl">
            <VoteSummary />
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-10 text-center">{t.bankIntlTitle}</h1>
            <div className="space-y-3 max-w-md mx-auto">
              <DetailRow label={t.fieldAccountHolder} value={paymentConfig.bankIntl.accountHolder} copiedLabel={t.copied} />
              <DetailRow label={t.fieldIban} value={paymentConfig.bankIntl.iban} copiedLabel={t.copied} />
              <DetailRow label={t.fieldBicSwift} value={paymentConfig.bankIntl.swift} copiedLabel={t.copied} />
              <DetailRow label={t.fieldBankName} value={paymentConfig.bankIntl.bankName} copiedLabel={t.copied} />
              <DetailRow label={t.fieldBankAddress} value={paymentConfig.bankIntl.bankAddress} copiedLabel={t.copied} />
            </div>
            <ThankYou />
            <BackToRegistry />
          </div>
        )}
      </div>
    </div>
  );
}
