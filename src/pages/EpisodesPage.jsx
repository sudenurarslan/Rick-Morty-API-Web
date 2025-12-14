import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEpisodes } from "../services/api.js";

export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState([]);
  const [info, setInfo] = useState(null); 
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchEpisodes(page);
        setEpisodes(data.results);
        setInfo(data.info);
      } catch (err) {
        setEpisodes([]);
        setInfo(null);
        setError(err.message || "Failed to load episodes");
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
          Episodes
        </h1>
        <p className="text-galaxyTextMuted text-lg">
          Browse episodes from the Rick and Morty series.
        </p>
      </div>
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-4 border-galaxyAccent/30 border-t-galaxyAccent rounded-full animate-spin" />
          <p className="text-galaxyTextSoft mt-3">Loading episodes...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}
      {!loading && !error && (
        <>
          {episodes.length === 0 ? (
            <div className="text-center py-12 bg-galaxyCard/30 rounded-2xl border-2 border-galaxyBorder">
              <p className="text-galaxyTextMuted text-lg">
                No episodes found.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {episodes.map((ep) => (
                <li
                  key={ep.id}
                  className="group bg-gradient-to-br from-galaxyCard/80 to-galaxyBgSoft/80 backdrop-blur border-2 border-galaxyBorder rounded-xl px-6 py-4 hover:border-galaxyAccent hover:shadow-xl hover:shadow-galaxyAccent/20 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-lg bg-galaxyAccent/20 border border-galaxyAccent/30 text-galaxyAccent text-xs font-bold">
                          {ep.episode}
                        </span>
                        <h2 className="text-lg font-bold text-galaxyAccentSoft group-hover:text-galaxyAccent transition-colors">
                          {ep.name}
                        </h2>
                      </div>
                      <p className="text-sm text-galaxyTextMuted flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Air date: {ep.air_date}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate(`/episodes/${ep.id}`)}
                      className="self-start md:self-auto px-5 py-2 rounded-lg bg-gradient-to-r from-galaxyAccent to-galaxyAccentDark text-white text-sm font-semibold hover:shadow-lg hover:shadow-galaxyAccent/50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                    >
                      View details
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
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