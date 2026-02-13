import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import API_BASE_URL from "../config";

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-white z-[1001] shadow-2xl flex flex-col font-urbanist"
          >
            {/* Header */}
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Your Bag.</h2>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">{cartCount} premium items</p>
              </div>
              <button 
                onClick={closeCartDrawer}
                className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center text-slate-900 hover:bg-black hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {cart.length > 0 ? (
                <div className="space-y-8">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-6 group">
                      <div className="h-24 w-24 rounded-2xl bg-gray-50 p-4 flex items-center justify-center flex-shrink-0 relative">
                        <img 
                          src={item.images ? `${(typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0])}` : ''} 
                          alt={item.name}
                          className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/100x100"; }}
                        />
                      </div>
                      <div className="flex-1 min-w-0 py-1">
                        <div className="flex justify-between items-start mb-2">
                          <div className="min-w-0">
                            <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">{item.brand_name}</p>
                            <h3 className="text-sm font-black text-slate-900 uppercase truncate pr-4">{item.name}</h3>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-4 bg-gray-50 rounded-lg px-2 py-1 border border-gray-100">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-blue-600"><Minus size={12} /></button>
                            <span className="text-[11px] font-black w-3 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-blue-600"><Plus size={12} /></button>
                          </div>
                          <span className="text-sm font-black text-slate-900">${item.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="h-20 w-20 rounded-full bg-gray-50 flex items-center justify-center mb-6">
                    <ShoppingBag size={32} className="text-gray-200" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 uppercase mb-2">Your bag is empty</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Start adding some premium tech</p>
                  <button 
                    onClick={closeCartDrawer}
                    className="px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-all"
                  >
                    Explore Shop
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Subtotal</span>
                  <span className="text-2xl font-black text-slate-900">${total}</span>
                </div>
                <div className="flex flex-col gap-3">
                  <Link 
                    to="/cart" 
                    onClick={closeCartDrawer}
                    className="w-full h-14 bg-black text-white rounded-xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl"
                  >
                    View Shopping Bag
                  </Link>
                  <Link 
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-600/20"
                  >
                    Checkout Now
                    <ArrowRight size={16} />
                  </Link>
                </div>
                <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-6">
                  Shipping and taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
