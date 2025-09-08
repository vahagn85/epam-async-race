interface InputProps {
  type: string;
  value: string;
  placeholder?: string;
  onChange?: (_value: string) => void;
  className?: string;
}

function Input(props: InputProps) {
  const {
    type = 'text',
    value,
    placeholder = 'TYPE CAR BRAND',
    onChange,
    className,
  } = props;

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`flex-auto p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ''}`}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}

export default Input;
