import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  Search, 
  ChevronDown, 
  Filter, 
  LayoutGrid, 
  List, 
  ShoppingBag, 
  Heart,
  X,
  Loader2,
  Check,
  ArrowUpDown,
  SlidersHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});
  const { category: pathCategory, brand: pathBrand } = useParams();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [total, setTotal] = useState(0);

  // Filters - prioritze search params
  const category = searchParams.get('category') || pathCategory || '';
  const brand = searchParams.get('brand') || pathBrand || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`).then(res => res.json()).then(d => setCategories(d.data));
    fetch(`${API_BASE_URL}/brands`).then(res => res.json()).then(d => setBrands(d.data));
  }, []);

  useEffect(() => {
    // If we are on /category/:category or /brand/:brand, redirect to /shop with query params
    // to unify the experience and fix the "can't remove filter" issue.
    if (pathCategory) {
      navigate(`/shop?category=${pathCategory}`, { replace: true });
      return;
    }
    if (pathBrand) {
      navigate(`/shop?brand=${encodeURIComponent(pathBrand)}`, { replace: true });
      return;
    }

    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('limit', '1000');
    
    fetch(`${API_BASE_URL}/products?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setProducts(data.data);
          setTotal(data.meta.total);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams, pathCategory, pathBrand, navigate]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    
    // If we are on a path-based route (e.g., /category/:category), 
    // and we update filters, we should move to the unified /shop route
    if (pathCategory && !newParams.get('category')) newParams.set('category', pathCategory);
    if (pathBrand && !newParams.get('brand')) newParams.set('brand', pathBrand);

    if (value) newParams.set(key, value);
    else newParams.delete(key);
    
    newParams.set('page', '1');
    navigate(`/shop?${newParams.toString()}`);
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
    <div className="bg-white min-h-screen font-urbanist">
      <SEO 
        title="Premium Catalog | Laptops, Printers & More" 
        description="Browse our authorized catalog of high-performance laptops, professional printers, and genuine accessories."
      />
      
      {/* --- REFINED HEADER --- */}
      <div className="pt-40 pb-12 px-6 md:px-10 lg:px-12 bg-white">
        <div className="max-w-[1920px] mx-auto border-b border-gray-100 pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-blue-50 w-fit px-4 py-1.5 rounded-full border border-blue-100">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Official Inventory</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                The <span className="text-slate-400 italic">Catalog.</span>
              </h1>
              <p className="text-slate-500 text-sm md:text-base font-bold max-w-xl leading-relaxed">
                Explore our curated selection of high-performance {category || brand || 'computing'} solutions, engineered for professionals and tech enthusiasts.
              </p>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 pt-2">
                <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                   <SlidersHorizontal size={12} className="text-blue-600" />
                   {total} premium items
                </span>
                <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                   <ArrowUpDown size={12} className="text-blue-600" />
                   Sorted by {sort.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
               {/* Search Integrated */}
               <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="SEARCH TECH..."
                    value={search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="pl-5 pr-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl text-[11px] font-bold focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all w-64 md:w-96 shadow-inner"
                  />
                  <div className="absolute right-2 top-2 h-10 w-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg">
                    <Search size={16} />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FLOATING / HORIZONTAL ACTION BAR & FILTER DRAWER --- */}
      <div className="sticky top-[140px] z-40">
        <div className="px-6 md:px-10 lg:px-12 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-4">
          <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isFilterOpen ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-900 text-white hover:bg-blue-600'}`}
              >
                <SlidersHorizontal size={14} />
                {isFilterOpen ? 'Close Filters' : 'Filter & Refine'}
              </button>

              {/* Quick Chips for active filters */}
              {(category || brand) && (
                <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-100">
                  {category && (
                    <button onClick={() => updateFilter('category', '')} className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase border border-blue-100 shadow-sm">
                      {category} <X size={10} />
                    </button>
                  )}
                  {brand && (
                    <button onClick={() => updateFilter('brand', '')} className="flex items-center gap-2 px-3 py-2 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-black uppercase border border-slate-100 shadow-sm">
                      {brand} <X size={10} />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-6 shrink-0">
              <div className="hidden md:flex items-center gap-4">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Sort</span>
                <select 
                  value={sort}
                  onChange={(e) => updateFilter('sort', e.target.value)}
                  className="bg-transparent text-[11px] font-black text-slate-900 focus:outline-none cursor-pointer uppercase tracking-tight"
                >
                  <option value="newest">Newest</option>
                  <option value="price_low">Price ↑</option>
                  <option value="price_high">Price ↓</option>
                  <option value="name_asc">A-Z</option>
                </select>
              </div>
              <div className="h-8 w-[1px] bg-gray-100" />
              <div className="flex gap-1">
                 <button className="p-2 bg-gray-100 text-blue-600 rounded-lg"><LayoutGrid size={16} /></button>
                 <button className="p-2 text-slate-300 hover:text-slate-600 rounded-lg"><List size={16} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* --- COLLAPSIBLE FILTER DRAWER (INSIDE STICKY) --- */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white/95 backdrop-blur-2xl border-b border-gray-100 overflow-hidden shadow-2xl max-h-[70vh] overflow-y-auto"
            >
              <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-12 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                
                {/* Category Column */}
                <div>
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    Departments
                  </h4>
                  <div className="grid grid-cols-1 gap-1">
                    {categories.map(cat => (
                      <div key={cat.id} className="space-y-1">
                        <button 
                          onClick={() => updateFilter('category', cat.slug)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all ${category === cat.slug ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                        >
                          {cat.name}
                        </button>
                        {cat.children && cat.children.length > 0 && (
                          <div className="ml-4 flex flex-col gap-1 border-l border-gray-200 pl-3 py-1">
                            {cat.children.map(sub => (
                              <button 
                                key={sub.id}
                                onClick={() => updateFilter('category', sub.slug)}
                                className={`text-left text-[11px] font-bold transition-all ${category === sub.slug ? 'text-blue-600' : 'text-slate-400 hover:text-slate-700'}`}
                              >
                                {sub.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brand Column */}
                <div>
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    Official Brands
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {brands.map(b => (
                      <button 
                        key={b.id}
                        onClick={() => updateFilter('brand', brand === b.name ? '' : b.name)}
                        className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase border transition-all ${brand === b.name ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20' : 'bg-gray-50 border-transparent text-slate-400 hover:border-slate-300 hover:bg-white'}`}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status/Condition */}
                <div>
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    Product State
                  </h4>
                  <div className="flex flex-col gap-3">
                    {['Brand New', 'Certified Refurbished', 'Open Box'].map(state => (
                      <label key={state} className="flex items-center gap-3 cursor-pointer group">
                         <div className="h-5 w-5 rounded-lg border-2 border-gray-200 flex items-center justify-center group-hover:border-blue-500 transition-all">
                            <div className="h-2 w-2 rounded-full bg-blue-600 scale-0 group-hover:scale-100 transition-transform opacity-20" />
                         </div>
                         <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 uppercase tracking-tight">{state}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Reset / Actions */}
                <div className="flex flex-col justify-end bg-slate-900 p-8 rounded-[2.5rem] text-white">
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-blue-400">Need Help?</p>
                   <h5 className="text-lg font-black leading-tight mb-6">Find the perfect tech for your workflow.</h5>
                   <button 
                     onClick={() => navigate('/shop')}
                     className="w-full py-4 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-white/5"
                   >
                     Reset All Filters
                   </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- PRODUCT GRID --- */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-12 py-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-48">
            <Loader2 className="animate-spin h-12 w-12 text-blue-600 mb-6" />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 ml-2">Assembling Collection</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-48 text-center">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-4">No results found</h2>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-10">Try a different search or filter combination</p>
            <button onClick={() => navigate('/shop')} className="px-10 py-4 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em]">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-16">
            {products.map((p, i) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % 12) * 0.03 }}
                className="group flex flex-col"
              >
                <Link to={`/product/${p.slug}`} className="relative aspect-square bg-white rounded-[2rem] border border-gray-100 group-hover:border-blue-500/20 group-hover:shadow-[0_30px_60px_rgba(59,130,246,0.08)] transition-all duration-500 flex items-center justify-center p-8 overflow-hidden mb-6">
                  <span className="absolute top-4 left-4 bg-slate-900 text-white px-2.5 py-1 text-[7px] font-black uppercase tracking-widest rounded-full z-10">
                    {p.brand_name || 'Premium'}
                  </span>
                  
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(p);
                    }}
                    className={`absolute top-4 right-4 h-8 w-8 rounded-full flex items-center justify-center shadow-sm border transition-all scale-90 group-hover:scale-100 ${isInWishlist(p.id) ? 'bg-red-500 text-white border-red-500 opacity-100' : 'bg-white text-slate-300 hover:text-red-500 border-gray-50 opacity-0 group-hover:opacity-100'}`}
                  >
                    <Heart size={14} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                  </button>

                  <img 
                    src={getImagePath(p.images)} 
                    alt={p.name}
                    className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute bottom-3 left-3 right-3 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(p);
                      }}
                      disabled={addedItems[p.id]}
                      className={`w-full h-10 rounded-xl flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest transition-all shadow-lg ${addedItems[p.id] ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white hover:bg-slate-900'}`}
                    >
                      {addedItems[p.id] ? (
                        <><Check size={14} /> Added</>
                      ) : (
                        <><ShoppingBag size={14} /> Add to Cart</>
                      )}
                    </button>
                  </div>
                </Link>

                <div className="px-1 flex-1 flex flex-col">
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-[11px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors uppercase tracking-tight leading-tight line-clamp-2 mb-2">{p.name}</h3>
                  </Link>
                  <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-3">
                    <span className="text-sm font-black text-slate-900">${p.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}