import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCharacters } from "../services/api.js";
import CharacterCard from "../components/CharacterCard.jsx";

export default function CharactersPage() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState(null);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");

      try {
        const data = await fetchCharacters({ page, name, status });
        setCharacters(data.results);
        setInfo(data.info);
      } catch (err) {
        setCharacters([]);
        setInfo(null);
        setError(err.message || "Failed to load characters");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [page, name, status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-galaxyAccentSoft">Characters</h1>

      {/* Search + Filter */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-3 md:items-end"
      >
        <div className="flex-1">
          <label className="block text-sm text-galaxyTextSoft mb-1">
            Search by name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rick, Morty..."
            className="w-full rounded-md bg-galaxyCard border border-galaxyBorder px-3 py-2 text-sm text-galaxyTextSoft focus:outline-none focus:border-galaxyAccent"
          />
        </div>

        <div>
          <label className="block text-sm text-galaxyTextSoft mb-1">
            Status filter
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-md bg-galaxyCard border border-galaxyBorder px-3 py-2 text-sm text-galaxyTextSoft focus:outline-none focus:border-galaxyAccent"
          >
            <option value="">All</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-galaxyAccent text-galaxyBg font-semibold text-sm hover:bg-galaxyAccentSoft transition"
        >
          Apply
        </button>
      </form>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center gap-3 py-10">
          <img
            src="/images/rick-morty-portal.png"
            alt="Loading"
            className="w-20 opacity-60 animate-spin-slow"
          />
          <p className="text-galaxyTextMuted text-sm">
            Traveling through the multiverse...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-galaxyCard border border-galaxyBorder rounded-xl p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {/* Empty State with Portal */}
          {characters.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16">

          <img
            src="/images/rick-morty-portal.png"
            alt="No characters found"
            className="w-40 opacity-70 animate-spin-slow"
          />

              <div className="text-center space-y-1">
                <p className="text-galaxyTextSoft font-semibold">
                  No characters found
                </p>
                <p className="text-galaxyTextMuted text-sm">
                  Try a different name or change the status filter.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {characters.map((ch) => (
                  <CharacterCard
                    key={ch.id}
                    character={ch}
                    onClick={() => navigate(`/characters/${ch.id}`)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {info && (
                <div className="flex justify-between items-center mt-4 text-sm text-galaxyTextSoft/90">
                  <button
                    type="button"
                    disabled={!info.prev}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="px-3 py-1 rounded-md border border-galaxyBorder disabled:opacity-40 disabled:cursor-not-allowed hover:border-galaxyAccentSoft"
                  >
                    Previous
                  </button>
                  <span>
                    Page {page} of {info.pages}
                  </span>
                  <button
                    type="button"
                    disabled={!info.next}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1 rounded-md border border-galaxyBorder disabled:opacity-40 disabled:cursor-not-allowed hover:border-galaxyAccentSoft"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}
