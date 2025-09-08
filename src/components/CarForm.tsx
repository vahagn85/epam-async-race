import React, { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';

interface CarFormProps {
  initTextValue: string;
  initColorValue: string;
  btnName: 'Create' | 'Update';
  onSubmit: (_text: string, _color: string) => void;
}

function CarForm(props: CarFormProps) {
  const { initTextValue, initColorValue, btnName, onSubmit } = props;
  const [text, setText] = useState(initTextValue);
  const [color, setColor] = useState(initColorValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(text, color);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-1 items-center">
      <Input type="text" value={text} onChange={setText} />
      <Input type="color" value={color} onChange={setColor} />

      <Button name={btnName} />
    </form>
  );
}

export default CarForm;
