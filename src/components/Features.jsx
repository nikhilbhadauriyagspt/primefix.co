import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Official Warranty",
    desc: "Auth coverage",
    bgColor: "bg-blue-50/50",
    iconColor: "text-blue-600",
    borderColor: "hover:border-blue-200"
  },
  {
    icon: Truck,
    title: "Express Delivery",
    desc: "24h shipping",
    bgColor: "bg-emerald-50/50",
    iconColor: "text-emerald-600",
    borderColor: "hover:border-emerald-200"
  },
  {
    icon: RotateCcw,
    title: "7-Day Returns",
    desc: "Return window",
    bgColor: "bg-purple-50/50",
    iconColor: "text-purple-600",
    borderColor: "hover:border-purple-200"
  }
];

export default function Features() {
  return (
    <section className="bg-white font-urbanist py-4 md:py-6">
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 md:gap-4 p-4 rounded-2xl border border-transparent ${item.bgColor} ${item.borderColor} transition-all duration-300 group cursor-default`}
            >
              <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${item.iconColor}`}>
                <item.icon size={16} md:size={20} strokeWidth={2.5} />
              </div>
              
              <div className="flex flex-col">
                <h3 className="text-xs md:text-sm font-black text-slate-900 leading-tight">
                  {item.title}
                </h3>
                <p className="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-[0.1em] mt-0.5">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}