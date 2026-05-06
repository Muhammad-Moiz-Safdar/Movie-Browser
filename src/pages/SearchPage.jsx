import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { searchMovies } from "../api/tmdb"
import MovieCard from "../components/MovieCard"

function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q")

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!query) return

    const loadResults = async () => {
      setLoading(true)
      try {
        const data = await searchMovies(query)
        setMovies(data.results)
      } catch (err) {
        console.error("Something went wrong", err)
      } finally {
        setLoading(false)
      }
    }

    loadResults()
  }, [query])

  if (loading) return <p className="text-white text-center mt-20">Searching...</p>

  return (
    <div className="px-8 py-8">

      {/* Results label */}
      <p className="text-zinc-400 text-sm mb-6">
        Showing results for{" "}
        <span className="text-yellow-400 font-medium">"{query}"</span>
      </p>

      {/* No results empty state */}
      {movies.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 gap-4">
          <svg className="w-16 h-16 stroke-zinc-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.2}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <p className="text-zinc-500 text-base">No results found for "{query}"</p>
          <p className="text-zinc-600 text-sm">Try searching for a different movie</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

    </div>
  )
}

export default SearchPage