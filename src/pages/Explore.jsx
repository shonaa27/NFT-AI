import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import NFTCard from '../components/NFTCard';

const MOCK_NFTS = Array.from({ length: 12 }).map((_, i) => ({
  id: `808${i}`,
  image: `https://images.unsplash.com/photo-${1600000000000 + i * 10000}?w=800&q=80`, // Randomish unsplash images
  title: `Neural Entity #${i + 1}`,
  owner: `0x${Math.random().toString(16).slice(2, 8)}...`,
  price: (Math.random() * 5 + 0.1).toFixed(2),
}));

// Better mock images
const mockImages = [
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
  "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=800&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
  "https://images.unsplash.com/photo-1633428905307-e837651c6c64?w=800&q=80",
  "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=800&q=80",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
  "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800&q=80",
  "https://images.unsplash.com/photo-1620843437120-1cb9f2a9d8fa?w=800&q=80",
  "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=800&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
  "https://images.unsplash.com/photo-1633428905307-e837651c6c64?w=800&q=80",
  "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=800&q=80"
];

MOCK_NFTS.forEach((nft, index) => {
  nft.image = mockImages[index % mockImages.length];
});

const categories = ['All', 'Cyberpunk', 'Abstract', 'Portraits', 'Landscapes', '3D Models'];

export default function Explore() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white">
            Explore <span className="text-neon-purple">Nexus</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            Discover cutting-edge AI-generated masterpieces. The next evolution of digital art is here.
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search NFTs..." 
              className="w-full glass-input py-3 pl-10 pr-4 text-sm"
            />
          </div>
          <button className="p-3 glass-panel hover:bg-white/10 transition-colors border-white/20 rounded-xl">
            <Filter className="w-5 h-5 text-neon-cyan" />
          </button>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex overflow-x-auto pb-4 mb-8 gap-3 hide-scrollbar"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
              activeCategory === cat 
                ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.3)]' 
                : 'glass-panel border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {MOCK_NFTS.map((nft, index) => (
          <motion.div
            key={nft.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NFTCard {...nft} is3D={true} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
