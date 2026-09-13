import { Link } from 'wouter';
import { ExternalLink, Images, Play } from 'lucide-react';
import { useRef, useState } from 'react';
import backgroundVideo from '@assets/thank-you-background-desktop-web.mp4';
import backgroundVideoMobile from '@assets/thank-you-background-mobile-web.mp4';
import weddingFilm from '@assets/wedding-thank-you-film.mp4';
import albumThumbnail from '@assets/1456411d-0460-4eb4-be1b-5a9469f5a53f_1789331094787.jpg';

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
  const filmRef = useRef<HTMLVideoElement>(null);
  const [filmPlaying, setFilmPlaying] = useState(false);

  const playFilm = () => {
    if (!filmRef.current) return;
    filmRef.current.muted = false;
    filmRef.current.defaultMuted = false;
    filmRef.current.volume = 1;
    filmRef.current.play();
  };

  return (
    <main className="min-h-screen bg-[#211012] text-white">
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

        <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl -translate-y-20 flex-col items-center justify-center px-5 py-24 text-center text-white">
          <h1 className="font-serif text-6xl font-light md:text-8xl">Izzy & Zé</h1>
          <p className="mt-3 font-sans text-sm uppercase tracking-[0.3em] text-white/85">Évora · Portugal · September 5 · 2026</p>
          <p className="mt-8 max-w-2xl font-sans text-base leading-relaxed text-white/85 md:mt-10 md:text-lg">
            To everyone who crossed streets, countries and oceans to join us - thank you!
          </p>

          <div className="mt-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/20 bg-black/25 p-2 shadow-2xl backdrop-blur-sm">
            <div className="mb-2 flex items-center justify-center gap-2 py-1 font-sans text-xs uppercase tracking-widest text-white/75">
              <Play className="h-3.5 w-3.5" /> A message from Izzy and Zé
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl bg-black md:aspect-[11/5]">
              <video
                ref={filmRef}
                controls
                playsInline
                preload="metadata"
                src={weddingFilm}
                muted={false}
                onLoadedMetadata={(event) => {
                  event.currentTarget.muted = false;
                  event.currentTarget.defaultMuted = false;
                  event.currentTarget.volume = 1;
                }}
                onPlay={() => setFilmPlaying(true)}
                onPause={() => setFilmPlaying(false)}
                onEnded={() => setFilmPlaying(false)}
                className="h-full w-full scale-[1.08] object-cover"
              >
                Your browser does not support video playback.
              </video>
              {!filmPlaying && (
                <button
                  type="button"
                  onClick={playFilm}
                  aria-label="Play a message from Izzy and Zé"
                  className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                >
                  <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/50 bg-black/30 text-white shadow-xl backdrop-blur-sm transition hover:scale-105 md:h-24 md:w-24">
                    <Play className="ml-1 h-9 w-9 fill-white/85 md:h-11 md:w-11" />
                  </span>
                </button>
              )}
            </div>
          </div>
          <a
            href="#share-photos"
            className="mt-3 font-serif text-xl text-white/80 underline decoration-white/40 underline-offset-8 transition hover:text-white hover:decoration-white"
          >
            Photos and Videos Below
          </a>
        </div>
      </section>

      <section id="share-photos" className="scroll-mt-8 bg-[#2b1517] px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#efb27b]">Our shared album</p>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl">Share your memories</h2>
          <p className="mx-auto mt-6 max-w-2xl font-sans leading-relaxed text-white/65">
            If you captured a favorite moment, a blurry dance floor photo, a video, or something we might have missed, add it to our shared album.
          </p>

          <a
            href={albumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mx-auto mt-10 block max-w-2xl overflow-hidden rounded-2xl border border-white/15 bg-[#43211f] text-left shadow-2xl transition hover:-translate-y-0.5 hover:bg-[#4b2523]"
          >
            <img
              src={albumThumbnail}
              alt="Izzy and Zé on their wedding day"
              className="h-56 w-full object-cover object-[center_42%] md:h-72"
            />
            <span className="flex items-center gap-4 p-5 md:p-7">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#76503d] text-white">
                <Images className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="mb-1 block font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#efb27b]">
                  Google Photos shared album
                </span>
                <span className="block font-serif text-2xl">Izzy & Zé’s wedding photos</span>
                <span className="mt-1 block font-sans text-sm text-white/60">Add yours and see what everyone else captured along the way.</span>
              </span>
              <ExternalLink className="h-5 w-5 shrink-0 text-white/50 transition group-hover:text-white" />
            </span>
          </a>

        </div>
      </section>

      <section className="border-y border-white/10 bg-[#3a1b1b] px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#efb27b]">With love & thanks</p>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl">It took a village</h2>
            <p className="mt-4 font-sans text-white/60">And ours is pretty incredible.</p>
          </div>
          <div className="mx-auto mt-14 max-w-2xl space-y-8 text-center">
            {credits.map(([role, names]) => (
              <div key={role}>
                <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-[#efb27b]">{role}</h3>
                <p className="mx-auto mt-2 max-w-xl font-serif text-xl leading-snug text-white/95 md:text-2xl">{names}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#211012] px-6 py-24 text-center text-white md:py-32">
        <h2 className="font-serif text-4xl md:text-6xl">Obrigado · Gracias · Thank you</h2>
        <div className="mx-auto mt-8 max-w-xl space-y-2 font-sans leading-relaxed text-white/60">
          <p>For coming from near and far.</p>
          <p>For celebrating with us.</p>
          <p>For being part of our story.</p>
        </div>
        <p className="mt-10 font-sans text-xs uppercase tracking-[0.3em] text-[#efb27b]">Évora, Portugal · 05.09.26</p>
        <p className="mt-8 font-serif text-4xl">♡</p>
        <p className="mt-2 font-serif text-3xl">Izzy & Zé</p>
        <Link href="/en" className="mt-12 inline-block font-sans text-sm text-white/55 underline underline-offset-4 hover:text-white">
          Return to wedding details
        </Link>
      </section>
    </main>
  );
}