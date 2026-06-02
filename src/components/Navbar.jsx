import { useState } from "react"
import {  NavLink, useNavigate } from "react-router-dom"

function Navbar() {
  const [query, setQuery] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim() === "") return
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    setQuery("")
    setMenuOpen(false)
  }

  return (
    <nav className="bg-zinc-950 border-b border-zinc-800 px-5 py-3">

      {/* Top row — logo + hamburger */}
      <div className="flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className={({ isActive }) =>
            isActive
              ? "text-amber-600 font-semibold text-sm"
              : "text-zinc-400 hover:text-white transition-colors text-sm"
          }>
          CineScope
        </NavLink>

        {/* Desktop nav links — hidden on mobile */}
        <div className="hidden md:flex gap-8">
          <NavLink to="/" className={({ isActive }) =>
            isActive
              ? "text-amber-600 font-semibold text-sm"
              : "text-zinc-400 hover:text-white transition-colors text-sm"
          }>
            Home
          </NavLink>
          <NavLink to="/popular" className={({ isActive }) =>
            isActive
              ? "text-amber-600 font-semibold text-sm"
              : "text-zinc-400 hover:text-white transition-colors text-sm"
          }>
            Popular
          </NavLink>
          <NavLink to="/top-rated" className={({ isActive }) =>
            isActive
              ? "text-amber-600 font-semibold text-sm"
              : "text-zinc-400 hover:text-white transition-colors text-sm"
          }>
            Top Rated
          </NavLink>
          <NavLink to="/browse" className={({ isActive }) =>
            isActive
              ? "text-amber-600 font-semibold text-sm"
              : "text-zinc-400 hover:text-white transition-colors text-sm"
          }>
            Browse
          </NavLink>
        </div>

        {/* Desktop search — hidden on mobile */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 gap-2"
        >
          <svg className="w-4 h-4 stroke-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="bg-transparent outline-none text-white text-sm w-44 placeholder-zinc-500"
          />
        </form>

        {/* Hamburger button — only on mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-zinc-400 hover:text-white transition-colors"
        >
          {menuOpen ? (
            // X icon when menu is open
            <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger icon when menu is closed
            <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

      </div>

      {/* Mobile menu — only shows when menuOpen is true */}
      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 border-t border-zinc-800 pt-3">

          {/* Mobile nav links */}
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
            isActive
              ? "text-amber-600 font-semibold text-sm"
              : "text-zinc-400 hover:text-white transition-colors text-sm"
          }
          >
            Home
          </NavLink>
          <NavLink
            to="/popular"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
            isActive
              ? "text-amber-600 font-semibold text-sm"
              : "text-zinc-400 hover:text-white transition-colors text-sm"
          }
          >
            Popular
          </NavLink>
          <NavLink
            to="/top-rated"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
            isActive
              ? "text-amber-600 font-semibold text-sm"
              : "text-zinc-400 hover:text-white transition-colors text-sm"
          }
          >
            Top Rated
          </NavLink>
          <NavLink
            to="/browse"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
            isActive
              ? "text-amber-600 font-semibold text-sm"
              : "text-zinc-400 hover:text-white transition-colors text-sm"
          }
          >
            Browse
          </NavLink>

          {/* Mobile search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 gap-2 mt-1"
          >
            <svg className="w-4 h-4 stroke-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="bg-transparent outline-none text-white text-sm w-full placeholder-zinc-500"
            />
          </form>

        </div>
      )}

    </nav>
  )
}

export default Navbar