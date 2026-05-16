import { useState, useEffect } from "react"
import MovieRow from "../components/MovieRow"
import {
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchPopularMovies,
  fetchUpcomingMovies,
} from "../api/tmdb"

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

  if (loading) return <p className="text-white text-center mt-20">Loading...</p>

  return (
  <div className="py-8">
    <MovieRow
      title="Trending Today"
      emoji="🔥"
      movies={trending}
      seeAllLink="/browse"
    />
    <MovieRow
      title="Top Rated"
      emoji="⭐"
      movies={topRated}
      seeAllLink="/top-rated"
    />
    <MovieRow
      title="Popular"
      emoji="🎬"
      movies={popular}
      seeAllLink="/popular"
    />
    <MovieRow
      title="Upcoming"
      emoji="🆕"
      movies={upcoming}
      seeAllLink="/browse"
    />
  </div>
)
}

export default HomePage