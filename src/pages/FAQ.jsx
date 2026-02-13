import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Search, MessageCircle, Mail, Phone, Plus, Minus } from 'lucide-react';

const faqData = [
  {
    category: "Orders & Purchasing",
    questions: [
      { q: "How do I place an order on Prime Fix Solutions?", a: "Simply browse our products, add your items to the cart, and complete the checkout using your preferred payment method." },
      { q: "Do I need an account to purchase?", a: "No. You can checkout as a guest. However, creating an account helps you track orders and access your purchase history." },
      { q: "How can I check my order status?", a: "Log into your account and visit My Orders to view real-time updates. You will also receive email notifications." },
      { q: "Can I modify or cancel my order after placing it?", a: "Orders can be modified or canceled before shipping. Once the item is dispatched, cancellations aren’t possible." },
      { q: "What payment methods do you accept?", a: "We accept major credit/debit cards (Visa, Mastercard), PayPal, and other secure digital payment options." },
      { q: "Is shopping on Prime Fix Solutions secure?", a: "Yes. All transactions are encrypted and processed through verified, PCI-compliant payment networks including PayPal Secure." }
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      { q: "What are your shipping options?", a: "We offer standard and expedited shipping across the USA, depending on your location." },
      { q: "Do you deliver nationwide?", a: "Yes, we ship to all 50 states, including business addresses." },
      { q: "How long does delivery take?", a: "Delivery typically takes 3–7 business days, based on your region and order volume." },
      { q: "How much does shipping cost?", a: "Shipping charges vary by product weight, location, and delivery speed. Final charges appear at checkout." },
      { q: "Will I receive a tracking number?", a: "Yes. You’ll receive a tracking link via email as soon as your order ships." },
      { q: "What if my order is delayed?", a: "You can use your tracking link or contact our support team for an immediate update." }
    ]
  },
  {
    category: "Products & Availability",
    questions: [
      { q: "Are your products genuine and covered under warranty?", a: "Yes. All products are 100% genuine and come with an official manufacturer's warranty." },
      { q: "Do you sell only HP products or other brands too?", a: "We are an Authorized HP Partner, but we also sell laptops, printers, and accessories from other trusted brands." },
      { q: "How can I choose the right laptop or printer?", a: "You can contact our expert support for personalized buying recommendations based on your usage and budget." },
      { q: "What if an item is out of stock?", a: "You can join the Back in Stock alert on the product page, and we’ll notify you as soon as it becomes available." },
      { q: "Can I compare products before buying?", a: "Yes. Use our Compare feature to check specs, features, and pricing side by side." }
    ]
  },
  {
    category: "Warranty & Support",
    questions: [
      { q: "Do your products come with a manufacturer's warranty?", a: "Yes. Every product includes full brand-backed warranty with repair/replacement coverage." },
      { q: "How do I claim warranty for HP products?", a: "You can contact HP Support directly or reach out to us for guidance and warranty assistance." },
      { q: "What if my laptop or printer arrives damaged?", a: "Contact us within 48 hours with photos/videos. We’ll arrange a replacement or initiate a claim." },
      { q: "Do you provide technical support?", a: "Yes. We offer setup help, troubleshooting, installation support, and product-related guidance." },
      { q: "How do I contact customer support?", a: "You can reach us via email, chat, or our contact form. Support is available 7 days a week." }
    ]
  },
  {
    category: "Returns, Refunds & Replacements",
    questions: [
      { q: "What is your return policy?", a: "We accept returns for eligible products within 7–14 days of delivery, depending on the item category." },
      { q: "How do I request a return or replacement?", a: "Submit a request through your My Orders section or contact our support team." },
      { q: "How long does a refund take?", a: "Refunds are processed within 5–7 business days after inspection." },
      { q: "What products are eligible for return?", a: "Products must be unused, in original condition, and returned with complete accessories and packaging." },
      { q: "What if my item is defective or missing parts?", a: "Report the issue within 48 hours, and we will arrange a replacement or resolve the issue immediately." }
    ]
  },
  {
    category: "Account & Profile",
    questions: [
      { q: "How do I create an account?", a: "Click Sign Up, enter your details, and verify your email." },
      { q: "I forgot my password — what should I do?", a: "Use the Forgot Password option to reset it instantly via email." },
      { q: "How can I update my profile details?", a: "Go to My Account → Profile Info to edit your name, address, phone number, etc." },
      { q: "Can I view my past orders?", a: "Yes. All previous orders are listed in your Order History." }
    ]
  },
  {
    category: "Laptop & Computer FAQs",
    questions: [
      { q: "Do laptops come with pre-installed software?", a: "Most laptops come with Windows OS pre-installed. Additional software depends on the brand and model." },
      { q: "Can I upgrade RAM or storage?", a: "Yes, many models support upgrades. Contact our support to confirm compatibility." },
      { q: "Do you offer setup or installation help?", a: "Yes. We help with initial setup, OS updates, driver installation, and data transfer." },
      { q: "What should I do if my laptop feels slow?", a: "We recommend checking storage space, updating software, or contacting support for optimization help." }
    ]
  },
  {
    category: "Printer & Ink FAQs",
    questions: [
      { q: "How do I choose the right printer?", a: "Consider your usage — home, office, photos, or bulk printing — and our team can recommend the best match." },
      { q: "Do you sell original HP ink and toner?", a: "Yes. We sell 100% original HP ink and toner, plus compatible options for other brands." },
      { q: "Why is my printer showing “Offline”?", a: "This usually indicates a driver issue or Wi-Fi interruption. Our support team can fix this quickly." },
      { q: "How do I improve print quality?", a: "Try cleaning printheads, using genuine supplies, adjusting paper settings, or contacting support." }
    ]
  },
  {
    category: "Payment, Billing & Security",
    questions: [
      { q: "Is my payment information secure?", a: "Yes. All payments are encrypted and processed through secure, trusted gateways." },
      { q: "Why was my payment declined?", a: "This could be due to bank restrictions, incorrect details, or insufficient balance. Try again or check with your bank." },
      { q: "Do you store my billing information?", a: "No. Sensitive information is never stored — it’s processed securely by our payment partners." },
      { q: "Can I get a tax/GST invoice?", a: "Yes. You can download your invoice directly from the My Orders section." }
    ]
  },
  {
    category: "Business & Bulk Orders",
    questions: [
      { q: "Do you offer corporate or bulk discounts?", a: "Yes. Contact us for custom pricing on large orders." },
      { q: "Can businesses request custom quotes?", a: "Absolutely. Our team provides quotes for offices, institutions, and resellers." },
      { q: "Do you offer managed printing or device solutions?", a: "Yes. We support businesses with printer fleet management and bulk supply programs." }
    ]
  },
  {
    category: "General & Contact Information",
    questions: [
      { q: "Are all products brand new and sealed?", a: "Yes. Every product is brand new, sealed, and delivered with full warranty." },
      { q: "Do you offer customer support on weekends?", a: "Yes. Our support team is available 7 days a week." },
      { q: "How can I contact Prime Fix Solutions?", a: "You can reach us through email, live chat, or the contact form on our website." },
      { q: "Do you offer discount codes or promotions?", a: "Yes. Keep an eye on our homepage banners and newsletter for active offers." }
    ]
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(faqData[0].category);
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = faqData.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q => 
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50/50 pt-32 pb-20 font-urbanist">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            <HelpCircle size={14} /> Help Center
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-8">
            Frequently <span className="text-slate-400 italic">Asked Questions.</span>
          </h1>
          
          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="SEARCH FOR ANSWERS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 pl-16 pr-6 bg-white border border-gray-100 rounded-[2rem] shadow-xl shadow-gray-200/20 focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-2">
            <div className="sticky top-40 space-y-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-4 mb-4 block">Categories</span>
              {faqData.map((cat) => (
                <button
                  key={cat.category}
                  onClick={() => {
                    setActiveCategory(cat.category);
                    setOpenIndex(0);
                  }}
                  className={`w-full text-left px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                    activeCategory === cat.category 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 translate-x-2' 
                    : 'text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm'
                  }`}
                >
                  {cat.category}
                </button>
              ))}

              {/* Contact Card */}
              <div className="mt-12 p-8 bg-slate-900 rounded-[2.5rem] text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 blur-3xl rounded-full" />
                <h4 className="text-lg font-black uppercase tracking-tight mb-2">Still need help?</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">Our team is available to assist</p>
                <div className="space-y-4">
                  <a href="mailto:support@primefix.co" className="flex items-center gap-4 text-xs font-bold hover:text-blue-400 transition-colors">
                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center"><Mail size={16} /></div>
                    support@primefix.co
                  </a>
                  <a href="tel:+1234567890" className="flex items-center gap-4 text-xs font-bold hover:text-blue-400 transition-colors">
                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center"><Phone size={16} /></div>
                    +1 (800) PRIME-FIX
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-8 border-b border-gray-200 pb-6">
                  {activeCategory}
                </h3>
                
                {filteredData.find(c => c.category === activeCategory)?.questions.map((faq, idx) => (
                  <div 
                    key={idx}
                    className={`bg-white rounded-[2rem] border transition-all duration-500 overflow-hidden ${
                      openIndex === idx ? 'border-blue-600 shadow-xl shadow-blue-600/5' : 'border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                      className="w-full px-8 py-8 flex items-center justify-between text-left"
                    >
                      <span className={`text-sm md:text-base font-black uppercase tracking-tight leading-snug pr-8 ${
                        openIndex === idx ? 'text-blue-600' : 'text-slate-900'
                      }`}>
                        {faq.q}
                      </span>
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        openIndex === idx ? 'bg-blue-600 text-white rotate-180' : 'bg-gray-50 text-slate-400 hover:bg-slate-900 hover:text-white'
                      }`}>
                        {openIndex === idx ? <Minus size={18} /> : <Plus size={18} />}
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {openIndex === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "circOut" }}
                        >
                          <div className="px-8 pb-8">
                            <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                              <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                                {faq.a}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {filteredData.length === 0 && (
                  <div className="py-20 text-center bg-white rounded-[3rem] border border-gray-100">
                    <Search size={40} className="text-gray-200 mx-auto mb-6" />
                    <h4 className="text-lg font-black text-slate-900 uppercase">No matches found</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Try searching with different keywords</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
