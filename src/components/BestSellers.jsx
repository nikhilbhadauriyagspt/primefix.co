import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Check } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import API_BASE_URL from "../config";

import 'swiper/css';

export default function BestSellers({ products = [] }) {
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
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  return (
    <section className="px-6 md:px-10 lg:px-12 py-16 bg-white font-urbanist relative group">
      
      {/* --- REFINED HEADING --- */}
      <div className="flex items-end justify-between mb-12 border-b border-gray-100 pb-8">
        <div>
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-600 mb-2 block ml-1">Community Favorites</span>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Best <span className="text-slate-400 italic">Sellers.</span>
          </h2>
        </div>
        
        <div className="flex gap-2 pb-1">
          <button className="bs-prev h-11 w-11 rounded-full border border-gray-100 bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm">
            <ChevronLeft size={18} />
          </button>
          <button className="bs-next h-11 w-11 rounded-full border border-gray-100 bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={24}
        slidesPerView={1.2}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        navigation={{ prevEl: '.bs-prev', nextEl: '.bs-next' }}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 },
          1440: { slidesPerView: 5.2 },
        }}
      >
        {products.map((p, i) => (
            <SwiperSlide key={p.id}>
              <motion.div className="bg-white p-4 rounded-[2rem] border border-gray-100 hover:border-blue-500/20 transition-all duration-500 group h-full">
                <Link to={`/product/${p.slug}`} className="relative aspect-square rounded-[1.5rem] bg-gray-50 overflow-hidden mb-4 p-6 flex items-center justify-center block">
                  <span className="absolute top-3 left-3 bg-white px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest z-10 shadow-sm">
                    {p.brand_name || 'Popular'}
                  </span>
                  <button 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      e.stopPropagation(); 
                      toggleWishlist(p);
                    }}
                    className={`absolute top-3 right-3 transition-colors z-10 p-1.5 rounded-full ${isInWishlist(p.id) ? 'bg-red-500 text-white' : 'text-slate-300 hover:text-red-500'}`}
                  >
                    <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                  </button>
                  <img src={getImagePath(p.images)} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                </Link>
                
                <div className="px-2">
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="font-black text-slate-900 text-sm mb-1 line-clamp-1">{p.name}</h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-black text-sm">${p.price}</span>
                  </div>
                  <button 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      e.stopPropagation(); 
                      handleAddToCart(p);
                    }}
                    disabled={addedItems[p.id]}
                    className={`w-full mt-4 py-2.5 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 ${addedItems[p.id] ? 'bg-emerald-500' : 'bg-gray-900 hover:bg-blue-600'}`}
                  >
                    {addedItems[p.id] ? <><Check size={12} className="inline mr-1" /> Added</> : 'Add to Cart'}
                  </button>
                </div>
              </motion.div>
            </SwiperSlide>
                  ))}
                </Swiper>
              </section>
            );
          }