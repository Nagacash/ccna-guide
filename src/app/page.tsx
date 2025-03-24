import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const featureCardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="relative bg-blue-900 text-white py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Network background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/network-pattern.svg')] bg-repeat"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-orange-400">CCNA</span> Interactive Course
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Master networking concepts with hands-on labs, interactive visualizations, and a supportive community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/modules" className="block w-full sm:w-auto px-8 py-4 bg-yellow-500 hover:bg-cyan-400 text-white font-bold rounded-lg shadow-lg transition-colors">
                  Start Learning
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/labs" className="block w-full sm:w-auto px-8 py-4 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg transition-colors">
                  Explore Labs
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-16 md:py-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Interactive Learning Experience</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our CCNA course combines theory with practice through engaging visualizations and hands-on labs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden"
              variants={featureCardVariants}
              whileHover="hover"
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Interactive Labs</h3>
                <p className="text-gray-600">
                  Practice with real-world network scenarios using Packet Tracer simulations and guided exercises.
                </p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden"
              variants={featureCardVariants}
              whileHover="hover"
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Visual Learning</h3>
                <p className="text-gray-600">
                  Understand complex networking concepts through dynamic visualizations and animations.
                </p>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden"
              variants={featureCardVariants}
              whileHover="hover"
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Community Q&A</h3>
                <p className="text-gray-600">
                  Get help from peers and experts through our interactive Q&A board and discussion forums.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Course Modules Preview */}
      <motion.section 
        className="py-16 bg-gray-100"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Comprehensive Course Modules</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our curriculum covers all CCNA exam topics with structured learning paths.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Module 1 */}
            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="h-3 bg-blue-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Fundamentals</span>
                  <span className="text-sm text-gray-500">4 Labs</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Network Fundamentals</h3>
                <p className="text-gray-600 mb-4">
                  Learn about network types, components, topologies, and the OSI model.
                </p>
                <Link href="/modules/network-fundamentals" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                  Explore Module →
                </Link>
              </div>
            </motion.div>

            {/* Module 2 */}
            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="h-3 bg-cyan-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full">Configuration</span>
                  <span className="text-sm text-gray-500">6 Labs</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Routing & Switching</h3>
                <p className="text-gray-600 mb-4">
                  Master router and switch configuration, VLANs, and routing protocols.
                </p>
                <Link href="/modules/routing-switching" className="text-cyan-600 font-medium hover:text-cyan-700 transition-colors">
                  Explore Module →
                </Link>
              </div>
            </motion.div>

            {/* Module 3 */}
            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="h-3 bg-green-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">Security</span>
                  <span className="text-sm text-gray-500">5 Labs</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Network Security</h3>
                <p className="text-gray-600 mb-4">
                  Implement ACLs, port security, and device hardening techniques.
                </p>
                <Link href="/modules/network-security" className="text-green-600 font-medium hover:text-green-700 transition-colors">
                  Explore Module →
                </Link>
              </div>
            </motion.div>

            {/* Module 4 */}
            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="h-3 bg-purple-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">Advanced</span>
                  <span className="text-sm text-gray-500">3 Labs</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">IP Services</h3>
                <p className="text-gray-600 mb-4">
                  Configure DHCP, NAT, NTP, and other essential IP services.
                </p>
                <Link href="/modules/ip-services" className="text-purple-600 font-medium hover:text-purple-700 transition-colors">
                  Explore Module →
                </Link>
              </div>
            </motion.div>

            {/* Module 5 */}
            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="h-3 bg-orange-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">Wireless</span>
                  <span className="text-sm text-gray-500">2 Labs</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Wireless Networking</h3>
                <p className="text-gray-600 mb-4">
                  Learn wireless standards, security, and basic configuration.
                </p>
                <Link href="/modules/wireless-networking" className="text-orange-600 font-medium hover:text-orange-700 transition-colors">
                  Explore Module →
                </Link>
              </div>
            </motion.div>

            {/* View All Button */}
            <motion.div 
              className="flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-300 p-6"
              variants={itemVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <Link href="/modules" className="text-gray-700 font-medium hover:text-blue-600 transition-colors flex items-center">
                <span>View All Modules</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your CCNA Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students mastering networking skills through our interactive platform.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/register" className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-colors">
              Create Free Account
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
