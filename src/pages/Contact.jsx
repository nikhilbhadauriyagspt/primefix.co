import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, ShieldCheck, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import API_BASE_URL from '../config';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 font-urbanist overflow-hidden">
      
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-24">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <MessageCircle size={14} /> Contact Hub
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase mb-8">
            Get in <br /> <span className="text-slate-400 italic">Touch.</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg font-bold leading-relaxed max-w-lg">
            Have questions about our HP products or need technical support? Our expert team is ready to help you optimize your workflow.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 group transition-all hover:bg-white hover:border-blue-500/20 hover:shadow-xl shadow-blue-600/5">
              <div className="h-12 w-12 rounded-2xl bg-white border border-gray-100 text-blue-600 flex items-center justify-center mb-6 shadow-sm">
                <Mail size={20} />
              </div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Email Support</h4>
              <p className="text-sm font-black text-slate-900 uppercase">support@primefix.co</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Quick Response Time</p>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 group transition-all hover:bg-white hover:border-blue-500/20 hover:shadow-xl shadow-blue-600/5">
              <div className="h-12 w-12 rounded-2xl bg-white border border-gray-100 text-emerald-600 flex items-center justify-center mb-6 shadow-sm">
                <Phone size={20} />
              </div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Call Center</h4>
              <p className="text-sm font-black text-slate-900 uppercase">+1 (800) PRIME-FIX</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Mon-Fri, 9am - 6pm EST</p>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 group transition-all hover:bg-white hover:border-blue-500/20 hover:shadow-xl shadow-blue-600/5">
              <div className="h-12 w-12 rounded-2xl bg-white border border-gray-100 text-slate-900 flex items-center justify-center mb-6 shadow-sm">
                <MapPin size={20} />
              </div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Headquarters</h4>
              <p className="text-sm font-black text-slate-900 uppercase">3014 Dauphine St Ste A PM3 357287</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">New Orleans, LA 70117, USA</p>
            </div>

            {/* Quick Trust Card */}
            <div className="p-10 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 blur-3xl rounded-full" />
              <img src="/brands/hp.jpg" alt="HP" className="h-10 w-auto object-contain rounded-xl mb-6 brightness-110" />
              <h4 className="text-lg font-black uppercase tracking-tight mb-2">HP Authorized</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Verified support & genuine parts guaranteed.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[3.5rem] border border-gray-100 p-8 md:p-16 shadow-2xl shadow-gray-200/20">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="h-20 w-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">Message Sent!</h2>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-10">We have received your inquiry. A technical expert will contact you shortly.</p>
                  <button onClick={() => setStatus(null)} className="px-10 py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-all">Send Another</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="EX. JOHN DOE"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full h-16 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="NAME@COMPANY.COM"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full h-16 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="+1 (000) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full h-16 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Subject</label>
                      <select 
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full h-16 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all appearance-none cursor-pointer"
                      >
                        <option>General Inquiry</option>
                        <option>Technical Support</option>
                        <option>Order Status</option>
                        <option>Bulk Orders</option>
                        <option>Warranty Claim</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Your Message</label>
                    <textarea 
                      required
                      rows="5"
                      placeholder="HOW CAN WE ASSIST YOU TODAY?"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full p-6 bg-gray-50 border border-gray-100 rounded-[2rem] focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all resize-none"
                    ></textarea>
                  </div>

                  <button 
                    disabled={loading}
                    className="w-full h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.3em] hover:bg-slate-900 transition-all shadow-2xl shadow-blue-600/20"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <><Send size={18} /> Send Intelligence</>}
                  </button>
                  {status === 'error' && <p className="text-center text-red-500 text-[10px] font-black uppercase">Failed to send message. Please try again.</p>}
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
