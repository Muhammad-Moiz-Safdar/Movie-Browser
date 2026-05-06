import { useState, useEffect, useRef} from "react"

function useInfiniteScroll(fetchFn) {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const sentinelRef = useRef(null)

  // fetch movies whenever page number changes
  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true)
      try {
        const data = await fetchFn(page)
        setMovies((prev) => [...prev, ...data.results])
        setHasMore(page < data.total_pages)
      } catch (err) {
        console.error("Something went wrong", err)
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [page])

  // Intersection Observer watches the sentinel div
  const observer = useRef(null)

  useEffect(() => {
    if (loading) return

    // disconnect previous observer before creating new one
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1)
      }
    })

    if (sentinelRef.current) observer.current.observe(sentinelRef.current)

    return () => {
      if (observer.current) observer.current.disconnect()
    }
  }, [loading, hasMore])

  return { movies, loading, hasMore, sentinelRef }
}

export default useInfiniteScroll