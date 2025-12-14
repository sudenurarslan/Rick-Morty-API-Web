import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="space-y-10">
      <div className="relative overflow-hidden rounded-3xl border border-galaxyBorder bg-gradient-to-br from-galaxyCard/90 to-galaxyBgSoft/80 p-8 md:p-12">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-galaxyAccent/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-galaxyAccentSoft/20 blur-3xl" />

        <img
          src="/images/rick-morty-portal.png"
          alt="Portal"
          className="pointer-events-none absolute -right-10 -top-10 w-56 md:w-80 opacity-55 animate-spin-slow"
        />

        <div className="relative space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-galaxyBorder bg-galaxyBg/40 px-4 py-2 text-xs font-semibold tracking-wide text-galaxyTextSoft">
            SE 3355 • Midterm • Rick & Morty Universe
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-galaxyAccentSoft via-galaxyAccent to-galaxyAccentDark bg-clip-text text-transparent">
              Multiverse Explorer
            </span>
          </h1>

          <p className="max-w-3xl text-base md:text-lg text-galaxyTextMuted leading-relaxed">
            Jump between universes, look up characters, and trace episodes.
            This mini wiki is built with React + Tailwind and powered by the public
            Rick and Morty API.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/characters"
              className="inline-flex items-center justify-center rounded-xl bg-galaxyAccent px-5 py-3 text-sm font-semibold text-galaxyBg hover:bg-galaxyAccentSoft transition"
            >
              Start with Characters
            </Link>
            <Link
              to="/episodes"
              className="inline-flex items-center justify-center rounded-xl border border-galaxyBorder bg-galaxyBg/30 px-5 py-3 text-sm font-semibold text-galaxyTextSoft hover:border-galaxyAccentSoft transition"
            >
              Browse Episodes
            </Link>
          </div>

          <div className="pt-4 grid grid-cols-3 max-w-xl gap-3">
            <Stat label="Characters" value="800+" />
            <Stat label="Episodes" value="50+" />
            <Stat label="Locations" value="100+" />
          </div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-galaxyBorder bg-galaxyCard/70 p-6">
          <h2 className="text-xl font-bold text-galaxyAccentSoft mb-2">
            Quick navigation guide
          </h2>
          <ul className="space-y-2 text-sm text-galaxyTextMuted">
            <li className="flex gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-galaxyAccent" />
              Use <b className="text-galaxyTextSoft">search + status filter</b> on Characters.
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-galaxyAccentSoft" />
              Open an episode to see <b className="text-galaxyTextSoft">linked character IDs</b>.
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-galaxyAccentDark" />
              Locations show <b className="text-galaxyTextSoft">type + dimension</b> and resident count.
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-galaxyBorder bg-gradient-to-br from-galaxyBg/40 to-galaxyCard/70 p-6">
          <h2 className="text-xl font-bold text-galaxyAccentSoft mb-2">
            What makes this different
          </h2>
          <p className="text-sm text-galaxyTextMuted leading-relaxed">
            Instead of a “plain landing page”, this home screen acts like a small
            dashboard: it explains how to use the app, keeps a consistent galaxy theme,
            and gives you direct entry points to the main features.
          </p>

          <div className="mt-4 flex gap-3">
            <Link
              to="/locations"
              className="inline-flex items-center justify-center rounded-xl border border-galaxyBorder bg-galaxyBg/30 px-4 py-2 text-sm font-semibold text-galaxyTextSoft hover:border-galaxyAccentSoft transition"
            >
              Explore Locations
            </Link>
            <a
              href="https://rickandmortyapi.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-galaxyBorder bg-galaxyBg/30 px-4 py-2 text-sm font-semibold text-galaxyTextSoft hover:border-galaxyAccentSoft transition"
            >
              API Docs
            </a>
          </div>
        </div>
      </div>

      {/* FEATURE CARDS */}
      <div className="grid gap-6 md:grid-cols-3">
        <FeatureCard
          to="/characters"
          title="Characters"
          desc="Search, filter by status, paginate, and open detail pages."
          tag="search • filter • detail"
        />
        <FeatureCard
          to="/episodes"
          title="Episodes"
          desc="Episode list + detail page with character links."
          tag="list • pagination • detail"
        />
        <FeatureCard
          to="/locations"
          title="Locations"
          desc="Browse locations with type, dimension, and residents count."
          tag="list • pagination"
        />
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-galaxyBorder bg-galaxyBg/35 p-4">
      <div className="text-2xl font-extrabold bg-gradient-to-r from-galaxyAccentSoft to-galaxyAccent bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-xs text-galaxyTextMuted">{label}</div>
    </div>
  );
}

function FeatureCard({ to, title, desc, tag }) {
  return (
    <Link
      to={to}
      className="group relative overflow-hidden rounded-2xl border border-galaxyBorder bg-galaxyCard/70 p-6 hover:border-galaxyAccentSoft transition"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-galaxyAccent/10 to-transparent" />
      <div className="relative space-y-2">
        <div className="inline-flex items-center rounded-full border border-galaxyBorder bg-galaxyBg/30 px-3 py-1 text-[11px] font-semibold text-galaxyTextMuted">
          {tag}
        </div>
        <h3 className="text-xl font-bold text-galaxyAccentSoft group-hover:text-galaxyAccent transition-colors">
          {title}
        </h3>
        <p className="text-sm text-galaxyTextMuted leading-relaxed">{desc}</p>
        <div className="pt-2 text-sm font-semibold text-galaxyAccent">
          Open →
        </div>
      </div>
    </Link>
  );
}
