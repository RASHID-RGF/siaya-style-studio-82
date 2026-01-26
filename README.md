# Siaya Style Studio

A modern, responsive e-commerce platform for fashion and style enthusiasts. Built with React and TypeScript, featuring a sleek design with Tailwind CSS and shadcn/ui components.

## Features

- **Product Catalog**: Browse featured products, new arrivals, and categories
- **Shopping Cart**: Add items to cart, manage quantities, and proceed to checkout
- **Wishlist**: Save favorite items for later
- **User Account**: Account management and order history
- **Responsive Design**: Optimized for desktop and mobile devices
- **Search & Navigation**: Easy navigation with mobile-friendly menu

## Tech Stack

- **Frontend**: React 18 with TypeScript
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

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
bun run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

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

## Project Structure

```
src/
├── components/
│   ├── home/          # Homepage sections
│   ├── layout/        # Layout components (Header, Footer, etc.)
│   ├── product/       # Product-related components
│   └── ui/            # Reusable UI components
├── context/           # React contexts (Cart, etc.)
├── data/              # Static data (products)
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Page components
├── types/             # TypeScript type definitions
└── test/              # Test files
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
 
