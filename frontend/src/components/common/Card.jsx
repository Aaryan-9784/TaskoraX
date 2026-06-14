const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <div
      className={`card ${hover ? 'hover:shadow-card-hover hover:-translate-y-0.5' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
