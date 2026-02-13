import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { teamId, paymentScreenshot, amount } = body

        // Validate required fields
        if (!teamId || !paymentScreenshot || !amount) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const client = await pool.connect()
        try {
            // Validate team exists
            const teamCheck = await client.query(
                'SELECT id FROM teams WHERE id = $1',
                [teamId]
            )

            if (teamCheck.rows.length === 0) {
                return NextResponse.json(
                    { error: 'Team not found' },
                    { status: 404 }
                )
            }

            // Create payments table if it doesn't exist
            await client.query(`
                CREATE TABLE IF NOT EXISTS payments (
                    id SERIAL PRIMARY KEY,
                    team_id INTEGER REFERENCES teams(id) ON DELETE CASCADE,
                    amount INTEGER NOT NULL,
                    payment_screenshot TEXT NOT NULL,
                    payment_status VARCHAR(50) DEFAULT 'uploaded',
                    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `)

            // Begin transaction
            await client.query('BEGIN')

            // Insert payment record
            const paymentResult = await client.query(
                'INSERT INTO payments (team_id, amount, payment_screenshot, payment_status) VALUES ($1, $2, $3, $4) RETURNING id',
                [teamId, amount, paymentScreenshot, 'uploaded']
            )

            // Update team payment status
            await client.query(
                'UPDATE teams SET payment_completed = true, registration_status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
                ['completed', teamId]
            )

            await client.query('COMMIT')

            return NextResponse.json(
                {
                    success: true,
                    paymentId: paymentResult.rows[0].id,
                    message: 'Payment submitted successfully'
                },
                { status: 201 }
            )
        } catch (dbError) {
            await client.query('ROLLBACK')
            throw dbError
        } finally {
            client.release()
        }

    } catch (error: any) {
        console.error('Payment submission error:', error)
        return NextResponse.json(
            { error: 'Failed to process payment. Please try again.', details: error.message },
            { status: 500 }
        )
    }
}

// GET endpoint to retrieve payment details
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const teamId = searchParams.get('teamId')

        if (teamId) {
            // Get specific team payment
            const result = await pool.query(`
                SELECT 
                    p.id,
                    p.team_id,
                    p.amount,
                    p.payment_status,
                    p.uploaded_at,
                    t.team_name
                FROM payments p
                JOIN teams t ON p.team_id = t.id
                WHERE p.team_id = $1
            `, [teamId])

            return NextResponse.json({ payment: result.rows[0] || null })
        } else {
            // Get all payments (admin view)
            const result = await pool.query(`
                SELECT 
                    p.id,
                    p.team_id,
                    p.amount,
                    p.payment_status,
                    p.uploaded_at,
                    t.team_name
                FROM payments p
                JOIN teams t ON p.team_id = t.id
                ORDER BY p.uploaded_at DESC
            `)

            return NextResponse.json({ payments: result.rows })
        }

    } catch (error: any) {
        console.error('Error fetching payments:', error)
        return NextResponse.json(
            { error: 'Failed to fetch payment data', details: error.message },
            { status: 500 }
        )
    }
}
