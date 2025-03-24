import { motion } from 'framer-motion';
import Link from 'next/link';

interface LabCardProps {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  slug: string;
  index: number;
}

export default function LabCard({ 
  title, 
  description, 
  difficulty, 
  duration, 
  slug,
  index 
}: LabCardProps) {
  // Define difficulty badge styles
  const difficultyStyles = {
    beginner: "bg-green-50 text-green-600",
    intermediate: "bg-yellow-50 text-yellow-600",
    advanced: "bg-red-50 text-red-600"
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.2 } 
      }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`text-sm font-semibold ${difficultyStyles[difficulty]} px-3 py-1 rounded-full`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
          <span className="text-sm text-gray-500 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {duration}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-4">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <Link href={`/labs/${slug}`} className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
            Start Lab →
          </Link>
          <motion.button
            className="text-gray-500 hover:text-gray-700 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
