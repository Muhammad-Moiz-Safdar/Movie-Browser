const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE

function MovieCard({ movie }) {
  return (
    <div className="min-w-[140px] bg-zinc-800 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200">

      {/* Poster */}
      {movie.poster_path ? (
        <img
          src={`${IMAGE_BASE}${movie.poster_path}`}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover"
        />
      ) : (
        <div className="w-full aspect-[2/3] bg-zinc-700 flex items-center justify-center">
          <svg className="w-10 h-10 stroke-zinc-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.2}>
            <rect x="2" y="2" width="20" height="20" rx="3" />
            <path d="m9 9 6 3-6 3V9z" />
          </svg>
        </div>
      )}

      {/* Info */}
      <div className="p-2">
        <h3 className="text-white text-xs font-medium truncate mb-1">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-yellow-400 text-xs">
            ★ {movie.vote_average?.toFixed(1)}
          </span>
          <span className="text-zinc-500 text-xs">
            {movie.release_date?.split("-")[0]}
          </span>
        </div>
      </div>

    </div>
  )
}

export default MovieCard