interface InputProps {
  type: string;
  value: string;
  placeholder?: string;
  onChange?: (_value: string) => void;
  className?: string;
  disabled?: boolean;
}

function Input(props: InputProps) {
  const {
    type = 'text',
    value,
    placeholder = 'TYPE CAR BRAND',
    onChange,
    className,
    disabled,
  } = props;

  return (
    <input
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      className={`flex-auto p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ''} ${disabled ? 'opacity-50 cursor-not-allowed disabled:bg-gray-200' : ''}`}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}

export default Input;
