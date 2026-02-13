import { motion } from "framer-motion";
import { ShoppingBag, Heart, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import API_BASE_URL from "../config";

export default function ProductGrid({ products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };
  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        return `/${imgs[0]}`;
      }
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  return (
    <section className="px-6 md:px-10 lg:px-12 py-16 bg-white font-urbanist">
      
      {/* --- REFINED HEADING --- */}
      <div className="flex items-end justify-between mb-12 border-b border-gray-100 pb-8">
        <div>
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-600 mb-2 block ml-1">Latest Tech</span>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            New <span className="text-slate-400 italic">Arrivals.</span>
          </h2>
        </div>
        <button className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2 hover:text-blue-600 transition-colors pb-1">
          Explore All <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-10">
        {products.map((p, i) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group cursor-pointer"
            >
              <Link to={`/product/${p.slug}`} className="relative aspect-square bg-white rounded-2xl overflow-hidden mb-3 border border-gray-100 group-hover:border-blue-500/20 transition-all duration-300 flex items-center justify-center p-4">
                <span className="absolute top-2 left-2 bg-gray-900/5 backdrop-blur-md px-2 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-md z-10 text-slate-600">
                  {p.brand_name || 'New'}
                </span>
                
                <button 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    toggleWishlist(p);
                  }}
                  className={`absolute top-2 right-2 p-1.5 rounded-full transition-all z-10 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 duration-300 border ${isInWishlist(p.id) ? 'bg-red-500 text-white border-red-500' : 'bg-white text-slate-400 hover:text-red-500 hover:bg-red-50 border-gray-50'}`}
                >
                  <Heart size={12} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                </button>

                <img 
                  src={getImagePath(p.images)} 
                  alt={p.name}
                  className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=Image+Not+Found"; }}
                />

                <div className="absolute bottom-2 left-2 right-2 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300">
                  <button 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      e.stopPropagation(); 
                      handleAddToCart(p);
                    }}
                    disabled={addedItems[p.id]}
                    className={`w-full h-8 rounded-lg flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest transition-all shadow-lg ${addedItems[p.id] ? 'bg-emerald-500 text-white' : 'bg-black text-white hover:bg-blue-600'}`}
                  >
                    {addedItems[p.id] ? (
                      <><Check size={12} /> Added</>
                    ) : (
                      <><ShoppingBag size={12} /> Add to Cart</>
                    )}
                  </button>
                </div>
              </Link>

              <div className="px-1">
                <Link to={`/product/${p.slug}`}>
                  <h3 className="text-[11px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1 mb-0.5">{p.name}</h3>
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">${p.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </section>
  );
}