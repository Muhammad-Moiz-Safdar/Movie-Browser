
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between align-middle bg-black text-white p-4 '>
    <div className='text-amber-400 font-bold text-xl'>CineScope</div>
    <div className='flex justify-evenly w-80'>
      <NavLink to='/' className= {({ isActive }) => 
  isActive ? "text-slate-500 text-sm" : "text-gray-200"
}>Home</NavLink>
      <NavLink to='/popular' className={({ isActive }) => 
  isActive ? "text-slate-500 text-sm" : "text-gray-200"
}>Popular</NavLink>
      <NavLink to='/top-rated' className={({ isActive }) => 
  isActive ? "text-slate-500 text-sm" : "text-gray-200"
} >Top Rated</NavLink>
    </div>
     <div className="flex items-center bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 gap-2">
        <svg
          className="w-4 h-4 text-zinc-400 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search movies..."
          className="bg-transparent outline-none text-white text-sm w-44 placeholder-zinc-500"
        />
      </div>
    </div>
  )
}

export default Navbar
