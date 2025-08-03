// Account Module Exports
export { default as AccountDashboard } from './pages/AccountDashboard.jsx';
export { default as OrdersPage } from './pages/OrdersPage.jsx';
export { default as ProfilePage } from './pages/ProfilePage.jsx';

// Components
export { default as AccountSidebar } from './components/AccountSidebar.jsx';
export { default as AccountOverview } from './components/AccountOverview.jsx';
export { default as OrderCard } from './components/OrderCard.jsx';
export { default as OrderList } from './components/OrderList.jsx';
export { default as ProfileForm } from './components/ProfileForm.jsx';

// Hooks
export { useAccountData } from './hooks/useAccountData.js';

// Utils
export * from './utils/formatOrderStatus.js';

// Data
export { mockUser, mockAddresses, mockOrders, orderStatuses, paymentStatuses } from './data/mockOrders.js';
