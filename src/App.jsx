import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import PopularPage from "./pages/PopularPage"
import TopRatedPage from "./pages/TopRatedPage"

function App() {
  return (

      <div className="min-h-screen ">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/popular" element={<PopularPage />} />
          <Route path="/top-rated" element={<TopRatedPage />} />
        </Routes>
      </div>
  
  )
}

export default App