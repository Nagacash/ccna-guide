"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: string;
  type: 'router' | 'switch' | 'pc' | 'server' | 'cloud';
  x: number;
  y: number;
  label: string;
}

interface Link {
  id: string;
  source: string;
  target: string;
  type: 'ethernet' | 'serial' | 'fiber' | 'wireless';
}

interface NetworkTopologyProps {
  initialNodes?: Node[];
  initialLinks?: Link[];
  editable?: boolean;
}

export default function NetworkTopology({
  initialNodes = [],
  initialLinks = [],
  editable = false
}: NetworkTopologyProps) {
  const [nodes, setNodes] = useState<Node[]>(initialNodes.length > 0 ? initialNodes : [
    { id: 'router1', type: 'router', x: 200, y: 150, label: 'R1' },
    { id: 'switch1', type: 'switch', x: 400, y: 150, label: 'SW1' },
    { id: 'pc1', type: 'pc', x: 300, y: 300, label: 'PC1' },
    { id: 'pc2', type: 'pc', x: 500, y: 300, label: 'PC2' },
    { id: 'server1', type: 'server', x: 600, y: 150, label: 'Server' }
  ]);
  
  const [links, setLinks] = useState<Link[]>(initialLinks.length > 0 ? initialLinks : [
    { id: 'link1', source: 'router1', target: 'switch1', type: 'ethernet' },
    { id: 'link2', source: 'switch1', target: 'pc1', type: 'ethernet' },
    { id: 'link3', source: 'switch1', target: 'pc2', type: 'ethernet' },
    { id: 'link4', source: 'switch1', target: 'server1', type: 'ethernet' }
  ]);
  
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  
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
    ),
    server: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <rect x="4" y="2" width="16" height="20" rx="1" fill="#8B5CF6" />
        <path d="M7 6h10M7 10h10M7 14h10M7 18h10" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
    cloud: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path d="M6.5 19C4.01472 19 2 16.9853 2 14.5C2 12.1564 3.79151 10.2313 6.07974 10.0194C6.54781 7.17213 9.02024 5 12 5C14.9798 5 17.4522 7.17213 17.9203 10.0194C20.2085 10.2313 22 12.1564 22 14.5C22 16.9853 19.9853 19 17.5 19H6.5Z" fill="#60A5FA" />
      </svg>
    )
  };
  
  // Link styles based on type
  const linkStyles = {
    ethernet: "stroke-blue-500 stroke-2",
    serial: "stroke-red-500 stroke-2 stroke-dasharray-2",
    fiber: "stroke-green-500 stroke-2",
    wireless: "stroke-purple-500 stroke-2 stroke-dasharray-4"
  };
  
  // Handle node drag
  const handleDragStart = (id: string) => {
    if (editable) {
      setDraggedNode(id);
    }
  };
  
  const handleDrag = (e: React.MouseEvent, id: string) => {
    if (editable && draggedNode === id) {
      const svgRect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - svgRect.left;
      const y = e.clientY - svgRect.top;
      
      setNodes(nodes.map(node => 
        node.id === id ? { ...node, x, y } : node
      ));
    }
  };
  
  const handleDragEnd = () => {
    setDraggedNode(null);
  };
  
  // Calculate link path between nodes
  const calculateLinkPath = (source: Node, target: Node) => {
    return `M${source.x},${source.y} L${target.x},${target.y}`;
  };
  
  // Find node by ID
  const findNode = (id: string) => nodes.find(node => node.id === id);
  
  return (
    <div className="w-full h-full bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Network Topology</h3>
        {editable && (
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm hover:bg-blue-200 transition-colors">
              Add Device
            </button>
            <button className="px-3 py-1 bg-green-100 text-green-600 rounded-md text-sm hover:bg-green-200 transition-colors">
              Add Link
            </button>
          </div>
        )}
      </div>
      
      <div className="relative w-full" style={{ height: '500px' }}>
        <svg 
          width="100%" 
          height="100%" 
          className="bg-gray-50"
          onMouseMove={(e) => draggedNode && handleDrag(e, draggedNode)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          {/* Links */}
          {links.map(link => {
            const source = findNode(link.source);
            const target = findNode(link.target);
            
            if (!source || !target) return null;
            
            return (
              <g key={link.id}>
                <path 
                  d={calculateLinkPath(source, target)} 
                  className={`${linkStyles[link.type]} fill-none`}
                />
              </g>
            );
          })}
          
          {/* Nodes */}
          {nodes.map(node => (
            <motion.g 
              key={node.id}
              transform={`translate(${node.x - 20}, ${node.y - 20})`}
              onMouseDown={() => handleDragStart(node.id)}
              className={`cursor-${editable ? 'move' : 'pointer'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
            >
              <foreignObject width="40" height="40">
                <div className={`w-10 h-10 ${selectedNode === node.id ? 'ring-2 ring-blue-500' : ''}`}>
                  {deviceIcons[node.type]}
                </div>
              </foreignObject>
              <text 
                x="20" 
                y="50" 
                textAnchor="middle" 
                className="text-xs font-medium fill-gray-700"
              >
                {node.label}
              </text>
            </motion.g>
          ))}
        </svg>
        
        {/* Node details panel */}
        {selectedNode && (
          <motion.div 
            className="absolute top-4 right-4 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-gray-800">Device Details</h4>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setSelectedNode(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {(() => {
              const node = findNode(selectedNode);
              if (!node) return null;
              
              return (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500">Device Name</label>
                    <div className="font-medium">{node.label}</div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Device Type</label>
                    <div className="font-medium capitalize">{node.type}</div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Connections</label>
                    <div className="font-medium">
                      {links.filter(link => link.source === node.id || link.target === node.id).length}
                    </div>
                  </div>
                  
                  {editable && (
                    <div className="pt-2 flex justify-end">
                      <button className="px-3 py-1 bg-red-100 text-red-600 rounded-md text-sm hover:bg-red-200 transition-colors">
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}
          </motion.div>
        )}
      </div>
      
      {/* Legend */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-4 h-0.5 bg-blue-500 mr-2"></div>
            <span className="text-sm text-gray-600">Ethernet</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-0.5 bg-red-500 mr-2" style={{ strokeDasharray: '2' }}></div>
            <span className="text-sm text-gray-600">Serial</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-0.5 bg-green-500 mr-2"></div>
            <span className="text-sm text-gray-600">Fiber</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-0.5 bg-purple-500 mr-2" style={{ strokeDasharray: '4' }}></div>
            <span className="text-sm text-gray-600">Wireless</span>
          </div>
        </div>
      </div>
    </div>
  );
}
