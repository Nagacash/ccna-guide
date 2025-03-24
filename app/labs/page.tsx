"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import NetworkTopology from '../../src/components/interactive/NetworkTopology';
import CommandSimulator from '../../src/components/interactive/CommandSimulator';
import PacketAnimation from '../../src/components/interactive/PacketAnimation';
import QuizComponent from '../../src/components/interactive/QuizComponent';

// Sample quiz questions
const sampleQuestions = [
  {
    id: '1',
    question: 'Which layer of the OSI model is responsible for routing?',
    options: [
      'Physical Layer',
      'Data Link Layer',
      'Network Layer',
      'Transport Layer'
    ],
    correctAnswer: 2,
    explanation: 'The Network Layer (Layer 3) is responsible for routing packets between networks. It uses logical addressing (IP addresses) to determine the best path for data to travel.'
  },
  {
    id: '2',
    question: 'What protocol is used to automatically assign IP addresses to devices on a network?',
    options: [
      'HTTP',
      'DHCP',
      'DNS',
      'FTP'
    ],
    correctAnswer: 1,
    explanation: 'DHCP (Dynamic Host Configuration Protocol) is used to automatically assign IP addresses, subnet masks, default gateways, and other IP parameters to devices on a network.'
  },
  {
    id: '3',
    question: 'Which of the following is NOT a private IP address range?',
    options: [
      '10.0.0.0/8',
      '172.16.0.0/12',
      '192.168.0.0/16',
      '209.165.200.0/24'
    ],
    correctAnswer: 3,
    explanation: '209.165.200.0/24 is a public IP address range. The private IP address ranges are: 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16.'
  }
];

export default function LabsPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Interactive Labs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Practice your networking skills with our interactive labs and simulations. These hands-on exercises will help you master CCNA concepts.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 gap-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Network Topology Lab */}
            <motion.section 
              className="bg-white rounded-xl shadow-md overflow-hidden"
              variants={itemVariants}
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Network Topology Visualizer</h2>
                <p className="text-gray-600 mt-2">
                  Explore network topologies and understand how devices connect in a network environment.
                </p>
              </div>
              <div className="p-6">
                <NetworkTopology />
              </div>
            </motion.section>

            {/* Command Simulator Lab */}
            <motion.section 
              className="bg-white rounded-xl shadow-md overflow-hidden"
              variants={itemVariants}
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Cisco IOS Command Simulator</h2>
                <p className="text-gray-600 mt-2">
                  Practice Cisco IOS commands in a simulated environment. Try commands like 'enable', 'show run', or 'configure terminal'.
                </p>
              </div>
              <div className="p-6">
                <CommandSimulator />
              </div>
            </motion.section>

            {/* Packet Animation Lab */}
            <motion.section 
              className="bg-white rounded-xl shadow-md overflow-hidden"
              variants={itemVariants}
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Packet Flow Animation</h2>
                <p className="text-gray-600 mt-2">
                  Visualize how packets travel through a network and understand the encapsulation/decapsulation process.
                </p>
              </div>
              <div className="p-6">
                <PacketAnimation />
              </div>
            </motion.section>

            {/* Quiz Component */}
            <motion.section 
              className="bg-white rounded-xl shadow-md overflow-hidden"
              variants={itemVariants}
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">CCNA Practice Quiz</h2>
                <p className="text-gray-600 mt-2">
                  Test your knowledge with our interactive quizzes covering various CCNA topics.
                </p>
              </div>
              <div className="p-6">
                <QuizComponent questions={sampleQuestions} />
              </div>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
