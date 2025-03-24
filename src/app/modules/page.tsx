"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { ChevronRight } from 'lucide-react';

type ModuleColor = 'blue' | 'cyan' | 'green' | 'purple' | 'orange';

type Module = {
  id: string;
  title: string;
  category: string;
  labCount: number;
  description: string;
  color: ModuleColor;
  content: string;
};

const colorMap: Record<ModuleColor, { 
  bg: string;
  text: string;
  border: string;
  topBar: string;
}> = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-600',
    topBar: 'bg-blue-600'
  },
  cyan: {
    bg: 'bg-cyan-50',
    text: 'text-cyan-600',
    border: 'border-cyan-600',
    topBar: 'bg-cyan-600'
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    border: 'border-green-600',
    topBar: 'bg-green-600'
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    border: 'border-purple-600',
    topBar: 'bg-purple-600'
  },
  orange: {
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    border: 'border-orange-600',
    topBar: 'bg-orange-600'
  }
};

const modules: Module[] = [
  // ... your module data (same as before)
];

function cn(...classes: Array<string | Record<string, boolean> | undefined | null>): string {
  return classes
    .flatMap(cls => {
      if (!cls) return [];
      if (typeof cls === 'string') return cls;
      return Object.entries(cls)
        .filter(([_, value]) => value)
        .map(([key]) => key);
    })
    .join(' ');
}

export default function ModulesPage() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    if (typeof window !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = `
        :root {
          --background: #ffffff;
          --foreground: #171717;
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --background: #0a0a0a;
            --foreground: #ededed;
          }
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  if (!isClient) {
    return <div className="min-h-screen bg-gray-50"></div>; // Loading state
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              CCNA Course Modules
            </h1>
            <p className="text-xl text-gray-600">
              Explore our comprehensive CCNA curriculum with interactive lessons
              and hands-on labs.
            </p>
          </motion.div>

          {selectedModule ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <div className={`h-3 ${colorMap[selectedModule.color].topBar}`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={cn(
                      "text-sm font-semibold px-3 py-1 rounded-full",
                      colorMap[selectedModule.color].text,
                      colorMap[selectedModule.color].bg
                    )}>
                      {selectedModule.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {selectedModule.labCount} Labs
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">
                    {selectedModule.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {selectedModule.description}
                  </p>
                  <button
                    onClick={() => setSelectedModule(null)}
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center"
                  >
                    <ChevronRight className="h-5 w-5 mr-2 rotate-180" />
                    Back to All Modules
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
                <div className="prose max-w-none">
                  <ReactMarkdown>{selectedModule.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {modules.map((module) => {
                const colors = colorMap[module.color];
                return (
                  <motion.div
                    key={module.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden border cursor-pointer h-full flex flex-col transition-shadow hover:shadow-lg"
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    onClick={() => setSelectedModule(module)}
                  >
                    <div className={`h-3 ${colors.topBar}`}></div>
                    <div className="p-6 flex-grow">
                      <div className="flex items-center justify-between mb-4">
                        <span className={cn(
                          "text-sm font-semibold px-3 py-1 rounded-full",
                          colors.text,
                          colors.bg,
                          colors.border
                        )}>
                          {module.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {module.labCount} Labs
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800">
                        {module.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{module.description}</p>
                    </div>
                    <div className="p-6 pt-0">
                      <div className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center">
                        Explore Module
                        <ChevronRight className="h-5 w-5 ml-2" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}