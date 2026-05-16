import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  return (
    <nav className="bg-zinc-950 px-8 py-4 flex items-center justify-between">
      {/* Logo */}
      <NavLink
        to="/"
        className="text-yellow-400 text-xl font-semibold tracking-wide"
      >
        CineScope
      </NavLink>

      {/* Nav Links */}
      <div className="flex gap-8">
        <NavLink
          to="/"
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
         className={({ isActive }) =>
            isActive
              ? "text-amber-600 font-semibold text-sm"
              : "text-zinc-400 hover:text-white transition-colors text-sm"
          }
        >
          Browse
        </NavLink>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 gap-2"
      >
        <svg
          className="w-4 h-4 stroke-zinc-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
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
    </nav>
  );
}

export default Navbar;
