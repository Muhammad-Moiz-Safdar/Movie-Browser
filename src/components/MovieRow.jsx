import MovieCard from "./MovieCard"

function MovieRow({ title, emoji, movies }) {
  return (
    <div className="mb-10">

      {/* Row Header */}
      <div className="flex items-center justify-between px-8 mb-4">
        <h2 className="text-white text-xl font-semibold">
          {emoji} {title}
        </h2>
        <span className="text-yellow-400 text-sm cursor-pointer hover:underline">
          See all →
        </span>
      </div>

      {/* Horizontal Scrollable Row */}
      <div className="flex gap-4 overflow-x-auto px-8 pb-4 scrollbar-hide">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

    </div>
  )
}

export default MovieRow