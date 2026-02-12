'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import RegistrationForm from '@/components/RegistrationForm'

export default function RegisterPage() {
    return (
        <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-12">
                <Link href="/" className="inline-flex items-center text-green-700 hover:text-green-600 transition-colors mb-8">
                    <span className="mr-2">←</span> Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">Team Registration</span>
                    </h1>
                    <p className="text-gray-700 text-lg">
                        Fill in the details below to register your team for Seize the Summit '26
                    </p>
                </motion.div>
            </div>

            {/* Registration Form */}
            <RegistrationForm />

            {/* Info Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-4xl mx-auto mt-12 grid md:grid-cols-3 gap-6"
            >
                <div className="glass rounded-2xl p-6 text-center">
                    <div className="text-3xl mb-3">⚡</div>
                    <h3 className="font-semibold text-gray-800 mb-2">Quick Process</h3>
                    <p className="text-gray-600 text-sm">Registration takes less than 5 minutes</p>
                </div>
                <div className="glass rounded-2xl p-6 text-center">
                    <div className="text-3xl mb-3">🔒</div>
                    <h3 className="font-semibold text-gray-800 mb-2">Secure Data</h3>
                    <p className="text-gray-600 text-sm">Your information is safely stored</p>
                </div>
                <div className="glass rounded-2xl p-6 text-center">
                    <div className="text-3xl mb-3">✉️</div>
                    <h3 className="font-semibold text-gray-800 mb-2">Confirmation</h3>
                    <p className="text-gray-600 text-sm">Instant confirmation upon registration</p>
                </div>
            </motion.div>
        </main>
    )
}
