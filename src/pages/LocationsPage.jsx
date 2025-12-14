import { useEffect, useState } from "react";
import { fetchLocations } from "../services/api.js";

export default function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [info, setInfo] = useState(null); 
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchLocations(page);
        setLocations(data.results);
        setInfo(data.info);
      } catch (err) {
        setLocations([]);
        setInfo(null);
        setError(err.message || "Failed to load locations");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [page]);

  return (
    <section className="space-y-6">
      
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-galaxyAccentSoft to-galaxyAccent bg-clip-text text-transparent">
          Locations
        </h1>
        <p className="text-galaxyTextMuted text-lg">
          Browse different locations from the Rick and Morty universe.
        </p>
      </div>

      {}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-4 border-galaxyAccent/30 border-t-galaxyAccent rounded-full animate-spin" />
          <p className="text-galaxyTextSoft mt-3">Loading locations...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {}
      {!loading && !error && (
        <>
          {locations.length === 0 ? (
            <div className="text-center py-12 bg-galaxyCard/30 rounded-2xl border-2 border-galaxyBorder">
              <p className="text-galaxyTextMuted text-lg">
                No locations found.
              </p>
            </div>
          ) : (
            <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {locations.map((loc) => (
                <li
                  key={loc.id}
                  className="group relative bg-gradient-to-br from-galaxyCard/80 to-galaxyBgSoft/80 backdrop-blur border-2 border-galaxyBorder rounded-2xl p-5 space-y-3 hover:border-galaxyAccent hover:shadow-xl hover:shadow-galaxyAccent/30 hover:scale-105 transition-all duration-300"
                >
                  {}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-galaxyAccent/20 to-galaxyAccentDark/20 border border-galaxyAccent/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-galaxyAccent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    {}
                    <span className="px-2 py-1 rounded-lg bg-galaxyBgSoft/50 border border-galaxyBorder/50 text-galaxyTextMuted text-xs font-bold">
                      #{loc.id}
                    </span>
                  </div>

                  {}
                  <h2 className="text-lg font-bold text-galaxyAccentSoft group-hover:text-galaxyAccent transition-colors line-clamp-2">
                    {loc.name}
                  </h2>

                  {}
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-galaxyTextMuted mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-xs text-galaxyTextMuted">Type</p>
                        <p className="text-sm font-medium text-galaxyTextSoft">
                          {loc.type || "Unknown"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-galaxyTextMuted mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-xs text-galaxyTextMuted">Dimension</p>
                        <p className="text-sm font-medium text-galaxyTextSoft line-clamp-1">
                          {loc.dimension || "Unknown"}
                        </p>
                      </div>
                    </div>

                   
                    <div className="flex items-center gap-2 pt-2 border-t border-galaxyBorder/50">
                      <svg className="w-4 h-4 text-galaxyAccent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="text-xs text-galaxyTextMuted">
                        <span className="font-bold text-galaxyAccent">{loc.residents.length}</span> residents
                      </span>
                    </div>
                  </div>

                  
                  <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-galaxyAccent/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                </li>
              ))}
            </ul>
          )}

          
          {info && (
            <div className="flex justify-between items-center mt-6 bg-galaxyCard/30 backdrop-blur border-2 border-galaxyBorder rounded-xl p-4">
              <button
                type="button"
                disabled={!info.prev}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-4 py-2 rounded-lg border-2 border-galaxyBorder disabled:opacity-40 disabled:cursor-not-allowed hover:border-galaxyAccent hover:bg-galaxyAccent/10 transition-all text-galaxyTextSoft font-medium"
              >
                ← Previous
              </button>
              <span className="text-galaxyTextSoft font-medium">
                Page <span className="text-galaxyAccent font-bold">{page}</span> of <span className="text-galaxyAccent font-bold">{info.pages}</span>
              </span>
              <button
                type="button"
                disabled={!info.next}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 rounded-lg border-2 border-galaxyBorder disabled:opacity-40 disabled:cursor-not-allowed hover:border-galaxyAccent hover:bg-galaxyAccent/10 transition-all text-galaxyTextSoft font-medium"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}