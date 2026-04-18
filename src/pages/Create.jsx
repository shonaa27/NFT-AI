import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, Loader2, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NFTCard from '../components/NFTCard';

export default function Create() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const navigate = useNavigate();
  
  const generateImage = () => {
    if (!prompt) return;
    
    setIsGenerating(true);
    setGeneratedImage(null);
    setMintSuccess(false);
    
    // Mock generation time
    setTimeout(() => {
      // Pick a random image based on prompt length just for variety
      const images = [
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
        "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=800&q=80",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
      ];
      setGeneratedImage(images[prompt.length % images.length]);
      setIsGenerating(false);
    }, 3500);
  };

  const handleMint = () => {
    setIsMinting(true);
    
    // Mock minting
    setTimeout(() => {
      setIsMinting(false);
      setMintSuccess(true);
      
      // Save to mock local storage collection
      const newNFT = {
        id: Math.floor(Math.random() * 10000).toString(),
        image: generatedImage,
        title: prompt.split(' ').slice(0, 3).join(' ') || 'AI Creation',
        owner: '0xYou...',
        price: '0.00'
      };
      
      const existing = JSON.parse(localStorage.getItem('nexus_collection') || '[]');
      localStorage.setItem('nexus_collection', JSON.stringify([newNFT, ...existing]));
      
      setTimeout(() => {
        navigate('/collection');
      }, 2000);
      
    }, 2000);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] py-12 px-4 sm:px-6 flex flex-col items-center max-w-7xl mx-auto">
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold font-['Space_Grotesk'] mb-4">
          Creation <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink">Engine</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Describe your vision and let our neural network materialize it onto the blockchain.
        </p>
      </motion.div>

      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-12 items-start">
        
        {/* Left Column - Input */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="glass-panel p-6 border-white/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/10 rounded-full blur-3xl"></div>
            
            <label className="block text-sm font-medium text-neon-cyan mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Prompt Engineering
            </label>
            <textarea
              rows={5}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A futuristic cyberpunk city with flying cars, neon lights, highly detailed, 8k resolution, cinematic lighting..."
              className="w-full glass-input p-4 text-white placeholder-gray-500 resize-none font-light"
            />
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={generateImage}
                disabled={!prompt || isGenerating || isMinting}
                className="relative overflow-hidden group px-8 py-3 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white/5 border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                <div className="flex items-center gap-2">
                  {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                  <span>{isGenerating ? 'Synthesizing...' : 'Generate Art'}</span>
                </div>
                {/* Ripple effect on hover setup via CSS classes */}
              </button>
            </div>
          </div>

          <div className="glass-panel p-6 border-white/10 opacity-70">
            <h3 className="text-sm font-bold text-white mb-3">Model Parameters</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Creativity</span>
                  <span className="text-neon-cyan">85%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-neon-cyan to-neon-purple h-1.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Resolution</span>
                  <span className="text-neon-purple">4K Ultra</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="flex-1 py-1.5 rounded bg-white/10 text-xs border border-transparent hover:border-white/20 transition-colors">1:1</button>
                  <button className="flex-1 py-1.5 rounded bg-neon-purple/20 text-xs border border-neon-purple/50 text-neon-purple">16:9</button>
                  <button className="flex-1 py-1.5 rounded bg-white/10 text-xs border border-transparent hover:border-white/20 transition-colors">9:16</button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Output */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="relative min-h-[500px] flex items-center justify-center glass-panel border-white/20 overflow-hidden"
        >
          {/* Background grid for output area */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px]"></div>

          <AnimatePresence mode="wait">
            {!isGenerating && !generatedImage && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-gray-500 z-10"
              >
                <div className="w-16 h-16 rounded-full border border-dashed border-gray-600 flex items-center justify-center mb-4">
                  <Wand2 className="w-6 h-6 opacity-50" />
                </div>
                <p>Output Matrix Standby</p>
              </motion.div>
            )}

            {isGenerating && (
              <motion.div 
                key="generating"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="flex flex-col items-center z-10"
              >
                <div className="relative w-32 h-32 mb-8">
                  <div className="absolute inset-0 border-4 border-neon-cyan/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-neon-cyan rounded-full border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 border-4 border-neon-purple rounded-full border-b-transparent animate-spin-slow"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white animate-pulse" />
                  </div>
                </div>
                <h3 className="text-xl font-bold font-['Space_Grotesk'] text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple animate-pulse">
                  AI is generating...
                </h3>
                <p className="text-sm text-gray-400 mt-2 font-mono">Initializing neural pathways</p>
              </motion.div>
            )}

            {generatedImage && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="w-full max-w-[320px] p-6 z-10 flex flex-col items-center"
              >
                <div className="w-full aspect-[3/4] mb-6 relative">
                  {mintSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center"
                    >
                      <CheckCircle2 className="w-16 h-16 text-neon-cyan mb-4" />
                      <h3 className="text-xl font-bold text-white">Minted Successfully!</h3>
                      <p className="text-sm text-gray-400 mt-2">Redirecting to collection...</p>
                    </motion.div>
                  )}
                  <NFTCard 
                    id="NEW"
                    image={generatedImage}
                    title={prompt.split(' ').slice(0, 3).join(' ') || 'AI Creation'}
                    owner="0xYou"
                    is3D={false}
                  />
                </div>
                
                <button
                  onClick={handleMint}
                  disabled={isMinting || mintSuccess}
                  className="w-full py-4 neon-button text-white text-lg rounded-xl flex items-center justify-center gap-2 animate-pulse-glow hover:scale-105"
                >
                  {isMinting ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                  <span>{isMinting ? 'Minting to Blockchain...' : 'Mint NFT'}</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
      </div>
    </div>
  );
}
