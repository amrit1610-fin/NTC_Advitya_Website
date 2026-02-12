'use client'

import { motion } from 'framer-motion'
import Hero from '@/components/Hero'
import Link from 'next/link'

export default function Home() {
    return (
        <main className="min-h-screen">
            <Hero />

            {/* Event Details Section */}
            <section id="details" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="gradient-text-green">About the Event</span>
                        </h2>
                        <p className="text-gray-700 text-lg max-w-3xl mx-auto">
                            VIT Bhopal University presents an exhilarating competition of strength, strategy, and teamwork
                        </p>
                    </motion.div>

                    {/* Main Event Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-strong rounded-3xl p-8 md:p-12 mb-12"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-5xl">🏆</span>
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
                                Seize the Summit
                            </h3>
                        </div>

                        <p className="text-gray-700 text-lg leading-relaxed mb-8">
                            Welcome to Seize the Summit! '26, the ultimate battle of strength where groups of extremely
                            talented students come together to compete and test their physical and mental strength. The
                            Nature and Trekking Club of VIT Bhopal University invites you to participate in this
                            exhilarating event and showcase your extreme fighting skills!
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/70 rounded-2xl p-6 border border-green-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-3xl">👥</span>
                                    <h4 className="text-xl font-semibold text-gray-800">Team Format</h4>
                                </div>
                                <p className="text-gray-600">
                                    Form a team of 4-5 members and show the trust in your teammates. Each member brings
                                    unique strengths to help your team succeed.
                                </p>
                            </div>

                            <div className="bg-white/70 rounded-2xl p-6 border border-green-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-3xl">💪</span>
                                    <h4 className="text-xl font-semibold text-gray-800">Multiple Rounds</h4>
                                </div>
                                <p className="text-gray-600">
                                    The game will be played in multiple rounds. Teams need to bring forward their best
                                    contenders as per their intuition.
                                </p>
                            </div>

                            <div className="bg-white/70 rounded-2xl p-6 border border-green-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-3xl">🎯</span>
                                    <h4 className="text-xl font-semibold text-gray-800">Challenging Tasks</h4>
                                </div>
                                <p className="text-gray-600">
                                    Members will be given tasks that test their physical and mental strength. Strategy
                                    and teamwork are key to victory!
                                </p>
                            </div>

                            <div className="bg-white/70 rounded-2xl p-6 border border-green-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-3xl">🎁</span>
                                    <h4 className="text-xl font-semibold text-gray-800">Exciting Prizes</h4>
                                </div>
                                <p className="text-gray-600">
                                    The team that gains the maximum points Seizes the Summit and takes back some
                                    exciting gifts!
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-center"
                    >
                        <div className="glass rounded-3xl p-12 border-2 border-green-300">
                            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                                Ready to Take on the Challenge?
                            </h3>
                            <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
                                Gather your team, prepare for the ultimate test, and register now to secure your spot
                                in this thrilling competition!
                            </p>
                            <Link href="/register">
                                <button className="btn-primary text-xl px-10 py-5">
                                    Register Your Team Now →
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 border-t border-green-200">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-gray-700 mb-2">
                        Organized by <span className="text-green-700 font-semibold">Nature and Trekking Club</span>
                    </p>
                    <p className="text-gray-600">
                        VIT Bhopal University
                    </p>
                </div>
            </footer>
        </main>
    )
}
