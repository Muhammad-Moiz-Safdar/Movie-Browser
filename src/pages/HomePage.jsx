import { useState, useEffect } from "react"
import MovieRow from "../components/MovieRow"
import {
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchPopularMovies,
  fetchUpcomingMovies,
} from "../api/tmdb"

const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"
const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE

function HomePage() {
  const [trending, setTrending] = useState([])
  const [topRated, setTopRated] = useState([])
  const [popular, setPopular] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [trendingData, topRatedData, popularData, upcomingData] = await Promise.all([
          fetchTrendingMovies(),
          fetchTopRatedMovies(),
          fetchPopularMovies(),
          fetchUpcomingMovies(),
        ])
        setTrending(trendingData.results)
        setTopRated(topRatedData.results)
        setPopular(popularData.results)
        setUpcoming(upcomingData.results)
      } catch (err) {
        console.error("Something went wrong", err)
      } finally {
        setLoading(false)
      }
    }
    loadAll()
  }, [])

  if (loading) return (
    <p className="text-white text-center mt-20 text-sm">Loading...</p>
  )

  // first trending movie for hero
  const featured = trending[0]

  return (
    <div className="pb-8">

      {/* Hero Section */}
      {featured && (
        <div className="relative w-full h-[220px] sm:h-[300px] md:h-[420px] mb-6 md:mb-10">

          {/* Backdrop image */}
          <img
            src={`${BACKDROP_BASE}${featured.backdrop_path}`}
            alt={featured.title}
            className="w-full h-full object-cover"
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-[#09090b]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

          {/* Hero content */}
          <div className="absolute bottom-0 left-0 px-4 md:px-8 pb-5 md:pb-8 flex gap-3 md:gap-6 items-end">

            {/* Poster — hidden on small mobile */}
            <img
              src={`${IMAGE_BASE}${featured.poster_path}`}
              alt={featured.title}
              className="hidden sm:block w-20 md:w-32 rounded-lg border-2 border-zinc-700 flex-shrink-0"
            />

            {/* Info */}
            <div>
              <p className="text-yellow-400 text-xs md:text-sm font-medium mb-1 md:mb-2">
                🔥 Trending Now
              </p>
              <h1 className="text-white text-xl sm:text-2xl md:text-4xl font-bold mb-1 md:mb-2">
                {featured.title}
              </h1>
              <p className="text-zinc-400 text-xs md:text-sm mb-2 md:mb-4 max-w-xs md:max-w-lg line-clamp-2">
                {featured.overview}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-yellow-400 text-xs md:text-sm font-medium">
                  ★ {featured.vote_average?.toFixed(1)}
                </span>
                <span className="text-zinc-500 text-xs md:text-sm">
                  {featured.release_date?.split("-")[0]}
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Movie Rows */}
      <MovieRow title="Trending Today" emoji="🔥" movies={trending} seeAllLink="/browse" />
      <MovieRow title="Top Rated" emoji="⭐" movies={topRated} seeAllLink="/top-rated" />
      <MovieRow title="Popular" emoji="🎬" movies={popular} seeAllLink="/popular" />
      <MovieRow title="Upcoming" emoji="🆕" movies={upcoming} seeAllLink="/browse" />

    </div>
  )
}

export default HomePage