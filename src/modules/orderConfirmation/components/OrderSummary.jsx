import { FiDownload, FiMail, FiPrinter, FiShare2 } from 'react-icons/fi';

const OrderSummary = ({ order }) => {
  if (!order?.summary) return null;

  const { summary } = order;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    console.log('Downloading receipt for order:', order.orderId);
  };

  const handleEmailReceipt = () => {
    // In a real app, this would send an email receipt
    console.log('Emailing receipt for order:', order.orderId);
  };

  const handlePrintReceipt = () => {
    // In a real app, this would open print dialog
    window.print();
  };

  const handleShareOrder = () => {
    // In a real app, this would share order details
    if (navigator.share) {
      navigator.share({
        title: `Order ${order.orderId}`,
        text: `Check out my order from Buyzy!`,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h3>

      {/* Summary Details */}
      <div className="space-y-4 mb-6">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Subtotal ({order.items?.reduce((sum, item) => sum + item.quantity, 0)} items)
          </span>
          <span className="text-sm font-medium text-gray-900">
            {formatCurrency(summary.subtotal)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Shipping & Handling</span>
          <span className="text-sm font-medium text-gray-900">
            {summary.shipping > 0 ? formatCurrency(summary.shipping) : (
              <span className="text-green-600 font-semibold">Free</span>
            )}
          </span>
        </div>

        {/* Tax */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Tax</span>
          <span className="text-sm font-medium text-gray-900">
            {formatCurrency(summary.tax)}
          </span>
        </div>

        {/* Discount */}
        {summary.discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Discount Applied</span>
            <span className="text-sm font-medium text-green-600">
              -{formatCurrency(summary.discount)}
            </span>
          </div>
        )}

        {/* Total */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-lg font-bold text-gray-900">
            {formatCurrency(summary.total)}
          </span>
        </div>
      </div>

      {/* Payment Method Summary */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Paid with</span>
          <span className="text-sm font-medium text-gray-900">
            {order.payment?.method}
          </span>
        </div>
        {order.payment?.cardNumber && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Card ending in</span>
            <span className="text-sm font-medium text-gray-900">
              ••••{order.payment.cardNumber.slice(-4)}
            </span>
          </div>
        )}
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-600">Amount charged</span>
          <span className="text-sm font-semibold text-green-600">
            {formatCurrency(summary.total)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-900">Receipt Options</h4>

        <div className="grid grid-cols-2 gap-3">
          {/* Download Receipt */}
          <button
            onClick={handleDownloadReceipt}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FiDownload className="w-4 h-4" />
            Download
          </button>

          {/* Email Receipt */}
          <button
            onClick={handleEmailReceipt}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FiMail className="w-4 h-4" />
            Email
          </button>

          {/* Print Receipt */}
          <button
            onClick={handlePrintReceipt}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FiPrinter className="w-4 h-4" />
            Print
          </button>

          {/* Share Order */}
          <button
            onClick={handleShareOrder}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FiShare2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Need Help?</h4>

        <div className="space-y-2">
          <button className="block w-full text-left text-sm text-blue-600 hover:text-blue-700 hover:underline">
            Track your order
          </button>
          <button className="block w-full text-left text-sm text-blue-600 hover:text-blue-700 hover:underline">
            Return or exchange items
          </button>
          <button className="block w-full text-left text-sm text-blue-600 hover:text-blue-700 hover:underline">
            Contact customer support
          </button>
          <button className="block w-full text-left text-sm text-blue-600 hover:text-blue-700 hover:underline">
            Leave feedback
          </button>
        </div>
      </div>

      {/* Order Reference */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Order Reference</p>
          <p className="text-sm font-mono bg-gray-100 px-3 py-2 rounded-lg inline-block">
            {order.orderId}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Keep this reference for your records
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
