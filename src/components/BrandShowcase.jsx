import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function BrandShowcase({ brands = [] }) {
  const getBrandLogo = (brand) => {
    if (brand.logo) return brand.logo;
    return `https://ui-avatars.com/api/?name=${brand.name}&background=ffffff&color=0f172a&bold=true`;
  };

  if (brands.length === 0) return null;

  // Double the brands for infinite scroll effect
  const doubleBrands = [...brands, ...brands, ...brands];

  return (
    <section className="py-20 bg-slate-900 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/20 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Left: Text Info */}
          <div className="w-full md:w-1/4 text-center md:text-left">
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-400 mb-3 block">Our Partners</span>
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none mb-4">
              Premium <br className="hidden md:block" />
              <span className="text-slate-500 italic">Lineup.</span>
            </h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-relaxed">
              Global leaders in <br className="hidden md:block" /> tech innovation.
            </p>
          </div>

          {/* Right: Scrolling Pills */}
          <div className="w-full md:w-3/4 overflow-hidden relative py-4 pause-on-hover">
            {/* Gradients for smooth fade */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-20" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-900 to-transparent z-20" />

            <div className="animate-marquee flex items-center gap-6 whitespace-nowrap">
              {doubleBrands.map((brand, i) => (
                <Link 
                  key={`${brand.id}-${i}`}
                  to={`/brand/${brand.name.toLowerCase()}`}
                  className="group"
                >
                  <div className="h-16 px-8 flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-blue-600 transition-all duration-500 hover:border-blue-400 hover:scale-105 cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-white p-1.5 flex items-center justify-center overflow-hidden shrink-0">
                      <img 
                        src={getBrandLogo(brand)} 
                        alt={brand.name} 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-white uppercase tracking-widest group-hover:text-white">
                        {brand.name}
                      </span>
                      <span className="text-[8px] font-bold text-slate-500 uppercase group-hover:text-blue-100">
                        Official Store
                      </span>
                    </div>
                    <ArrowUpRight size={14} className="text-slate-600 group-hover:text-white ml-2 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}