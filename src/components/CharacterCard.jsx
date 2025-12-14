export default function CharacterCard({ character, onClick }) {
    return (
      <button
        onClick={onClick}
        className="group relative bg-gradient-to-br from-galaxyCard to-galaxyBgSoft border-2 border-galaxyBorder rounded-2xl overflow-hidden text-left hover:border-galaxyAccent hover:shadow-2xl hover:shadow-galaxyAccent/40 hover:scale-105 transition-all duration-300"
      >
        <div className="relative overflow-hidden">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-galaxyCard via-galaxyCard/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
  
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-bold text-galaxyAccentSoft group-hover:text-galaxyAccent transition-colors duration-300">
            {character.name}
          </h3>
          
          <div className="flex items-center gap-2">
          
            <span className={`w-2 h-2 rounded-full ${
              character.status === 'Alive' ? 'bg-green-400' :
              character.status === 'Dead' ? 'bg-red-400' :
              'bg-gray-400'
            }`} />
            <p className="text-xs uppercase tracking-wide text-galaxyTextMuted font-medium">
              {character.status} • {character.species}
            </p>
          </div>
  
          <div className="pt-1">
            <p className="text-xs text-galaxyTextMuted/70">Last known location:</p>
            <p className="text-sm text-galaxyTextSoft font-medium truncate">
              {character.location?.name}
            </p>
          </div>
          <div className="flex items-center text-galaxyAccent text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Details
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-galaxyAccent/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    );
  }