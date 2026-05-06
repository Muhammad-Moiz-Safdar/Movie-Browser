import { useState, useEffect } from "react"
import { fetchTopRatedMovies } from "../api/tmdb"
import MovieCard from "../components/MovieCard"

function TopRatedPage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchTopRatedMovies()
        setMovies(data.results)
      } catch (err) {
        console.error("Something went wrong", err)
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [])

  if (loading) return <p className="text-white text-center mt-20">Loading...</p>

  return (
    <div className="px-8 py-8">
      <h2 className="text-white text-2xl font-semibold mb-6">Top Rated Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default TopRatedPage