import React, { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';

interface CarFormProps {
  initTextValue: string;
  initColorValue: string;
  disabled?: boolean;
  btnName: 'Create' | 'Update';
  onSubmit: (_text: string, _color: string) => void;
}

function CarForm(props: CarFormProps) {
  const { initTextValue, initColorValue, btnName, disabled, onSubmit } = props;
  const [text, setText] = useState(initTextValue);
  const [color, setColor] = useState(initColorValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(text, color);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-1 items-center">
      <Input type="text" value={text} onChange={setText} disabled={disabled} />
      <Input
        type="color"
        value={color}
        onChange={setColor}
        disabled={disabled}
      />

      <Button
        isBtn={false}
        name={btnName}
        disabled={disabled}
        className={
          btnName === 'Create'
            ? 'bg-green-600 hover:bg-green-800'
            : '!bg-amber-600 hover:!bg-amber-800'
        }
      />
    </form>
  );
}

export default CarForm;
