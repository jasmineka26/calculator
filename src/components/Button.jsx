const Button = ({ onClick, operation, title = "", color = "", size = "" }) => {
  const handleClick = () => {
    if (onClick) onClick(title);
    if(operation) operation(title);
  };
  return (
    <button
      onClick={handleClick}
      className="rounded bg-blue-300 text-white w-12 h-12 hover:scale-110"
      style={{ backgroundColor: color, width: size }}
    >
      {title}
    </button>
  );
};

export default Button;
