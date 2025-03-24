"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ResourcesPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const resources = [
    {
      title: "Official Cisco Documentation",
      description: "Access official Cisco documentation, configuration guides, and best practices.",
      link: "https://www.cisco.com/c/en/us/support/index.html",
      category: "Documentation"
    },
    {
      title: "Packet Tracer",
      description: "Download Cisco Packet Tracer for network simulation and practice.",
      link: "https://www.netacad.com/courses/packet-tracer",
      category: "Tools"
    },
    {
      title: "Command Reference",
      description: "Comprehensive list of Cisco IOS commands for routers and switches.",
      link: "https://www.networkstraining.com/cisco-router-configuration-commands-cheat-sheet/",
      category: "Reference"
    },
    {
      title: "CCNA Study Guide",
      description: "Downloadable study guide covering all CCNA exam topics.",
      link: "#",
      category: "Study Materials"
    },
    {
      title: "Network Topology Templates",
      description: "Ready-to-use network topology templates for lab exercises.",
      link: "https://ipcisco.com/cisco-packet-tracer-configuration-examples/",
      category: "Templates"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video tutorials for complex networking concepts.",
      link: "https://www.youtube.com/watch?v=H8W9oMNSuwo&list=PLxbwE86jKRgMpuZuLBivzlM8s2Dk5lXBQ",
      category: "Tutorials"
    }
  ];

  const categories = [...new Set(resources.map(resource => resource.category))];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-blue-900 mb-8">Resources</h1>
        <p className="text-gray-600 mb-12">
          Access a comprehensive collection of resources to support your CCNA certification journey. 
          From official documentation to practice tools and study materials, everything you need is here.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {categories.map((category, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="bg-blue-900 text-white py-3 px-4">
                <h2 className="text-xl font-semibold">{category}</h2>
              </div>
              <div className="p-4 space-y-4">
                {resources.filter(resource => resource.category === category).map((resource, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <h3 className="text-lg font-medium text-blue-800 mb-1">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{resource.description}</p>
                    <a 
                      href={resource.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cyan-600 hover:text-cyan-800 text-sm font-medium inline-flex items-center"
                    >
                      Access Resource
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Request Additional Resources</h2>
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for? Let us know what resources would help you in your CCNA journey.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
