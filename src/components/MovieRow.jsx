import { useNavigate } from "react-router-dom"
import MovieCard from "./MovieCard"

function MovieRow({ title, emoji, movies, seeAllLink }) {
  const navigate = useNavigate()

  return (
    <div className="mb-10">

      {/* Row Header */}
      <div className="flex items-center justify-between px-8 mb-4">
        <h2 className="text-white text-xl font-semibold">
          {emoji} {title}
        </h2>
        {seeAllLink && (
          <button
            onClick={() => navigate(seeAllLink)}
            className="text-yellow-400 text-sm hover:underline cursor-pointer"
          >
            See all →
          </button>
        )}
      </div>

      {/* Horizontal Scrollable Row */}
      <div className="flex gap-4 overflow-x-auto px-8 pb-4 scrollbar-hide">
        {movies.map((movie) => (
          <div key={movie.id} className="min-w-[140px]">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

    </div>
  )
}

export default MovieRow