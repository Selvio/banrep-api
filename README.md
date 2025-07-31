# BANREP API

A Next.js API for fetching financial data from the Banco de la República (BANREP) of Colombia. This project provides a RESTful interface to access various financial indicators and time series data.

## Features

- **Financial Data API**: Access to BANREP's financial indicators and time series
- **Type Safety**: Built with TypeScript and Zod for runtime validation
- **Data Validation**: Automatic validation of API responses using Zod schemas
- **Error Handling**: Comprehensive error handling with proper HTTP status codes
- **Performance Optimized**: Built with Next.js 15 and Turbopack for fast development

## Supported Flows

The API supports the following BANREP data flows:

- **DF_TRM_DAILY_LATEST**: Latest daily exchange rate (TRM)
- **DF_TRM_DAILY_HIST**: Historical daily exchange rate data
- **DF_CBR_DAILY_LATEST**: Latest daily interest rate (CBR)
- **DF_CBR_DAILY_HIST**: Historical daily interest rate data
- **DF_IR_DAILY_LATEST**: Latest daily interest rate
- **DF_IR_DAILY_HIST**: Historical daily interest rate data
- **DF_COLCAP_MONTHLY_LATEST**: Latest monthly COLCAP index
- **DF_COLCAP_MONTHLY_HIST**: Historical monthly COLCAP data
- **DF_MONAGG_MONTHLY_LATEST**: Latest monthly monetary aggregates
- **DF_MONAGG_MONTHLY_HIST**: Historical monthly monetary aggregates
- **DF_UVR_DAILY_LATEST**: Latest daily UVR (Unit of Real Value)
- **DF_UVR_DAILY_HIST**: Historical daily UVR data

## API Endpoints

### GET `/api/banrep/[flow]`

Fetches financial data for a specific flow.

**Parameters:**

- `flow` (path parameter): One of the supported flow IDs

**Response:**

```json
[
  {
    "date": "2024-01-15",
    "value": 1234.56
  }
]
```

**Error Responses:**

- `400 Bad Request`: Invalid flow parameter
- `500 Internal Server Error`: Server error
- `502 Bad Gateway`: Invalid data format from BANREP

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd banrep-api
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run check` - Run all checks (type, lint, format)

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── banrep/
│   │       └── [flow]/
│   │           └── route.ts    # API endpoint
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── api/
│   │   └── errors.ts          # Error handling utilities
│   └── banrep/
│       ├── fetchFlow.ts        # BANREP API client
│       ├── flows.ts            # Flow definitions
│       └── schemas.ts          # Zod validation schemas
```

## Configuration

The project uses several configuration files following Next.js best practices:

- **TypeScript**: Enhanced configuration with strict type checking
- **ESLint**: Code quality rules with Next.js and TypeScript support
- **Prettier**: Code formatting configuration
- **Next.js**: Optimized for performance with SWC minification

## Development

### Code Quality

The project enforces high code quality standards:

- **TypeScript**: Strict type checking enabled
- **ESLint**: Comprehensive linting rules
- **Prettier**: Consistent code formatting
- **Import Ordering**: Automatic import sorting

### Error Handling

The API includes comprehensive error handling:

- Input validation using Zod schemas
- Proper HTTP status codes
- Detailed error messages
- Type-safe error responses

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy automatically

### Other Platforms

The project can be deployed to any platform that supports Node.js:

```bash
npm run build
npm run start
```

## Technologies

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Zod**: Runtime type validation
- **Tailwind CSS**: Utility-first CSS framework
- **ESLint**: Code linting
- **Prettier**: Code formatting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run check` to ensure code quality
5. Submit a pull request

## License

This project is licensed under the MIT License.
