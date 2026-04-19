import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NFTCard from '../components/NFTCard';
import { getContract } from "../contracts/contract.js";

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

    setTimeout(() => {
      const images = [
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
        "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=800&q=80",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
      ];

      setGeneratedImage(images[prompt.length % images.length]);
      setIsGenerating(false);
    }, 2500);
  };

 
  const testContractConnection = async () => {
    try {
      const contract = await getContract();

      console.log("✅ CONTRACT:", contract);
      console.log("📍 ADDRESS:", contract.target);

      const nextId = await contract.nextTokenId();
      console.log("🔢 NEXT TOKEN ID:", nextId.toString());

      alert("🎉 Contract Connected Successfully!");
    } catch (error) {
      console.error("❌ Contract connection failed:", error);
      alert("Contract NOT connected. Check console.");
    }
  };

  
  const handleMint = async () => {
    try {
      setIsMinting(true);

      const contract = await getContract();
      if (!contract) return;

      const tx = await contract.mintNFT(
        generatedImage,
        prompt
      );

      console.log("⛓ Transaction sent:", tx.hash);

      await tx.wait();

      setIsMinting(false);
      setMintSuccess(true);

      setTimeout(() => {
        navigate('/collection');
      }, 2000);

    } catch (error) {
      console.error("❌ Mint failed:", error);
      setIsMinting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] py-12 px-4 sm:px-6 flex flex-col items-center max-w-7xl mx-auto">

      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Creation Engine
        </h1>
      </motion.div>

      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-12">

        {/* LEFT */}
        <div className="space-y-6">

          <textarea
            rows={5}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your NFT..."
            className="w-full p-4 text-black rounded"
          />

          <button
            onClick={generateImage}
            disabled={!prompt || isGenerating}
            className="px-6 py-3 bg-cyan-500 text-white rounded"
          >
            {isGenerating ? "Generating..." : "Generate"}
          </button>

          
          <button
            onClick={testContractConnection}
            className="mt-3 px-4 py-2 bg-green-600 text-white rounded"
          >
            Test Contract Connection
          </button>

        </div>

        
        <div className="flex flex-col items-center">

          <AnimatePresence>

            {isGenerating && (
              <Loader2 className="animate-spin w-10 h-10" />
            )}

            {generatedImage && (
              <div className="w-full flex flex-col items-center">

                <NFTCard
                  id="NEW"
                  image={generatedImage}
                  title={prompt}
                  owner="0xYou"
                />

                <button
                  onClick={handleMint}
                  disabled={isMinting || mintSuccess}
                  className="mt-6 px-6 py-4 bg-purple-600 text-white rounded flex items-center gap-2"
                >
                  {isMinting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Sparkles />
                  )}
                  {isMinting ? "Minting..." : "Mint NFT"}
                </button>

                {mintSuccess && (
                  <div className="mt-4 text-green-500 flex items-center gap-2">
                    <CheckCircle2 />
                    Minted Successfully!
                  </div>
                )}

              </div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}