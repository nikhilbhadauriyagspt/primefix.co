import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from "../config";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-urbanist bg-white">
        <div className="h-24 w-24 rounded-full bg-gray-50 flex items-center justify-center mb-8">
          <ShoppingBag size={40} className="text-gray-200" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">Your cart is empty</h2>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-10">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop" className="px-12 py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-blue-600 transition-all shadow-xl">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pt-32 pb-20 font-urbanist">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        <div className="flex items-end justify-between mb-12 border-b border-gray-200 pb-8">
          <div>
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-600 mb-2 block ml-1">Your Selection</span>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              Shopping <span className="text-slate-400 italic">Bag.</span>
            </h1>
          </div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 pb-1">{cartCount} Items</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-[2rem] border border-gray-100 p-6 flex flex-col sm:flex-row items-center gap-8 group hover:shadow-xl hover:shadow-gray-200/20 transition-all"
                >
                  <div className="h-32 w-32 rounded-2xl bg-gray-50 p-4 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={item.images ? `${(typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0])}` : ''} 
                      alt={item.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/150x150"; }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col mb-4">
                      <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">{item.brand_name}</span>
                      <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-tight line-clamp-1">{item.name}</h3>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="h-10 px-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-4">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-blue-600 transition-colors"><Minus size={14} /></button>
                        <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-blue-600 transition-colors"><Plus size={14} /></button>
                      </div>
                      <span className="text-lg font-black text-slate-900">${item.price * item.quantity}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="h-12 w-12 rounded-2xl bg-gray-50 text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link to="/shop" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors pt-6">
              <ChevronLeft size={14} /> Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white sticky top-40">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-8">Order Summary</h3>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Subtotal</span>
                  <span className="text-lg font-black">${total}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Shipping</span>
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Calculated at next step</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs font-black uppercase tracking-[0.2em]">Grand Total</span>
                  <span className="text-3xl font-black">${total}</span>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="w-full h-16 bg-blue-600 hover:bg-white hover:text-slate-900 text-white rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-blue-600/20 active:scale-[0.98]"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </Link>

              <div className="mt-8 pt-8 border-t border-white/5">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest text-center leading-relaxed">
                  SECURE CHECKOUT POWERED BY STRIPE. <br />
                  30-DAY MONEY BACK GUARANTEE ON ALL ORDERS.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
