# Buyzy - React + TailwindCSS Marketplace

A modern, responsive online marketplace built with React and TailwindCSS. This is a frontend-only project featuring a clean, scalable architecture and beautiful user interface.

## 🚀 Features

- **Modern Tech Stack**: React 18, TailwindCSS, React Router, React Icons
- **Responsive Design**: Mobile-first approach with beautiful UI components
- **Modular Architecture**: Feature-based folder structure for scalability
- **Homepage Sections**:
  - Hero banner with call-to-action
  - Featured products grid
  - Category highlights
  - Value proposition (Free shipping, Secure payments, 24/7 support)
  - Newsletter signup
- **Reusable Components**: Navbar, Footer, ProductCard, CategoryCard, and more
- **Mock Data**: Complete product and category datasets for testing

## 🛠️ Tech Stack

- **Frontend**: React 18 (functional components with hooks)
- **Styling**: TailwindCSS with custom color scheme
- **Routing**: React Router DOM v6
- **Icons**: React Icons (Feather icons)
- **Build Tool**: Vite
- **Development**: Hot Module Replacement (HMR)

## 📁 Project Structure

```
src/
├── app/
│   └── App.jsx              # Main app with routing
├── components/              # Shared UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── CategoryCard.jsx
│   └── IconWithText.jsx
├── modules/
│   └── homepage/
│       ├── components/      # Homepage-specific components
│       ├── data/           # Mock data
│       ├── hooks/          # Custom hooks
│       └── Homepage.jsx    # Main homepage component
├── utils/                  # Helper functions
└── hooks/                  # Global hooks
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd BuyZy
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

### Colors
- **Primary**: Blue tones (#3b82f6, #2563eb, #1d4ed8)
- **Secondary**: Gray scale for text and backgrounds
- **Accent**: Yellow (#fbbf24) for highlights and CTAs

### Typography
- **Font Family**: Inter (loaded from Google Fonts)
- **Responsive Typography**: Tailwind's responsive text classes

### Components
- **Buttons**: Primary and secondary variants with hover states
- **Cards**: Product and category cards with hover animations
- **Navigation**: Responsive navbar with mobile hamburger menu
- **Footer**: Comprehensive footer with links and social icons

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🧩 Key Components

### Homepage Components
- **HeroBanner**: Eye-catching hero section with CTA
- **FeaturedProducts**: Product grid with mock data
- **CategoryHighlights**: Category cards with icons
- **ValueProposition**: Service highlights (shipping, payments, support)
- **NewsletterSignup**: Email subscription form

### Shared Components
- **Navbar**: Responsive navigation with cart badge
- **Footer**: Complete footer with links and branding
- **ProductCard**: Reusable product display component
- **CategoryCard**: Category navigation component

## 🔧 Customization

### Adding New Products
Edit `src/modules/homepage/data/products.js` to add or modify products.

### Adding New Categories
Edit `src/modules/homepage/data/categories.js` to add or modify categories.

### Styling Changes
Modify `tailwind.config.js` for theme customization or add custom CSS in `src/index.css`.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
The `dist` folder contains the built application ready for deployment.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Buyzy** - Your Everyday Marketplace 🛒
