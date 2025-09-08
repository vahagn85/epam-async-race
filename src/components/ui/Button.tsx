interface ButtonProps {
  name: string;
  onClick?: () => void;
  className?: string;
}

function Button(props: ButtonProps) {
  const { name, onClick, className } = props;

  return (
    <button
      onClick={onClick}
      className={`text-white px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-blue-500 hover:bg-blue-600 cursor-pointer focus:outline-none ${className || ''}`}
    >
      {name}
    </button>
  );
}

export default Button;
