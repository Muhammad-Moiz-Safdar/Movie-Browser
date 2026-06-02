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

  const { movies, loading, hasMore, sentinelRef } = useInfiniteScroll(
    (page) => fetchMoviesByGenre(selectedGenre, sortBy, page),
    [selectedGenre, sortBy]
  )

  return (
    <div className="px-4 md:px-8 py-5 md:py-8">

      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">

        <h2 className="text-white text-xl md:text-2xl font-semibold">
          Browse Movies
        </h2>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 text-xs md:text-sm whitespace-nowrap">
            Sort by
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 sm:flex-none bg-zinc-800 border border-zinc-700 text-white text-xs md:text-sm px-3 py-2 rounded-lg outline-none cursor-pointer"
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
      <div className="flex gap-2 flex-wrap mb-5 md:mb-8">

        {/* All chip */}
        <button
          onClick={() => setSelectedGenre(null)}
          className={`px-3 md:px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            selectedGenre === null
              ? "bg-yellow-400 text-black border-yellow-400"
              : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500 active:bg-zinc-700"
          }`}
        >
          All
        </button>

        {/* Genre chips */}
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setSelectedGenre(genre.id)}
            className={`px-3 md:px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              selectedGenre === genre.id
                ? "bg-yellow-400 text-black border-yellow-400"
                : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500 active:bg-zinc-700"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Movie grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {loading && Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* Sentinel */}
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