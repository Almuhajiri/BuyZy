import { Link } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';

const Breadcrumbs = ({ category, subcategory = null }) => {
  const breadcrumbs = [
    { name: 'Home', href: '/', icon: FiHome },
    { name: 'Categories', href: '/category' },
    { name: category?.name || 'Category', href: `/category/${category?.slug}` }
  ];

  // Handle subcategory breadcrumb - check if it's a string or object
  if (subcategory) {
    const subcategoryName = typeof subcategory === 'string' ? subcategory : subcategory.name;
    const subcategorySlug = typeof subcategory === 'string' ? subcategory : subcategory.slug;

    breadcrumbs.push({
      name: subcategoryName,
      href: `/category/${category?.slug}/${subcategorySlug}`
    });
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center">
          {index > 0 && (
            <FiChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          )}

          {index === breadcrumbs.length - 1 ? (
            // Current page - not a link
            <span className="text-gray-900 font-medium flex items-center">
              {crumb.icon && <crumb.icon className="w-4 h-4 mr-1" />}
              {crumb.name}
            </span>
          ) : (
            // Link to other pages
            <Link
              to={crumb.href}
              className="text-gray-600 hover:text-primary-600 transition-colors duration-200 flex items-center"
            >
              {crumb.icon && <crumb.icon className="w-4 h-4 mr-1" />}
              {crumb.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
