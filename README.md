# GradPilots — Scholarship Finder

A web application to browse and filter international scholarships by country, academic stream, study level, and deadline.

## Features

- **Browse Scholarships** — Displays scholarship cards with name, funding amount, and deadline
- **Multi-filter Sidebar** — Filter by Country (USA, UK, Canada, Germany), Stream (Business, Law, IR, System), and Level (UG, PG, PhD)
- **Deadline Filter** — Narrow results by application deadline month
- **Load More Pagination** — Incrementally load more results (6 at a time)
- **Reset Filters** — One-click filter reset to restore all results
- **REST API Route** — Internal API endpoint at `/api/fetch-data` serving scholarship data as JSON

## Tech Stack

| Technology | Version |
|---|---|
| [Next.js](https://nextjs.org) | 16.x |
| [React](https://react.dev) | 19.x |
| [TypeScript](https://www.typescriptlang.org) | 5.x |
| [Tailwind CSS](https://tailwindcss.com) | 4.x |

## Project Structure

```
app/
├── app/
│   ├── page.tsx              # Main page with filter UI and scholarship grid
│   ├── layout.tsx            # Root layout with Geist font
│   ├── globals.css           # Global styles
│   ├── components/
│   │   └── card.tsx          # Scholarship card component
│   └── api/
│       └── fetch-data/
│           └── route.ts      # GET /api/fetch-data — returns scholarship JSON
└── data/
    └── dummydata.ts          # Scholarship dataset (20 entries)
```

## Getting Started

**Prerequisites:** Node.js 18+

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## API

### `GET /api/fetch-data`

Returns the full list of scholarships as a JSON array.

**Response example:**
```json
[
  {
    "name": "Global Scholars Program",
    "amount": "$50,000",
    "deadline": "July 2026",
    "country": "USA",
    "stream": "Business",
    "level": "PG"
  }
]
```

## Deployment

Deploy instantly on [Vercel](https://vercel.com/new). For other platforms, run `npm run build` and serve the `.next` output with `npm run start`.

