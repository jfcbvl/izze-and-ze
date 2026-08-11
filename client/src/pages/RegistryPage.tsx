import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { Copy, Check, Landmark } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Header from '@/components/Header';
import { registryContent, paymentConfig } from '@/lib/registryContent';
import venmoQr from '@/assets/venmo-qr.jpeg';
import revolutQr from '@/assets/revolut-qr.jpeg';

type Step =
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

  const [, navigate] = useLocation();
  const [step, setStepRaw] = useState<Step>('amount');
  const [amount, setAmount] = useState('');

  // Advance to a new step, pushing a history entry so the browser Back
  // button mirrors the on-page Back link.
  const setStep = (s: Step) => {
    window.history.pushState({ registryStep: s }, '');
    setStepRaw(s);
  };

  useEffect(() => {
    const onPop = (e: PopStateEvent) => {
      const s = e.state?.registryStep as Step | undefined;
      setStepRaw(s ?? 'amount');
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

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
    ? `${t.currencySymbol}${amountNumber % 1 === 0 ? amountNumber.toFixed(0) : amountNumber.toFixed(2)}`
    : '';

  const resetAll = () => {
    navigate(`/gifts/${lang}`);
  };

  // Depth of each step in the linear flow; breadcrumb jumps traverse history
  // backwards so the browser Back/Forward stack stays coherent.
  const stepDepth: Record<Step, number> = {
    amount: 0,
    payment: 1,
    bank: 2,
    venmo: 2,
    mbway: 2,
    revolut: 2,
    'bank-us': 3,
    'bank-pt': 3,
    'bank-intl': 3,
    thanks: 4,
  };

  const jumpBackTo = (target: Step) => {
    const delta = stepDepth[target] - stepDepth[step];
    if (delta < 0) {
      window.history.go(delta);
    } else {
      setStep(target);
    }
  };

  // ---- Breadcrumb -----------------------------------------------------------
  const breadcrumb = (() => {
    const items: { label: string; target: Step | null; home?: boolean }[] = [];
    items.push({ label: t.breadcrumbRegistry, target: null, home: true });
    if (step === 'thanks') return items;
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
            {item.target || item.home ? (
              <button
                onClick={() => (item.home ? resetAll() : jumpBackTo(item.target!))}
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

  const BackStep = ({ className = 'pt-8' }: { className?: string } = {}) => (
    <div className={`text-center ${className}`}>
      <button
        onClick={() => window.history.back()}
        className="font-sans text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
        data-testid="button-back-step"
      >
        {t.back}
      </button>
    </div>
  );

  const BackToRegistry = () => (
    <div className="text-center pt-12">
      <button
        onClick={resetAll}
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
    <div
      className={
        step === 'thanks'
          ? 'min-h-screen'
          : 'h-[100dvh] overflow-hidden overscroll-none'
      }
      style={{ backgroundColor: CREAM }}
    >
      <Header lang={lang} />
      <LanguageSwitcher />

      <div
        ref={stepContainerRef}
        tabIndex={-1}
        className="max-w-2xl mx-auto px-6 pt-28 md:pt-32 pb-24 md:pb-16 focus:outline-none"
      >
        <Breadcrumb />

        {/* ------------------------------------------------ Amount */}
        {step === 'amount' && (
          <div data-testid="registry-amount" className="text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-2">{t.amountTitle}</h1>
            <div className="w-10 h-px bg-black/15 mx-auto mb-10" />

            <label
              htmlFor="registry-amount-input"
              className="block font-sans text-sm text-muted-foreground mb-4"
            >
              {t.amountLabel}
            </label>
            <div className="flex items-center gap-2 max-w-xs mx-auto border border-black/15 rounded-lg bg-white/70 px-5 py-3 mb-3">
              <span className="font-serif text-2xl text-muted-foreground">{t.currencySymbol}</span>
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
            <BackStep />
          </div>
        )}

        {/* ------------------------------------------------ Payment method */}
        {step === 'payment' && (
          <div data-testid="registry-payment">
            <div className="text-center mb-10">
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-3">
                {t.paymentTitle.replace('{amount}', formattedAmount ?? '')}
              </h1>
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
            <BackStep />
          </div>
        )}

        {/* ------------------------------------------------ Bank location */}
        {step === 'bank' && (
          <div data-testid="registry-bank">
            <div className="text-center mb-10">
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-3">{t.bankWhereTitle.replace('{amount}', formattedAmount ?? '')}</h1>
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
            <BackStep />
          </div>
        )}

        {/* ------------------------------------------------ Venmo */}
        {step === 'venmo' && (
          <div data-testid="registry-venmo" className="text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-1">{t.venmoTitle.replace('{amount}', formattedAmount ?? '')}</h1>
            <p className="font-sans text-sm text-muted-foreground mb-10">{t.detailThanks}</p>
            <div className={`${cardClass} inline-block p-6 bg-white mb-8`}>
              <div className="font-sans text-lg text-foreground mb-4">{paymentConfig.venmo.username}</div>
              <img src={venmoQr} alt="Venmo QR code" className="mx-auto w-40 h-40 object-cover rounded-2xl shadow-md" />
            </div>
            <div className="flex flex-col items-center gap-4">
              <a
                href={`https://venmo.com/${paymentConfig.venmo.username.replace('@', '')}?txn=pay&amount=${amountValid ? amountNumber : ''}&note=${encodeURIComponent('Wedding gift')}`}
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
            <BackStep />
          </div>
        )}

        {/* ------------------------------------------------ MB WAY */}
        {step === 'mbway' && (
          <div data-testid="registry-mbway" className="text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-1">{t.mbwayTitle.replace('{amount}', formattedAmount ?? '')}</h1>
            <p className="font-sans text-sm text-muted-foreground mb-10">{t.detailThanks}</p>
            <div className="max-w-sm mx-auto mb-5">
              <DetailRow label={t.fieldPhoneNumber} value={paymentConfig.mbway.phone} copyLabel={t.copyLabel} copiedLabel={t.copied} />
            </div>
            <p className="font-sans text-sm text-muted-foreground max-w-xs mx-auto">{t.mbwayInstructions}</p>
            <BackStep />
          </div>
        )}

        {/* ------------------------------------------------ Revolut */}
        {step === 'revolut' && (
          <div data-testid="registry-revolut" className="text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-1">{t.revolutTitle.replace('{amount}', formattedAmount ?? '')}</h1>
            <p className="font-sans text-sm text-muted-foreground mb-10">{t.detailThanks}</p>
            <div className={`${cardClass} inline-block p-6 bg-white mb-8`}>
              <div className="font-sans text-lg text-foreground mb-4">{paymentConfig.revolut.revtag}</div>
              <img src={revolutQr} alt="Revolut QR code" className="mx-auto w-40 h-40 object-cover rounded-2xl shadow-md" />
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
            <BackStep />
          </div>
        )}

        {/* ------------------------------------------------ Bank details */}
        {step === 'bank-us' && (
          <div data-testid="registry-bank-us" className="text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-1">{t.bankUSTitle.replace('{amount}', formattedAmount ?? '')}</h1>
            <p className="font-sans text-sm text-muted-foreground mb-10">{t.detailThanks}</p>
            <div className="space-y-3 max-w-md mx-auto">
              <DetailRow label={t.fieldAccountHolder} value={paymentConfig.bankUS.accountHolder} copyLabel={t.copyLabel} copiedLabel={t.copied} />
              <DetailRow label={t.fieldRoutingNumber} value={paymentConfig.bankUS.routingNumber} copyLabel={t.copyLabel} copiedLabel={t.copied} />
              <DetailRow label={t.fieldAccountNumber} value={paymentConfig.bankUS.accountNumber} copyLabel={t.copyLabel} copiedLabel={t.copied} />
              <DetailRow label={t.fieldAccountType} value={paymentConfig.bankUS.accountType} copyLabel={t.copyLabel} copiedLabel={t.copied} />
            </div>
            <BackStep />
          </div>
        )}

        {step === 'bank-pt' && (
          <div data-testid="registry-bank-pt" className="text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-1">{t.bankPTTitle.replace('{amount}', formattedAmount ?? '')}</h1>
            <p className="font-sans text-sm text-muted-foreground mb-10">{t.detailThanks}</p>
            <div className="space-y-3 max-w-md mx-auto">
              <DetailRow label={t.fieldAccountHolder} value={paymentConfig.bankPT.accountHolder} copyLabel={t.copyLabel} copiedLabel={t.copied} />
              <DetailRow label={t.fieldIban} value={paymentConfig.bankPT.iban} copyLabel={t.copyLabel} copiedLabel={t.copied} />
              <DetailRow label={t.fieldBicSwift} value={paymentConfig.bankPT.bicSwift} copyLabel={t.copyLabel} copiedLabel={t.copied} />
              <DetailRow label={t.fieldBankName} value={paymentConfig.bankPT.bankName} copyLabel={t.copyLabel} copiedLabel={t.copied} />
              <DetailRow label={t.fieldCorrespondentBic} value={paymentConfig.bankPT.correspondentBic} copyLabel={t.copyLabel} copiedLabel={t.copied} />
            </div>
            <BackStep />
          </div>
        )}

        {step === 'bank-intl' && (
          <div data-testid="registry-bank-intl" className="text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-1">{t.bankIntlTitle.replace('{amount}', formattedAmount ?? '')}</h1>
            <p className="font-sans text-sm text-muted-foreground mb-10">{t.detailThanks}</p>
            <div className="space-y-3 max-w-md mx-auto">
              <DetailRow label={t.fieldAccountHolder} value={paymentConfig.bankIntl.accountHolder} copyLabel={t.copyLabel} copiedLabel={t.copied} />
              <DetailRow label={t.fieldIban} value={paymentConfig.bankIntl.iban} copyLabel={t.copyLabel} copiedLabel={t.copied} />
              <DetailRow label={t.fieldBicSwift} value={paymentConfig.bankIntl.swift} copyLabel={t.copyLabel} copiedLabel={t.copied} />
              <DetailRow label={t.fieldBankName} value={paymentConfig.bankIntl.bankName} copyLabel={t.copyLabel} copiedLabel={t.copied} />
              <DetailRow label={t.fieldBankAddress} value={paymentConfig.bankIntl.bankAddress} copyLabel={t.copyLabel} copiedLabel={t.copied} />
              <DetailRow label={t.fieldCorrespondentBic} value={paymentConfig.bankIntl.correspondentBic} copyLabel={t.copyLabel} copiedLabel={t.copied} />
            </div>
            <BackStep />
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
