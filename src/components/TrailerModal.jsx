function TrailerModal({ trailerKey, movieTitle, onClose }) {
  return (
    // Overlay — dark background behind modal
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >

      {/* Modal Box */}
      <div
        className="bg-zinc-900 rounded-xl overflow-hidden w-full max-w-3xl border border-zinc-700"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-700">
          <h3 className="text-white text-sm font-medium">{movieTitle} — Official Trailer</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-zinc-700 hover:bg-zinc-600 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
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
            <p className="text-zinc-500 text-sm">No trailer available for this movie</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default TrailerModal