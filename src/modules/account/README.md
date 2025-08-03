# Account & My Orders Module

A comprehensive account management system for the Buyzy e-commerce platform, providing users with complete control over their profile, orders, and account settings.

## Features

### 🎯 **Core Functionality**
- **Account Dashboard**: Overview with quick stats and recent orders
- **Profile Management**: Edit personal information with validation
- **Order History**: Complete order tracking and management
- **Order Details**: Detailed view of individual orders
- **Order Actions**: Cancel orders, reorder items, track shipments

### 📱 **User Experience**
- **Responsive Design**: Optimized for all device sizes
- **Intuitive Navigation**: Sidebar navigation with active states
- **Real-time Feedback**: Loading states and notifications
- **Search & Filter**: Advanced order filtering and search
- **Breadcrumb Navigation**: Clear page hierarchy

### 🏗️ **Technical Architecture**
- **Modular Structure**: Clean separation of concerns
- **Custom Hooks**: Centralized data management
- **Form Validation**: Real-time validation with error handling
- **State Management**: Efficient state updates and persistence
- **Mock Data**: Comprehensive mock data for development

## Module Structure

```
src/modules/account/
├── pages/
│   ├── AccountDashboard.jsx      # Main account overview page
│   ├── OrdersPage.jsx            # Order history and management
│   └── ProfilePage.jsx           # Profile editing and settings
├── components/
│   ├── AccountSidebar.jsx        # Navigation sidebar
│   ├── AccountOverview.jsx       # Dashboard overview content
│   ├── OrderCard.jsx             # Individual order display
│   ├── OrderList.jsx             # Order listing with filters
│   └── ProfileForm.jsx           # Profile editing form
├── hooks/
│   └── useAccountData.js         # Data management hook
├── utils/
│   └── formatOrderStatus.js      # Utility functions
├── data/
│   └── mockOrders.js             # Mock data and configurations
├── README.md                     # This documentation
└── index.js                      # Module exports
```

## Page Features

### AccountDashboard (`/account`)
- **Welcome Section**: Personalized greeting with member info
- **Quick Stats Grid**: Total orders, delivered orders, total spent, loyalty points
- **Recent Orders**: Latest 3 orders with quick actions
- **Quick Actions**: Shortcuts to profile, addresses, and support

### OrdersPage (`/account/orders`)
- **Advanced Filtering**: Filter by order status, search by order number/product
- **Sorting Options**: Sort by date, amount (high/low)
- **Order Actions**: View details, cancel orders, reorder items
- **Pagination Support**: Ready for large order volumes
- **Status Tracking**: Visual order status indicators

### ProfilePage (`/account/profile`)
- **Editable Form**: Toggle between view and edit modes
- **Form Validation**: Real-time validation with error messages
- **Account Information**: Member since date, customer ID
- **Save/Cancel Actions**: Proper form state management

## Component Features

### AccountSidebar
- **User Profile Display**: Avatar, name, email with fallbacks
- **Active Navigation**: Highlights current page with visual indicators
- **Quick Stats**: Total orders and total spent summary
- **Logout Functionality**: Secure logout with confirmation

### OrderCard
- **Order Summary**: Order number, date, total, item count
- **Status Display**: Visual status with icons and colors
- **Item Preview**: Thumbnail grid of order items
- **Action Buttons**: View details, reorder, cancel/return options
- **Tracking Info**: Display tracking numbers when available

### ProfileForm
- **Toggle Edit Mode**: Switch between view and edit states
- **Input Validation**: Email format, phone number validation
- **Error Handling**: Field-specific error messages
- **Loading States**: Visual feedback during save operations
- **Account Metadata**: Display member since date and customer ID

## Data Management

### useAccountData Hook
```javascript
const {
  // Data
  user,
  addresses,
  orders,
  loading,
  error,
  
  // Profile methods
  updateProfile,
  changePassword,
  
  // Address methods
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  
  // Order methods
  getOrder,
  cancelOrder,
  reorderItems,
  
  // Utility methods
  clearError
} = useAccountData();
```

### Mock Data Structure
```javascript
// User Profile
{
  id: 'USER_2025_001',
  firstName: 'Yunus',
  lastName: "Mu'tashimbillah",
  email: 'yunus@buyzy.com',
  phone: '+62 812 3456 7890',
  memberSince: '2024-03-15T00:00:00Z',
  stats: {
    totalOrders: 12,
    totalSpent: 2847.50,
    loyaltyPoints: 284
  }
}

// Order Structure
{
  id: 'ORD-2025-001-BZ',
  orderNumber: 'ORD-2025-001-BZ',
  placedAt: '2025-08-01T14:30:00Z',
  status: 'delivered',
  total: 389.97,
  items: [...],
  shipping: {...},
  payment: {...},
  tracking: {...}
}
```

## Utility Functions

### Order Status Management
- `formatOrderStatus(status)` - Get status configuration
- `getOrderProgress(status)` - Calculate progress percentage
- `canCancelOrder(status)` - Check if order can be cancelled
- `canReturnOrder(status, deliveredAt)` - Check if order can be returned

### Data Formatting
- `formatCurrency(amount)` - Format monetary amounts
- `formatDate(date, options)` - Format dates consistently
- `formatRelativeTime(date)` - Show relative time (e.g., "2 days ago")
- `formatAddress(address)` - Format address for display

### Validation
- `validateEmail(email)` - Email format validation
- `validatePhone(phone)` - Phone number validation

## Integration

### Router Setup
```javascript
import { AccountDashboard, OrdersPage, ProfilePage } from '../modules/account';

// Routes
<Route path="/account" element={<AccountDashboard />} />
<Route path="/account/orders" element={<OrdersPage />} />
<Route path="/account/profile" element={<ProfilePage />} />
```

### Navigation Integration
```javascript
// From navbar or anywhere in the app
<Link to="/account">My Account</Link>
<Link to="/account/orders">My Orders</Link>
```

## Styling & Design

### Design System
- **Color Palette**: Consistent with Buyzy brand colors
- **Typography**: Clear hierarchy with appropriate font weights
- **Spacing**: Consistent padding and margins using Tailwind utilities
- **Cards**: Clean card-based layout with subtle shadows
- **Icons**: Feather icons for consistent visual language
- **States**: Hover, active, disabled, and loading states

### Responsive Design
- **Mobile**: Single column layout with stacked components
- **Tablet**: Two-column grid for better space utilization
- **Desktop**: Sidebar layout with three-column content areas

## Status Configurations

### Order Statuses
- **Processing**: Yellow - Order is being prepared
- **Confirmed**: Blue - Order confirmed and ready for shipment
- **Shipped**: Indigo - Order is on its way
- **In Transit**: Purple - Package is being delivered
- **Delivered**: Green - Order successfully delivered
- **Cancelled**: Red - Order has been cancelled
- **Refunded**: Gray - Payment has been refunded

### Payment Statuses
- **Pending**: Yellow - Payment is being processed
- **Completed**: Green - Payment successful
- **Failed**: Red - Payment failed
- **Refunded**: Gray - Payment refunded

## Future Enhancements

### Planned Features
- [ ] Address book management
- [ ] Password change functionality
- [ ] Account settings (notifications, preferences)
- [ ] Order detail page with full order information
- [ ] Return/refund request system
- [ ] Wishlist integration
- [ ] Loyalty points system
- [ ] Two-factor authentication
- [ ] Download order receipts (PDF)

### Technical Improvements
- [ ] Real API integration
- [ ] Enhanced error handling
- [ ] Offline support
- [ ] Progressive loading
- [ ] Enhanced accessibility
- [ ] Performance optimizations
- [ ] Unit test coverage

## Testing

### Test Scenarios
1. Account dashboard loading and display
2. Order filtering and searching
3. Profile form validation and submission
4. Order actions (cancel, reorder)
5. Navigation between account pages
6. Responsive layout on different devices
7. Error handling and loading states

### Mock Data Coverage
- Multiple order statuses and dates
- Various payment methods
- Different order amounts and item counts
- User profile with complete information
- Address book with multiple addresses

## Dependencies

- React 19.1.0+
- React Router DOM 7.7.1+
- React Icons
- TailwindCSS 3.4.17+

## Usage Examples

### Basic Account Access
```
/account                    # Account dashboard
/account/orders            # Order history
/account/profile          # Profile settings
```

### From Order Confirmation
```javascript
// Redirect to order details
navigate(`/account/orders/${orderId}`);
```

### Profile Updates
```javascript
const result = await updateProfile({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+1234567890'
});
```

This Account & My Orders module provides a complete user account management system that seamlessly integrates with the existing Buyzy e-commerce platform, offering users full control over their orders and profile information.
