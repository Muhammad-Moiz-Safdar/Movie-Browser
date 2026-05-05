import { useState, useEffect } from "react"
import { fetchPopularMovies } from "../api/tmdb"

const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE

function PopularPage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPopularMovies().then((data) => {
      setMovies(data.results)
      setLoading(false)
    })
  }, [])

  if (loading) return <p className="text-white text-center mt-20">Loading...</p>

  return (
     <div className="min-h-screen bg-gradient-to-br from-[#10102e9b] via-[#13134b8d] to-[#1a1a6088] py-8 px-8">
      <h2 className="text-white text-2xl font-semibold mb-6">Popular Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-zinc-800 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200">
            <img
              src={`${IMAGE_BASE}${movie.poster_path}`}
              alt={movie.title}
              className="w-full aspect-[2/3] object-cover"
            />
            <div className="p-3">
              <h3 className="text-white text-sm font-medium truncate mb-2">{movie.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-yellow-400 text-xs font-medium">★ {movie.vote_average.toFixed(1)}</span>
                <span className="text-zinc-500 text-xs">{movie.release_date.split("-")[0]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PopularPage