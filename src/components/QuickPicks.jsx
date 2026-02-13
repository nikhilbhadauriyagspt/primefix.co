import { motion } from "framer-motion";
import { Plus, ArrowRight, Check } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API_BASE_URL from "../config";
import 'swiper/css';

export default function QuickPicks({ products = [] }) {
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();
  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  return (
    <section className="px-6 md:px-10 lg:px-12 py-16 bg-white font-urbanist">
      <div className="max-w-[1920px] mx-auto">
        
        {/* --- UNIFIED HEADING --- */}
        <div className="flex items-end justify-between mb-12 border-b border-gray-100 pb-8">
          <div>
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-600 mb-2 block ml-1">For You</span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              Quick <span className="text-slate-400 italic">Picks.</span>
            </h2>
          </div>
          
          <div className="flex gap-2 pb-1">
            <button className="qp-prev h-10 w-10 rounded-full border border-gray-100 bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm">
              <ArrowRight size={16} className="rotate-180" />
            </button>
            <button className="qp-next h-10 w-10 rounded-full border border-gray-100 bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView={1.2}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={{ prevEl: '.qp-prev', nextEl: '.qp-next' }}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.5 },
            1440: { slidesPerView: 5.5 },
          }}
        >
          {products.map((p, i) => (
            <SwiperSlide key={p.id}>
              <motion.div 
                onClick={() => navigate(`/product/${p.id}`)}
                whileHover={{ y: -2 }}
                className="flex items-center gap-4 p-3 pr-4 rounded-2xl border border-gray-100 bg-white hover:border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group cursor-pointer"
              >
                <div className="h-16 w-16 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0 p-2 flex items-center justify-center">
                  <img src={getImagePath(p.images)} alt={p.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{p.brand_name || 'Electronics'}</p>
                  <h4 className="text-sm font-black text-slate-900 truncate">{p.name}</h4>
                  <p className="text-xs font-bold text-blue-600 mt-0.5">${p.price}</p>
                </div>
                <button 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    addToCart(p);
                  }}
                  className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${cart.find(i => i.id === p.id) ? 'bg-green-500 text-white' : 'bg-gray-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white'}`}
                >
                  {cart.find(i => i.id === p.id) ? <Check size={14} /> : <Plus size={16} />}
                </button>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}