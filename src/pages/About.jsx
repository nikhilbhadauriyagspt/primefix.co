import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Heart, Globe, Award, Users, ChevronRight, Laptop, Printer, Package, Wrench, Leaf, MapPin, Mail, Phone, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import banner1 from "@/assets/bannerr/banner1.jpg";

export default function About() {
  return (
    <div className="bg-white min-h-screen font-urbanist overflow-hidden">

      {/* Hero Section - Full Background */}
      <section className="relative h-[80vh] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={banner1}
            alt="About Prime Fix"
            className="w-full h-full object-cover grayscale opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>

        <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-12 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-8 bg-white/10 backdrop-blur-md w-fit px-4 py-2 rounded-2xl border border-white/10">
              <img src="/brands/hp.jpg" alt="HP" className="h-5 w-auto object-contain rounded" />
              <div className="h-4 w-px bg-white/20" />
              <span className="text-[15px] font-black text-blue-400 uppercase tracking-[0.3em]">Authorized HP Partner</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase mb-8">
              Redefining <br /> <span className="text-slate-400 italic">Technology.</span>
            </h1>

            <p className="text-slate-300 text-lg md:text-xl font-bold leading-relaxed max-w-xl border-l-4 border-blue-600 pl-8 mb-10">
              Headquartered in Louisiana, USA, Prime Fix Solutions is your trusted destination for authentic laptops, printers, and precision tech.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-2xl shadow-blue-600/20">
                Explore Catalog
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Standardized Section: Our Journey */}
      <section className="px-6 md:px-10 lg:px-12 py-24 bg-white">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex items-end justify-between mb-12 border-b border-gray-100 pb-8">
            <div>
              <span className="text-xl font-black tracking-[0.4em] uppercase text-blue-600 mb-2 block ml-1">Since 2026</span>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                Our <span className="text-slate-400 italic">Journey.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <p className="text-slate-500 text-lg font-bold leading-relaxed">
                Prime Fix Solutions was founded with a vision to redefine how customers experience technology. We saw a gap in the market — too many people struggled to find authentic, affordable, and dependable computing and printing solutions.
              </p>
              <p className="text-slate-400 font-bold text-base leading-relaxed">
                That’s why we partnered with HP, to bring customers a seamless and transparent shopping experience backed by expert service. Based in New Orleans, Louisiana, we've grown into a nationwide platform serving both professionals and home users.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                <h4 className="text-3xl font-black text-slate-900 mb-2">14K+</h4>
                <p className="text-xl font-black text-slate-400 uppercase tracking-widest">Active Members</p>
              </div>
              <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100">
                <h4 className="text-3xl font-black text-blue-600 mb-2">100%</h4>
                <p className="text-xl font-black text-slate-400 uppercase tracking-widest">Genuine Tech</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="px-6 md:px-10 lg:px-12 py-24 bg-slate-50/50">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex items-end justify-between mb-12 border-b border-gray-100 pb-8">
            <div>
              <span className="text-xl font-black tracking-[0.4em] uppercase text-blue-600 mb-2 block ml-1">What We Do</span>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                Specialized <span className="text-slate-400 italic">Services.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Laptop, title: "Laptops & Computers", desc: "High-performance systems for home, business, and professional use." },
              { icon: Printer, title: "Printers & Scanners", desc: "Inkjet, LaserJet, and All-in-One models tailored to every need." },
              { icon: Package, title: "Printing Supplies", desc: "Genuine HP ink, toner, and compatible consumables." },
              { icon: Zap, title: "Accessories", desc: "Keyboards, cables, and tools that enhance your workspace." },
              { icon: Globe, title: "Business Solutions", desc: "Managed print and device management for all company sizes." },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-10 rounded-[3rem] bg-white border border-gray-100 group transition-all hover:bg-white hover:border-blue-500/20 hover:shadow-xl shadow-blue-600/5"
              >
                <div className="h-14 w-14 rounded-2xl bg-gray-50 border border-gray-100 text-slate-900 flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">{item.title}</h3>
                <p className="text-slate-500 font-bold text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision - Standardized Cards */}
      <section className="px-6 md:px-10 lg:px-12 py-24 bg-white">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-12 md:p-16 rounded-[3.5rem] bg-blue-600 text-white space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
            <span className="text-xl font-black uppercase tracking-[0.4em] text-blue-200">Our Mission</span>
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">Empowering <br />Every Customer.</h3>
            <p className="text-blue-100 font-bold text-lg leading-relaxed ">
              To empower every customer with reliable, efficient, and sustainable technology solutions — through genuine products, expert advice, and a customer-first approach.
            </p>
          </div>
          <div className="p-12 md:p-16 rounded-[3.5rem] bg-slate-900 text-white space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full" />
            <span className="text-xl font-black uppercase tracking-[0.4em] text-slate-500">Our Vision</span>
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">United States <br />Tech Leader.</h3>
            <p className="text-slate-400 font-bold text-lg leading-relaxed ">
              To become a leading HP-partner e-commerce brand, known for delivering cutting-edge technology, unmatched service, and long-term value.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Standardized */}
      <section className="px-6 md:px-10 lg:px-12 py-24 bg-gray-50/50">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-gray-200 pb-12">
            <div>
              <span className="text-xl font-black text-blue-600 uppercase tracking-[0.4em] mb-4 block">The Prime Fix Edge</span>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                Why Choose <br /> <span className="text-slate-400 italic">Our Expertise.</span>
              </h2>
            </div>
            <p className="text-slate-500 font-bold text-lg max-w-sm">Official partners, expert guidance, and fast nationwide logistics.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              { title: "Authorized HP Partner", icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-50" },
              { title: "Multi-Brand Store", icon: Globe, color: "text-indigo-600", bg: "bg-indigo-50" },
              { title: "Expert Guidance", icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
              { title: "Fast Delivery", icon: Package, color: "text-emerald-600", bg: "bg-emerald-50" },
              { title: "Safe & Secure", icon: ShieldCheck, color: "text-slate-900", bg: "bg-slate-100" },
              { title: "Dedicated Care", icon: Heart, color: "text-rose-600", bg: "bg-rose-50" },
              { title: "Sustainability", icon: Leaf, color: "text-green-600", bg: "bg-green-50" },
              { title: "Professional Support", icon: Wrench, color: "text-purple-600", bg: "bg-purple-50" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-5 group">
                <div className={`h-12 w-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 shadow-sm border border-white transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}>
                  <item.icon size={22} strokeWidth={2.5} />
                </div>
                <h4 className="text-xl md:text-xs font-black text-slate-900 uppercase tracking-[0.15em] leading-tight group-hover:text-blue-600 transition-colors">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Standardized Hero Style */}
      <section className="px-6 md:px-10 lg:px-12 py-24 bg-white">
        <div className="max-w-[1920px] mx-auto">
          <div className="p-12 md:p-24 rounded-[4rem] bg-slate-900 text-white relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#3b82f6_0%,transparent_70%)] opacity-10" />
            <span className="text-xl font-black tracking-[0.4em] uppercase text-blue-400 mb-8 block relative z-10">Start Your Journey</span>
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-12 relative z-10 leading-none">
              Build Your <br /><span className="text-slate-500 italic">Ultimate Workflow.</span>
            </h2>
            <Link to="/shop" className="inline-flex items-center gap-4 px-12 py-6 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-2xl relative z-10">
              Start Browsing <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}