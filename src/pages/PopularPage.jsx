import useInfiniteScroll from "../hooks/useInfiniteScroll"
import { fetchPopularMovies } from "../api/tmdb"
import MovieCard from "../components/MovieCard"
import SkeletonCard from "../components/SkeletonCard"

function PopularPage() {
  const { movies, loading, hasMore, sentinelRef } = useInfiniteScroll(fetchPopularMovies)

  return (
    <div className="px-8 py-8">

      <h2 className="text-white text-2xl font-semibold mb-6">Popular Movies</h2>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

        {/* Real movie cards */}
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

        {/* Skeleton cards while loading */}
        {loading && Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}

      </div>

      {/* Sentinel div — invisible trigger at the bottom */}
      {hasMore && <div ref={sentinelRef} className="h-10 mt-6" />}

      {/* End message */}
      {!hasMore && (
        <p className="text-center text-zinc-500 text-sm mt-10">
          You have reached the end!
        </p>
      )}

    </div>
  )
}

export default PopularPage