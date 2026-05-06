import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";

interface ServiceCategoryCardProps {
  title: string;
  image: string;
  count: number;
  slug: string;
  delay?: number;
  onSelect?: (category: string) => void;
  startingPrice?: number;
  badgePosition?: "left" | "right";
}

export default function ServiceCategoryCard({ title, image, count, slug, delay = 0, onSelect, startingPrice = 299, badgePosition = "left" }: ServiceCategoryCardProps) {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    onSelect?.(slug);
    setLocation(`/services?category=${slug}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
      className="group cursor-pointer relative overflow-hidden rounded-xl aspect-[4/5] md:aspect-[3/4]"
      data-testid={`card-category-${slug}`}
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
      <img 
        src={image} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      
      {/* Top Badges */}
      <div className={`absolute top-3 ${badgePosition === "right" ? "right-3" : "left-3"} flex flex-col gap-1.5 z-20`}>
        <div className="bg-green-500/90 text-white px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-lg">✅ Available</div>
        <div className="bg-blue-500/90 text-white px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-lg">From ₹{startingPrice}</div>
      </div>

      {/* Category Name - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
        <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
          <h3 className="font-bold text-lg mb-1 leading-tight">{title}</h3>
          <p className="text-white/80 text-xs mb-2">{count}+ Professionals</p>
          
          <div className="flex items-center gap-2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-secondary">
            Explore <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
