import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockImages = [
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
  "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=800&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
  "https://images.unsplash.com/photo-1633428905307-e837651c6c64?w=800&q=80",
  "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=800&q=80"
];

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {mockImages.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                className="absolute w-64 h-96 object-cover rounded-2xl shadow-2xl shadow-neon-cyan/20 border border-white/10"
                initial={{ 
                  opacity: 0, 
                  scale: 0.5, 
                  rotate: Math.random() * 90 - 45,
                  x: (Math.random() - 0.5) * window.innerWidth,
                  y: (Math.random() - 0.5) * window.innerHeight
                }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: 1.5, 
                  rotate: 0,
                  x: 0,
                  y: 0
                }}
                transition={{ 
                  duration: 2.5, 
                  delay: i * 0.2, 
                  ease: "circOut" 
                }}
              />
            ))}
            <motion.div 
              className="absolute z-10 flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <h1 className="text-6xl md:text-8xl font-black font-['Space_Grotesk'] text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple drop-shadow-[0_0_30px_rgba(0,240,255,0.8)]">
                NEXUS AI
              </h1>
              <p className="text-xl md:text-2xl mt-4 text-neon-cyan tracking-[0.3em] uppercase drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                The Future is Now
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showIntro && (
        <motion.div 
          className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Left Column - Text Content */}
          <div className="z-10 flex flex-col items-start gap-6">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-neon-cyan/50 text-neon-cyan text-sm font-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen AI Generation Protocol</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple neon-text-cyan">Digital Art</span><br />
              With Pure Thought
            </h1>
            
            <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
              Transform your imagination into premium, unique digital assets. Mint your AI-generated masterpieces directly to the blockchain in seconds.
            </p>
            
            <div className="flex items-center gap-4 mt-4">
              <button 
                onClick={() => navigate('/create')}
                className="px-8 py-4 neon-button text-white text-lg rounded-xl flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <span>Start Creating</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigate('/explore')}
                className="px-8 py-4 glass-panel border-white/20 hover:bg-white/10 text-white text-lg rounded-xl transition-all"
              >
                Explore Collection
              </button>
            </div>
            
            <div className="flex items-center gap-8 mt-8 border-t border-white/10 pt-8 w-full">
              <div>
                <p className="text-3xl font-bold text-white font-['Space_Grotesk']">2.4M+</p>
                <p className="text-sm text-neon-cyan mt-1">Artworks Generated</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white font-['Space_Grotesk']">$45M+</p>
                <p className="text-sm text-neon-purple mt-1">Trading Volume</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white font-['Space_Grotesk']">120K+</p>
                <p className="text-sm text-neon-pink mt-1">Active Creators</p>
              </div>
            </div>
          </div>

          {/* Right Column - 3D Carousel */}
          <div className="relative w-full h-[600px] perspective-1000 flex items-center justify-center">
            <div className="absolute inset-0 bg-neon-cyan/20 blur-[120px] rounded-full mix-blend-screen"></div>
            
            <Carousel3D />
          </div>
        </motion.div>
      )}
    </div>
  );
}

function Carousel3D() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-[300px] h-[400px] preserve-3d"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: isHovered ? 'none' : 'spin-slow 20s linear infinite',
      }}
    >
      {mockImages.map((src, i) => {
        const rotation = (i * 360) / mockImages.length;
        return (
          <div
            key={i}
            className="absolute inset-0 w-full h-full preserve-3d transition-transform duration-500 ease-out"
            style={{
              transform: `rotateY(${rotation}deg) translateZ(350px)`,
            }}
          >
            <div className={`w-full h-full rounded-2xl overflow-hidden glass-panel border border-white/20 shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300 ${isHovered ? 'scale-110 shadow-[0_0_50px_rgba(0,240,255,0.5)]' : ''}`}>
              <img src={src} alt="NFT" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <p className="text-neon-cyan font-bold text-sm tracking-widest">NEXUS #{i + 1}00</p>
                <p className="text-white font-['Space_Grotesk'] text-xl">Cyber Avatar</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
