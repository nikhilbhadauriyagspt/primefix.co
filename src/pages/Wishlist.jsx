import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from "../config";

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount } = useCart();

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-urbanist bg-white">
        <div className="h-24 w-24 rounded-full bg-red-50 flex items-center justify-center mb-8">
          <Heart size={40} className="text-red-200" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">Your wishlist is empty</h2>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-10">Save items you love to find them easily later.</p>
        <Link to="/shop" className="px-12 py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-red-600 transition-all shadow-xl">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 font-urbanist">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        <div className="flex items-end justify-between mb-12 border-b border-gray-100 pb-8">
          <div>
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-red-500 mb-2 block ml-1">Your Favorites</span>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              The <span className="text-slate-400 italic">Wishlist.</span>
            </h1>
          </div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 pb-1">{wishlistCount} Saved Items</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          <AnimatePresence>
            {wishlist.map((p) => (
              <motion.div 
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group flex flex-col"
              >
                <div className="relative aspect-square bg-gray-50 rounded-[2rem] border border-gray-100 group-hover:border-red-500/20 transition-all duration-500 flex items-center justify-center p-8 overflow-hidden mb-4">
                  <button 
                    onClick={() => toggleWishlist(p)}
                    className="absolute top-4 right-4 h-10 w-10 bg-white text-red-500 rounded-full shadow-lg flex items-center justify-center z-10 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={16} />
                  </button>

                  <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center">
                    <img 
                      src={getImagePath(p.images)} 
                      alt={p.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>

                  <div className="absolute bottom-3 left-3 right-3 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500">
                    <button 
                      onClick={() => addToCart(p)}
                      className="w-full h-10 bg-black text-white rounded-xl flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-lg"
                    >
                      <ShoppingBag size={14} /> Add to Cart
                    </button>
                  </div>
                </div>

                <div className="px-1 flex-1 flex flex-col">
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-[11px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors uppercase tracking-tight leading-tight line-clamp-1 mb-1">{p.name}</h3>
                  </Link>
                  <span className="text-sm font-black text-slate-900">${p.price}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-20 pt-10 border-t border-gray-100">
          <Link to="/shop" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
            <ChevronLeft size={14} /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
