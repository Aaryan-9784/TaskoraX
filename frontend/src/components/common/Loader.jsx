const Loader = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizes[size]} border-[3px] border-primary-100 border-t-primary-500 rounded-full animate-spin`}
      />
    </div>
  );
};

export const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-center space-y-4">
      <Loader size="lg" />
      <p className="text-text-secondary text-sm font-medium">Loading...</p>
    </div>
  </div>
);

export default Loader;
