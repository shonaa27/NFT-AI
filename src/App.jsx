import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Create from './pages/Create';
import Collection from './pages/Collection';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create" element={<Create />} />
        <Route path="/collection" element={<Collection />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-white selection:bg-neon-cyan/30 selection:text-white">
        <ParticleBackground />
        
        {/* Background Grid and Glow */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-neon-cyan opacity-20 blur-[100px]"></div>
        </div>

        <Navbar />
        
        <main className="pt-20">
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
