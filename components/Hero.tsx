'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-100 to-white"></div>
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-400 rounded-full filter blur-3xl animate-pulse-slow"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-300 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Club Name */}
                    <motion.p
                        className="text-green-700 font-semibold text-2xl md:text-3xl mb-4 tracking-wider"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        NATURE AND TREKKING CLUB
                    </motion.p>

                    {/* Main Title */}
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <span className="gradient-text">Seize the Summit</span>
                        <br />
                        <span className="text-gray-800">'26</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        The ultimate battle of strength where teams compete to test their physical and mental prowess
                    </motion.p>


                    {/* Event Poster */}
                    <motion.div
                        className="mb-8 max-w-lg mx-auto"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.65 }}
                    >
                        <img
                            src="/event-poster.jpg"
                            alt="Seize the Summit '26 Event Poster"
                            className="rounded-2xl shadow-2xl border-4 border-green-300 hover:scale-105 transition-transform duration-300"
                        />
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <Link href="/register">
                            <button className="btn-primary text-lg px-8 py-4">
                                Register Your Team 🏆
                            </button>
                        </Link>
                        <a href="#details">
                            <button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 rounded-xl font-semibold transition-all shadow-lg">
                                Learn More
                            </button>
                        </a>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        <div className="glass rounded-2xl p-6">
                            <p className="text-3xl font-bold gradient-text-green">4-5</p>
                            <p className="text-gray-600 text-sm mt-2">Members per Team</p>
                        </div>
                        <div className="glass rounded-2xl p-6">
                            <p className="text-3xl font-bold gradient-text-green">Multiple</p>
                            <p className="text-gray-600 text-sm mt-2">Rounds</p>
                        </div>
                        <div className="glass rounded-2xl p-6">
                            <p className="text-3xl font-bold gradient-text-green">Exciting</p>
                            <p className="text-gray-600 text-sm mt-2">Prizes</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="w-6 h-10 border-2 border-green-600/40 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-green-600 rounded-full mt-2"></div>
                </div>
            </motion.div>
        </div>
    )
}
