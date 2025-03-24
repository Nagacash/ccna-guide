module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
    safelist: [
      // Backgrounds
      'bg-blue-50', 'bg-blue-600',
      'bg-cyan-50', 'bg-cyan-600',
      'bg-green-50', 'bg-green-600',
      'bg-purple-50', 'bg-purple-600',
      'bg-orange-50', 'bg-orange-600',
      
      // Texts
      'text-blue-600',
      'text-cyan-600',
      'text-green-600',
      'text-purple-600',
      'text-orange-600',
      
      // Borders
      'border-blue-600',
      'border-cyan-600',
      'border-green-600',
      'border-purple-600',
      'border-orange-600',
      
      // Others
      'h-3'
    ]
  }