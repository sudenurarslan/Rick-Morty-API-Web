import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import CharactersPage from "./pages/CharactersPage.jsx";
import CharacterDetailPage from "./pages/CharacterDetailPage.jsx";
import EpisodesPage from "./pages/EpisodesPage.jsx";
import EpisodeDetailPage from "./pages/EpisodeDetailPage.jsx";
import LocationsPage from "./pages/LocationsPage.jsx";

function App() {
  return (
    <div className="min-h-screen bg-galaxyBg text-galaxyTextSoft">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/characters/:id" element={<CharacterDetailPage />} />
          <Route path="/episodes" element={<EpisodesPage />} />
          <Route path="/episodes/:id" element={<EpisodeDetailPage />} />
          <Route path="/locations" element={<LocationsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
