import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid, List, Wallet } from 'lucide-react';
import NFTCard from '../components/NFTCard';

export default function Collection() {
  const [collection, setCollection] = useState([]);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    // Load mock collection from local storage
    const saved = localStorage.getItem('nexus_collection');
    if (saved) {
      setCollection(JSON.parse(saved));
    } else {
      // Add a default item if empty just to show something
      setCollection([{
        id: "001",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
        title: "Genesis Node",
        owner: "0xYou",
        price: "1.50"
      }]);
    }
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Profile Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 md:p-12 mb-12 border-white/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-neon-cyan to-neon-purple">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
              <img src="https://images.unsplash.com/photo-1620843437120-1cb9f2a9d8fa?w=400&q=80" alt="Avatar" className="w-full h-full object-cover opacity-80 mix-blend-screen" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] text-white">0xYou...8f9A</h1>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-gray-300 w-fit mx-auto md:mx-0">
                <Wallet className="w-3 h-3 text-neon-cyan" />
                Connected
              </span>
            </div>
            <p className="text-gray-400 mb-6">Digital Art Collector & AI Creator</p>
            
            <div className="flex items-center justify-center md:justify-start gap-8">
              <div>
                <p className="text-2xl font-bold text-white">{collection.length}</p>
                <p className="text-xs text-neon-cyan uppercase tracking-wider">Items</p>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div>
                <p className="text-2xl font-bold text-white">4.2 ETH</p>
                <p className="text-xs text-neon-purple uppercase tracking-wider">Est. Value</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Collection Grid */}
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
        <h2 className="text-2xl font-bold font-['Space_Grotesk'] text-white">Your Vault</h2>
        
        <div className="flex items-center gap-2 glass-panel p-1 border-white/20 rounded-lg">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white/20 text-neon-cyan' : 'text-gray-400 hover:text-white'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-white/20 text-neon-cyan' : 'text-gray-400 hover:text-white'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {collection.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p>Your vault is empty.</p>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              : "flex flex-col gap-4"
          }
        >
          {collection.map((nft, index) => (
            <motion.div
              key={nft.id + index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {viewMode === 'grid' ? (
                <NFTCard {...nft} is3D={true} />
              ) : (
                <div className="w-full glass-panel border-white/10 p-4 flex items-center gap-6 hover:bg-white/5 transition-colors">
                  <img src={nft.image} alt={nft.title} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{nft.title}</h3>
                    <p className="text-sm text-neon-cyan">#{nft.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Network</p>
                    <p className="font-medium text-white">Ethereum</p>
                  </div>
                  <button className="px-6 py-2 border border-neon-cyan text-neon-cyan rounded-lg hover:bg-neon-cyan hover:text-background transition-colors text-sm font-bold">
                    List for Sale
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
