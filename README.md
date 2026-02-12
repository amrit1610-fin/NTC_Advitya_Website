# Seize the Summit '26 - Event Registration Website

A stunning, modern event registration website for the Nature And Trekking Club's "Seize the Summit '26" competition at VIT Bhopal University.

## Features

- 🎨 **Beautiful UI**: Dark theme with glassmorphism effects, gradient backgrounds, and smooth animations
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ✨ **Smooth Animations**: Powered by Framer Motion for engaging user experience
- 🔒 **Secure Backend**: Vercel Postgres database for reliable data storage
- ✅ **Form Validation**: Client and server-side validation for data integrity
- 🚀 **Fast Performance**: Built with Next.js 14 and optimized for speed

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: Framer Motion
- **Database**: Vercel Postgres
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Vercel account (for deployment and database)

### Installation

1. Clone the repository or navigate to the project directory

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Create a Postgres database in your Vercel dashboard
   - Add your database credentials to `.env.local`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup

The application automatically creates the required tables on first registration:

- `teams`: Stores team information
- `team_members`: Stores individual member details

## Deployment to Vercel

1. Install Vercel CLI (if not already installed):
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Set up Postgres database in Vercel dashboard:
   - Go to your project in Vercel
   - Navigate to Storage tab
   - Create a new Postgres database
   - Environment variables will be automatically added

5. Redeploy to apply environment variables:
```bash
vercel --prod
```

## Project Structure

```
├── app/
│   ├── api/
│   │   └── register/
│   │       └── route.ts          # API endpoint for registration
│   ├── register/
│   │   └── page.tsx              # Registration page
│   ├── success/
│   │   └── page.tsx              # Success confirmation page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/
│   ├── Hero.tsx                  # Hero section component
│   └── RegistrationForm.tsx      # Registration form component
├── public/                       # Static assets
├── .env.example                  # Environment variables template
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── package.json                  # Dependencies
```

## Features Breakdown

### Registration Form
- Team name input
- Team size selector (4-5 members)
- Team leader details (name, registration number, email, phone)
- Additional member details (name, registration number, email)
- Real-time validation
- Error handling

### Database Schema

**teams table:**
- id (Primary Key)
- team_name
- created_at

**team_members table:**
- id (Primary Key)
- team_id (Foreign Key)
- name
- registration_number
- email
- phone (optional, only for leader)
- is_leader (boolean)
- created_at

## API Endpoints

### POST /api/register
Register a new team

**Request Body:**
```json
{
  "teamName": "Team Name",
  "leader": {
    "name": "Leader Name",
    "registrationNumber": "21BCE1234",
    "email": "leader@example.com",
    "phone": "+91 1234567890"
  },
  "members": [
    {
      "name": "Member Name",
      "registrationNumber": "21BCE5678",
      "email": "member@example.com"
    }
  ]
}
```

### GET /api/register
Retrieve all team registrations (for admin purposes)

## Customization

- **Colors**: Edit `tailwind.config.js` to change the color scheme
- **Animations**: Modify animation settings in `tailwind.config.js` and `globals.css`
- **Content**: Update event details in `app/page.tsx`

## Support

For issues or questions, contact the Nature And Trekking Club at VIT Bhopal University.

## License

This project is created for VIT Bhopal University's Nature And Trekking Club.
