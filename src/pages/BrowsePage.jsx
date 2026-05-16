import { useState, useEffect } from "react"
import { fetchGenres, fetchMoviesByGenre } from "../api/tmdb"
import MovieCard from "../components/MovieCard"
import SkeletonCard from "../components/SkeletonCard"
import useInfiniteScroll from "../hooks/useInfiniteScroll"

const SORT_OPTIONS = [
  { label: "Popularity", value: "popularity.desc" },
  { label: "Top Rated", value: "vote_average.desc" },
  { label: "Release Date", value: "release_date.desc" },
]

function BrowsePage() {
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [sortBy, setSortBy] = useState("popularity.desc")

  // fetch genres once when page loads
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await fetchGenres()
        setGenres(data)
      } catch (err) {
        console.error("Failed to fetch genres", err)
      }
    }
    loadGenres()
  }, [])

  // infinite scroll with genre and sort as dependencies
  const { movies, loading, hasMore, sentinelRef } = useInfiniteScroll(
  (page) => fetchMoviesByGenre(selectedGenre, sortBy, page),
  [selectedGenre, sortBy]
)

  return (
    <div className="px-8 py-8">

      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-2xl font-semibold">Browse Movies</h2>

        {/* Sort dropdown */}
        <div className="flex items-center gap-3">
          <span className="text-zinc-400 text-sm">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 text-white text-sm px-3 py-2 rounded-lg outline-none cursor-pointer"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Genre chips */}
      <div className="flex gap-2 flex-wrap mb-8">

        {/* All chip */}
        <button
          onClick={() => setSelectedGenre(null)}
          className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            selectedGenre === null
              ? "bg-yellow-400 text-black border-yellow-400"
              : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500"
          }`}
        >
          All
        </button>

        {/* Genre chips */}
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setSelectedGenre(genre.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              selectedGenre === genre.id
                ? "bg-yellow-400 text-black border-yellow-400"
                : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Movie grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

        {/* Movie cards */}
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

        {/* Skeleton cards while loading */}
        {loading && Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}

      </div>

      {/* Sentinel div */}
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

export default BrowsePage