import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function NFTCard({ id, image, title, owner, price, is3D = true }) {
  const [isHovered, setIsHovered] = useState(false);

  const cardContent = (
    <div className="relative w-full h-full preserve-3d">
      {/* Front of card */}
      <div className={`absolute inset-0 backface-hidden w-full h-full rounded-2xl overflow-hidden glass-panel border border-white/10 transition-transform duration-500 ${isHovered && !is3D ? 'scale-105' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 opacity-60"></div>
        <img src={image} alt={title} className="w-full h-full object-cover" />
        
        <div className="absolute top-4 right-4 z-20 glass-panel px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-md bg-black/20">
          <Heart className="w-4 h-4 text-neon-pink" />
          <span className="text-xs font-medium">{Math.floor(Math.random() * 500) + 50}</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-neon-cyan text-xs font-bold tracking-wider mb-1">#{id}</p>
              <h3 className="text-xl font-bold text-white mb-1 font-['Space_Grotesk'] drop-shadow-lg">{title}</h3>
              <p className="text-gray-300 text-sm flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center text-[10px] font-bold">
                  {owner.charAt(0)}
                </span>
                {owner}
              </p>
            </div>
            {price && (
              <div className="text-right">
                <p className="text-gray-400 text-xs mb-1">Current Bid</p>
                <p className="text-neon-cyan font-bold font-['Space_Grotesk'] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {price} ETH
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Glow effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 mix-blend-overlay transition-opacity duration-500 z-10 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>

      {/* Back of card (only if is3D) */}
      {is3D && (
        <div className="absolute inset-0 backface-hidden w-full h-full rounded-2xl glass-panel border border-neon-cyan/30 flex flex-col items-center justify-center p-6 bg-background/90 transform rotate-y-180">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 font-['Space_Grotesk']">{title}</h3>
          <p className="text-neon-cyan text-sm mb-6">Token ID: {id}</p>
          
          <div className="w-full space-y-3">
            <div className="flex justify-between text-sm border-b border-white/10 pb-2">
              <span className="text-gray-400">Creator</span>
              <span className="text-white font-medium">AI Generator</span>
            </div>
            <div className="flex justify-between text-sm border-b border-white/10 pb-2">
              <span className="text-gray-400">Owner</span>
              <span className="text-white font-medium">{owner}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Network</span>
              <span className="text-white font-medium">Ethereum</span>
            </div>
          </div>
          
          <button className="mt-6 w-full py-3 neon-button text-white text-sm">
            View Details
          </button>
        </div>
      )}
    </div>
  );

  if (!is3D) {
    return (
      <div 
        className="w-full aspect-[3/4] rounded-2xl relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <motion.div
      className="w-full aspect-[3/4] perspective-1000 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="w-full h-full relative preserve-3d duration-700"
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {cardContent}
      </motion.div>
    </motion.div>
  );
}
