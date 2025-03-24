"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

interface PacketAnimationProps {
  networkType?: 'simple' | 'complex';
  animationSpeed?: 'slow' | 'medium' | 'fast';
  showLabels?: boolean;
}

export default function PacketAnimation({
  networkType = 'simple',
  animationSpeed = 'medium',
  showLabels = true
}: PacketAnimationProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Animation speed in milliseconds
  const speeds = {
    slow: 2000,
    medium: 1000,
    fast: 500
  };
  
  // Network elements based on type
  const networks = {
    simple: {
      nodes: [
        { id: 'pc1', type: 'pc', x: 100, y: 150, label: 'PC-A' },
        { id: 'router1', type: 'router', x: 300, y: 150, label: 'Router' },
        { id: 'pc2', type: 'pc', x: 500, y: 150, label: 'PC-B' }
      ],
      steps: [
        { description: "PC-A creates a packet with source IP 192.168.1.10 and destination IP 192.168.2.10" },
        { description: "PC-A encapsulates the packet with Ethernet frame (adds MAC addresses)" },
        { description: "PC-A sends the frame to the default gateway (Router)" },
        { description: "Router receives the frame and removes the Ethernet header" },
        { description: "Router checks routing table to determine next hop" },
        { description: "Router encapsulates the packet with new Ethernet frame for PC-B" },
        { description: "Router forwards the frame to PC-B" },
        { description: "PC-B receives the frame and processes the packet" }
      ]
    },
    complex: {
      nodes: [
        { id: 'pc1', type: 'pc', x: 100, y: 100, label: 'PC-A' },
        { id: 'switch1', type: 'switch', x: 250, y: 100, label: 'Switch-1' },
        { id: 'router1', type: 'router', x: 400, y: 100, label: 'Router-1' },
        { id: 'router2', type: 'router', x: 550, y: 100, label: 'Router-2' },
        { id: 'switch2', type: 'switch', x: 700, y: 100, label: 'Switch-2' },
        { id: 'pc2', type: 'pc', x: 850, y: 100, label: 'PC-B' }
      ],
      steps: [
        { description: "PC-A creates a packet with source IP 192.168.1.10 and destination IP 10.0.0.10" },
        { description: "PC-A encapsulates the packet with Ethernet frame (adds MAC addresses)" },
        { description: "PC-A sends the frame to Switch-1" },
        { description: "Switch-1 forwards the frame to Router-1 (default gateway)" },
        { description: "Router-1 receives the frame and removes the Ethernet header" },
        { description: "Router-1 checks routing table and determines next hop is Router-2" },
        { description: "Router-1 encapsulates the packet with new Ethernet frame for Router-2" },
        { description: "Router-1 forwards the frame to Router-2" },
        { description: "Router-2 receives the frame and removes the Ethernet header" },
        { description: "Router-2 checks routing table and determines destination network" },
        { description: "Router-2 encapsulates the packet with new Ethernet frame for PC-B" },
        { description: "Router-2 forwards the frame to Switch-2" },
        { description: "Switch-2 forwards the frame to PC-B" },
        { description: "PC-B receives the frame and processes the packet" }
      ]
    }
  };
  
  // Get current network configuration
  const network = networks[networkType];
  const totalSteps = network.steps.length;
  
  // Device icons based on type
  const deviceIcons = {
    router: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <rect x="2" y="6" width="20" height="12" rx="2" fill="#3B82F6" />
        <path d="M6 10h2m4 0h2m4 0h2" stroke="white" strokeWidth="1.5" />
        <path d="M4 14h16" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
    switch: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <rect x="2" y="6" width="20" height="12" rx="2" fill="#10B981" />
        <path d="M6 12h12" stroke="white" strokeWidth="1.5" />
        <path d="M8 9v6m4-6v6m4-6v6" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
    pc: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <rect x="4" y="4" width="16" height="12" rx="1" fill="#6366F1" />
        <rect x="7" y="16" width="10" height="4" fill="#6366F1" />
        <rect x="5" y="6" width="14" height="8" fill="#E0E7FF" />
      </svg>
    )
  };
  
  // Calculate packet position for current step
  const calculatePacketPosition = () => {
    const { nodes } = network;
    
    if (networkType === 'simple') {
      if (currentStep < 3) {
        // Packet moving from PC-A to Router
        const progress = currentStep / 3;
        return {
          x: nodes[0].x + (nodes[1].x - nodes[0].x) * progress,
          y: nodes[0].y
        };
      } else if (currentStep < 7) {
        // Packet moving from Router to PC-B
        const progress = (currentStep - 3) / 4;
        return {
          x: nodes[1].x + (nodes[2].x - nodes[1].x) * progress,
          y: nodes[1].y
        };
      } else {
        // Packet arrived at PC-B
        return {
          x: nodes[2].x,
          y: nodes[2].y
        };
      }
    } else {
      // Complex network animation
      if (currentStep < 3) {
        // PC-A to Switch-1
        const progress = currentStep / 3;
        return {
          x: nodes[0].x + (nodes[1].x - nodes[0].x) * progress,
          y: nodes[0].y
        };
      } else if (currentStep < 5) {
        // Switch-1 to Router-1
        const progress = (currentStep - 3) / 2;
        return {
          x: nodes[1].x + (nodes[2].x - nodes[1].x) * progress,
          y: nodes[1].y
        };
      } else if (currentStep < 8) {
        // Router-1 to Router-2
        const progress = (currentStep - 5) / 3;
        return {
          x: nodes[2].x + (nodes[3].x - nodes[2].x) * progress,
          y: nodes[2].y
        };
      } else if (currentStep < 12) {
        // Router-2 to Switch-2
        const progress = (currentStep - 8) / 4;
        return {
          x: nodes[3].x + (nodes[4].x - nodes[3].x) * progress,
          y: nodes[3].y
        };
      } else if (currentStep < 14) {
        // Switch-2 to PC-B
        const progress = (currentStep - 12) / 2;
        return {
          x: nodes[4].x + (nodes[5].x - nodes[4].x) * progress,
          y: nodes[4].y
        };
      } else {
        // Packet arrived at PC-B
        return {
          x: nodes[5].x,
          y: nodes[5].y
        };
      }
    }
  };
  
  // Start animation
  const startAnimation = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const next = prev + 1;
        if (next >= totalSteps) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        return next;
      });
    }, speeds[animationSpeed]);
    
    return () => clearInterval(interval);
  };
  
  // Reset animation
  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };
  
  // Get packet position
  const packetPosition = calculatePacketPosition();
  
  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Packet Flow Animation</h3>
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-1 rounded-md text-sm font-medium ${
              isPlaying 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            onClick={startAnimation}
            disabled={isPlaying}
          >
            Play
          </button>
          <button 
            className="px-4 py-1 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300"
            onClick={resetAnimation}
          >
            Reset
          </button>
        </div>
      </div>
      
      <div className="p-4">
        {/* Animation canvas */}
        <div className="relative w-full bg-gray-50 rounded-lg border border-gray-200" style={{ height: '300px' }}>
          {/* Network devices */}
          {network.nodes.map((node, index) => (
            <div 
              key={index}
              className="absolute"
              style={{ 
                left: `${node.x - 20}px`, 
                top: `${node.y - 20}px`,
                width: '40px',
                height: '40px'
              }}
            >
              {deviceIcons[node.type as keyof typeof deviceIcons]}
              {showLabels && (
                <div className="absolute w-full text-center -bottom-6 text-xs font-medium text-gray-700">
                  {node.label}
                </div>
              )}
            </div>
          ))}
          
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full">
            {networkType === 'simple' ? (
              <>
                <line x1="120" y1="150" x2="280" y2="150" stroke="#CBD5E1" strokeWidth="2" />
                <line x1="320" y1="150" x2="480" y2="150" stroke="#CBD5E1" strokeWidth="2" />
              </>
            ) : (
              <>
                <line x1="120" y1="100" x2="230" y2="100" stroke="#CBD5E1" strokeWidth="2" />
                <line x1="270" y1="100" x2="380" y2="100" stroke="#CBD5E1" strokeWidth="2" />
                <line x1="420" y1="100" x2="530" y2="100" stroke="#CBD5E1" strokeWidth="2" />
                <line x1="570" y1="100" x2="680" y2="100" stroke="#CBD5E1" strokeWidth="2" />
                <line x1="720" y1="100" x2="830" y2="100" stroke="#CBD5E1" strokeWidth="2" />
              </>
            )}
          </svg>
          
          {/* Animated packet */}
          {(currentStep < totalSteps) && (
            <motion.div
              className="absolute w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold shadow-md"
              style={{ 
                left: `${packetPosition.x - 16}px`, 
                top: `${packetPosition.y - 16}px` 
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              IP
            </motion.div>
          )}
        </div>
        
        {/* Step description */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
              {currentStep + 1}
            </div>
            <h4 className="font-medium text-gray-800">
              Step {currentStep + 1} of {totalSteps}
            </h4>
          </div>
          <p className="text-gray-700">
            {network.steps[currentStep].description}
          </p>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
