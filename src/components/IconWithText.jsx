const IconWithText = ({ icon: Icon, title, description, className = "" }) => {
  return (
    <div className={`text-center ${className}`}>
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-primary-100 rounded-full">
          <Icon className="w-8 h-8 text-primary-600" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default IconWithText;
