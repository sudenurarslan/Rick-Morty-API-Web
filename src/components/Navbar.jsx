import { NavLink } from "react-router-dom";

const baseClasses = "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300";
const activeClasses = "bg-gradient-to-r from-galaxyAccent to-galaxyAccentDark text-white shadow-lg shadow-galaxyAccent/30";
const inactiveClasses = "text-galaxyTextSoft/80 hover:bg-galaxyCard hover:text-galaxyAccentSoft hover:scale-105";

export default function Navbar() {
  return (
    <header className="bg-gradient-to-r from-galaxyCard/90 via-galaxyBgSoft/90 to-galaxyCard/90 border-b-2 border-galaxyAccent/30 backdrop-blur-xl shadow-lg shadow-galaxyAccent/5 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <NavLink
          to="/"
          className="group flex items-center gap-3 hover:scale-105 transition-transform"
        >
          <img 
            src="/images/rick-morty-standing.png" 
            alt="Rick and Morty"
            className="h-14 w-auto"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-galaxyAccentSoft to-galaxyAccent bg-clip-text text-transparent">
            Wiki
          </span>
        </NavLink>

        <div className="flex gap-2">
          <NavLink
            to="/characters"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
            }
          >
            Characters
          </NavLink>
          <NavLink
            to="/episodes"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
            }
          >
            Episodes
          </NavLink>
          <NavLink
            to="/locations"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
            }
          >
            Locations
          </NavLink>
        </div>
      </nav>
    </header>
  );
}