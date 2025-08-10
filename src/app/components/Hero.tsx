"use client";

import { Code2Icon, Copy, Eye, GitBranch } from "lucide-react";
import Link from "next/link";
import { RainbowButton } from "./rainbow-button";

interface HeroProps {
    activePattern?: string | null;
    setActivePattern?: (pattern: string | null) => void;
    theme: "light" | "dark";
}

export default function Hero({ activePattern, setActivePattern, theme }: HeroProps) {
    const isPatternDark = theme === "dark";

    return (
        <section className="h-screen flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 sm:pt-8 pt-10">
            <div className="max-w-4xl w-full mx-auto relative pt-10  z-10">
                {/* Main Heading */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black dark:text-white mb-3">
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-indigo-700 via-indigo-500 to-indigo-300">
                            Veilmotion
                        </span>{' '}
                        brings <br />visuals to life
                    </h1>
                </div>

                {/* Description */}
                <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed text-gray dark:text-gray-200">
                    Discover hand-crafted, responsive background animations and CSS particle systems. Seamlessly plug them into any project — built with Tailwind CSS and powered by Framer Motion.
                </p>

                {/* Feature Highlights */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-10  ">
                    {/* Copy Feature */}
                    <div className=" flex items-center gap-3 p-4 rounded-xl shadow-lg backdrop-blur-md transition-all duration-300 border  w-full sm:w-auto">
                        <div className="p-2 rounded-lg  bg-violet-500/20  ">
                            <Copy className="dark:text-violet-300 text-violet-600 h-5 w-5" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-semibold text-sm text-black dark:text-white">One-Click Copy</h3>
                            <p className="text-xs  dark:text-gray-400 ">Instant CSS snippets</p>
                        </div>
                    </div>

                    {/* Live Preview */}
                    <div className=" flex items-center gap-3 p-4 rounded-xl shadow-lg backdrop-blur-md transition-all duration-300 border w-full sm:w-auto">
                        <div className="p-2 rounded-lg  bg-violet-500/20  ">
                            <Eye className="text-pink-600 dark:text-pink-300 h-5 w-5" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-semibold text-sm text-black dark:text-white">Live Preview</h3>
                            <p className="text-xs  dark:text-gray-400 ">Instant animations Demo</p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10 px-4">

                    <RainbowButton>
                        <Link
                            href="/how-to-use"
                            className="group flex items-center gap-2 px-3 py-2  text-white dark:text-black text-lg "
                        >
                            <Code2Icon className="size-5  " />
                            How to Use?
                        </Link>
                    </RainbowButton>

                    <RainbowButton variant={"outline"}>

                    <Link
                        href="/how-to-contribute"
                        className="group flex items-center gap-2 px-3 py-2  text-black dark:text-white text-lg "
                    >
                        <GitBranch className="h-5 w-5  transition-transform duration-300" />
                        How to Contribute?
                    </Link>
                    </RainbowButton>

                </div>

                {/* Stats */}
                <div className={`flex justify-center gap-8 pt-6 border-t ${isPatternDark ? "border-white/20" : "border-gray-300 dark:border-gray-700"}`}>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-black dark:text-white">50+</div>
                        <div className="text-sm  text-black dark:text-white">Backgrounds</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-black dark:text-white">Free</div>
                        <div className="text-sm  text-black dark:text-white">Open to all</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-black dark:text-white">Tailwind</div>
                        <div className="text-sm  text-black dark:text-white">+ Framer Motion</div>
                    </div>
                </div>
            </div>
        </section >
    );
}
