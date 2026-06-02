import { useNavigate } from "react-router-dom"

const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE

function MovieCard({ movie }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/movie/${movie.id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="bg-zinc-800 rounded-xl overflow-hidden cursor-pointer 
      active:scale-95 md:hover:scale-105 transition-transform duration-200"
    >

      {/* Poster */}
      <div className="w-full aspect-[2/3] bg-zinc-700 relative">
        {movie.poster_path ? (
          <img
            src={`${IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-10 h-10 stroke-zinc-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.2}>
              <rect x="2" y="2" width="20" height="20" rx="3" />
              <path d="m9 9 6 3-6 3V9z" />
            </svg>
          </div>
        )}

        {/* Rating badge on poster */}
        <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs px-2 py-0.5 rounded-md border border-yellow-400/20">
          ★ {movie.vote_average?.toFixed(1)}
        </div>
      </div>

      {/* Info */}
      <div className="p-2 md:p-3">
        <h3 className="text-white text-xs md:text-sm font-medium truncate mb-1">
          {movie.title}
        </h3>
        <span className="text-zinc-500 text-xs">
          {movie.release_date?.split("-")[0]}
        </span>
      </div>

    </div>
  )
}

export default MovieCard