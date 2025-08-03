import { FiCreditCard, FiCheck, FiClock, FiDollarSign, FiShield } from 'react-icons/fi';
import { paymentStatuses } from '../data/mockOrder.js';

const PaymentDetails = ({ order }) => {
  if (!order?.payment) return null;

  const { payment, summary } = order;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getPaymentIcon = (method) => {
    switch (method?.toLowerCase()) {
      case 'credit card':
        return <FiCreditCard className="w-5 h-5" />;
      default:
        return <FiDollarSign className="w-5 h-5" />;
    }
  };

  const getStatusConfig = (status) => {
    return paymentStatuses[status?.toLowerCase()] || paymentStatuses.completed;
  };

  const statusConfig = getStatusConfig(payment.status);

  const getCardType = (number) => {
    if (!number) return '';
    const firstDigit = number.charAt(0);
    if (firstDigit === '4') return 'Visa';
    if (firstDigit === '5') return 'Mastercard';
    if (firstDigit === '3') return 'American Express';
    return 'Card';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Information</h3>

      {/* Payment Method */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <div className="text-blue-600">
              {getPaymentIcon(payment.method)}
            </div>
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-1">Payment Method</div>
            <div className="font-medium text-gray-900">{payment.method}</div>
            {payment.cardNumber && (
              <div className="text-sm text-gray-600">
                {getCardType(payment.cardNumber)} ending in {payment.cardNumber.slice(-4)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Status */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 bg-${statusConfig.color}-50 rounded-lg flex items-center justify-center`}>
            {statusConfig.color === 'green' ? (
              <FiCheck className={`w-5 h-5 text-${statusConfig.color}-600`} />
            ) : (
              <FiClock className={`w-5 h-5 text-${statusConfig.color}-600`} />
            )}
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-1">Payment Status</div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-${statusConfig.color}-50 text-${statusConfig.color}-800`}>
                <div className={`w-1.5 h-1.5 rounded-full bg-${statusConfig.color}-600`}></div>
                {statusConfig.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      {payment.transactionId && (
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <FiShield className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">Transaction Details</div>
              <div className="text-sm text-gray-900 mb-1">
                Transaction ID:
                <span className="font-mono ml-2 bg-gray-100 px-2 py-1 rounded">
                  {payment.transactionId}
                </span>
              </div>
              {payment.processingFee && (
                <div className="text-sm text-gray-600">
                  Processing Fee: {formatCurrency(payment.processingFee)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Payment Summary */}
      <div className="pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Payment Breakdown</h4>

        <div className="space-y-3">
          {/* Subtotal */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Subtotal</span>
            <span className="text-sm font-medium text-gray-900">
              {formatCurrency(summary.subtotal)}
            </span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Shipping</span>
            <span className="text-sm font-medium text-gray-900">
              {summary.shipping > 0 ? formatCurrency(summary.shipping) : 'Free'}
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
              <span className="text-sm text-gray-600">Discount</span>
              <span className="text-sm font-medium text-green-600">
                -{formatCurrency(summary.discount)}
              </span>
            </div>
          )}

          {/* Total */}
          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
            <span className="text-base font-semibold text-gray-900">Total Charged</span>
            <span className="text-base font-bold text-gray-900">
              {formatCurrency(summary.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center gap-2 mb-2">
          <FiShield className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">Secure Payment</span>
        </div>
        <p className="text-xs text-green-700">
          Your payment information is encrypted and processed securely.
          We never store your full credit card details.
        </p>
      </div>
    </div>
  );
};

export default PaymentDetails;
