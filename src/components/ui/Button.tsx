interface ButtonProps {
  name: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

function Button(props: ButtonProps) {
  const { name, onClick, disabled, className } = props;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-white px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-blue-500 hover:bg-blue-600 cursor-pointer focus:outline-none ${className || ''} disabled:opacity-50 disabled:!bg-gray-400 disabled:cursor-not-allowed`}
    >
      {name}
    </button>
  );
}

export default Button;
