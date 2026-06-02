function TrailerModal({ trailerKey, movieTitle, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 px-0 sm:px-4"
      onClick={onClose}
    >

      {/* Modal Box */}
      <div
        className="bg-zinc-900 w-full sm:rounded-xl overflow-hidden sm:max-w-3xl border-t sm:border border-zinc-700"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-700">
          <h3 className="text-white text-xs sm:text-sm font-medium truncate pr-4">
            {movieTitle} — Official Trailer
          </h3>
          <button
            onClick={onClose}
            className="min-w-[32px] h-8 rounded-full bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-500 text-zinc-400 hover:text-white flex items-center justify-center transition-colors text-sm"
          >
            ✕
          </button>
        </div>

        {/* YouTube Embed */}
        {trailerKey ? (
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title={movieTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="aspect-video flex items-center justify-center bg-zinc-800">
            <p className="text-zinc-500 text-sm">No trailer available</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default TrailerModal