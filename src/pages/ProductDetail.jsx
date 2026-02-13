import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  Heart, 
  ChevronRight, 
  Truck, 
  ShieldCheck, 
  RefreshCcw,
  Loader2,
  Plus,
  Minus,
  Share2,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import API_BASE_URL from '../config';

export default function ProductDetail() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const { slug } = useParams();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`${API_BASE_URL}/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setProduct(data.data);
          
          // Fetch related products (using the same category for better relevance)
          const categories = data.data.categories || [];
          const categorySlug = categories.length > 0 ? categories[0].slug : '';
          const brand = data.data.brand_name;
          
          let fetchUrl = `${API_BASE_URL}/products?limit=6`;
          if (categorySlug) {
            fetchUrl += `&category=${categorySlug}`;
          } else if (brand) {
            fetchUrl += `&brand=${brand}`;
          }

          fetch(fetchUrl)
            .then(res => res.json())
            .then(relData => {
              if (relData.status === 'success') {
                setRelatedProducts(relData.data.filter(p => p.id !== data.data.id));
              }
            });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const getImages = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(imgs) ? imgs.map(img => `/${img}`) : [];
    } catch (e) {
      return [];
    }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-blue-600 mb-6" />
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Retrieving Specs</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h2 className="text-4xl font-black text-slate-900 uppercase mb-4">Product Not Found</h2>
        <Link to="/shop" className="px-10 py-4 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em]">Return to Shop</Link>
      </div>
    );
  }

  const images = getImages(product.images);
  const mainImage = images.length > 0 ? images[activeImage] : "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 font-urbanist">
      <SEO 
        title={product.name} 
        description={product.description?.substring(0, 160)}
      />
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-12">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link to="/shop" className="hover:text-blue-600 transition-colors">Catalog</Link>
          <ChevronRight size={10} />
          <span className="text-slate-900 truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          
          {/* Image Gallery */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square bg-gray-50 rounded-[3rem] border border-gray-100 flex items-center justify-center p-12 overflow-hidden relative group"
            >
              <img 
                src={mainImage} 
                alt={product.name} 
                className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
              />
              <button 
                onClick={() => toggleWishlist(product)}
                className={`absolute top-8 right-8 h-12 w-12 rounded-full shadow-xl flex items-center justify-center transition-all ${isInWishlist(product.id) ? 'bg-red-500 text-white' : 'bg-white text-slate-300 hover:text-red-500'}`}
              >
                <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
              </button>
            </motion.div>

            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`h-24 w-24 rounded-2xl border-2 flex-shrink-0 flex items-center justify-center p-4 transition-all ${activeImage === idx ? 'border-blue-600 bg-blue-50/50' : 'border-gray-100 hover:border-gray-300'}`}
                  >
                    <img src={img} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
                {product.brand_name || 'Premium Listing'}
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter uppercase mb-6">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-6 mb-8">
                <span className="text-[10px] font-black uppercase tracking-widest text-green-600 flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-600 animate-pulse" />
                  In Stock & Ready
                </span>
              </div>

              <div className="flex items-baseline gap-4 mb-10">
                <span className="text-5xl font-black text-slate-900">${product.price}</span>
                {product.sale_price && (
                  <span className="text-2xl font-bold text-slate-300 line-through">${product.sale_price}</span>
                )}
              </div>

              {product.description && (
                <p className="text-slate-500 font-medium leading-relaxed text-lg mb-10 border-l-4 border-blue-600 pl-6">
                  {product.description}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-6 mt-auto">
              <div className="flex flex-wrap gap-4">
                <div className="h-16 px-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-6">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-8 w-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-lg font-black w-4 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-8 w-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`flex-grow h-16 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.2em] transition-all shadow-2xl active:scale-[0.98] ${isAdded ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white hover:bg-slate-900 shadow-blue-600/20'}`}
                >
                  {isAdded ? (
                    <><CheckCircle size={20} /> Added to Cart</>
                  ) : (
                    <><ShoppingBag size={20} /> Add to Cart</>
                  )}
                </button>
                
                <button className="h-16 w-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all shadow-xl">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900">
                    <Truck size={18} />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Express Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900">
                    <ShieldCheck size={18} />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Official Warranty</span>
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900">
                    <RefreshCcw size={18} />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">7-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 border-t border-gray-100 pt-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-2">
                <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Personalized for you</h2>
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Related <span className="text-slate-300">Discoveries.</span></h3>
              </div>
              <Link to="/shop" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-2">
                Explore Full Catalog <ChevronRight size={12} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {relatedProducts.map((p) => (
                <Link 
                  to={`/product/${p.slug}`} 
                  key={p.id} 
                  className="group"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className="aspect-square bg-gray-50 rounded-[2rem] border border-gray-100 group-hover:border-blue-500/20 transition-all duration-500 flex items-center justify-center p-8 overflow-hidden mb-4 relative">
                    <img 
                      src={getImagePath(p.images)} 
                      alt={p.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="px-1">
                    <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest mb-1">{p.brand_name}</p>
                    <h4 className="text-[11px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors uppercase tracking-tight line-clamp-1 mb-2">{p.name}</h4>
                    <span className="text-sm font-black text-slate-900">${p.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
