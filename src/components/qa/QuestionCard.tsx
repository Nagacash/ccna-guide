import { motion } from 'framer-motion';
import Link from 'next/link';

interface QuestionCardProps {
  title: string;
  content: string;
  author: string;
  date: string;
  votes: number;
  answers: number;
  tags: string[];
  id: string;
  index: number;
}

export default function QuestionCard({ 
  title, 
  content, 
  author, 
  date, 
  votes, 
  answers, 
  tags,
  id,
  index 
}: QuestionCardProps) {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="p-5">
        <Link href={`/qa-board/question/${id}`}>
          <h3 className="text-lg font-semibold mb-2 text-gray-800 hover:text-blue-600 transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {content}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, i) => (
            <span 
              key={i} 
              className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center text-gray-500">
            <span>Posted by {author}</span>
            <span className="mx-2">•</span>
            <span>{date}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              <span>{votes}</span>
            </div>
            
            <div className="flex items-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span>{answers}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
