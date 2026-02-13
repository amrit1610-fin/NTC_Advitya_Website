'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface TeamMember {
    name: string
    registrationNumber: string
    email: string
    phone?: string
}

interface FormData {
    teamName: string
    leader: TeamMember
    members: TeamMember[]
}

export default function RegistrationForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [memberCount, setMemberCount] = useState(4) // Default 4 members (leader + 3)

    const [formData, setFormData] = useState<FormData>({
        teamName: '',
        leader: {
            name: '',
            registrationNumber: '',
            email: '',
            phone: ''
        },
        members: Array(3).fill(null).map(() => ({
            name: '',
            registrationNumber: '',
            email: ''
        }))
    })

    const handleMemberCountChange = (count: number) => {
        setMemberCount(count)
        const additionalMembers = count - 1 // Excluding leader
        setFormData(prev => ({
            ...prev,
            members: Array(additionalMembers).fill(null).map((_, i) =>
                prev.members[i] || { name: '', registrationNumber: '', email: '' }
            )
        }))
    }

    const handleLeaderChange = (field: keyof TeamMember, value: string) => {
        setFormData(prev => ({
            ...prev,
            leader: { ...prev.leader, [field]: value }
        }))
    }

    const handleMemberChange = (index: number, field: keyof TeamMember, value: string) => {
        setFormData(prev => ({
            ...prev,
            members: prev.members.map((member, i) =>
                i === index ? { ...member, [field]: value } : member
            )
        }))
    }

    const validateForm = (): boolean => {
        if (!formData.teamName.trim()) {
            setError('Please enter a team name')
            return false
        }

        if (!formData.leader.name.trim() || !formData.leader.registrationNumber.trim() ||
            !formData.leader.email.trim() || !formData.leader.phone?.trim()) {
            setError('Please fill all team leader details')
            return false
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.leader.email)) {
            setError('Please enter a valid email for team leader')
            return false
        }

        for (let i = 0; i < formData.members.length; i++) {
            const member = formData.members[i]
            if (!member.name.trim() || !member.registrationNumber.trim() || !member.email.trim()) {
                setError(`Please fill all details for Member ${i + 2}`)
                return false
            }
            if (!emailRegex.test(member.email)) {
                setError(`Please enter a valid email for Member ${i + 2}`)
                return false
            }
        }

        setError('')
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setLoading(true)
        setError('')

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed')
            }

            // Redirect to payment page with team ID
            router.push(`/payment?teamId=${data.teamId}&teamName=${encodeURIComponent(formData.teamName)}`)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
        >
            <form onSubmit={handleSubmit} className="glass-strong rounded-3xl p-8 md:p-12">
                {/* Team Name */}
                <div className="mb-8">
                    <label className="block text-gray-800 font-semibold mb-3 text-lg">
                        Team Name <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.teamName}
                        onChange={(e) => setFormData(prev => ({ ...prev, teamName: e.target.value }))}
                        className="input-field"
                        placeholder="Enter your team name"
                        required
                    />
                </div>

                {/* Team Size Selector */}
                <div className="mb-8">
                    <label className="block text-gray-800 font-semibold mb-3 text-lg">
                        Team Size <span className="text-red-600">*</span>
                    </label>
                    <div className="flex gap-4">
                        {[4, 5].map(count => (
                            <button
                                key={count}
                                type="button"
                                onClick={() => handleMemberCountChange(count)}
                                className={`px-6 py-3 rounded-xl font-semibold transition-all ${memberCount === count
                                    ? 'bg-green-600 text-white shadow-lg'
                                    : 'bg-white/70 text-gray-700 hover:bg-white border border-green-200'
                                    }`}
                            >
                                {count} Members
                            </button>
                        ))}
                    </div>
                </div>

                {/* Team Leader */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span>👑</span> Team Leader
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-2">
                                Name <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.leader.name}
                                onChange={(e) => handleLeaderChange('name', e.target.value)}
                                className="input-field"
                                placeholder="Full name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">
                                Registration Number <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.leader.registrationNumber}
                                onChange={(e) => handleLeaderChange('registrationNumber', e.target.value)}
                                className="input-field"
                                placeholder="e.g., 21BCE1234"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">
                                Email <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="email"
                                value={formData.leader.email}
                                onChange={(e) => handleLeaderChange('email', e.target.value)}
                                className="input-field"
                                placeholder="email@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">
                                Phone Number <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="tel"
                                value={formData.leader.phone}
                                onChange={(e) => handleLeaderChange('phone', e.target.value)}
                                className="input-field"
                                placeholder="+91 1234567890"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Team Members */}
                {formData.members.map((member, index) => (
                    <div key={index} className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span>👤</span> Member {index + 2}
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 mb-2">
                                    Name <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={member.name}
                                    onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                    className="input-field"
                                    placeholder="Full name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">
                                    Registration Number <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={member.registrationNumber}
                                    onChange={(e) => handleMemberChange(index, 'registrationNumber', e.target.value)}
                                    className="input-field"
                                    placeholder="e.g., 21BCE1234"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-gray-700 mb-2">
                                    Email <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={member.email}
                                    onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                                    className="input-field"
                                    placeholder="email@example.com"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300"
                    >
                        {error}
                    </motion.div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full text-xl py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Registering...' : 'Continue to Payment →'}
                </button>

                <p className="text-gray-600 text-sm text-center mt-4">
                    By registering, you agree to participate in Seize the Summit &apos;26
                </p>
            </form>
        </motion.div>
    )
}
