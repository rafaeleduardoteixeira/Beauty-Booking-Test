import Link from 'next/link';

function GlowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#ec4899" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill="url(#glow)" />
      <circle cx="32" cy="32" r="18" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="6 4" />
      <path
        d="M32 16 L37 29 L52 29 L39 37 L44 50 L32 41 L20 50 L25 37 L12 29 L27 29 Z"
        fill="none"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MarkerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 22c3.6-4.2 6-7.5 6-11a6 6 0 0 0-12 0c0 3.5 2.4 6.8 6 11z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 9c3.6-4.2 6-7.5 6-11a6 6 0 0 0-12 0c0 3.5 2.4 6.8 6 11z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-6 py-24 text-center">
        <div className="relative">
          <div className="absolute inset-0 blur-3xl" aria-hidden="true">
            <GlowIcon className="h-44 w-44 opacity-60" />
          </div>
          <GlowIcon className="relative h-36 w-36 drop-shadow-[0_0_35px_rgba(59,130,246,0.45)]" />
        </div>
        <p className="text-sm uppercase tracking-[0.5em] text-blue-300">404</p>
        <h1 className="text-4xl font-semibold sm:text-5xl">This beauty destination is off the map</h1>
        <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
          We couldn&apos;t find the salon or landing page you were looking for. It might have moved, been renamed,
          or never existed. Let&apos;s get you back to somewhere relaxing.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:scale-105"
          >
            Return to main hub
          </Link>
          <Link
            href="/beauty-salon-demo"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white/90 transition hover:border-white/40"
          >
            <MarkerIcon className="h-5 w-5 text-fuchsia-400" />
            Explore demo salon
          </Link>
        </div>
      </div>
    </main>
  );
}
