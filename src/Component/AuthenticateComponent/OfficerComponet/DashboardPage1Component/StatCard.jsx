import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* 🎨 Pure solid gradients */
const gradients = {
  assigned: "bg-gradient-to-br from-blue-600 to-indigo-700",
  in_progress: "bg-gradient-to-br from-amber-500 to-orange-600",
  resolved: "bg-gradient-to-br from-green-600 to-emerald-700",
  rejected: "bg-gradient-to-br from-red-600 to-rose-700",
  overdue: "bg-gradient-to-br from-purple-600 to-fuchsia-700",
};


const StatCard = ({
  title,
  count,
  icon: Icon,
  type,
  onClick,
  wave = "up",
  delay = 0,
}) => {
  const yAnim = wave === "up" ? [0, -6, 0] : [0, 6, 0];
console.log(type)
  return (
    <motion.div
      onClick={onClick}
      animate={{ y: yAnim }}   // ✅ ONLY movement, NO opacity
      transition={{
        duration: 1.6,
        delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
      className={`
        relative p-6 rounded-2xl
        flex flex-col items-center
        cursor-pointer
        hover:-translate-y-1
        transition-transform
        ${gradients[type]}
      `}
    >
      {/* Icon – SOLID */}
      <div className="p-4 rounded-xl bg-transparent mb-4">
        {Icon && <Icon size={28} className="text-white" />}
      </div>

      {/* Title */}
      <p className="text-[11px] font-extrabold text-white uppercase tracking-widest mb-1">
        {title}
      </p>

      {/* Count */}
      <h3 className="text-3xl font-black text-white">
        {count ?? 0}
      </h3>

      {/* Arrow – SOLID */}
      <div className="absolute bottom-4 right-4">
        <ArrowRight size={16} className="text-white" />
      </div>
    </motion.div>
  );
};

export default StatCard;