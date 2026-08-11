---
name: Registry gift-vote step (removed, restorable)
description: The "vote on a destination" first step of the gift flow was removed on user request (Aug 2026) but must be restorable. Full architecture + code below.
---

# Removed "gift vote" step of the registry flow

The gift flow (`client/src/pages/RegistryPage.tsx`, route `/:lang/gifts/give`) used to start with a **destination vote** step (`step === 'gift'`): a 2×2 grid of illustrated cards (Seattle / Portugal / Mexico / New York). Picking one stored it in `giftVote` state, and the chosen destination title was shown above the amount input ("You're chipping in toward — {title}"). The user asked to remove it but keep it restorable.

**Still in place (not deleted):**
- Strings: `giftTitle`, `giftSubtitle`, `giftOptions[]` (id/emoji/title/tagline), `amountLeadIn` in all 3 langs in `client/src/lib/registryContent.ts`, plus the `GiftOption` type.
- Images in `attached_assets/`: `Seattle_1786342608299_cropped.png`, `Portugal_1786342608299_cropped.png`, `Mexico_1786342608296_cropped.png`, `New_York_1786342608298_cropped.png`.

## To restore

1. Re-add to `RegistryPage.tsx`:
   - Image imports + map:
     ```tsx
     import seattleImg from '@assets/Seattle_1786342608299_cropped.png';
     import portugalImg from '@assets/Portugal_1786342608299_cropped.png';
     import mexicoImg from '@assets/Mexico_1786342608296_cropped.png';
     import newyorkImg from '@assets/New_York_1786342608298_cropped.png';
     const giftImages: Record<GiftOption['id'], string> = { seattle: seattleImg, portugal: portugalImg, mexico: mexicoImg, newyork: newyorkImg };
     ```
   - `'gift'` back into the `Step` union; initial step `'gift'`; popstate fallback `'gift'`.
   - State: `const [giftVote, setGiftVote] = useState<GiftOption | null>(null);`
   - stepDepth: gift:0, amount:1, payment:2, bank/venmo/mbway/revolut:3, bank-*:4, thanks:5.
   - Breadcrumb: after Registry item, `items.push({ label: t.breadcrumbGift, target: step !== 'gift' ? 'gift' : null }); if (step === 'gift') return items;`
   - Container classes: gift step used `max-w-3xl` and `pt-20 md:pt-20 pb-4`.
   - Step JSX (was between Breadcrumb and the amount step):
     ```tsx
     {step === 'gift' && (
       <div data-testid="registry-gift">
         <div className="text-center mb-5 md:mb-6">
           <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-2">{t.giftTitle}</h1>
           <p className="font-sans text-muted-foreground">{t.giftSubtitle}</p>
         </div>
         <div className="grid min-h-[calc(100dvh-15rem)] min-w-0 w-full max-w-md place-content-center grid-cols-2 grid-rows-2 gap-x-3 gap-y-0 overflow-hidden md:min-h-0 md:h-auto md:max-w-none md:gap-3">
           {t.giftOptions.map((option) => (
             <button key={option.id}
               onClick={() => { if (giftVote?.id !== option.id) setAmount(''); setGiftVote(option); setStep('amount'); }}
               className={`${cardClass} aspect-[1.4] min-h-0 overflow-hidden px-1.5 py-0 hover-elevate active-elevate-2 transition-all md:aspect-auto md:p-2`}
               data-testid={`gift-option-${option.id}`}>
               <img src={giftImages[option.id]} alt={`${option.title} — ${option.tagline}`}
                 className="block h-full min-h-0 w-full rounded-lg object-contain object-center md:h-[190px]" />
             </button>
           ))}
         </div>
         <BackStep className="pt-3 md:pt-6" />
       </div>
     )}
     ```
   - Amount step header showed the vote instead of a generic title:
     ```tsx
     <p className="font-sans text-sm text-muted-foreground mb-3">{t.amountLeadIn}</p>
     <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-2">{giftVote.title}</h1>
     ```
     and steps were guarded with `step === 'x' && giftVote &&`.
   - Optional `GiftSummary` component showed `giftVote.emoji / title / amount` (unused at removal time).
2. The outer wrapper for the gift step relied on `h-[100dvh] overflow-hidden` (non-thanks steps) so the 2×2 grid fit one mobile screen.
