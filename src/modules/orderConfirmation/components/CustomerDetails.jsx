import { FiUser, FiMail, FiPhone } from 'react-icons/fi';

const CustomerDetails = ({ order }) => {
  if (!order?.customer) return null;

  const { customer } = order;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Information</h3>

      <div className="space-y-4">
        {/* Customer Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <FiUser className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Customer Name</div>
            <div className="font-medium text-gray-900">
              {customer.firstName} {customer.lastName}
            </div>
          </div>
        </div>

        {/* Email Address */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
            <FiMail className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Email Address</div>
            <div className="font-medium text-gray-900">
              {customer.email}
            </div>
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
            <FiPhone className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Phone Number</div>
            <div className="font-medium text-gray-900">
              {customer.phone}
            </div>
          </div>
        </div>
      </div>

      {/* Customer ID Badge */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full">
          <span className="text-xs text-gray-500">Customer ID:</span>
          <span className="text-xs font-mono text-gray-700">{customer.id}</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
