const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export const fetchPopularMovies = async (page = 1) => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`)
  const data = await res.json()
  return data
}

export const fetchTopRatedMovies = async (page = 1) => {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`)
  const data = await res.json()
  return data
}

export const fetchTrendingMovies = async () => {
  const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
  const data = await res.json()
  return data
}

export const fetchUpcomingMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`)
  const data = await res.json()
  return data
}
export const fetchMovieDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
  const data = await res.json()
  return data
}

export const fetchMovieCredits = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`)
  const data = await res.json()
  return data
}
export const fetchMovieTrailer = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`)
  const data = await res.json()
  return data.results
}
export const searchMovies = async (query) => {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
  const data = await res.json()
  return data
}
export const fetchGenres = async () => {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
  const data = await res.json()
  return data.genres
}

export const fetchMoviesByGenre = async (genreId, sortBy, page = 1) => {
  const genreParam = genreId ? `&with_genres=${genreId}` : ""
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=${sortBy}&page=${page}${genreParam}`
  )
  const data = await res.json()
  return data
}