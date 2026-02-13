import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Heart, 
  ChevronDown,  X,
  Laptop,
  Smartphone,
  Cpu,
  Monitor,
  Headphones,
  Gamepad,
  LogOut,
  Settings,
  Package,
  ArrowRight,
  ChevronRight,
  Loader2,
  Clock,
  Mail,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { cartCount, wishlistCount, cart, openCartDrawer, isSearchOpen, openSearch, closeSearch } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [hoveredParent, setHoveredParent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [], categories: [] });
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  // Load recent searches on mount
  useEffect(() => {
    const saved = localStorage.getItem('recent_searches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  const saveSearch = (query) => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recent_searches', JSON.stringify(updated));
  };

  // Live Search Logic
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          // Fetch Products
          const pRes = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=6`);
          const pData = await pRes.json();
          
          // Filter Categories locally for speed or fetch from all categories
          const matchedCats = categories.flatMap(parent => [parent, ...(parent.children || [])])
            .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .slice(0, 4);

          setSuggestions({
            products: pData.status === 'success' ? pData.data : [],
            categories: matchedCats
          });
        } catch (err) {
          console.error("Search error:", err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions({ products: [], categories: [] });
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, categories]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveSearch(searchQuery.trim());
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      closeSearch();
    }
  };

  useEffect(() => {
    // ... existing fetching logic ...
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if(data.status === 'success') {
          setCategories(data.data);
          if (data.data.length > 0) {
            setHoveredParent(data.data[0].id);
          }
        }
      });

    // Fetch Brands
    fetch(`${API_BASE_URL}/brands`)
      .then(res => res.json())
      .then(data => {
        if(data.status === 'success') setBrands(data.data);
      });

    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      // Only set user if it's NOT an admin (or handle as customer)
      if (parsedUser && parsedUser.role === 'admin') {
        setUser(null);
      } else {
        setUser(parsedUser);
      }
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  // Flatten nested categories for the marquee
  const allSubCategories = categories.flatMap(parent => parent.children || []);
  const marqueeChips = allSubCategories.length > 0 
    ? [...allSubCategories.map(c => c.name), ...allSubCategories.map(c => c.name)] 
    : ["Premium Laptops", "Office Printers", "Latest Accessories", "Tech Support", "Premium Laptops", "Office Printers", "Latest Accessories", "Tech Support"];

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  const activeParent = categories.find(c => String(c.id) === String(hoveredParent));
  const subCategoriesToDisplay = activeParent?.children || [];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100] bg-white/90 backdrop-blur-xl border-b border-gray-100 font-urbanist">
        <div className="max-w-[1920px] mx-auto">
          
          {/* --- ROW 1: TOP BAR --- */}
          <div className="flex items-center justify-between px-6 md:px-10 lg:px-12 py-3 lg:py-4">
            <div className="flex-1 flex justify-start">
              <Link to="/" className="flex items-center gap-2">
                <img src="/logo/logo.png" alt="PRIMEFIX" className="h-7 lg:h-10 w-auto object-contain" />
              </Link>
            </div>

            <div className="flex-1 flex justify-end items-center gap-4 lg:gap-8">
              <div className="hidden lg:flex items-center gap-6 text-[10px] font-black text-gray-400 tracking-widest uppercase">
                <Link to="/" className="hover:text-black transition-colors">Home</Link>
                <Link to="/shop" className="hover:text-black transition-colors">Store</Link>
                <Link to="/about" className="hover:text-black transition-colors">About</Link>
                <Link to="/contact" className="hover:text-black transition-colors">Contact</Link>
                <Link to="/faq" className="hover:text-black transition-colors">FAQ</Link>
              </div>

              <div className="flex items-center gap-4 lg:gap-6">
                
                {/* 1. Plain Wishlist Icon (Hidden on mobile - moved to bottom nav) */}
                <Link to="/wishlist" className="hidden lg:block text-gray-500 hover:text-red-500 transition-colors relative">
                  <Heart className="h-5 w-5 stroke-[1.5]" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 h-4 w-4 bg-red-600 text-white text-[8px] font-black rounded-full flex items-center justify-center">{wishlistCount}</span>
                  )}
                </Link>

                {/* 2. Plain Cart Icon */}
                <div className="relative">
                  <button 
                    onClick={openCartDrawer}
                    className="flex items-center text-gray-500 hover:text-blue-600 transition-colors relative"
                  >
                    <ShoppingBag className="h-5 w-5 stroke-[1.5]" />
                    <span className="absolute -top-2 -right-2 h-4 w-4 bg-black text-white text-[8px] font-black rounded-full flex items-center justify-center">{cartCount}</span>
                  </button>
                </div>
                
                {/* 3. Plain Profile Icon (Hidden on mobile - moved to bottom nav) */}
                <div className="hidden lg:relative lg:block" onMouseEnter={() => setIsProfileOpen(true)} onMouseLeave={() => setIsProfileOpen(false)}>
                  {user ? (
                     <div className="h-7 w-7 bg-gray-900 rounded-full flex items-center justify-center text-[10px] font-black text-white cursor-pointer hover:bg-blue-600 transition-colors">
                       {(user.name || user.username || 'U').charAt(0).toUpperCase()}
                     </div>
                  ) : (
                    <Link to="/login" className="text-gray-500 hover:text-black transition-colors">
                      <User className="h-5 w-5 stroke-[1.5]" />
                    </Link>
                  )}

                  <AnimatePresence>
                    {isProfileOpen && user && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 mt-4 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 p-2 z-[110]"
                      >
                        <Link to="/profile" className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-lg"><User className="h-4 w-4" /> My Profile</Link>
                        <Link to="/orders" className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-lg"><Package className="h-4 w-4" /> Orders</Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-lg"><LogOut className="h-4 w-4" /> Logout</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </div>

          {/* --- ROW 2: ACTION BAR --- */}
          <div className="px-6 md:px-10 lg:px-12 pb-4 flex items-center gap-4 relative">
            
            {/* 1. Category Dropdown (Hidden on mobile) */}
            <div 
              className="hidden lg:relative lg:block"
              onMouseEnter={() => setActiveDropdown('categories')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`h-11 min-w-[300px] px-6 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-between text-[11px] font-black text-gray-900 transition-all ${activeDropdown === 'categories' ? 'bg-white border-blue-500 shadow-lg' : ''}`}>
                <span className="flex items-center gap-3">
                  <div className={`h-1.5 w-1.5 rounded-full ${activeDropdown === 'categories' ? 'bg-blue-600' : 'bg-gray-900'}`}></div>
                  BROWSE CATEGORIES
                </span>
                <div className="h-6 w-6 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                  <ChevronDown className={`h-3 w-3 transition-transform ${activeDropdown === 'categories' ? 'rotate-180' : ''}`} />
                </div>
              </button>

              <AnimatePresence>
                {activeDropdown === 'categories' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-[800px] bg-white rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden z-[120] flex"
                  >
                    {/* Left Side: Parent Categories */}
                    <div className="w-1/3 bg-gray-50/50 p-6 border-r border-gray-100">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 ml-2">Departments</h4>
                      <div className="space-y-1">
                        {categories.map(parent => (
                          <div 
                            key={parent.id}
                            onMouseEnter={() => setHoveredParent(parent.id)}
                            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${String(hoveredParent) === String(parent.id) ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
                          >
                            <span className="text-xs font-black uppercase tracking-tight">{parent.name}</span>
                            <ChevronDown className="-rotate-90 h-3 w-3 opacity-50" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Side: Sub Categories */}
                    <div className="w-2/3 p-8 bg-white min-h-[400px]">
                      <div className="flex items-center justify-between mb-8">
                         <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Explore Products</h4>
                         {activeParent && (
                           <Link to={`/shop?category=${activeParent.slug}`} onClick={() => setActiveDropdown(null)} className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline">View All</Link>
                         )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {subCategoriesToDisplay.length > 0 ? (
                          subCategoriesToDisplay.map(sub => (
                            <Link 
                              key={sub.id}
                              to={`/shop?category=${sub.slug}`}
                              onClick={() => setActiveDropdown(null)}
                              className="group flex flex-col p-4 rounded-2xl border border-gray-50 hover:border-blue-500/20 hover:bg-blue-50/30 transition-all"
                            >
                              <span className="text-xs font-black text-gray-900 group-hover:text-blue-600 mb-1">{sub.name}</span>
                              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">Browse Collection</span>
                            </Link>
                          ))
                        ) : (
                          <div className="col-span-2 py-10 text-center flex flex-col items-center justify-center">
                            <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                              <Package className="text-gray-300" size={20} />
                            </div>
                            <p className="text-xs font-bold text-gray-400 italic">No sub-categories found in this department</p>
                          </div>
                        )}
                      </div>

                      {/* Featured Section inside dropdown */}
                      <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                               <Package size={20} />
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-gray-900 uppercase">Express Delivery</p>
                               <p className="text-[9px] font-bold text-gray-400">On all department orders</p>
                            </div>
                         </div>
                         <Link to="/shop" onClick={() => setActiveDropdown(null)} className="h-9 px-6 bg-gray-900 text-white text-[9px] font-black uppercase rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">Shop Now</Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Brand Dropdown (Hidden on mobile) */}
            <div className="hidden lg:relative lg:block" onMouseEnter={() => setActiveDropdown('brands')} onMouseLeave={() => setActiveDropdown(null)}>
              <button className="h-11 min-w-[150px] px-6 bg-white border border-gray-100 rounded-full flex items-center justify-between text-[11px] font-black text-gray-500 uppercase tracking-widest hover:border-gray-900 transition-all">
                Brands <ChevronDown size={12} className={activeDropdown === 'brands' ? 'rotate-180' : ''} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'brands' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-[120]">
                    {brands.map(brand => (
                      <Link key={brand.id} to={`/shop?brand=${encodeURIComponent(brand.name)}`} onClick={() => setActiveDropdown(null)} className="block px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">{brand.name}</Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Premium Search Trigger (Hidden on mobile) */}
            <div className="hidden lg:flex flex-1 max-w-[400px]">
              <button 
                onClick={openSearch}
                className="w-full h-11 px-6 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-between group hover:bg-white hover:border-blue-500 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Search size={14} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors">Search Tech...</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-white border border-gray-200 rounded-lg shadow-sm">
                   <span className="text-[8px] font-black text-slate-400">⌘</span>
                   <span className="text-[8px] font-black text-slate-400">K</span>
                </div>
              </button>
            </div>

            {/* 4. Marquee Categories (Hidden on mobile) */}
            <div className="hidden lg:block flex-1 overflow-hidden relative pause-on-hover">
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent z-10"></div>
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent z-10"></div>
              <div className="animate-marquee flex items-center gap-4 whitespace-nowrap">
                {marqueeChips.map((c, idx) => {
                  const catSlug = categories.flatMap(p => [p, ...(p.children || [])]).find(x => x.name === c)?.slug || '';
                  return (
                    <Link key={idx} to={`/shop?category=${catSlug}`} className="h-9 px-5 bg-white border border-gray-100 rounded-full text-[10px] font-black text-gray-400 hover:text-black hover:border-black flex items-center transition-all uppercase tracking-tight">{c}</Link>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* --- FULL SCREEN SEARCH OVERLAY --- */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col items-center pt-40 px-6 md:px-10 lg:px-12"
          >
            <button 
              onClick={closeSearch}
              className="absolute top-10 right-10 h-14 w-14 rounded-full bg-gray-50 flex items-center justify-center text-slate-900 hover:bg-black hover:text-white transition-all shadow-sm"
            >
              <X size={24} />
            </button>

            <div className="w-full max-w-4xl space-y-12">
               <form onSubmit={handleSearch} className="relative group">
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="WHAT ARE YOU LOOKING FOR?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-b-4 border-gray-100 pb-6 text-2xl md:text-4xl font-black text-slate-900 placeholder:text-gray-100 focus:outline-none focus:border-blue-600 transition-all uppercase tracking-tighter"
                  />
                  <button type="submit" className="absolute right-0 bottom-8 p-4 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all">
                    {isSearching ? <Loader2 className="animate-spin h-8 w-8" /> : <ArrowRight size={32} />}
                  </button>

                  {/* Suggestions Dropdown */}
                  <AnimatePresence>
                    {(suggestions.products.length > 0 || suggestions.categories.length > 0) && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-4 bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden z-[210] max-h-[500px] overflow-y-auto custom-scrollbar"
                      >
                        <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-10">
                          
                          {/* Categories Suggestions */}
                          {suggestions.categories.length > 0 && (
                            <div className="md:col-span-4 space-y-4">
                              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block border-b border-blue-50 pb-2">Matching Departments</span>
                              <div className="space-y-2">
                                {suggestions.categories.map(cat => (
                                  <Link 
                                    key={cat.id} 
                                    to={`/shop?category=${cat.slug}`}
                                    onClick={() => { closeSearch(); setSearchQuery(''); }}
                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 group transition-all"
                                  >
                                    <span className="text-xs font-black text-slate-900 uppercase">{cat.name}</span>
                                    <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-600" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Product Suggestions */}
                          <div className={`${suggestions.categories.length > 0 ? 'md:col-span-8' : 'md:col-span-12'} space-y-4`}>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block border-b border-gray-50 pb-2">Top Product Matches</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {suggestions.products.map((p) => (
                                <Link 
                                  key={p.id} 
                                  to={`/product/${p.id}`}
                                  onClick={() => {
                                    closeSearch();
                                    setSearchQuery('');
                                    saveSearch(searchQuery);
                                  }}
                                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-blue-50/50 transition-all group"
                                >
                                  <div className="h-14 w-14 rounded-xl bg-gray-50 flex items-center justify-center p-2 shrink-0">
                                    <img 
                                      src={p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : ''} 
                                      className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" 
                                      alt=""
                                      onError={(e) => { e.target.src = "https://via.placeholder.com/50x50"; }}
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-[11px] font-black text-slate-900 uppercase truncate leading-tight group-hover:text-blue-600">{p.name}</p>
                                    <p className="text-[10px] font-bold text-slate-400 mt-1">${p.price}</p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <button 
                          onClick={handleSearch}
                          className="w-full py-4 bg-gray-900 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-colors"
                        >
                          View All results for "{searchQuery}"
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </form>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-20 pt-10">
                  <div className="space-y-8">
                    <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] border-b border-blue-50 pb-4">Recent Searches</h4>
                    <div className="flex flex-wrap gap-3">
                      {recentSearches.length > 0 ? (
                        recentSearches.map(t => (
                          <button 
                            key={t} 
                            onClick={() => {
                              setSearchQuery(t);
                              // Auto-navigate or let user refine
                            }} 
                            className="px-6 py-3 bg-gray-50 hover:bg-black hover:text-white rounded-xl text-xs font-bold transition-all uppercase tracking-tight flex items-center gap-2"
                          >
                            <Clock size={12} /> {t}
                          </button>
                        ))
                      ) : (
                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">No recent history</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] border-b border-gray-50 pb-4">Quick Departments</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {categories.slice(0, 4).map(cat => (
                        <Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={closeSearch} className="group flex items-center gap-4">
                           <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all"><ChevronRight size={16} /></div>
                           <span className="text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase">{cat.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
            <motion.div 
              initial={{ x: '-100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '-100%' }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }} 
              className="fixed top-0 left-0 h-full w-full max-w-[380px] bg-white z-[120] flex flex-col shadow-2xl overflow-y-auto custom-scrollbar"
            >
              {/* Sidebar Header */}
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <Link to="/" onClick={() => setIsSidebarOpen(false)}>
                  <img src="/logo/logo.png" alt="PRIMEFIX" className="h-8 w-auto object-contain" />
                </Link>
                <button onClick={() => setIsSidebarOpen(false)} className="h-10 w-10 bg-gray-50 rounded-full flex items-center justify-center text-slate-900 hover:bg-black hover:text-white transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 flex flex-col p-8 space-y-12">
                {/* Main Nav */}
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-2">Navigation</span>
                  {[
                    { name: 'Home', path: '/' },
                    { name: 'Store', path: '/shop' },
                    { name: 'About Us', path: '/about' },
                    { name: 'Contact', path: '/contact' },
                    { name: 'FAQ', path: '/faq' }
                  ].map(item => (
                    <Link 
                      key={item.name} 
                      to={item.path} 
                      onClick={() => setIsSidebarOpen(false)}
                      className="text-3xl font-black text-slate-900 hover:text-blue-600 transition-colors uppercase tracking-tighter"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Popular Categories */}
                <div className="space-y-6">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Browse Tech</span>
                  <div className="grid grid-cols-1 gap-2">
                    {categories.slice(0, 5).map(cat => (
                      <Link 
                        key={cat.id} 
                        to={`/shop?category=${cat.slug}`}
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group hover:bg-blue-600 transition-all"
                      >
                        <span className="text-xs font-black text-slate-900 uppercase group-hover:text-white">{cat.name}</span>
                        <ChevronRight size={14} className="text-slate-300 group-hover:text-white" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Contact & Support */}
                <div className="space-y-6">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Help & Support</span>
                  <div className="space-y-4">
                    <a href="mailto:support@primefix.co" className="flex items-center gap-4 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors">
                      <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center"><Mail size={16} /></div>
                      support@primefix.co
                    </a>
                    <a href="tel:+1234567890" className="flex items-center gap-4 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors">
                      <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center"><Phone size={16} /></div>
                      +1 (800) PRIME-FIX
                    </a>
                  </div>
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="p-8 border-t border-gray-100 bg-gray-50/50 mt-auto">
                <div className="flex flex-col gap-6">
                  {!user ? (
                    <Link 
                      to="/login" 
                      onClick={() => setIsSidebarOpen(false)}
                      className="w-full h-14 bg-black text-white rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl"
                    >
                      <User size={16} /> Sign In
                    </Link>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-xs uppercase">
                          {(user.name || 'U').charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-900 uppercase">{user.name}</p>
                          <Link to="/orders" onClick={() => setIsSidebarOpen(false)} className="text-[9px] font-black text-blue-600 uppercase hover:underline">View Orders</Link>
                        </div>
                      </div>
                      <button onClick={handleLogout} className="text-red-500"><LogOut size={18} /></button>
                    </div>
                  )}
                  <p className="text-[8px] font-bold text-slate-400 text-center uppercase tracking-[0.2em]">© 2026 PRIMEFIX SOLUTIONS. ALL RIGHTS RESERVED.</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="h-[140px]"></div>
    </>
  );
}