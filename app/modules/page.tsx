"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Module data (consider moving this to a separate file if it grows large)
interface Module {
    id: string;
    title: string;
    category: string;
    labCount: number;
    description: string;
    color: string;
    content: string;
}

const modules: Module[] = [
    {
        id: 'network-fundamentals',
        title: 'Network Fundamentals',
        category: 'Fundamentals',
        labCount: 4,
        description: 'Learn about network types, components, topologies, and the OSI model.',
        color: 'blue',
        content: `<h1 class="text-3xl font-bold text-blue-700 mb-4">Network Fundamentals Module</h1>

<p class="text-gray-700 mb-4">This module covers the essential concepts of networking that form the foundation of the CCNA certification. You'll learn about network types, components, topologies, and the OSI model.</p>

<h2 class="text-2xl font-semibold text-blue-600 mb-3">Learning Objectives</h2>

<p class="text-gray-700 mb-2">By the end of this module, you will be able to:</p>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>Identify different types of networks and their characteristics</li>
  <li>Understand network components and their functions</li>
  <li>Describe various network topologies and their advantages</li>
  <li>Explain the OSI and TCP/IP models and their layers</li>
  <li>Understand IP addressing and subnetting basics</li>
</ul>

<h2 class="text-2xl font-semibold text-blue-600 mt-6 mb-3">Topics Covered</h2>

<h3 class="text-xl font-semibold text-blue-500 mt-4 mb-2">1. Introduction to Networks</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>What is a network?</li>
  <li>Types of networks (LAN, WAN, MAN, PAN)</li>
  <li>Client-server and peer-to-peer networks</li>
  <li>Network components (routers, switches, firewalls, etc.)</li>
</ul>

<h3 class="text-xl font-semibold text-blue-500 mt-4 mb-2">2. Network Topologies</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>Bus topology</li>
  <li>Star topology</li>
  <li>Ring topology</li>
  <li>Mesh topology</li>
  <li>Hybrid topology</li>
</ul>

<h3 class="text-xl font-semibold text-blue-500 mt-4 mb-2">3. The OSI Model</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>Physical Layer (Layer 1)</li>
  <li>Data Link Layer (Layer 2)</li>
  <li>Network Layer (Layer 3)</li>
  <li>Transport Layer (Layer 4)</li>
  <li>Session Layer (Layer 5)</li>
  <li>Presentation Layer (Layer 6)</li>
  <li>Application Layer (Layer 7)</li>
</ul>

<h3 class="text-xl font-semibold text-blue-500 mt-4 mb-2">4. TCP/IP Model</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>Network Interface Layer</li>
  <li>Internet Layer</li>
  <li>Transport Layer</li>
  <li>Application Layer</li>
</ul>

<h3 class="text-xl font-semibold text-blue-500 mt-4 mb-2">5. IP Addressing</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>IPv4 vs IPv6</li>
  <li>IP address classes</li>
  <li>Subnetting basics</li>
  <li>Public vs private IP addresses</li>
</ul>

<h2 class="text-2xl font-semibold text-blue-600 mt-6 mb-3">Lab Exercises</h2>

<p class="text-gray-700">...</p>

<h2 class="text-2xl font-semibold text-blue-600 mt-6 mb-3">Assessment</h2>

<p class="text-gray-700">...</p>

<h2 class="text-2xl font-semibold text-blue-600 mt-6 mb-3">Resources</h2>
<p class="text-gray-700">...</p>`,
    },
    {
        id: 'routing-switching',
        title: 'Routing & Switching',
        category: 'Configuration',
        labCount: 6,
        description: 'Master router and switch configuration, VLANs, and routing protocols.',
        color: 'cyan',
        content: `<h1 class="text-3xl font-bold text-cyan-700 mb-4">Routing & Switching Module</h1>

<p class="text-gray-700 mb-4">This module covers the essential concepts of routing and switching that are core to the CCNA certification. You'll learn how to configure and troubleshoot routers and switches in a network environment.</p>
<h2 class="text-2xl font-semibold text-cyan-600 mb-3">Learning Objectives</h2>

<p class="text-gray-700 mb-2">By the end of this module, you will be able to:</p>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>Configure basic settings on Cisco routers and switches</li>
  <li>Understand and implement VLANs and trunking</li>
  <li>Configure and verify inter-VLAN routing</li>
  <li>Implement static and dynamic routing protocols</li>
  <li>Troubleshoot common routing and switching issues</li>
</ul>

<h2 class="text-2xl font-semibold text-cyan-600 mt-6 mb-3">Topics Covered</h2>

<h3 class="text-xl font-semibold text-cyan-500 mt-4 mb-2">1. Router and Switch Basics</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>Router components and functions</li>
  <li>Switch components and functions</li>
  <li>Basic device configuration</li>
  <li>IOS command structure</li>
  <li>Device management and security</li>
</ul>

<h3 class="text-xl font-semibold text-cyan-500 mt-4 mb-2">2. VLANs and Trunking</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>VLAN concepts and benefits</li>
  <li>Creating and assigning VLANs</li>
  <li>VLAN trunking protocol (VTP)</li>
  <li>Trunk configuration</li>
  <li>Native VLANs and voice VLANs</li>
</ul>

<h3 class="text-xl font-semibold text-cyan-500 mt-4 mb-2">3. Inter-VLAN Routing</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>Router-on-a-stick configuration</li>
  <li>Layer 3 switching</li>
  <li>SVI (Switched Virtual Interface)</li>
  <li>Troubleshooting inter-VLAN routing</li>
</ul>

<h3 class="text-xl font-semibold text-cyan-500 mt-4 mb-2">4. Routing Fundamentals</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>Static routing</li>
  <li>Default routing</li>
  <li>Administrative distance</li>
  <li>Routing tables</li>
  <li>Path selection</li>
</ul>

<h3 class="text-xl font-semibold text-cyan-500 mt-4 mb-2">5. Dynamic Routing Protocols</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>RIP (Routing Information Protocol)</li>
  <li>OSPF (Open Shortest Path First)</li>
  <li>EIGRP (Enhanced Interior Gateway Routing Protocol)</li>
  <li>Route redistribution basics</li>
</ul>

<h2>Lab Exercises</h2>

<p class="text-gray-700">...</p>

<h2>Assessment</h2>

<p class="text-gray-700">...</p>

<h2>Resources</h2>
<p class="text-gray-700">...</p>`,
    },
    {
        id: 'network-security',
        title: 'Network Security',
        category: 'Security',
        labCount: 5,
        description: 'Implement ACLs, port security, and device hardening techniques.',
        color: 'green',
        content: `<h1 class="text-3xl font-bold text-green-700 mb-4">Network Security Module</h1>

<p class="text-gray-700 mb-4">This module covers essential network security concepts and practices that are crucial for the CCNA certification. You'll learn how to implement security measures to protect network infrastructure and data.</p>

<h2 class="text-2xl font-semibold text-green-600 mb-3">Learning Objectives</h2>

<p class="text-gray-700 mb-2">By the end of this module, you will be able to:</p>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>Implement access control lists (ACLs) to filter network traffic</li>
  <li>Configure port security on switches to prevent unauthorized access</li>
  <li>Understand and implement device hardening techniques</li>
  <li>Configure basic firewall functionality</li>
  <li>Identify common security threats and mitigation strategies</li>
</ul>

<h2 class="text-2xl font-semibold text-green-600 mt-6 mb-3">Topics Covered</h2>

<h3 class="text-xl font-semibold text-green-500 mt-4 mb-2">1. Network Security Fundamentals</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>Security threats and vulnerabilities</li>
  <li>Defense-in-depth approach</li>
  <li>CIA triad (Confidentiality, Integrity, Availability)</li>
  <li>Security policies and procedures</li>
  <li>Regulatory compliance basics</li>
</ul>

<h3 class="text-xl font-semibold text-green-500 mt-4 mb-2">2. Access Control Lists (ACLs)</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>Standard ACLs</li>
  <li>Extended ACLs</li>
  <li>Named ACLs</li>
  <li>ACL placement and direction</li>
  <li>Troubleshooting ACLs</li>
</ul>

<h3 class="text-xl font-semibold text-green-500 mt-4 mb-2">3. Switch Security</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>Port security configuration</li>
  <li>MAC address filtering</li>
  <li>DHCP snooping</li>
  <li>Dynamic ARP inspection</li>
  <li>IP Source Guard</li>
</ul>

<h3 class="text-xl font-semibold text-green-500 mt-4 mb-2">4. Device Hardening</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>Securing management interfaces</li>
  <li>Password policies</li>
  <li>Role-based access control</li>
  <li>Disabling unused services</li>
  <li>Firmware updates and patches</li>
</ul>

<h3 class="text-xl font-semibold text-green-500 mt-4 mb-2">5. VPN and Encryption Basics</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>IPsec fundamentals</li>
  <li>SSL/TLS overview</li>
  <li>Site-to-site VPNs</li>
  <li>Remote access VPNs</li>
  <li>Encryption algorithms</li>
</ul>

<h2>Lab Exercises</h2>

<p class="text-gray-700">...</p>

<h2>Assessment</h2>

<p class="text-gray-700">...</p>

<h2>Resources</h2>
<p class="text-gray-700">...</p>`,
    },
    {
        id: 'ip-services',
        title: 'IP Services',
        category: 'Advanced',
        labCount: 3,
        description: 'Configure DHCP, NAT, NTP, and other essential IP services.',
        color: 'purple',
        content: `<h1 class="text-3xl font-bold text-purple-700 mb-4">IP Services Module</h1>

<p class="text-gray-700 mb-4">This module covers essential IP services that are critical for network operations and the CCNA certification. You'll learn how to configure and troubleshoot various network services that enhance connectivity and management.</p>

<h2 class="text-2xl font-semibold text-purple-600 mb-3">Learning Objectives</h2>

<p class="text-gray-700 mb-2">By the end of this module, you will be able to:</p>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>Configure and verify DHCP on Cisco routers</li>
  <li>Implement Network Address Translation (NAT) and Port Address Translation (PAT)</li>
  <li>Configure Network Time Protocol (NTP) for time synchronization</li>
  <li>Understand and implement quality of service (QoS) mechanisms</li>
  <li>Configure and troubleshoot SNMP and Syslog for network monitoring</li>
</ul>

<h2 class="text-2xl font-semibold text-purple-600 mt-6 mb-3">Topics Covered</h2>

<h3 class="text-xl font-semibold text-purple-500 mt-4 mb-2">1. DHCP Configuration</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>DHCP operation and message types</li>
  <li>Configuring DHCP server on Cisco routers</li>
  <li>DHCP relay agent configuration</li>
  <li>DHCP troubleshooting</li>
  <li>DHCPv6 basics</li>
</ul>

<h3 class="text-xl font-semibold text-purple-500 mt-4 mb-2">2. Network Address Translation (NAT)</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>NAT concepts and terminology</li>
  <li>Static NAT configuration</li>
  <li>Dynamic NAT configuration</li>
  <li>Port Address Translation (PAT)</li>
  <li>NAT troubleshooting</li>
</ul>

<h3 class="text-xl font-semibold text-purple-500 mt-4 mb-2">3. Network Time Protocol (NTP)</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>NTP architecture and operation</li>
  <li>Configuring NTP server and client</li>
  <li>NTP authentication</li>
  <li>NTP troubleshooting</li>
  <li>Time zones and daylight saving time</li>
</ul>

<h3 class="text-xl font-semibold text-purple-500 mt-4 mb-2">4. Quality of Service (QoS)</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
   <li>QoS concepts and models</li>
  <li>Classification and marking</li>
  <li>Congestion management</li>
  <li>Congestion avoidance</li>
  <li>Traffic policing and shaping</li>
</ul>

<h3 class="text-xl font-semibold text-purple-500 mt-4 mb-2">5. Network Monitoring</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>SNMP configuration</li>
  <li>Syslog implementation</li>
  <li>NetFlow basics</li>
  <li>IP SLA overview</li>
  <li>Network monitoring best practices</li>
</ul>

<h2>Lab Exercises</h2>

<p class="text-gray-700">...</p>

<h2>Assessment</h2>

<p class="text-gray-700">...</p>

<h2>Resources</h2>
<p class="text-gray-700">...</p>`,
    },
    {
        id: 'wireless-networking',
        title: 'Wireless Networking',
        category: 'Wireless',
        labCount: 2,
        description: 'Learn wireless standards, security, and basic configuration.',
        color: 'orange',
        content: `<h1 class="text-3xl font-bold text-orange-700 mb-4">Wireless Networking Module</h1>

<p class="text-gray-700 mb-4">This module covers essential wireless networking concepts that are part of the CCNA certification. You'll learn about wireless standards, security, and basic configuration of wireless networks.</p>

<h2 class="text-2xl font-semibold text-orange-600 mb-3">Learning Objectives</h2>

<p class="text-gray-700 mb-2">By the end of this module, you will be able to:</p>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>Understand wireless networking standards and technologies</li>
  <li>Identify wireless components and their functions</li>
  <li>Configure basic wireless settings on Cisco devices</li>
  <li>Implement wireless security measures</li>
  <li>Troubleshoot common wireless networking issues</li>
</ul>

<h2 class="text-2xl font-semibold text-orange-600 mt-6 mb-3">Topics Covered</h2>

<h3 class="text-xl font-semibold text-orange-500 mt-4 mb-2">1. Wireless Fundamentals</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>Wireless standards (802.11a/b/g/n/ac/ax)</li>
  <li>RF fundamentals and spectrum</li>
  <li>Wireless channels and frequencies</li>
  <li>CSMA/CA and wireless media access</li>
  <li>Wireless coverage and capacity planning</li>
</ul>

<h3 class="text-xl font-semibold text-orange-500 mt-4 mb-2">2. Wireless Network Components</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>Wireless access points</li>
  <li>Wireless LAN controllers</li>
  <li>Wireless clients and adapters</li>
  <li>Antennas and their types</li>
  <li>PoE (Power over Ethernet) for wireless devices</li>
</ul>

<h3 class="text-xl font-semibold text-orange-500 mt-4 mb-2">3. Wireless Network Architecture</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>Autonomous AP deployment</li>
  <li>Controller-based deployment</li>
  <li>Cloud-managed wireless</li>
  <li>Roaming and mobility</li>
  <li>Wireless mesh networks</li>
</ul>

<h3 class="text-xl font-semibold text-orange-500 mt-4 mb-2">4. Wireless Security</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>Authentication methods</li>
  <li>Encryption protocols (WEP, WPA, WPA2, WPA3)</li>
  <li>802.1X and EAP</li>
  <li>Guest wireless access</li>
  <li>Wireless threats and mitigation</li>
</ul>

<h3 class="text-xl font-semibold text-orange-500 mt-4 mb-2">5. Wireless Configuration and Troubleshooting</h3>
<ul class="list-disc list-inside space-y-1 text-gray-600">
  <li>Basic AP configuration</li>
  <li>SSID and VLAN mapping</li>
  <li>Channel and power settings</li>
  <li>Wireless client connectivity issues</li>
  <li>Interference identification and resolution</li>
</ul>

<h2>Lab Exercises</h2>

<p class="text-gray-700">...</p>

<h2>Assessment</h2>
<p class="text-gray-700">...</p>

<h2>Resources</h2>
<p class="text-gray-700">...</p>`,
    },
];

const globalCSS = `
  :root {
    --background: #ffffff;
    --foreground: #171717;
  }
  @theme inline {
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --font-sans: var(--font-geist-sans);
    --font-mono: var(--font-geist-mono);
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --background: #0a0a0a;
      --foreground: #ededed;
    }
  }
  body {
    background: var(--background);
    color: var(--foreground);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.6;
    letter-spacing: 0.5px;
    word-spacing: 1px;
    padding: 20px;
  }
`;

// Simplified cn function
function cn(...classes: (string | { [key: string]: boolean } | undefined | null)[]): string {
    let result = "";
    for (const cls of classes) {
        if (typeof cls === "string" && cls) {
            result += cls + " ";
        } else if (typeof cls === "object" && cls) {
            for (const key in cls) {
                if (cls[key]) {
                    result += key + " ";
                }
            }
        }
    }
    return result.trim();
}

export default function ModulesPage() {
    const [selectedModule, setSelectedModule] = useState<Module | null>(null);

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = globalCSS;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.4,
            },
        },
    };

    // Function to handle module selection
    const handleModuleSelect = (module: Module) => {
        setSelectedModule(module);
    };

    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12 text-center"
                    >
                        <h1 className="text-4xl font-bold mb-4 text-gray-800">
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
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                                <div className={`h-4 bg-${selectedModule.color}-500`}></div>
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <span
                                            className={cn(
                                                `inline-block text-sm font-semibold px-4 py-2 rounded-full`,
                                                `text-${selectedModule.color}-600`,
                                                `bg-${selectedModule.color}-100`,
                                            )}
                                        >
                                            {selectedModule.category}
                                        </span>
                                        <span className="text-md text-gray-500">
                                            {selectedModule.labCount} Labs
                                        </span>
                                    </div>
                                    <h2 className="text-3xl font-bold mb-3 text-gray-800">
                                        {selectedModule.title}
                                    </h2>
                                    <p className="text-lg text-gray-600 mb-6">
                                        {selectedModule.description}
                                    </p>

                                    <button
                                        onClick={() => setSelectedModule(null)}
                                        className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 mr-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                            />
                                        </svg>
                                        Back to All Modules
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8" dangerouslySetInnerHTML={{ __html: selectedModule.content }}>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {modules.map((module) => {
                                const cardClasses = `bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 cursder-gray-200 cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-lg`;
                                return (
                                    <motion.div
                                        key={module.id}
                                        variants={itemVariants}
                                        className={cardClasses}
                                        onClick={() => handleModuleSelect(module)}
                                    >
                                        <div className={`h-4 bg-${module.color}-500`}></div>
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <span
                                                    className={cn(
                                                        `inline-block text-sm font-semibold px-4 py-2 rounded-full`,
                                                        `text-${module.color}-600`,
                                                        `bg-${module.color}-100`,
                                                    )}
                                                >
                                                    {module.category}
                                                </span>
                                                <span className="text-md text-gray-500">
                                                    {module.labCount} Labs
                                                </span>
                                            </div>
                                            <h2 className="text-2xl font-bold mb-2 text-gray-800">
                                                {module.title}
                                            </h2>
                                            <p className="text-gray-600">
                                                {module.description}
                                            </p>
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

