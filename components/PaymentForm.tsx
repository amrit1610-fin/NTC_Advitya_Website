'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface PaymentFormProps {
    teamId: string
    teamName: string
}

export default function PaymentForm({ teamId, teamName }: PaymentFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string>('')

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file (JPG, PNG, etc.)')
            return
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB')
            return
        }

        setSelectedFile(file)
        setError('')

        // Create preview
        const reader = new FileReader()
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!selectedFile) {
            setError('Please upload a payment screenshot')
            return
        }

        setLoading(true)
        setError('')

        try {
            // Convert file to base64
            const reader = new FileReader()
            reader.readAsDataURL(selectedFile)

            reader.onloadend = async () => {
                const base64String = reader.result as string

                const response = await fetch('/api/payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        teamId,
                        paymentScreenshot: base64String,
                        amount: 349
                    }),
                })

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.error || 'Payment submission failed')
                }

                // Redirect to success page
                router.push(`/success?team=${encodeURIComponent(teamName)}&payment=true`)
            }

            reader.onerror = () => {
                throw new Error('Failed to read file')
            }

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
            setLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
        >
            <form onSubmit={handleSubmit} className="glass-strong rounded-3xl p-8 md:p-12">
                {/* Registration Fee */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Registration Fee</h2>
                    <p className="text-5xl font-bold gradient-text-green">₹349</p>
                </div>

                {/* Bank Details */}
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span>🏦</span> Bank Details
                    </h3>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-green-200">
                            <span className="text-gray-600 font-medium">Account Name:</span>
                            <span className="text-gray-800 font-semibold">NATURE AND TREKKING CLUB</span>
                        </div>

                        <div className="flex justify-between items-center py-2 border-b border-green-200">
                            <span className="text-gray-600 font-medium">Account Number:</span>
                            <span className="text-gray-800 font-semibold font-mono">7093074097</span>
                        </div>

                        <div className="flex justify-between items-center py-2 border-b border-green-200">
                            <span className="text-gray-600 font-medium">IFSC Code:</span>
                            <span className="text-gray-800 font-semibold font-mono">IDIB000V143</span>
                        </div>

                        <div className="flex justify-between items-center py-2">
                            <span className="text-gray-600 font-medium">Bank:</span>
                            <span className="text-gray-800 font-semibold">Indian Bank, VIT Bhopal Campus</span>
                        </div>
                    </div>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <h4 className="font-semibold text-blue-900 mb-2">📝 Payment Instructions:</h4>
                    <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                        <li>Transfer ₹349 to the above bank account</li>
                        <li>Take a screenshot of the successful transaction</li>
                        <li>Upload the screenshot below</li>
                        <li>Submit to complete your registration</li>
                    </ol>
                </div>

                {/* File Upload */}
                <div className="mb-6">
                    <label className="block text-gray-800 font-semibold mb-3 text-lg">
                        Upload Payment Screenshot <span className="text-red-600">*</span>
                    </label>

                    <div className="border-2 border-dashed border-green-300 rounded-xl p-6 text-center hover:border-green-500 transition-colors">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            id="payment-screenshot"
                            required
                        />
                        <label htmlFor="payment-screenshot" className="cursor-pointer">
                            {previewUrl ? (
                                <div className="space-y-4">
                                    <img
                                        src={previewUrl}
                                        alt="Payment screenshot preview"
                                        className="max-h-64 mx-auto rounded-lg border-2 border-green-200"
                                    />
                                    <p className="text-sm text-gray-600">
                                        {selectedFile?.name} ({(selectedFile!.size / 1024).toFixed(2)} KB)
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedFile(null)
                                            setPreviewUrl('')
                                        }}
                                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                                    >
                                        Remove & Choose Different File
                                    </button>
                                </div>
                            ) : (
                                <div className="py-8">
                                    <div className="text-5xl mb-3">📸</div>
                                    <p className="text-gray-700 font-medium mb-1">Click to upload payment screenshot</p>
                                    <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                                </div>
                            )}
                        </label>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-700"
                    >
                        {error}
                    </motion.div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading || !selectedFile}
                    className="btn-primary w-full text-xl py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Submitting Payment...' : 'Submit Payment & Complete Registration 🎉'}
                </button>

                <p className="text-gray-600 text-sm text-center mt-4">
                    Your registration will be confirmed after payment verification
                </p>
            </form>
        </motion.div>
    )
}
