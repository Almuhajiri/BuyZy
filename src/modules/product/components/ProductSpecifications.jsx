import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const ProductSpecifications = ({ specifications }) => {
  const [expandedSections, setExpandedSections] = useState({});

  if (!specifications || Object.keys(specifications).length === 0) {
    return null;
  }

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Product Specifications
        </h3>
      </div>

      <div className="divide-y divide-gray-200">
        {Object.entries(specifications).map(([sectionKey, sectionData]) => {
          const isExpanded = expandedSections[sectionKey] !== false; // Default to expanded

          return (
            <div key={sectionKey}>
              {/* Section Header */}
              <button
                onClick={() => toggleSection(sectionKey)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <h4 className="text-base font-medium text-gray-900">
                  {sectionKey}
                </h4>
                {isExpanded ? (
                  <FiChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <FiChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {/* Section Content */}
              {isExpanded && (
                <div className="px-6 pb-4">
                  <div className="grid grid-cols-1 gap-3">
                    {Object.entries(sectionData).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-start py-2 border-b border-gray-100 last:border-b-0"
                      >
                        <dt className="text-sm font-medium text-gray-700 flex-shrink-0 w-1/3">
                          {key}
                        </dt>
                        <dd className="text-sm text-gray-900 text-right flex-1 ml-4">
                          {typeof value === 'string' ? value : JSON.stringify(value)}
                        </dd>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Additional Info Footer */}
      <div className="bg-gray-50 px-6 py-3 text-xs text-gray-500">
        Specifications may vary by model and region. Please verify details before purchase.
      </div>
    </div>
  );
};

export default ProductSpecifications;
