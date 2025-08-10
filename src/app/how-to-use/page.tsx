"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check, Terminal, FileCode, Star, ExternalLink, Download, SearchCode, SearchSlash, SearchCheckIcon, SearchX, Code2Icon, EyeIcon, ExternalLinkIcon, View, GithubIcon, EyeOff, LucideScanEye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { RainbowButton } from "../components/rainbow-button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import Image from "next/image";
import Demo from "../components/Demo";

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

const installationCommands = {
  framer: {
    npm: "npm install framer-motion",
    yarn: "yarn add framer-motion",
    pnpm: "pnpm add framer-motion",
    bun: "bun add framer-motion",
  },
  gsap: {
    npm: "npm install gsap",
    yarn: "yarn add gsap",
    pnpm: "pnpm add gsap",
    bun: "bun add gsap",
  },
};

export default function HowToUsePage() {
  const [selectedFramerManager, setSelectedFramerManager] = useState<PackageManager>("npm");
  const [selectedGsapManager, setSelectedGsapManager] = useState<PackageManager>("npm");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);


  const handleCopyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(key);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const renderCommandBox = (
    label: string,
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
            className={`px-4 py-2 text-sm border-b-2 transition-colors ${selectedManager === manager
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



  const exampleUsage = `"use client";
import { TealGradientBlackTop } from "@/bgs/Gradients";
import React from "react";

export default function Demo() {
  return (
    <div className="h-screen relative overflow-hidden">
      <TealGradientBlackTop  />
      {/* Foreground Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {/* Your components goes here */}
        <div className="text-center">
          <p className="text-4xl font-bold text-white">Your Components Goes Here</p>
          <p className="text-lg text-gray-300 mt-2">
            Replace this with any UI elements, cards, forms, etc.
          </p>
        </div>
      </div>
    </div>
  );
}
`;
  const exampleBgComponent = `
  //components/bg.tsx
  "use client";
  import React from "react";
  import { motion } from "framer-motion";
  
  export const TealBlackTop = () => {
    return (
      <div className="min-h-screen w-full relative overflow-hidden">
        {/* Radial Gradient Background: near-black base fading to teal */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            background: "radial-gradient(125% 125% at 50% 90%, #0a0a0a 40%, #14b8a6 100%)",
          }}
        />
      </div>
    );
  };
  
/*Example USAGE:
"use client";
 import React from "react";
 import { TealBlackTop } from "./component/bg";

 export default function HomePage() {
   return (
     <div className="h-screen relative overflow-hidden">
       <TealBlackTop/>

       //Foreground Content
       <div className="absolute inset-0 z-10 flex items-center justify-center">
         // Your components goes here
         <div className="text-center">
           <p className="text-4xl font-bold text-white">Your Components Go Here</p>
           <p className="text-lg text-gray-300 mt-2">
             Replace this with any UI elements, cards, forms, etc.
           </p>
         </div>
       </div>
     </div>
   );
 }*/`;


  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-black">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-4xl mx-auto px-4 py-16 relative z-10">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50 mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 " />
            Back to Home
          </Link>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-500">
              How to Use Veilmotion?
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Get started with beautiful animated backgrounds in your projects. Follow these simple steps to integrate Veilmotion patterns into your application.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 ">
        {/* Step 1: Installation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6 bg-">
            <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full font-bold text-sm">
              1
            </div>
            <h2 className="text-2xl font-bold">Installation</h2>
          </div>

          <div className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg p-6">
            Most Veilmotion patterns use <strong>Framer Motion</strong> for animations. Some advanced patterns may
            require <strong>GSAP</strong>.


            <div className="space-y-6">
              {/* Framer Motion */}
              <div className="pt-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  Framer Motion <span className="text-green-300">(Mostly)</span>
                </h3>

                {renderCommandBox(
                  "Framer Motion",
                  installationCommands.framer[selectedFramerManager],
                  "framer",
                  selectedFramerManager,
                  setSelectedFramerManager
                )}

              </div>

              {/* GSAP */}
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2 ">
                  GSAP<span className="text-blue-400">(Rarely)</span>
                </h3>
                {renderCommandBox(
                  "GSAP",
                  installationCommands.gsap[selectedGsapManager],
                  "gsap",
                  selectedGsapManager,
                  setSelectedGsapManager
                )}
              </div>
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
                <li>Click the &quot;Copy&quot; button to copy the pattern code</li>
                <li>Create a file called <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-sm">components/bg.tsx</code> in your project</li>
                <li>Paste the copied code into this file</li>
                <li>Import and use the component in your pages</li>
              </ol>
            </div>

            {/* Example Code Block */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                Example: Using the Teal Gradient
              </h3>

              <div className="relative">

                <SyntaxHighlighter language="tsx" style={oneDark} customStyle={{ borderRadius: '0.5rem', padding: '1.5rem', fontSize: '0.875rem' }}>
                  {exampleBgComponent}
                </SyntaxHighlighter>
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
                <SyntaxHighlighter language="tsx" style={oneDark} customStyle={{ borderRadius: '0.5rem', padding: '1.5rem', fontSize: '0.875rem' }}>
                  {exampleUsage}
                </SyntaxHighlighter>
                <button
                  onClick={() => handleCopyCode(exampleUsage, 'usage')}
                  className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded transition-colors"
                >
                  {copiedCode === 'usage' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Demo Preview */}
            <div className="bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-center justify-center text-gray-800 dark:text-gray-200 flex items-center gap-2">
                Demo Result              </h3>
              <p className="text-gray-600 text-center justify-center dark:text-gray-300 mb-4">
                Here&apos;s what the TealBlackTop background pattern looks like when implemented
              </p>
              <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
                <Demo />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
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

          <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-6">
            <h3 className="font-semibold mb-3 text-teal-800 dark:text-teal-200">
              Demo Usage in Comments
            </h3>
            <p className="text-teal-700 dark:text-teal-300 mb-4">
              Every pattern you copy will include a commented usage example at the top or bottom of the code. <br />Look for sections like:
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded text-sm font-mono">
              <span className="text-green-400">{`/*`}</span><br />
              <span className="text-green-400">USAGE EXAMPLE:</span><br />
              <span className="text-green-400">import &#123; PatternName &#125; from &quot;./components/bg&quot;;</span><br />
              <span className="text-green-400">{`*/`}</span>
            </div>
            <p className="text-teal-700 dark:text-teal-300 mt-4">
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
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1], opacity: [1, 0.9, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Star className="h-12 w-12 text-yellow-400 fill-yellow-400 mx-auto mb-4 drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]" />
              </motion.div>             
               <h3 className="text-lg font-semibold mb-2">Love Veilmotion?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                If you find Veilmotion useful for your projects, please consider giving it a star on GitHub!
                <br></br> It helps others discover these beautiful animations and supports the project&apos;s growth.
              </p>
              <RainbowButton>
                <a
                  href="https://github.com/ayubdotdev/Veilmotion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-lg inline-flex items-center gap-2  text-gray px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <GithubIcon className="h-5 w-5 " />
                  Star on GitHub
                </a>
              </RainbowButton>

            </div>
          </div>
        </motion.section>


        {/* Back to Patterns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center pb-8"
        >
          <InteractiveHoverButton>

            <Link
              href="/"
              className="inline-flex items-center gap-2 "
            >
              Browse More Motions!
            </Link>
          </InteractiveHoverButton>
        </motion.div>
      </div>
    </div>
  );
}