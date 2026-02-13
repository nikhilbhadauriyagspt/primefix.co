import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, ArrowUpRight, Globe, Mail, Loader2, CheckCircle2, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useCart();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();

      if (data.status === 'success') {
        showToast(data.message, 'success');
        setEmail('');
      } else {
        showToast(data.message, 'info');
      }
    } catch (err) {
      showToast('Failed to subscribe. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-white text-slate-900 pt-24 pb-12 font-snpro border-t border-gray-100">
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-12">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">

          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-6 mb-8">
              <Link to="/" className="flex items-center gap-2">
                <img src="/logo/logo.png" alt="PRIMEFIX" className="h-10 w-auto object-contain" />
              </Link>
              <div className="h-8 w-px bg-gray-200" />
              <div className="flex items-center gap-2">
                <img src="/brands/hp.jpg" alt="HP Partner" className="h-10 rounded-full w-auto object-contain" />
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-tight">Authorized<br />Partner</span>
              </div>
            </div>
            <p className="text-slate-500 text-base font-bold leading-relaxed mb-10 max-w-sm">
              Designing the future of premium tech retail. Authorized HP Partner specializing in pro workstations and precision printing.
            </p>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-urbanist text-[10px] font-black tracking-[0.3em] uppercase text-blue-600 mb-8">Product Line</h4>
              <ul className="space-y-4">
                <li><Link to="/category/laptop-computers" className="text-slate-500 hover:text-black transition-colors text-sm font-bold">MacBook Series</Link></li>
                <li><Link to="/category/laptop-computers" className="text-slate-500 hover:text-black transition-colors text-sm font-bold">Gaming Rigs</Link></li>
                <li><Link to="/category/printers" className="text-slate-500 hover:text-black transition-colors text-sm font-bold">Business Printers</Link></li>
                <li><Link to="/shop" className="text-slate-500 hover:text-black transition-colors text-sm font-bold">Custom Build</Link></li>
                <li><Link to="/shop" className="text-slate-500 hover:text-black transition-colors text-sm font-bold">Refurbished</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-urbanist text-[10px] font-black tracking-[0.3em] uppercase text-blue-600 mb-8">Support Center</h4>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-slate-500 hover:text-black transition-colors text-sm font-bold">About Us</Link></li>
                <li><Link to="/contact" className="text-slate-500 hover:text-black transition-colors text-sm font-bold">Contact Us</Link></li>
                <li><Link to="/orders" className="text-slate-500 hover:text-black transition-colors text-sm font-bold">Track Order</Link></li>
                <li><Link to="/faq" className="text-slate-500 hover:text-black transition-colors text-sm font-bold">Technical FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-urbanist text-[10px] font-black tracking-[0.3em] uppercase text-blue-600 mb-8">Legal & Policies</h4>
              <ul className="space-y-4">
                <li><Link to="/privacy-policy" className="text-slate-500 hover:text-black transition-colors text-sm font-bold">Privacy Policy</Link></li>
                <li><Link to="/terms-and-conditions" className="text-slate-500 hover:text-black transition-colors text-sm font-bold">Terms of Service</Link></li>
                <li><Link to="/return-policy" className="text-slate-500 hover:text-black transition-colors text-sm font-bold">Return Policy</Link></li>
                <li><Link to="/shipping-policy" className="text-slate-500 hover:text-black transition-colors text-sm font-bold">Shipping Policy</Link></li>
                <li><Link to="/cookie-policy" className="text-slate-500 hover:text-black transition-colors text-sm font-bold">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <h4 className="font-urbanist text-[10px] font-black tracking-[0.3em] uppercase text-blue-600 mb-8">Newsletter</h4>
            <p className="text-slate-500 text-xs font-bold mb-6 leading-relaxed">
              Subscribe to receive updates on pro tech drops and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-bold shadow-inner"
                />
                <button
                  disabled={loading}
                  className="absolute right-2 top-2 h-10 w-10 bg-black text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg shadow-black/10 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <ArrowUpRight size={18} />}
                </button>
              </div>
              <p className="text-[9px] text-slate-400 font-bold px-2 uppercase tracking-widest">NO SPAM. JUST PURE TECH.</p>
            </form>
          </div>
        </div>

        {/* Contact Row */}
        <div className="py-12 border-t border-gray-100 mb-12">
          <h4 className="font-urbanist text-[10px] font-black tracking-[0.3em] uppercase text-blue-600 mb-8">Contact Information</h4>
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16 text-slate-500 text-sm font-bold">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-blue-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">3014 Dauphine St Ste A PM3 357287, New Orleans, LA 70117, USA</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Mail size={18} className="text-blue-600 shrink-0" />
              <a href="mailto:info@primefixsolutions.co" className="hover:text-black transition-colors">info@primefixsolutions.co</a>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Phone size={18} className="text-blue-600 shrink-0" />
              <a href="tel:+14025089751" className="hover:text-black transition-colors">+1 (402) 508-9751</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8 text-[10px] font-black tracking-[0.2em] uppercase text-slate-400">
            <span>© 2026 PrimeFix Solutions LLC | All Rights Reserved.</span>
            <div className="hidden sm:flex items-center gap-2 border-l border-gray-200 pl-8">
              <Globe size={14} /> <span>INTL / EN-US</span>
            </div>
          </div>

          {/* Payment Partners */}
          <div className="flex items-center gap-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Secure Payment by</span>
            <div className="text-blue-600 italic font-black text-lg flex items-center gap-1">
              PayPal
            </div>
          </div>

          <div className="flex gap-10 text-[10px] font-black tracking-[0.2em] uppercase text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-blue-600" />
              <span>Verified Merchant</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}