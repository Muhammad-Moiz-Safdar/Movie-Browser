import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchMovieDetails, fetchMovieCredits, fetchMovieTrailer } from "../api/tmdb"
import TrailerModal from "../components/TrailerModal"

const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"

function DetailPage() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [trailerKey, setTrailerKey] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // scroll to top when detail page opens
    window.scrollTo(0, 0)

    const loadData = async () => {
      try {
        const [movieData, creditsData, videosData] = await Promise.all([
          fetchMovieDetails(id),
          fetchMovieCredits(id),
          fetchMovieTrailer(id),
        ])
        setMovie(movieData)
        setCast(creditsData.cast.slice(0, 10))
        const trailer = videosData.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        )
        if (trailer) setTrailerKey(trailer.key)
      } catch (err) {
        console.error("Something went wrong", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [id])

  if (loading) return (
    <p className="text-white text-center mt-20 text-sm">Loading...</p>
  )
  if (!movie) return (
    <p className="text-white text-center mt-20 text-sm">Movie not found</p>
  )

  const hours = Math.floor(movie.runtime / 60)
  const minutes = movie.runtime % 60

  return (
    <div>

      {/* Backdrop */}
      <div className="relative w-full h-[260px] sm:h-[340px] md:h-[460px]">
        <img
          src={`${BACKDROP_BASE}${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-[#09090b]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

        {/* Title block over backdrop */}
        <div className="absolute bottom-0 left-0 right-0 flex gap-3 md:gap-6 items-end px-4 md:px-8 pb-4 md:pb-8">

          {/* Poster — hidden on small mobile */}
          <img
            src={`${IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
            className="hidden sm:block w-24 md:w-36 rounded-xl border-2 border-zinc-700 flex-shrink-0"
          />

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-white text-xl sm:text-2xl md:text-4xl font-bold mb-1 md:mb-2 leading-tight">
              {movie.title}
            </h1>
            <p className="text-zinc-400 text-xs md:text-sm mb-1 md:mb-2">
              {movie.release_date?.split("-")[0]}
              {movie.runtime > 0 && ` · ${hours}h ${minutes}m`}
            </p>
            <p className="text-yellow-400 text-sm md:text-base font-medium">
              ★ {movie.vote_average?.toFixed(1)} / 10
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 md:px-8 py-4 md:py-6">

        {/* Genres */}
        <div className="flex gap-2 flex-wrap mb-4 md:mb-6">
          {movie.genres.map((genre) => (
            <span
              key={genre.id}
              className="bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs px-3 py-1 rounded-full"
            >
              {genre.name}
            </span>
          ))}
        </div>

        {/* Trailer Button */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black font-semibold text-xs md:text-sm px-4 md:px-5 py-2.5 md:py-3 rounded-lg transition-colors mb-4 md:mb-6"
        >
          <svg className="w-3 h-3 md:w-4 md:h-4 fill-black" viewBox="0 0 24 24">
            <path d="M5 3l14 9-14 9V3z" />
          </svg>
          Watch Trailer
        </button>

        {/* Overview */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-white text-base md:text-lg font-semibold mb-2">
            Overview
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {movie.overview}
          </p>
        </div>

        {/* Cast */}
        <div>
          <h2 className="text-white text-base md:text-lg font-semibold mb-3 md:mb-4">
            Cast
          </h2>
          <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {cast.map((person) => (
              <div key={person.id} className="min-w-[64px] md:min-w-[80px] text-center">

                {/* Avatar */}
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden bg-zinc-800 border border-zinc-700 mx-auto mb-1 md:mb-2">
                  {person.profile_path ? (
                    <img
                      src={`${IMAGE_BASE}${person.profile_path}`}
                      alt={person.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-5 h-5 md:w-6 md:h-6 stroke-zinc-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                    </div>
                  )}
                </div>

                <p className="text-zinc-400 text-xs leading-tight line-clamp-2">
                  {person.name}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Trailer Modal */}
      {showModal && (
        <TrailerModal
          trailerKey={trailerKey}
          movieTitle={movie.title}
          onClose={() => setShowModal(false)}
        />
      )}

    </div>
  )
}

export default DetailPage