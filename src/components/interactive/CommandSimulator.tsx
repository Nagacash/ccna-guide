"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CommandSimulatorProps {
  initialCommands?: string[];
  deviceType?: 'router' | 'switch';
  hostname?: string;
}

export default function CommandSimulator({
  initialCommands = [],
  deviceType = 'router',
  hostname = 'R1'
}: CommandSimulatorProps) {
  const [history, setHistory] = useState<string[]>(initialCommands);
  const [currentCommand, setCurrentCommand] = useState('');
  const [mode, setMode] = useState<'user' | 'privileged' | 'config'>('user');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Prompt based on current mode
  const prompts = {
    user: `${hostname}>`,
    privileged: `${hostname}#`,
    config: `${hostname}(config)#`
  };

  // Scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Process command
  const processCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    
    // Add command to history
    setHistory([...history, `${prompts[mode]} ${command}`]);
    
    // Process command based on current mode
    if (mode === 'user') {
      if (command === 'enable') {
        setHistory(prev => [...prev, 'Password: ****', '']);
        setMode('privileged');
      } else if (command === 'exit') {
        setHistory(prev => [...prev, 'Connection closed.']);
      } else if (command === 'help' || command === '?') {
        setHistory(prev => [...prev, 
          'Available commands:',
          '  enable    - Enter privileged mode',
          '  exit      - Exit the terminal',
          '  help/?    - Show this help message',
          ''
        ]);
      } else {
        setHistory(prev => [...prev, `Command not recognized: ${command}`, '']);
      }
    } else if (mode === 'privileged') {
      if (command === 'configure terminal' || command === 'conf t') {
        setHistory(prev => [...prev, 'Enter configuration commands, one per line. End with CNTL/Z.', '']);
        setMode('config');
      } else if (command === 'show running-config' || command === 'show run') {
        setHistory(prev => [...prev, 
          'Building configuration...',
          '',
          'Current configuration:',
          '!',
          'version 15.0',
          'service timestamps debug datetime msec',
          'service timestamps log datetime msec',
          'no service password-encryption',
          '!',
          'hostname ' + hostname,
          '!',
          'boot-start-marker',
          'boot-end-marker',
          '!',
          'no aaa new-model',
          '!',
          'interface FastEthernet0/0',
          ' ip address 192.168.1.1 255.255.255.0',
          ' duplex auto',
          ' speed auto',
          '!',
          'interface FastEthernet0/1',
          ' no ip address',
          ' shutdown',
          ' duplex auto',
          ' speed auto',
          '!',
          'ip forward-protocol nd',
          '!',
          'no ip http server',
          '!',
          'control-plane',
          '!',
          'line con 0',
          'line aux 0',
          'line vty 0 4',
          ' login',
          ' transport input all',
          '!',
          'end',
          ''
        ]);
      } else if (command === 'show interfaces' || command === 'show int') {
        setHistory(prev => [...prev, 
          'FastEthernet0/0 is up, line protocol is up',
          '  Hardware is Gt96k FE, address is c201.0f3c.0000 (bia c201.0f3c.0000)',
          '  Internet address is 192.168.1.1/24',
          '  MTU 1500 bytes, BW 100000 Kbit/sec, DLY 100 usec,',
          '     reliability 255/255, txload 1/255, rxload 1/255',
          '  Encapsulation ARPA, loopback not set',
          '  Keepalive set (10 sec)',
          '  Full-duplex, 100Mb/s, media type is RJ45',
          '  output flow-control is unsupported, input flow-control is unsupported',
          '  ARP type: ARPA, ARP Timeout 04:00:00',
          '  Last input 00:00:08, output 00:00:05, output hang never',
          '  Last clearing of "show interface" counters never',
          '  Input queue: 0/75/0/0 (size/max/drops/flushes); Total output drops: 0',
          '  Queueing strategy: fifo',
          '  Output queue: 0/40 (size/max)',
          '  5 minute input rate 0 bits/sec, 0 packets/sec',
          '  5 minute output rate 0 bits/sec, 0 packets/sec',
          '     0 packets input, 0 bytes',
          '     Received 0 broadcasts (0 IP multicasts)',
          '     0 runts, 0 giants, 0 throttles',
          '     0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored',
          '     0 watchdog',
          '     0 input packets with dribble condition detected',
          '     0 packets output, 0 bytes, 0 underruns',
          '     0 output errors, 0 collisions, 1 interface resets',
          '     0 unknown protocol drops',
          '     0 babbles, 0 late collision, 0 deferred',
          '     0 lost carrier, 0 no carrier',
          '     0 output buffer failures, 0 output buffers swapped out',
          '',
          'FastEthernet0/1 is administratively down, line protocol is down',
          '  Hardware is Gt96k FE, address is c201.0f3c.0001 (bia c201.0f3c.0001)',
          '  MTU 1500 bytes, BW 100000 Kbit/sec, DLY 100 usec,',
          '     reliability 255/255, txload 1/255, rxload 1/255',
          '  Encapsulation ARPA, loopback not set',
          '  Keepalive set (10 sec)',
          '  Auto-duplex, Auto-speed, media type is RJ45',
          '  output flow-control is unsupported, input flow-control is unsupported',
          '  ARP type: ARPA, ARP Timeout 04:00:00',
          '  Last input never, output never, output hang never',
          '  Last clearing of "show interface" counters never',
          '  Input queue: 0/75/0/0 (size/max/drops/flushes); Total output drops: 0',
          '  Queueing strategy: fifo',
          '  Output queue: 0/40 (size/max)',
          '  5 minute input rate 0 bits/sec, 0 packets/sec',
          '  5 minute output rate 0 bits/sec, 0 packets/sec',
          '     0 packets input, 0 bytes',
          '     Received 0 broadcasts (0 IP multicasts)',
          '     0 runts, 0 giants, 0 throttles',
          '     0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored',
          '     0 watchdog',
          '     0 input packets with dribble condition detected',
          '     0 packets output, 0 bytes, 0 underruns',
          '     0 output errors, 0 collisions, 0 interface resets',
          '     0 unknown protocol drops',
          '     0 babbles, 0 late collision, 0 deferred',
          '     0 lost carrier, 0 no carrier',
          '     0 output buffer failures, 0 output buffers swapped out',
          ''
        ]);
      } else if (command === 'disable') {
        setMode('user');
        setHistory(prev => [...prev, '']);
      } else if (command === 'exit') {
        setMode('user');
        setHistory(prev => [...prev, '']);
      } else if (command === 'help' || command === '?') {
        setHistory(prev => [...prev, 
          'Available commands:',
          '  configure terminal (conf t) - Enter configuration mode',
          '  show running-config (show run) - Display current configuration',
          '  show interfaces (show int) - Display interface status',
          '  disable    - Return to user mode',
          '  exit      - Return to user mode',
          '  help/?    - Show this help message',
          ''
        ]);
      } else {
        setHistory(prev => [...prev, `Command not recognized: ${command}`, '']);
      }
    } else if (mode === 'config') {
      if (command.startsWith('hostname ')) {
        const newHostname = command.split(' ')[1];
        setHistory(prev => [...prev, '']);
        // In a real implementation, we would update the hostname state here
      } else if (command.startsWith('interface ')) {
        const interface_name = command.split(' ')[1];
        setHistory(prev => [...prev, `Configuring interface ${interface_name}`, `${hostname}(config-if)#`]);
        // In a real implementation, we would change to interface config mode
      } else if (command === 'exit') {
        setMode('privileged');
        setHistory(prev => [...prev, '']);
      } else if (command === 'end') {
        setMode('privileged');
        setHistory(prev => [...prev, '']);
      } else if (command === 'help' || command === '?') {
        setHistory(prev => [...prev, 
          'Available configuration commands:',
          '  hostname <name> - Set device hostname',
          '  interface <name> - Configure interface',
          '  exit      - Return to privileged mode',
          '  end       - Return to privileged mode',
          '  help/?    - Show this help message',
          ''
        ]);
      } else {
        setHistory(prev => [...prev, `Command not recognized: ${command}`, '']);
      }
    }
    
    // Clear current command
    setCurrentCommand('');
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCommand.trim()) {
      processCommand(currentCommand);
    }
  };

  return (
    <div className="w-full bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
      <div className="flex items-center justify-between p-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mx-1"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mx-1"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 mx-1"></div>
        </div>
        <div className="text-gray-400 text-sm font-mono">
          {deviceType === 'router' ? 'Router' : 'Switch'} Terminal - {hostname}
        </div>
        <div className="text-gray-400 text-sm">
          {mode === 'user' ? 'User Mode' : mode === 'privileged' ? 'Privileged Mode' : 'Configuration Mode'}
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="p-4 h-80 overflow-y-auto font-mono text-sm text-gray-300 bg-gray-900"
      >
        {/* Welcome message */}
        {history.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-green-400 mb-2">Cisco IOS Software Simulator</p>
            <p className="mb-2">Type 'help' or '?' for available commands.</p>
            <p className="mb-4">{prompts[mode]}</p>
          </motion.div>
        )}
        
        {/* Command history */}
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap mb-1">
            {line}
          </div>
        ))}
        
        {/* Current prompt and command */}
        <form onSubmit={handleSubmit} className="flex mt-2">
          <span className="mr-2">{prompts[mode]}</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            className="flex-grow bg-transparent outline-none"
            autoFocus
          />
        </form>
      </div>
      
      {/* Command suggestions */}
      <div className="p-2 bg-gray-800 border-t border-gray-700 text-xs text-gray-400">
        <p>Tip: Try commands like 'enable', 'show run', or 'configure terminal'</p>
      </div>
    </div>
  );
}
