"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check, Terminal, FileCode, GitBranch, Code2Icon, Users, Heart, Github, Plus, Lightbulb, Bug, Palette, GitPullRequest, GitPullRequestArrow, ShieldCheck, Link2, Image, FileText, NotebookTabs, NotebookIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { RainbowButton } from "../components/rainbow-button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

const cloneCommands = {
  npm: "git clone https://github.com/ayubdotdev/Veilmotion.git && cd Veilmotion && npm install",
  yarn: "git clone https://github.com/ayubdotdev/Veilmotion.git && cd Veilmotion && yarn install",
  pnpm: "git clone https://github.com/ayubdotdev/Veilmotion.git && cd Veilmotion && pnpm install",
  bun: "git clone https://github.com/ayubdotdev/Veilmotion.git && cd Veilmotion && bun install",
};

export default function HowToContributePage() {
  const [selectedManager, setSelectedManager] = useState<PackageManager>("npm");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(key);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const renderCommandBox = (
    command: string,
    key: string,
    selectedManager: PackageManager,
    setSelectedManager: React.Dispatch<React.SetStateAction<PackageManager>>
  ) => (
    <div className="relative bg-black text-white rounded-xl p-4 border border-white/10 shadow-lg">
      {/* Icon + Tabs Row */}
      <div className="flex items-center gap-2 mb-4 border-b border-white/10 text-sm text-white">
        <Terminal className="h-4 w-4 text-white/80" />
        {(["pnpm", "npm", "yarn", "bun"] as PackageManager[]).map((manager) => (
          <button
            key={manager}
            onClick={() => setSelectedManager(manager)}
            className={`px-4 py-2 text-sm border-b-2 transition-colors ${
              selectedManager === manager
                ? "border-white text-white"
                : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            {manager}
          </button>
        ))}
      </div>

      {/* Command Box */}
      <code className="block text-sm font-mono">{command}</code>

      {/* Copy Button */}
      <button
        onClick={() => handleCopyCode(command, key)}
        className="absolute right-3 top-3 text-white/50 hover:text-white"
      >
        {copiedCode === key ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );

  const examplePattern = `"use client";

import React from "react";
import { motion } from "framer-motion";

interface MyAwesomePatternProps {
  children?: React.ReactNode;
}

export const MyAwesomePattern: React.FC<MyAwesomePatternProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Your creative background animation */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: "your-amazing-gradient-or-pattern",
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};`;

  const patternRegistration = `// In src/app/utils/patterns.ts
import { MyAwesomePattern } from "@/bgs/YourCategory";

const patterns: Pattern[] = [
  // ... existing patterns
  {
    id: "my-awesome-pattern",
    name: "My Awesome Pattern",
    category: "Gradients", // or "Grids", "Effects", "Dots"
    style: {},
    component: MyAwesomePattern,
    code: \`// Your pattern code here\`,
    isLightBackground: false, // set to true if it's a light pattern
  },
];

// In src/app/components/PatternComponents.tsx
export const PatternComponents: Record<string, React.FC> = {
  // ... existing patterns
  "my-awesome-pattern": MyAwesomePattern,
};`;



  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-black">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-4xl mx-auto px-4 py-16 relative z-10">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 mb-8 group"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-500">
              How to Contribute to Veilmotion?
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Help us build the most beautiful collection of background animations! Whether you&apos;re a designer, developer, or just passionate about great UI, there&apos;s a way for you to contribute.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
    

        {/* Step 1: Setup */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full font-bold text-sm">
              1
            </div>
            <h2 className="text-2xl font-bold">Set Up Your Development Environment</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-blue-800 dark:text-blue-200 flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                Fork and Clone the Repository
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-blue-700 dark:text-blue-300 mb-4">
                <li>Fork the repository on GitHub</li>
                <li>Clone your fork locally</li>
                <li>Install dependencies</li>
                <li>Start the development server</li>
              </ol>

              {renderCommandBox(
                cloneCommands[selectedManager],
                "clone",
                selectedManager,
                setSelectedManager
              )}
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-green-800 dark:text-green-200">
                Start Development Server
              </h3>
              <div className="relative bg-black text-white rounded-xl p-4 border border-white/10 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="h-4 w-4 text-white/80" />
                  <span className="text-sm text-white/80">Run development server</span>
                </div>
                <code className="block text-sm font-mono">npm run dev</code>
                <button
                  onClick={() => handleCopyCode("npm run dev", "dev")}
                  className="absolute right-3 top-3 text-white/50 hover:text-white"
                >
                  {copiedCode === "dev" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Step 2: Creating Patterns */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full font-bold text-sm">
              2
            </div>
            <h2 className="text-2xl font-bold">Creating New Patterns</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-purple-800 dark:text-purple-200">
                Pattern Structure Guidelines:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-purple-700 dark:text-purple-300">
                <li>Create patterns in the appropriate category folder: <code className="bg-purple-100 dark:bg-purple-800 px-2 py-1 rounded text-sm">src/bgs/</code></li>
                <li>Use <strong>Framer Motion</strong> for animations (preferred)</li>
                <li>Follow the existing naming conventions</li>
                <li>Include proper TypeScript interfaces</li>
                <li>Make patterns responsive and performant</li>
                <li>Add a usage comment at the top of your code</li>
              </ul>
            </div>

            {/* Example Pattern Code */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                Example: Creating a New Pattern
              </h3>
              <div className="relative">
                <SyntaxHighlighter 
                  language="tsx" 
                  style={oneDark} 
                  customStyle={{ borderRadius: '0.5rem', padding: '1.5rem', fontSize: '0.875rem' }}
                >
                  {examplePattern}
                </SyntaxHighlighter>
                <button
                  onClick={() => handleCopyCode(examplePattern, 'examplePattern')}
                  className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded transition-colors"
                >
                  {copiedCode === 'examplePattern' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Pattern Registration */}
            <div>
              <h3 className="font-semibold mb-3">Register Your Pattern:</h3>
              <div className="relative">
                <SyntaxHighlighter 
                  language="tsx" 
                  style={oneDark} 
                  customStyle={{ borderRadius: '0.5rem', padding: '1.5rem', fontSize: '0.875rem' }}
                >
                  {patternRegistration}
                </SyntaxHighlighter>
                <button
                  onClick={() => handleCopyCode(patternRegistration, 'registration')}
                  className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded transition-colors"
                >
                  {copiedCode === 'registration' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Step 3: Categories */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full font-bold text-sm">
              3
            </div>
            <h2 className="text-2xl font-bold">Pattern Categories</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: "Gradients", desc: "Beautiful gradient backgrounds with smooth transitions", folder: "src/bgs/Gradients" },
              { name: "Grids", desc: "Animated grid patterns with various effects", folder: "src/bgs/Geometrics" },
              { name: "Dots", desc: "Particle systems and dot-based animations", folder: "src/bgs/Dots" },
              { name: "Effects", desc: "Special effects like glows, orbs, and morphs", folder: "src/bgs/Effects" }
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <h4 className="font-semibold text-indigo-600 dark:text-indigo-400">{category.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{category.desc}</p>
                <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{category.folder}</code>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Step 4: Submission */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full font-bold text-sm">
              4
            </div>
            <h2 className="text-2xl font-bold">Submit Your Contribution</h2>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h3 className="font-semibold mb-4 text-green-800 dark:text-green-200 flex items-center gap-2">
              <GitPullRequestArrow className="h-5 w-5" />
              Pull Request Checklist
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2 text-green-700 dark:text-green-300">Before Submitting:</h4>
                <ul className="text-sm space-y-1 text-green-600 dark:text-green-400">
                  <li>✅ Test your pattern works correctly</li>
                  <li>✅ Follow existing code style</li>
                  <li>✅ Add proper TypeScript types</li>
                  <li>✅ Update pattern registry</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-blue-700 dark:text-blue-300">PR Description:</h4>
                <ul className="text-sm space-y-1 text-blue-600 dark:text-blue-400">
            <li className="flex items-center gap-2">
              <NotebookIcon className="h-4 w-4" /> Describe your pattern/changes
            </li>
            <li className="flex items-center gap-2">
              <Image className="h-4 w-4" /> Add screenshot if visual
            </li>
            <li className="flex items-center gap-2">
              <Link2 className="h-4 w-4" /> Mention related issues
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Note testing done
            </li>
          </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Community */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full font-bold text-sm">
              5
            </div>
            <h2 className="text-2xl font-bold">Join Our Community</h2>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6">
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Users className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">Get Help & Connect</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Need help getting started? Have questions about contributions? Join our community!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <RainbowButton>
                  <a
                    href="https://github.com/ayubdotdev/Veilmotion/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-lg inline-flex items-center gap-2 text-gray px-6 py-3 rounded-lg font-semibold"
                  >
                    <Bug className="h-5 w-5" />
                    Report Issues
                  </a>
                </RainbowButton>
                
                <RainbowButton variant="outline">
                  <a
                    href="https://github.com/ayubdotdev/Veilmotion/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-lg inline-flex items-center gap-2 text-black dark:text-white px-6 py-3 rounded-lg font-semibold"
                  >
                    <Users className="h-5 w-5" />
                    Join Discussions
                  </a>
                </RainbowButton>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center"
        >
          <InteractiveHoverButton>
            <Link href="/" className="inline-flex items-center gap-2">
              Explore Existing Patterns
            </Link>
          </InteractiveHoverButton>
        </motion.div>
      </div>
    </div>
  );
}