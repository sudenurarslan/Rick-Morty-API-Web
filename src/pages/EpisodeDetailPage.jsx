import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchEpisode } from "../services/api.js";

export default function EpisodeDetailPage() {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchEpisode(id);
        setEpisode(data);
      } catch (err) {
        setError(err.message || "Failed to load episode");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-galaxyAccent/30 border-t-galaxyAccent rounded-full animate-spin mb-4" />
        <p className="text-galaxyTextSoft">Loading episode...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 space-y-4">
        <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-6 text-center">
          <p className="text-red-400 text-sm mb-4">{error}</p>
          <Link
            to="/episodes"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-galaxyAccent to-galaxyAccentDark text-white font-semibold hover:shadow-lg hover:shadow-galaxyAccent/50 transition-all"
          >
            ← Back to episodes
          </Link>
        </div>
      </div>
    );
  }

  if (!episode) return null;

  // Karakter ID'lerini URL'den çekmek için küçük yardımcı fonksiyon:
  const getCharacterIdFromUrl = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  return (
    <section className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        to="/episodes"
        className="inline-flex items-center gap-2 text-galaxyAccentSoft hover:text-galaxyAccent transition-colors mb-6 group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to episodes
      </Link>

      {/* Episode Card */}
      <div className="bg-gradient-to-br from-galaxyCard/80 to-galaxyBgSoft/80 backdrop-blur-xl border-2 border-galaxyBorder rounded-3xl overflow-hidden shadow-2xl shadow-galaxyAccent/10">
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-galaxyAccentSoft to-galaxyAccent bg-clip-text text-transparent">
              {episode.name}
            </h1>
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 rounded-lg bg-galaxyBgSoft/50 border border-galaxyBorder/50">
                <span className="text-xs uppercase tracking-wider text-galaxyTextMuted">Episode</span>
                <p className="text-lg font-bold text-galaxyAccentSoft">{episode.episode}</p>
              </div>
              <div className="px-4 py-2 rounded-lg bg-galaxyBgSoft/50 border border-galaxyBorder/50">
                <span className="text-xs uppercase tracking-wider text-galaxyTextMuted">Air Date</span>
                <p className="text-lg font-bold text-galaxyAccentSoft">{episode.air_date}</p>
              </div>
            </div>
          </div>

          {/* Characters Section */}
          <div className="space-y-4 pt-4">
            <h2 className="text-2xl font-bold text-galaxyAccentSoft flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Characters in this episode
              <span className="text-sm font-normal text-galaxyTextMuted">({episode.characters.length})</span>
            </h2>

            {episode.characters.length === 0 ? (
              <div className="text-center py-8 bg-galaxyCard/30 rounded-xl border-2 border-galaxyBorder">
                <p className="text-galaxyTextMuted">
                  No characters listed for this episode.
                </p>
              </div>
            ) : (
              <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {episode.characters.map((url) => {
                  const charId = getCharacterIdFromUrl(url);
                  return (
                    <li
                      key={url}
                      className="group bg-galaxyBgSoft/50 border-2 border-galaxyBorder rounded-xl px-4 py-3 flex items-center justify-between hover:border-galaxyAccent hover:bg-galaxyCard/50 transition-all"
                    >
                      <span className="text-galaxyTextSoft font-medium">
                        Character #{charId}
                      </span>
                      <Link
                        to={`/characters/${charId}`}
                        className="px-3 py-1 rounded-lg bg-gradient-to-r from-galaxyAccent to-galaxyAccentDark text-white text-xs font-semibold hover:shadow-lg hover:shadow-galaxyAccent/50 hover:scale-105 transition-all"
                      >
                        View
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Footer Button */}
        <div className="border-t-2 border-galaxyBorder/50 p-6 bg-galaxyBgSoft/30">
          <Link
            to="/episodes"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-galaxyAccent to-galaxyAccentDark text-white font-semibold hover:shadow-lg hover:shadow-galaxyAccent/50 hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to episodes
          </Link>
        </div>
      </div>
    </section>
  );
}