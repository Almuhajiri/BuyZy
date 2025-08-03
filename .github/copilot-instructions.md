<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Buyzy - React + TailwindCSS Marketplace

This is a frontend-only React application for an online marketplace called Buyzy. The project uses a modular, feature-based architecture.

## Tech Stack
- React (functional components)
- TailwindCSS for styling
- React Router for navigation
- React Icons for icons
- Vite for build tooling

## Project Structure
- `/src/app/` - Main application and routing
- `/src/components/` - Shared UI components
- `/src/modules/homepage/` - Homepage-specific components, data, and hooks
- `/src/utils/` - Shared utility functions
- `/src/hooks/` - Global reusable hooks

## Development Guidelines
- Use functional components with hooks
- Follow the existing modular structure
- Use TailwindCSS utility classes for styling
- Keep components focused and reusable
- Use mock data for all product and category information
- Ensure responsive design (mobile-first approach)
- Follow accessibility best practices

## Component Patterns
- Use PropTypes or TypeScript for type checking
- Extract reusable logic into custom hooks
- Keep components small and focused
- Use proper semantic HTML elements
- Include loading and error states for data fetching

## Styling Guidelines
- Use TailwindCSS utility classes
- Follow the existing color scheme (primary blue tones)
- Ensure consistent spacing and typography
- Use hover states and transitions for better UX
- Make all components responsive
