# NTOS - National Tourism Operating System

A multi-tenant tourism platform for Malaysia, connecting travelers with authentic local experiences while empowering SMEs with free ERP tools.

## Architecture

This is a Turborepo monorepo containing:

### Apps
- **web** (`apps/web`): National frontend (tamuhouse.my style) - Port 3000
- **merchant** (`apps/merchant`): Merchant ERP dashboard - Port 3001

### Packages
- **database** (`packages/database`): Prisma schema and database client
- **auth** (`packages/auth`): MyDigitalID authentication
- **ui** (`packages/ui`): Shared UI components
- **types** (`packages/types`): Shared TypeScript types

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Prisma ORM)
- **Auth**: NextAuth.js + MyDigitalID
- **Deployment**: Railway (Docker)

## Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (local or via Docker)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
cp packages/database/.env.example packages/database/.env
# Edit packages/database/.env with your database URL

cp apps/web/.env.example apps/web/.env
# Edit with your MyDigitalID credentials and other config

cp apps/merchant/.env.example apps/merchant/.env
```

### 3. Start Development Environment

Using Docker Compose (recommended):
```bash
docker-compose up -d
```

Or manually:
```bash
# Start PostgreSQL
# Then:
npm run db:migrate
npm run db:seed

# Run development servers
npm run dev
```

### 4. Access the Applications

- **National Frontend**: http://localhost:3000
- **Merchant ERP**: http://localhost:3001

## Database Setup

### Generate Prisma Client
```bash
npm run db:generate
```

### Run Migrations
```bash
npm run db:migrate
```

### Seed Database
```bash
npm run db:seed
```

### Open Prisma Studio
```bash
npm run db:studio
```

## MyDigitalID Integration

To enable MyDigitalID authentication:

1. Register your application at https://developer.mydigitalid.gov.my
2. Configure the OAuth callback URL: `http://localhost:3000/api/auth/callback/mydigitalid`
3. Add your credentials to `apps/web/.env`:
   ```
   MYDIGITALID_CLIENT_ID=your-client-id
   MYDIGITALID_CLIENT_SECRET=your-client-secret
   ```

## Available Scripts

```bash
# Development
npm run dev          # Start all apps in development mode
npm run dev:web      # Start web app only
npm run dev:merchant # Start merchant app only

# Building
npm run build        # Build all apps
npm run build:web    # Build web app
npm run build:merchant # Build merchant app

# Database
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database with sample data

# Linting
npm run lint         # Lint all apps
```

## Project Structure

```
ntos/
├── apps/
│   ├── web/                    # National frontend
│   │   ├── src/
│   │   │   ├── app/            # Next.js App Router
│   │   │   │   ├── api/        # API routes
│   │   │   │   ├── page.tsx    # Home page
│   │   │   │   ├── layout.tsx  # Root layout
│   │   │   │   └── search/     # Search page
│   │   │   └── components/     # React components
│   │   ├── package.json
│   │   └── Dockerfile
│   └── merchant/               # Merchant ERP
│       ├── src/
│       │   ├── app/
│       │   │   ├── api/        # API routes
│       │   │   ├── page.tsx    # Dashboard
│       │   │   ├── inventory/  # Inventory management
│       │   │   ├── vehicles/   # GPS tracking
│       │   │   └── offline/    # Offline bookings
│       │   └── components/
│       ├── package.json
│       └── Dockerfile
├── packages/
│   ├── database/               # Prisma schema
│   │   ├── prisma/
│   │   │   └── schema.prisma   # Database schema
│   │   └── src/
│   │       └── index.ts        # Database client
│   ├── auth/                   # Authentication
│   │   └── src/
│   │       └── index.ts        # NextAuth config
│   ├── ui/                     # Shared UI
│   │   └── src/
│   │       ├── components/     # Button, Card, etc.
│   │       └── lib/
│   │           └── utils.ts    # cn() helper
│   └── types/                  # TypeScript types
│       └── src/
│           └── index.ts        # Shared types
├── docker-compose.yml          # Local development
├── turbo.json                  # Turborepo config
└── package.json                # Root package.json
```

## Key Features

### Phase 1 MVP
- ✅ Multi-tenant backend with state-tagging
- ✅ National frontend (tamuhouse.my style)
- ✅ MyDigitalID authentication integration
- ✅ Merchant ERP with inventory management
- ✅ Offline booking sync
- ✅ Accommodation + Car rental inventory
- ✅ GPS tracking support for vehicles
- ⏳ Payment gateway with commission splitting
- ⏳ LHDN e-Invoicing auto-submission

## Deployment

### Railway Deployment

1. Push to GitHub
2. Connect repository to Railway
3. Add environment variables in Railway dashboard
4. Deploy!

The `Dockerfile` in each app is configured for Railway deployment.

### Environment Variables for Production

```env
# Database
DATABASE_URL=postgresql://...

# Authentication
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secret-key
MYDIGITALID_CLIENT_ID=...
MYDIGITALID_CLIENT_SECRET=...

# Optional: Redis for sessions/cache
REDIS_URL=redis://...
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is proprietary and developed for the Malaysian tourism ecosystem.

## Support

For technical support, contact: support@ntos.my
