'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function SuccessContent() {
    const searchParams = useSearchParams()
    const teamName = searchParams.get('team') || 'Your Team'
    const paymentCompleted = searchParams.get('payment') === 'true'

    return (
        <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl w-full"
            >
                <div className="glass-strong rounded-3xl p-12 text-center">
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="mb-8"
                    >
                        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-5xl text-white">
                            ✓
                        </div>
                    </motion.div>

                    {/* Success Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                            {paymentCompleted ? 'Registration Complete! 🎉' : 'Registration Successful! 🎉'}
                        </h1>
                        <p className="text-xl text-gray-700 mb-2">
                            <span className="gradient-text-green font-semibold">{teamName}</span> is now registered!
                        </p>
                        <p className="text-gray-600 mb-8">
                            {paymentCompleted
                                ? 'Your payment has been submitted successfully. We will verify it and contact you soon!'
                                : 'Get ready to Seize the Summit! We\'ll contact you soon with further details.'
                            }
                        </p>
                    </motion.div>

                    {/* Info Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="grid md:grid-cols-2 gap-4 mb-8"
                    >
                        <div className="bg-white/70 rounded-2xl p-6 border border-green-200">
                            <div className="text-3xl mb-3">💳</div>
                            <h3 className="font-semibold text-gray-800 mb-2">Payment Submitted</h3>
                            <p className="text-gray-600 text-sm">
                                Your payment screenshot has been received
                            </p>
                        </div>
                        <div className="bg-white/70 rounded-2xl p-6 border border-green-200">
                            <div className="text-3xl mb-3">✅</div>
                            <h3 className="font-semibold text-gray-800 mb-2">Under Verification</h3>
                            <p className="text-gray-600 text-sm">
                                We'll verify your payment and confirm shortly
                            </p>
                        </div>
                    </motion.div>

                    {/* Next Steps */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8"
                    >
                        <h3 className="font-semibold text-gray-800 mb-3 text-lg">What's Next?</h3>
                        <ul className="text-left text-gray-700 space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">•</span>
                                <span>Prepare your team for the challenges ahead</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">•</span>
                                <span>Stay fit and practice teamwork exercises</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">•</span>
                                <span>Wait for our email with event schedule and rules</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="/">
                            <button className="btn-primary px-8 py-3">
                                Back to Home
                            </button>
                        </Link>
                        <Link href="/register">
                            <button className="btn-secondary px-8 py-3">
                                Register Another Team
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </main>
    )
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    )
}
