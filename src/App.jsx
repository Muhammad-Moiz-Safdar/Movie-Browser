import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import PopularPage from "./pages/PopularPage"
import TopRatedPage from "./pages/TopRatedPage"
import DetailPage from "./pages/DetailPage"

function App() {
  return (
   
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #09090b 0%, #0f0f1a 50%, #0a0a0f 100%)' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/popular" element={<PopularPage />} />
          <Route path="/top-rated" element={<TopRatedPage />} />
          <Route path="/movie/:id" element={<DetailPage />} />
        </Routes>
      </div>
   
  )
}

export default App