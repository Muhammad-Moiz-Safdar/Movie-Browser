function SkeletonCard() {
  return (
    <div className="bg-zinc-800 rounded-xl overflow-hidden animate-pulse">
      {/* Poster placeholder */}
      <div className="w-full aspect-[2/3] bg-zinc-700" />
      {/* Text placeholders */}
      <div className="p-3">
        <div className="h-3 bg-zinc-700 rounded mb-2 w-3/4" />
        <div className="h-3 bg-zinc-700 rounded w-1/3" />
      </div>
    </div>
  )
}

export default SkeletonCard