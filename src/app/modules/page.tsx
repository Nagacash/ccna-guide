"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

// This would normally be fetched from an API or file system
// For now, we'll use dummy data that will be replaced with actual content
const modules = [
  {
    id: 'network-fundamentals',
    title: 'Network Fundamentals',
    category: 'Fundamentals',
    labCount: 4,
    description: 'Learn about network types, components, topologies, and the OSI model.',
    color: 'blue',
    content: `# Network Fundamentals Module

This module covers the essential concepts of networking that form the foundation of the CCNA certification. You'll learn about network types, components, topologies, and the OSI model.

## Learning Objectives

By the end of this module, you will be able to:
- Identify different types of networks and their characteristics
- Understand network components and their functions
- Describe various network topologies and their advantages
- Explain the OSI and TCP/IP models and their layers
- Understand IP addressing and subnetting basics

## Topics Covered

### 1. Introduction to Networks
- What is a network?
- Types of networks (LAN, WAN, MAN, PAN)
- Client-server and peer-to-peer networks
- Network components (routers, switches, firewalls, etc.)

### 2. Network Topologies
- Bus topology
- Star topology
- Ring topology
- Mesh topology
- Hybrid topology

### 3. The OSI Model
- Physical Layer (Layer 1)
- Data Link Layer (Layer 2)
- Network Layer (Layer 3)
- Transport Layer (Layer 4)
- Session Layer (Layer 5)
- Presentation Layer (Layer 6)
- Application Layer (Layer 7)

### 4. TCP/IP Model
- Network Interface Layer
- Internet Layer
- Transport Layer
- Application Layer

### 5. IP Addressing
- IPv4 vs IPv6
- IP address classes
- Subnetting basics
- Public vs private IP addresses

## Lab Exercises

### Lab 1: Network Device Identification
In this lab, you'll learn to identify different network devices and their functions in a network topology.

### Lab 2: Analyzing Network Traffic
Using Wireshark, you'll capture and analyze network traffic to understand the OSI model in action.

### Lab 3: IP Addressing and Subnetting
Practice IP addressing and subnetting to understand how networks are divided and organized.

### Lab 4: Basic Network Configuration
Configure basic network settings on Cisco devices using the command-line interface.

## Assessment

Test your knowledge with our interactive quizzes and practical exercises to ensure you've mastered the fundamentals of networking.

## Resources

- Cisco CCNA Lab Guide
- Network Fundamentals Cheat Sheet
- Interactive Network Topology Simulator
- Command Reference Guide`
  },
  {
    id: 'routing-switching',
    title: 'Routing & Switching',
    category: 'Configuration',
    labCount: 6,
    description: 'Master router and switch configuration, VLANs, and routing protocols.',
    color: 'cyan',
    content: `# Routing & Switching Module

This module covers the essential concepts of routing and switching that are core to the CCNA certification. You'll learn how to configure and troubleshoot routers and switches in a network environment.

## Learning Objectives

By the end of this module, you will be able to:
- Configure basic settings on Cisco routers and switches
- Understand and implement VLANs and trunking
- Configure and verify inter-VLAN routing
- Implement static and dynamic routing protocols
- Troubleshoot common routing and switching issues

## Topics Covered

### 1. Router and Switch Basics
- Router components and functions
- Switch components and functions
- Basic device configuration
- IOS command structure
- Device management and security

### 2. VLANs and Trunking
- VLAN concepts and benefits
- Creating and assigning VLANs
- VLAN trunking protocol (VTP)
- Trunk configuration
- Native VLANs and voice VLANs

### 3. Inter-VLAN Routing
- Router-on-a-stick configuration
- Layer 3 switching
- SVI (Switched Virtual Interface)
- Troubleshooting inter-VLAN routing

### 4. Routing Fundamentals
- Static routing
- Default routing
- Administrative distance
- Routing tables
- Path selection

### 5. Dynamic Routing Protocols
- RIP (Routing Information Protocol)
- OSPF (Open Shortest Path First)
- EIGRP (Enhanced Interior Gateway Routing Protocol)
- Route redistribution basics

## Lab Exercises

### Lab 1: Basic Router and Switch Configuration
Configure hostnames, passwords, banners, and management interfaces on Cisco devices.

### Lab 2: VLAN Configuration
Create VLANs, assign ports to VLANs, and configure trunking between switches.

### Lab 3: Inter-VLAN Routing
Configure router-on-a-stick to enable communication between different VLANs.

### Lab 4: Static Routing
Configure static routes to enable communication between different networks.

### Lab 5: OSPF Configuration
Implement OSPF routing protocol in a multi-router environment.

### Lab 6: Routing Protocol Troubleshooting
Identify and resolve common routing protocol issues.

## Assessment

Test your knowledge with our interactive quizzes and practical exercises to ensure you've mastered routing and switching concepts.

## Resources

- Cisco CCNA Lab Guide
- Routing and Switching Command Reference
- Interactive Network Topology Simulator
- Troubleshooting Flowcharts`
  },
  {
    id: 'network-security',
    title: 'Network Security',
    category: 'Security',
    labCount: 5,
    description: 'Implement ACLs, port security, and device hardening techniques.',
    color: 'green',
    content: `# Network Security Module

This module covers essential network security concepts and practices that are crucial for the CCNA certification. You'll learn how to implement security measures to protect network infrastructure and data.

## Learning Objectives

By the end of this module, you will be able to:
- Implement access control lists (ACLs) to filter network traffic
- Configure port security on switches to prevent unauthorized access
- Understand and implement device hardening techniques
- Configure basic firewall functionality
- Identify common security threats and mitigation strategies

## Topics Covered

### 1. Network Security Fundamentals
- Security threats and vulnerabilities
- Defense-in-depth approach
- CIA triad (Confidentiality, Integrity, Availability)
- Security policies and procedures
- Regulatory compliance basics

### 2. Access Control Lists (ACLs)
- Standard ACLs
- Extended ACLs
- Named ACLs
- ACL placement and direction
- Troubleshooting ACLs

### 3. Switch Security
- Port security configuration
- MAC address filtering
- DHCP snooping
- Dynamic ARP inspection
- IP Source Guard

### 4. Device Hardening
- Securing management interfaces
- Password policies
- Role-based access control
- Disabling unused services
- Firmware updates and patches

### 5. VPN and Encryption Basics
- IPsec fundamentals
- SSL/TLS overview
- Site-to-site VPNs
- Remote access VPNs
- Encryption algorithms

## Lab Exercises

### Lab 1: Configuring Standard and Extended ACLs
Implement ACLs to control traffic flow between networks based on source/destination addresses and protocols.

### Lab 2: Implementing Port Security
Configure port security on switches to limit the number of MAC addresses per port and prevent MAC address spoofing.

### Lab 3: Device Hardening
Apply best practices for securing Cisco devices, including password policies, SSH configuration, and disabling unused services.

### Lab 4: Configuring Zone-Based Firewall
Implement basic firewall functionality to protect internal networks from external threats.

### Lab 5: Security Monitoring and Logging
Configure logging and monitoring to detect and respond to security incidents.

## Assessment

Test your knowledge with our interactive quizzes and practical exercises to ensure you've mastered network security concepts and implementation.

## Resources

- Cisco CCNA Lab Guide
- Network Security Best Practices
- ACL Configuration Cheat Sheet
- Security Troubleshooting Guide`
  },
  {
    id: 'ip-services',
    title: 'IP Services',
    category: 'Advanced',
    labCount: 3,
    description: 'Configure DHCP, NAT, NTP, and other essential IP services.',
    color: 'purple',
    content: `# IP Services Module

This module covers essential IP services that are critical for network operations and part of the CCNA certification. You'll learn how to configure and troubleshoot various network services that enhance connectivity and management.

## Learning Objectives

By the end of this module, you will be able to:
- Configure and verify DHCP on Cisco routers
- Implement Network Address Translation (NAT) and Port Address Translation (PAT)
- Configure Network Time Protocol (NTP) for time synchronization
- Understand and implement quality of service (QoS) mechanisms
- Configure and troubleshoot SNMP and Syslog for network monitoring

## Topics Covered

### 1. DHCP Configuration
- DHCP operation and message types
- Configuring DHCP server on Cisco routers
- DHCP relay agent configuration
- DHCP troubleshooting
- DHCPv6 basics

### 2. Network Address Translation (NAT)
- NAT concepts and terminology
- Static NAT configuration
- Dynamic NAT configuration
- Port Address Translation (PAT)
- NAT troubleshooting

### 3. Network Time Protocol (NTP)
- NTP architecture and operation
- Configuring NTP server and client
- NTP authentication
- NTP troubleshooting
- Time zones and daylight saving time

### 4. Quality of Service (QoS)
- QoS concepts and models
- Classification and marking
- Congestion management
- Congestion avoidance
- Traffic policing and shaping

### 5. Network Monitoring
- SNMP configuration
- Syslog implementation
- NetFlow basics
- IP SLA overview
- Network monitoring best practices

## Lab Exercises

### Lab 1: DHCP Configuration
Configure a Cisco router as a DHCP server and implement DHCP relay for remote networks.

### Lab 2: NAT and PAT Implementation
Configure static NAT, dynamic NAT, and PAT to enable internal hosts to access the internet.

### Lab 3: NTP Configuration
Set up NTP server and client relationships to ensure time synchronization across the network.

### Lab 4: QoS Implementation
Configure basic QoS mechanisms to prioritize voice and video traffic over data traffic.

### Lab 5: Network Monitoring Setup
Implement SNMP and Syslog for centralized network monitoring and troubleshooting.

## Assessment

Test your knowledge with our interactive quizzes and practical exercises to ensure you've mastered IP services concepts and implementation.

## Resources

- Cisco CCNA Lab Guide
- IP Services Configuration Examples
- Troubleshooting IP Services Flowchart
- NAT and DHCP Cheat Sheet`
  },
  {
    id: 'wireless-networking',
    title: 'Wireless Networking',
    category: 'Wireless',
    labCount: 2,
    description: 'Learn wireless standards, security, and basic configuration.',
    color: 'orange',
    content: `# Wireless Networking Module

This module covers essential wireless networking concepts that are part of the CCNA certification. You'll learn about wireless standards, security, and basic configuration of wireless networks.

## Learning Objectives

By the end of this module, you will be able to:
- Understand wireless networking standards and technologies
- Identify wireless components and their functions
- Configure basic wireless settings on Cisco devices
- Implement wireless security measures
- Troubleshoot common wireless networking issues

## Topics Covered

### 1. Wireless Fundamentals
- Wireless standards (802.11a/b/g/n/ac/ax)
- RF fundamentals and spectrum
- Wireless channels and frequencies
- CSMA/CA and wireless media access
- Wireless coverage and capacity planning

### 2. Wireless Network Components
- Wireless access points
- Wireless LAN controllers
- Wireless clients and adapters
- Antennas and their types
- PoE (Power over Ethernet) for wireless devices

### 3. Wireless Network Architecture
- Autonomous AP deployment
- Controller-based deployment
- Cloud-managed wireless
- Roaming and mobility
- Wireless mesh networks

### 4. Wireless Security
- Authentication methods
- Encryption protocols (WEP, WPA, WPA2, WPA3)
- 802.1X and EAP
- Guest wireless access
- Wireless threats and mitigation

### 5. Wireless Configuration and Troubleshooting
- Basic AP configuration
- SSID and VLAN mapping
- Channel and power settings
- Wireless client connectivity issues
- Interference identification and resolution

## Lab Exercises

### Lab 1: Basic Wireless Configuration
Configure a wireless access point with multiple SSIDs and security settings.

### Lab 2: Wireless Security Implementation
Implement various wireless security methods and test client connectivity.

### Lab 3: Wireless Troubleshooting
Identify and resolve common wireless connectivity and performance issues.

## Assessment

Test your knowledge with our interactive quizzes and practical exercises to ensure you've mastered wireless networking concepts and implementation.

## Resources

- Cisco CCNA Lab Guide
- Wireless Networking Best Practices
- Wireless Security Cheat Sheet
- Wireless Troubleshooting Guide`
  }
];

export default function ModulesPage() {
  const [selectedModule, setSelectedModule] = useState(null);
  
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
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">CCNA Course Modules</h1>
            <p className="text-xl text-gray-600">
              Explore our comprehensive CCNA curriculum with interactive lessons and hands-on labs.
            </p>
          </motion.div>

          {selectedModule ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <div className={`h-3 bg-${selectedModule.color}-600`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-sm font-semibold text-${selectedModule.color}-600 bg-${selectedModule.color}-50 px-3 py-1 rounded-full`}>
                      {selectedModule.category}
                    </span>
                    <span className="text-sm text-gray-500">{selectedModule.labCount} Labs</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">{selectedModule.title}</h2>
                  <p className="text-gray-600 mb-4">{selectedModule.description}</p>
                  
                  <button 
                    onClick={() => setSelectedModule(null)}
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
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
              {modules.map((module) => (
                <motion.div 
                  key={module.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  onClick={() => setSelectedModule(module)}
                >
                  <div className={`h-3 bg-${module.color}-600`}></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-sm font-semibold text-${module.color}-600 bg-${module.color}-50 px-3 py-1 rounded-full`}>
                        {module.category}
                      </span>
                      <span className="text-sm text-gray-500">{module.labCount} Labs</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{module.title}</h3>
                    <p className="text-gray-600 mb-4">{module.description}</p>
                    <div className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center">
                      Explore Module
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
