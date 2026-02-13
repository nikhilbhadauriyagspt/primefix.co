import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import API_BASE_URL from "../config";

export default function TheVault({ products = [] }) {
  const navigate = useNavigate();
  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true })
  );

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (products.length === 0) return null;

  return (
    <section className="px-6 md:px-10 lg:px-12 py-16 bg-white font-urbanist overflow-hidden">
      <div className="max-w-[1920px] mx-auto">
        
        {/* --- UNIFIED HEADING --- */}
        <div className="flex items-end justify-between mb-12 border-b border-gray-100 pb-8">
          <div>
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-600 mb-2 block ml-1">Must-Have Gear</span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              The <span className="text-slate-400 italic">Vault.</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4 pb-1">
            <Link to="/shop" className="text-xs font-black uppercase tracking-widest text-slate-900 hover:text-blue-600 transition-colors mr-4">
              View All
            </Link>
          </div>
        </div>

        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-4">
            {products.map((p, i) => (
              <CarouselItem key={p.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5 xl:basis-1/6">
                <motion.div
                  onClick={() => navigate(`/product/${p.slug}`)}
                  whileHover={{ y: -4 }}
                  className="group relative bg-gray-50 rounded-2xl p-4 cursor-pointer hover:bg-white border border-transparent hover:border-gray-100 transition-all duration-300 h-full"
                >
                  <div className="aspect-square rounded-xl bg-white mb-3 overflow-hidden shadow-sm p-4 flex items-center justify-center">
                    <img 
                      src={getImagePath(p.images)} 
                      alt={p.name} 
                      className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
                    />
                  </div>
                  
                  <div className="flex justify-between items-end px-1">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-[11px] font-black text-slate-900 leading-tight mb-1 truncate">{p.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400">${p.price}</p>
                    </div>
                    <div className="text-slate-300 group-hover:text-blue-600 transition-colors ml-2">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="absolute -top-20 right-0 flex gap-2">
            <CarouselPrevious className="static translate-y-0 h-10 w-10 border-gray-100 hover:bg-blue-600 hover:text-white transition-all shadow-sm" />
            <CarouselNext className="static translate-y-0 h-10 w-10 border-gray-100 hover:bg-blue-600 hover:text-white transition-all shadow-sm" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}