import { motion } from 'framer-motion';
import Link from 'next/link';

interface ModuleCardProps {
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  labCount: number;
  slug: string;
  index: number;
}

export default function ModuleCard({ 
  title, 
  description, 
  category, 
  categoryColor, 
  labCount, 
  slug,
  index 
}: ModuleCardProps) {
  // Define color classes based on categoryColor
  const colorClasses = {
    blue: {
      border: "bg-blue-600",
      badge: "text-blue-600 bg-blue-50",
      link: "text-blue-600 hover:text-blue-700"
    },
    cyan: {
      border: "bg-cyan-600",
      badge: "text-cyan-600 bg-cyan-50",
      link: "text-cyan-600 hover:text-cyan-700"
    },
    green: {
      border: "bg-green-600",
      badge: "text-green-600 bg-green-50",
      link: "text-green-600 hover:text-green-700"
    },
    purple: {
      border: "bg-purple-600",
      badge: "text-purple-600 bg-purple-50",
      link: "text-purple-600 hover:text-purple-700"
    },
    orange: {
      border: "bg-orange-600",
      badge: "text-orange-600 bg-orange-50",
      link: "text-orange-600 hover:text-orange-700"
    },
    red: {
      border: "bg-red-600",
      badge: "text-red-600 bg-red-50",
      link: "text-red-600 hover:text-red-700"
    }
  };

  const colors = colorClasses[categoryColor as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className={`h-3 ${colors.border}`}></div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`text-sm font-semibold ${colors.badge} px-3 py-1 rounded-full`}>
            {category}
          </span>
          <span className="text-sm text-gray-500">{labCount} Labs</span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-4">
          {description}
        </p>
        <Link href={`/modules/${slug}`} className={`${colors.link} font-medium transition-colors`}>
          Explore Module →
        </Link>
      </div>
    </motion.div>
  );
}
