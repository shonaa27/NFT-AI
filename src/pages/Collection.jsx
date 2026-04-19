import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid, List, Wallet } from 'lucide-react';
import NFTCard from '../components/NFTCard';
import { getContract } from "../contracts/contract.js";
import { ethers } from "ethers";

export default function Collection() {

  const [collection, setCollection] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {

    const loadNFTs = async () => {

      try {

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setUserAddress(address);

        const contract = await getContract();

        const total = await contract.nextTokenId();

        let userNFTs = [];

        for (let i = 0; i < total; i++) {

          const owner = await contract.ownerOf(i);

          if (owner.toLowerCase() === address.toLowerCase()) {

            const data = await contract.nftData(i);
            const priceWei = await contract.nftPrice(i);

            const price =
              priceWei > 0
                ? ethers.formatEther(priceWei)
                : null;

            userNFTs.push({
              id: i,
              image: data.imageURI,
              title: data.prompt,
              owner: owner,
              price: price
            });

          }

        }

        setCollection(userNFTs);

      } catch (error) {

        console.error("Error loading NFTs:", error);

      }

    };

    loadNFTs();

  }, []);

  const handleListNFT = async (tokenId) => {

    try {

      const contract = await getContract();

      const price = prompt("Enter price in ETH");

      if (!price) return;

      const priceWei = ethers.parseEther(price);

      const tx = await contract.listNFT(tokenId, priceWei);

      await tx.wait();

      alert("NFT listed successfully!");

      window.location.reload();

    } catch (error) {

      console.error("Listing failed:", error);
      alert("Listing failed");

    }

  };

  return (

    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* PROFILE HEADER */}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 mb-12 border-white/20"
      >

        <div className="flex flex-col md:flex-row items-center gap-6">

          <div className="flex-1 text-center md:text-left">

            <h1 className="text-3xl font-bold text-white">
              {userAddress.slice(0,6)}...{userAddress.slice(-4)}
            </h1>

            <p className="text-gray-400">
              Digital Art Collector & AI Creator
            </p>

            <div className="flex items-center justify-center md:justify-start gap-8 mt-4">

              <div>
                <p className="text-2xl font-bold text-white">
                  {collection.length}
                </p>
                <p className="text-xs text-neon-cyan uppercase">
                  Items
                </p>
              </div>

              <span className="flex items-center gap-2 text-sm text-gray-300">
                <Wallet className="w-4 h-4 text-neon-cyan" />
                Connected
              </span>

            </div>

          </div>

        </div>

      </motion.div>

      {/* VIEW SWITCH */}

      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">

        <h2 className="text-2xl font-bold text-white">
          Your Vault
        </h2>

        <div className="flex gap-2">

          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white/20 text-neon-cyan' : 'text-gray-400'}`}
          >
            <Grid className="w-5 h-5" />
          </button>

          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-white/20 text-neon-cyan' : 'text-gray-400'}`}
          >
            <List className="w-5 h-5" />
          </button>

        </div>

      </div>

      

      {collection.length === 0 ? (

        <div className="text-center py-20 text-gray-500">
          Your vault is empty
        </div>

      ) : (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
            >

              {viewMode === 'grid' ? (

                <NFTCard {...nft} />

              ) : (

                <div className="glass-panel p-4 flex items-center gap-6">

                  <img
                    src={nft.image}
                    alt={nft.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  <div className="flex-1">

                    <h3 className="font-bold text-lg">
                      {nft.title}
                    </h3>

                    <p className="text-sm text-neon-cyan">
                      #{nft.id}
                    </p>

                    {nft.price && (
                      <p className="text-green-400 text-sm mt-1">
                        For Sale: {nft.price} ETH
                      </p>
                    )}

                  </div>

                  {nft.price ? (

                    <span className="px-6 py-2 bg-green-500 text-white rounded">
                      Listed
                    </span>

                  ) : (

                    <button
                      onClick={() => handleListNFT(nft.id)}
                      className="px-6 py-2 border border-neon-cyan text-neon-cyan rounded hover:bg-neon-cyan hover:text-black"
                    >
                      List for Sale
                    </button>

                  )}

                </div>

              )}

            </motion.div>

          ))}

        </motion.div>

      )}

    </div>

  );

}