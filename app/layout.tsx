import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Seize the Summit 26 | Nature And Trekking Club',
    description: 'Register for Seize the Summit 26 - The ultimate battle of strength and teamwork at VIT Bhopal University',
    keywords: 'trekking, nature club, VIT Bhopal, Seize the Summit, team competition',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
