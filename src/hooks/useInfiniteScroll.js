import { useState, useEffect, useRef } from "react"

function useInfiniteScroll(fetchFn, dependencies = []) {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const sentinelRef = useRef(null)
  const observer = useRef(null)
  const isFirstRender = useRef(true)

  // reset ONLY when genre or sort changes
  // not when page changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    setMovies([])
    setPage(1)
    setHasMore(true)
  }, dependencies)

  // fetch movies when page changes
  useEffect(() => {
  const loadMovies = async () => {
    setLoading(true)
    try {
      const data = await fetchFn(page)
    
      setMovies((prev) => {
        const existingIds = new Set(prev.map((m) => m.id))
        const newMovies = data.results.filter((m) => !existingIds.has(m.id))
      
        return [...prev, ...newMovies]
      })
      setHasMore(page < data.total_pages)
     
    } catch (err) {
      console.error("Something went wrong", err)
    } finally {
      setLoading(false)
    }
  }

  loadMovies()
}, [page])

  // intersection observer
  useEffect(() => {
    if (loading) return
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