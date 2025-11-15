import { ArrowRightIcon } from '@components/atoms/Icons';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-20 text-center text-slate-700">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
          We couldn&apos;t locate this salon page
        </h1>
        <p className="mt-3 max-w-2xl text-base text-slate-500 sm:text-lg">
          The link might be outdated, the company may be offline, or the name was mistyped. Try heading back to the home
          hub or explore an available showcase.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/tony-and-guy"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400"
          >
            Look for a demo
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
