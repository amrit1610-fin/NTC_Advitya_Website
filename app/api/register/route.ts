import { sql } from '@vercel/postgres'
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
                { error: 'Server configuration error. Please check environment variables.' },
                { status: 500 }
            )
        }

        // Create tables if they don't exist
        await sql`
      CREATE TABLE IF NOT EXISTS teams (
        id SERIAL PRIMARY KEY,
        team_name VARCHAR(255) NOT NULL,
        payment_completed BOOLEAN DEFAULT FALSE,
        registration_status VARCHAR(50) DEFAULT 'pending_payment',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

        await sql`
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
    `

        // Insert team
        const teamResult = await sql`
      INSERT INTO teams (team_name)
      VALUES (${teamName})
      RETURNING id
    `

        const teamId = teamResult.rows[0].id

        // Insert team leader
        await sql`
      INSERT INTO team_members (team_id, name, registration_number, email, phone, is_leader)
      VALUES (${teamId}, ${leader.name}, ${leader.registrationNumber}, ${leader.email}, ${leader.phone}, true)
    `

        // Insert other members
        for (const member of members) {
            await sql`
        INSERT INTO team_members (team_id, name, registration_number, email, is_leader)
        VALUES (${teamId}, ${member.name}, ${member.registrationNumber}, ${member.email}, false)
      `
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Team registered successfully',
                teamId
            },
            { status: 201 }
        )

    } catch (error: any) {
        console.error('Registration error details:', {
            message: error.message,
            code: error.code,
            stack: error.stack
        })
        
        // Return a more descriptive error message if it's a known database error
        const errorMessage = error.message?.includes('relation') ? 
            'Database table error. Please ensure tables are created.' : 
            'Failed to register team. Please check server logs for details.';

        return NextResponse.json(
            { error: errorMessage, details: error.message },
            { status: 500 }
        )
    }
}

// GET endpoint to retrieve all registrations (for admin purposes)
export async function GET() {
    try {
        const teams = await sql`
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
    `

        return NextResponse.json({ teams: teams.rows })
    } catch (error) {
        console.error('Error fetching teams:', error)
        return NextResponse.json(
            { error: 'Failed to fetch teams' },
            { status: 500 }
        )
    }
}
