import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet, Sparkles } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Explore', path: '/explore' },
  { name: 'Create', path: '/create' },
  { name: 'Collection', path: '/collection' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-x-0 border-t-0 rounded-none bg-background/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple p-[2px]">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-xl blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-full h-full bg-background rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-neon-cyan" />
              </div>
            </div>
            <span className="font-['Space_Grotesk'] font-bold text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-cyan to-neon-purple">
              NEXUS<span className="text-white">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:text-white ${
                    isActive ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-lg border border-white/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </div>

          <button className="flex items-center gap-2 px-6 py-2.5 neon-button text-white group">
            <Wallet className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Connect</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
