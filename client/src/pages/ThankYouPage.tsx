import { Link } from 'wouter';
import { ExternalLink, Images, Play } from 'lucide-react';
import backgroundVideo from '@assets/thank_you_horizontal-desktop_1789330892435.mp4';
import backgroundVideoMobile from '@assets/thankyouvertical-mobile_1789330892436.mp4';
import weddingFilm from '@assets/wedding-thank-you-film.mp4';

const albumUrl = 'https://photos.app.goo.gl/WpfJhpvSDdDh46gb9';

const credits = [
  ['Flowers', 'Ashley, Zach & Alyssa'],
  ['Ceremony', 'Aaron, Maria, Emma, João & Zemi'],
  ['Organizers', 'Constança, Cristina, Izzy & Zé'],
  ['Music', 'The Hangover Band + Mariachi Sol de Lisboa'],
  ['Dinner', 'Taberna Típica Quarta Feira'],
  ['Bar', 'As de Copos'],
  ['Appetizers', 'APPACDM'],
  ['Photography', 'Menino Conhece Menina'],
  ['Hair & Makeup', 'Ana Pinto & Maria Serrano'],
  ['Izzy’s Girls', 'Emma, Manuela, Anabel, Amanda, Frida, Eli, Joyce, Kaitlin & Allison'],
  ['Zé’s Boys', 'Chico, Leo, André & Caeiro'],
  ['Setup & Cleanup Crew', 'Max, Ben, Zach, Ashley, Ahmet, Annelise, Maria, Alex, Saurabh, Danny, Kaitlin, Alyssa, Izzy’s Girls & Zé’s Boys'],
  ['Additional Thanks', 'Fátima, the Izek parents, Sanchez tios & Castelo Branco cousins'],
];

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#faf8f2] text-[#1b1b18]">
      <div className="fixed left-4 top-4 z-50 md:left-8 md:top-6">
        <Link
          href="/en"
          className="inline-flex rounded-full border border-white/30 bg-black/25 px-4 py-2 font-sans text-xs font-medium uppercase tracking-widest text-white backdrop-blur-md transition hover:bg-black/40"
        >
          Wedding details
        </Link>
      </div>

      <section className="relative min-h-screen overflow-hidden bg-black">
        <video autoPlay muted loop playsInline src={backgroundVideoMobile} className="absolute inset-0 h-full w-full object-cover md:hidden" />
        <video autoPlay muted loop playsInline src={backgroundVideo} className="absolute inset-0 hidden h-full w-full object-cover md:block" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/40 to-black/75" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-5 py-24 text-center text-white">
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.35em] text-white/80">Évora · Portugal</p>
          <h1 className="font-serif text-6xl font-light md:text-8xl">Izzy & Zé</h1>
          <p className="mt-3 font-sans text-sm uppercase tracking-[0.3em] text-white/85">September 5 · 2026</p>
          <p className="mt-8 max-w-2xl font-sans text-base leading-relaxed text-white/85 md:mt-10 md:text-lg">
            To everyone who crossed cities, countries and oceans to celebrate with us — thank you.
          </p>

          <div className="mt-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/20 bg-black/25 p-2 shadow-2xl backdrop-blur-sm">
            <div className="mb-2 flex items-center justify-center gap-2 py-1 font-sans text-xs uppercase tracking-widest text-white/75">
              <Play className="h-3.5 w-3.5" /> Our wedding film
            </div>
            <video controls playsInline preload="metadata" src={weddingFilm} className="aspect-video w-full rounded-xl bg-black object-contain">
              Your browser does not support video playback.
            </video>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#565b48]">Our shared album</p>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl">Share your memories</h2>
          <p className="mx-auto mt-6 max-w-2xl font-sans leading-relaxed text-black/60">
            If you captured a favorite moment, a blurry dance floor photo, a video, or something we might have missed, add it to our shared album.
          </p>

          <a
            href={albumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mx-auto mt-10 flex max-w-2xl items-center gap-5 rounded-2xl border border-black/10 bg-white/70 p-5 text-left shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl md:p-7"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#565b48] text-white">
              <Images className="h-6 w-6" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-serif text-2xl">Izzy & Zé’s shared album</span>
              <span className="mt-1 block font-sans text-sm text-black/55">Add yours and see what everyone else captured along the way.</span>
            </span>
            <ExternalLink className="h-5 w-5 shrink-0 text-black/45 transition group-hover:text-black" />
          </a>

          <a
            href={albumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#565b48] px-8 py-4 font-sans text-sm font-semibold uppercase tracking-widest text-white shadow-md transition hover:bg-[#464b3a]"
          >
            Add your photos <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#f3efe3] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#565b48]">With love & thanks</p>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl">It took a village</h2>
            <p className="mt-4 font-sans text-black/60">And ours is pretty incredible.</p>
          </div>
          <div className="mt-12 grid gap-x-12 gap-y-6 md:grid-cols-2">
            {credits.map(([role, names]) => (
              <div key={role} className="border-t border-black/10 pt-4">
                <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#565b48]">{role}</h3>
                <p className="mt-2 font-serif text-xl leading-snug">{names}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 text-center md:py-32">
        <h2 className="font-serif text-4xl md:text-6xl">Obrigado · Gracias · Thank you</h2>
        <div className="mx-auto mt-8 max-w-xl space-y-2 font-sans leading-relaxed text-black/60">
          <p>For coming from near and far.</p>
          <p>For celebrating with us.</p>
          <p>For being part of our story.</p>
        </div>
        <p className="mt-10 font-sans text-xs uppercase tracking-[0.3em] text-[#565b48]">Évora, Portugal · 05.09.26</p>
        <p className="mt-8 font-serif text-4xl">♡</p>
        <p className="mt-2 font-serif text-3xl">Izzy & Zé</p>
        <Link href="/en" className="mt-12 inline-block font-sans text-sm text-black/55 underline underline-offset-4 hover:text-black">
          Return to wedding details
        </Link>
      </section>
    </main>
  );
}