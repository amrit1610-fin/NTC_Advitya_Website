'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import PaymentForm from '@/components/PaymentForm'

function PaymentContent() {
    const searchParams = useSearchParams()
    const teamId = searchParams.get('teamId') || ''
    const teamName = searchParams.get('teamName') || 'Your Team'

    if (!teamId) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Invalid Access</h1>
                    <p className="text-gray-600 mb-6">Please complete the registration first.</p>
                    <Link href="/register">
                        <button className="btn-primary px-8 py-3">Go to Registration</button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="max-w-3xl mx-auto mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        Step 2 of 2
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">Complete Payment</span>
                    </h1>
                    <p className="text-gray-700 text-lg">
                        Team: <span className="font-semibold text-green-700">{teamName}</span>
                    </p>
                    <p className="text-gray-600 mt-2">
                        Almost done! Complete the payment to finalize your registration
                    </p>
                </motion.div>
            </div>

            {/* Payment Form */}
            <PaymentForm teamId={teamId} teamName={teamName} />

            {/* Help Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-3xl mx-auto mt-12"
            >
                <div className="glass rounded-2xl p-6 text-center">
                    <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
                    <p className="text-gray-600 text-sm">
                        If you face any issues with payment, please contact us at{' '}
                        <a href="mailto:nature.trekking@vitbhopal.ac.in" className="text-green-600 hover:text-green-700 font-medium">
                            nature.trekking@vitbhopal.ac.in
                        </a>
                    </p>
                </div>
            </motion.div>
        </main>
    )
}

export default function PaymentPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-800 text-xl">Loading...</div>
            </div>
        }>
            <PaymentContent />
        </Suspense>
    )
}
