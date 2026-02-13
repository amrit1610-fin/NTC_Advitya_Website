import pool from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { teamName, leader, members } = body

        // Validate required fields
        if (!teamName || !leader || !members) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Validate leader fields
        if (!leader.name || !leader.registrationNumber || !leader.email || !leader.phone) {
            return NextResponse.json(
                { error: 'Missing leader information' },
                { status: 400 }
            )
        }

        // Validate members
        if (!Array.isArray(members) || members.length < 3 || members.length > 4) {
            return NextResponse.json(
                { error: 'Team must have 4-5 members (including leader)' },
                { status: 400 }
            )
        }

        for (const member of members) {
            if (!member.name || !member.registrationNumber || !member.email) {
                return NextResponse.json(
                    { error: 'Missing member information' },
                    { status: 400 }
                )
            }
        }

        // Check if environment variables are set
        if (!process.env.POSTGRES_URL) {
            console.error('Database configuration error: POSTGRES_URL is missing')
            return NextResponse.json(
                { error: 'Server configuration error: POSTGRES_URL is missing' },
                { status: 500 }
            )
        }

        const client = await pool.connect()
        try {
            // Create tables if they don't exist
            await client.query(`
                CREATE TABLE IF NOT EXISTS teams (
                    id SERIAL PRIMARY KEY,
                    team_name VARCHAR(255) NOT NULL,
                    payment_completed BOOLEAN DEFAULT FALSE,
                    registration_status VARCHAR(50) DEFAULT 'pending_payment',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `)

            await client.query(`
                CREATE TABLE IF NOT EXISTS team_members (
                    id SERIAL PRIMARY KEY,
                    team_id INTEGER REFERENCES teams(id),
                    name VARCHAR(255) NOT NULL,
                    registration_number VARCHAR(50) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    phone VARCHAR(20),
                    is_leader BOOLEAN DEFAULT FALSE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `)

            // Begin transaction
            await client.query('BEGIN')

            // Insert team
            const teamResult = await client.query(
                'INSERT INTO teams (team_name) VALUES ($1) RETURNING id',
                [teamName]
            )

            const teamId = teamResult.rows[0].id

            // Insert team leader
            await client.query(
                'INSERT INTO team_members (team_id, name, registration_number, email, phone, is_leader) VALUES ($1, $2, $3, $4, $5, $6)',
                [teamId, leader.name, leader.registrationNumber, leader.email, leader.phone, true]
            )

            // Insert other members
            for (const member of members) {
                await client.query(
                    'INSERT INTO team_members (team_id, name, registration_number, email, is_leader) VALUES ($1, $2, $3, $4, $5)',
                    [teamId, member.name, member.registrationNumber, member.email, false]
                )
            }

            await client.query('COMMIT')

            return NextResponse.json(
                {
                    success: true,
                    message: 'Team registered successfully',
                    teamId
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
        console.error('Registration error details:', {
            message: error.message,
            code: error.code
        })

        return NextResponse.json(
            { error: 'Failed to register team. Check database connection.', details: error.message },
            { status: 500 }
        )
    }
}

// GET endpoint to retrieve all registrations
export async function GET() {
    try {
        const result = await pool.query(`
            SELECT 
                t.id,
                t.team_name,
                t.created_at,
                json_agg(
                    json_build_object(
                        'name', tm.name,
                        'registration_number', tm.registration_number,
                        'email', tm.email,
                        'phone', tm.phone,
                        'is_leader', tm.is_leader
                    )
                ) as members
            FROM teams t
            LEFT JOIN team_members tm ON t.id = tm.team_id
            GROUP BY t.id, t.team_name, t.created_at
            ORDER BY t.created_at DESC
        `)

        return NextResponse.json({ teams: result.rows })
    } catch (error: any) {
        console.error('Error fetching teams:', error)
        return NextResponse.json(
            { error: 'Failed to fetch teams', details: error.message },
            { status: 500 }
        )
    }
}
