import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCharacter } from "../services/api.js";

export default function CharacterDetailPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");

      try {
        const data = await fetchCharacter(id);
        setCharacter(data);
      } catch (err) {
        setError(err.message || "Failed to load character");
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
        <p className="text-galaxyTextSoft">Loading character...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 space-y-4">
        <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-6 text-center">
          <p className="text-red-400 text-sm mb-4">{error}</p>
          <Link
            to="/characters"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-galaxyAccent to-galaxyAccentDark text-white font-semibold hover:shadow-lg hover:shadow-galaxyAccent/50 transition-all"
          >
            ← Back to characters
          </Link>
        </div>
      </div>
    );
  }

  if (!character) return null;

  return (
    <section className="max-w-4xl mx-auto">
     
      <Link
        to="/characters"
        className="inline-flex items-center gap-2 text-galaxyAccentSoft hover:text-galaxyAccent transition-colors mb-6 group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to characters
      </Link>

      <div className="bg-gradient-to-br from-galaxyCard/80 to-galaxyBgSoft/80 backdrop-blur-xl border-2 border-galaxyBorder rounded-3xl overflow-hidden shadow-2xl shadow-galaxyAccent/10">
        <div className="grid gap-8 md:grid-cols-[300px,1fr] p-8">
          <div className="relative">
            <img
              src={character.image}
              alt={character.name}
              className="w-full rounded-2xl border-2 border-galaxyBorder shadow-lg"
            />
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-galaxyCard/90 backdrop-blur border border-galaxyBorder flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${
                character.status === 'Alive' ? 'bg-green-400' :
                character.status === 'Dead' ? 'bg-red-400' :
                'bg-gray-400'
              }`} />
              <span className="text-xs font-semibold text-galaxyTextSoft">{character.status}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-galaxyAccentSoft to-galaxyAccent bg-clip-text text-transparent mb-2">
                {character.name}
              </h1>
              <p className="text-galaxyTextMuted text-sm uppercase tracking-wider">
                {character.species} • {character.gender}
              </p>
            </div>
            <div className="grid gap-4">
              <div className="bg-galaxyBgSoft/50 rounded-xl p-4 border border-galaxyBorder/50">
                <p className="text-xs uppercase tracking-wider text-galaxyTextMuted mb-1">Status</p>
                <p className="text-lg font-semibold text-galaxyAccentSoft">{character.status}</p>
              </div>

              <div className="bg-galaxyBgSoft/50 rounded-xl p-4 border border-galaxyBorder/50">
                <p className="text-xs uppercase tracking-wider text-galaxyTextMuted mb-1">Species</p>
                <p className="text-lg font-semibold text-galaxyAccentSoft">{character.species}</p>
              </div>

              {character.type && (
                <div className="bg-galaxyBgSoft/50 rounded-xl p-4 border border-galaxyBorder/50">
                  <p className="text-xs uppercase tracking-wider text-galaxyTextMuted mb-1">Type</p>
                  <p className="text-lg font-semibold text-galaxyAccentSoft">{character.type}</p>
                </div>
              )}

              <div className="bg-galaxyBgSoft/50 rounded-xl p-4 border border-galaxyBorder/50">
                <p className="text-xs uppercase tracking-wider text-galaxyTextMuted mb-1">Gender</p>
                <p className="text-lg font-semibold text-galaxyAccentSoft">{character.gender}</p>
              </div>

              <div className="bg-galaxyBgSoft/50 rounded-xl p-4 border border-galaxyBorder/50">
                <p className="text-xs uppercase tracking-wider text-galaxyTextMuted mb-1">Origin</p>
                <p className="text-lg font-semibold text-galaxyAccentSoft">{character.origin?.name}</p>
              </div>

              <div className="bg-galaxyBgSoft/50 rounded-xl p-4 border border-galaxyBorder/50">
                <p className="text-xs uppercase tracking-wider text-galaxyTextMuted mb-1">Last Known Location</p>
                <p className="text-lg font-semibold text-galaxyAccentSoft">{character.location?.name}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-galaxyBorder/50 p-6 bg-galaxyBgSoft/30">
          <Link
            to="/characters"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-galaxyAccent to-galaxyAccentDark text-white font-semibold hover:shadow-lg hover:shadow-galaxyAccent/50 hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to characters
          </Link>
        </div>
      </div>
    </section>
  );
}