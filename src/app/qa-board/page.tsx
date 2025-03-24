"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Sample questions for the Q&A board
const sampleQuestions = [
  {
    id: '1',
    title: 'How do I calculate subnet masks?',
    author: 'NetworkNewbie',
    date: '2 days ago',
    content: 'I\'m struggling with understanding subnet mask calculations. Can someone explain the process of subnetting a network into multiple smaller networks?',
    tags: ['Subnetting', 'IP Addressing', 'Fundamentals'],
    replies: 3,
    views: 42
  },
  {
    id: '2',
    title: 'Difference between OSPF and EIGRP?',
    author: 'RouterPro',
    date: '1 week ago',
    content: 'I\'m preparing for my CCNA exam and I\'m confused about the differences between OSPF and EIGRP routing protocols. Can someone explain the key differences and when to use each?',
    tags: ['Routing', 'OSPF', 'EIGRP'],
    replies: 5,
    views: 87
  },
  {
    id: '3',
    title: 'VLANs not communicating across trunk',
    author: 'SwitchMaster',
    date: '3 days ago',
    content: 'I\'ve set up VLANs on my switches and configured a trunk port between them, but devices in the same VLAN on different switches can\'t communicate. What am I missing?',
    tags: ['VLANs', 'Switching', 'Trunking'],
    replies: 8,
    views: 103
  },
  {
    id: '4',
    title: 'ACL configuration best practices',
    author: 'SecurityFocus',
    date: '5 days ago',
    content: 'I need to implement access control lists on our network. What are some best practices for ACL configuration and placement?',
    tags: ['Security', 'ACLs', 'Configuration'],
    replies: 4,
    views: 76
  },
  {
    id: '5',
    title: 'Wireless signal interference issues',
    author: 'WifiWizard',
    date: '1 day ago',
    content: 'Our office wireless network is experiencing intermittent connectivity issues. I suspect interference but I\'m not sure how to troubleshoot. Any suggestions?',
    tags: ['Wireless', 'Troubleshooting', 'Interference'],
    replies: 2,
    views: 31
  }
];

export default function QABoardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  
  // All unique tags from questions
  const allTags = Array.from(
    new Set(
      sampleQuestions.flatMap(q => q.tags)
    )
  ).sort();
  
  // Filter questions based on search query and selected tags
  const filteredQuestions = sampleQuestions.filter(question => {
    const matchesSearch = searchQuery === '' || 
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => question.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });
  
  // Toggle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Q&A Community Board</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ask questions, share knowledge, and connect with other CCNA students and professionals.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {selectedQuestion ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Question Detail View */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedQuestion.title}</h2>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>Posted by {selectedQuestion.author}</span>
                        <span className="mx-2">•</span>
                        <span>{selectedQuestion.date}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedQuestion(null)}
                      className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Back to Questions
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-gray-700">{selectedQuestion.content}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedQuestion.tags.map((tag: string) => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Responses ({selectedQuestion.replies})</h3>
                    
                    {/* Sample responses */}
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                              C
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">CiscoExpert</p>
                              <p className="text-xs text-gray-500">2 days ago</p>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            12
                          </div>
                        </div>
                        <p className="text-gray-700">This is a sample response to your question. In a real implementation, this would be populated with actual user responses from a database.</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                              N
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">NetworkPro</p>
                              <p className="text-xs text-gray-500">1 day ago</p>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            8
                          </div>
                        </div>
                        <p className="text-gray-700">Another sample response to demonstrate how the Q&A board would look with multiple responses.</p>
                      </div>
                    </div>
                    
                    {/* Add response form */}
                    <div className="mt-8">
                      <h4 className="text-lg font-medium text-gray-800 mb-4">Add Your Response</h4>
                      <textarea 
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        rows={4}
                        placeholder="Type your response here..."
                      ></textarea>
                      <div className="mt-4 flex justify-end">
                        <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                          Submit Response
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Search and Filter */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow">
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Search questions..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="absolute left-3 top-2.5 text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        Ask a Question
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map(tag => (
                        <button
                          key={tag}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            selectedTags.includes(tag)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Questions List */}
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map(question => (
                    <motion.div 
                      key={question.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 cursor-pointer"
                      variants={itemVariants}
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                      onClick={() => setSelectedQuestion(question)}
                    >
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-gray-800">{question.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <span>Posted by {question.author}</span>
                          <span className="mx-2">•</span>
                          <span>{question.date}</span>
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-2">{question.content}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {question.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            {question.replies} Replies
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {question.views} Views
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No questions found</h3>
                    <p className="text-gray-600">
                      Try adjusting your search or filter criteria, or ask a new question.
                    </p>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
