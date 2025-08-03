import { lazy } from 'react';

// Lazy load the AboutPage component for better performance
const AboutPage = lazy(() => import('./AboutPage.jsx'));

export default AboutPage;
