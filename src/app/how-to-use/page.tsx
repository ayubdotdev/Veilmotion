"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check, Terminal, FileCode, Star, ExternalLink, Download } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HowToUsePage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const installationCommands = {
    npm: "npm install framer-motion",
    yarn: "yarn add framer-motion",
    pnpm: "pnpm add framer-motion",
    gsap: "npm install gsap"
  };

  const exampleUsage = `import { PurpleGradient } from "./components/bg";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Your background animation */}
      <PurpleGradient />
      
      {/* Your page content */}
      <div className="relative z-10">
        <h1>Your Content Here</h1>
        <p>This content will appear over the animated background</p>
      </div>
    </div>
  );
}`;

  const exampleBgComponent = `// components/bg.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface PurpleGradientProps {
  children?: React.ReactNode;
}

export const PurpleGradient: React.FC<PurpleGradientProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Radial Gradient Background with Fade-in Animation */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
        }}
      />

      {/* Your Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

/* 
USAGE EXAMPLE:
import { PurpleGradient } from "./components/bg";

export default function HomePage() {
  return (
    <PurpleGradient>
      <h1>Your content goes here</h1>
    </PurpleGradient>
  );
}
*/`;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-black">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Back Button */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              How to Use Veilmotion
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Get started with beautiful animated backgrounds in your React projects. Follow these simple steps to integrate Veilmotion patterns into your application.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Step 1: Installation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full font-bold text-sm">
              1
            </div>
            <h2 className="text-2xl font-bold">Installation</h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Most Veilmotion patterns use <strong>Framer Motion</strong> for animations. Some advanced patterns may require <strong>GSAP</strong>.
          </p>

          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                Install Framer Motion (Required for most patterns)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {Object.entries(installationCommands).slice(0, 3).map(([manager, command]) => (
                  <div key={manager} className="relative">
                    <code className="block bg-gray-900 text-green-400 p-3 rounded text-sm font-mono pr-12">
                      {command}
                    </code>
                    <button
                      onClick={() => handleCopyCode(command, manager)}
                      className="absolute right-2 top-2 text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedCode === manager ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-amber-800 dark:text-amber-200">
                <Terminal className="h-4 w-4" />
                Install GSAP (Only for advanced dot patterns)
              </h3>
              <div className="relative max-w-md">
                <code className="block bg-gray-900 text-green-400 p-3 rounded text-sm font-mono pr-12">
                  {installationCommands.gsap}
                </code>
                <button
                  onClick={() => handleCopyCode(installationCommands.gsap, 'gsap')}
                  className="absolute right-2 top-2 text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'gsap' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-2">
                Only install GSAP if you're using the "React-Bits Dot Grid" pattern or other GSAP-dependent animations.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Step 2: Usage */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full font-bold text-sm">
              2
            </div>
            <h2 className="text-2xl font-bold">How to Use</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-blue-800 dark:text-blue-200">
                Step-by-step process:
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-blue-700 dark:text-blue-300">
                <li>Browse patterns on Veilmotion and find one you like</li>
                <li>Click the "Copy" button to copy the pattern code</li>
                <li>Create a file called <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-sm">components/bg.tsx</code> in your project</li>
                <li>Paste the copied code into this file</li>
                <li>Import and use the component in your pages</li>
              </ol>
            </div>

            {/* Example Code Block */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FileCode className="h-4 w-4" />
                Example: Using the Purple Gradient Pattern
              </h3>
              
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm">
                  <code>{exampleBgComponent}</code>
                </pre>
                <button
                  onClick={() => handleCopyCode(exampleBgComponent, 'bgComponent')}
                  className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded transition-colors"
                >
                  {copiedCode === 'bgComponent' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Usage in Page */}
            <div>
              <h3 className="font-semibold mb-3">Then use it in your page:</h3>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm">
                  <code>{exampleUsage}</code>
                </pre>
                <button
                  onClick={() => handleCopyCode(exampleUsage, 'usage')}
                  className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded transition-colors"
                >
                  {copiedCode === 'usage' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Step 3: Demo Usage */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full font-bold text-sm">
              3
            </div>
            <h2 className="text-2xl font-bold">Understanding the Code Structure</h2>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h3 className="font-semibold mb-3 text-green-800 dark:text-green-200">
              📝 Demo Usage in Comments
            </h3>
            <p className="text-green-700 dark:text-green-300 mb-4">
              Every pattern you copy will include a commented usage example at the top or bottom of the code. Look for sections like:
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded text-sm font-mono">
              <span className="text-green-400">/* </span><br />
              <span className="text-green-400">USAGE EXAMPLE:</span><br />
              <span className="text-green-400">import &#123; PatternName &#125; from "./components/bg";</span><br />
              <span className="text-green-400">*/</span>
            </div>
            <p className="text-green-700 dark:text-green-300 mt-4">
              These comments show you exactly how to implement the pattern in your project!
            </p>
          </div>
        </motion.section>

        {/* Step 4: Support */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full font-bold text-sm">
              4
            </div>
            <h2 className="text-2xl font-bold">Show Your Support</h2>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
            <div className="text-center">
              <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Love Veilmotion?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                If you find Veilmotion useful for your projects, please consider giving it a star on GitHub! 
                It helps others discover these beautiful animations and supports the project's growth.
              </p>
              <a
                href="https://github.com/yourusername/veilmotion"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Star className="h-5 w-5" />
                Star on GitHub
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.section>

        {/* Quick Tips */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6">💡 Quick Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Performance</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Most patterns are optimized for performance, but for complex animations, consider using them selectively on key pages.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Customization</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Feel free to modify colors, speeds, and other properties in the code to match your brand and design needs.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Responsive Design</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                All patterns are built with responsive design in mind and work great on mobile devices.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Dark Mode</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Many patterns support dark mode out of the box. Check the pattern's styling for dark: prefixes.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Back to Patterns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            <Download className="h-5 w-5" />
            Browse Patterns
          </Link>
        </motion.div>
      </div>
    </div>
  );
}