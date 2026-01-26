# Siaya Style Studio

A modern, responsive e-commerce platform for fashion and style enthusiasts. Built with React and TypeScript, featuring a sleek design with Tailwind CSS and shadcn/ui components.

## Features

- **Product Catalog**: Browse featured products, new arrivals, and categories
- **Shopping Cart**: Add items to cart, manage quantities, and proceed to checkout
- **M-Pesa Payment Integration**: Secure payments via M-Pesa STK Push (Lipa Na M-Pesa Online)
- **Wishlist**: Save favorite items for later
- **User Account**: Account management and order history
- **Responsive Design**: Optimized for desktop and mobile devices
- **Search & Navigation**: Easy navigation with mobile-friendly menu

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Backend API**: Express.js (Node.js)
- **Payment Gateway**: M-Pesa (Safaricom Daraja API)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context
- **Testing**: Vitest
- **Linting**: ESLint

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or bun

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd siaya-style-studio-82
```

2. Install frontend dependencies:
```bash
npm install
# or
bun install
```

3. Install backend dependencies:
```bash
cd server
npm install
cd ..
```

4. Configure environment variables (see [M-Pesa Setup](#m-pesa-payment-integration)):
```bash
cp .env.example .env
cp server/.env.example server/.env
# Edit both .env files with your configuration
```

5. Start the development servers:

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend API:**
```bash
cd server
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
# or
bun run build
```

### Run Tests

```bash
npm run test
# or
bun run test
```

## M-Pesa Payment Integration

This application includes full M-Pesa STK Push integration for secure payments. For complete setup instructions, see [MPESA_SETUP_GUIDE.md](./MPESA_SETUP_GUIDE.md).

### Quick Start

1. Get M-Pesa credentials from [Safaricom Daraja Portal](https://developer.safaricom.co.ke)
2. Configure `server/.env` with your credentials
3. Start both frontend and backend servers
4. Test with sandbox credentials before going live

For detailed setup, troubleshooting, and production deployment, refer to the complete guide.

## Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── home/          # Homepage sections
│   │   ├── layout/        # Layout components (Header, Footer, etc.)
│   │   ├── product/       # Product-related components
│   │   └── ui/            # Reusable UI components
│   ├── context/           # React contexts (Cart, etc.)
│   ├── data/              # Static data (products)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   ├── services/          # API services (M-Pesa integration)
│   ├── types/             # TypeScript type definitions
│   └── test/              # Test files
├── server/
│   ├── routes/            # API routes
│   ├── services/          # M-Pesa service integration
│   ├── utils/             # Utility functions
│   └── index.js           # Express server
└── public/                # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
 
