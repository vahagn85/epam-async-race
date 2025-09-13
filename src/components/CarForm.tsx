import React, { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';

interface CarFormProps {
  initTextValue: string;
  initColorValue: string;
  disabled?: boolean;
  btnName: 'Create' | 'Update';
  onSubmit: (_text: string, _color: string) => void;
  onChangeText?: (_val: string) => void;
  onChangeColor?: (_val: string) => void;
}

function FormButton({
  btnName,
  disabled,
}: {
  btnName: 'Create' | 'Update';
  disabled?: boolean;
}) {
  return (
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
  );
}

function CarForm(props: CarFormProps) {
  const { initTextValue, initColorValue, btnName, disabled, onSubmit } = props;
  const { onChangeText, onChangeColor } = props;
  const [text, setText] = useState(initTextValue);
  const [color, setColor] = useState(initColorValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(text, color);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-1 items-center">
      <Input
        type="text"
        value={text}
        onChange={(v) => {
          setText(v);
          onChangeText?.(v);
        }}
        disabled={disabled}
        maxLength={30}
      />
      <Input
        type="color"
        value={color}
        onChange={(v) => {
          setColor(v);
          onChangeColor?.(v);
        }}
        disabled={disabled}
        className="flex-none"
      />
      <FormButton btnName={btnName} disabled={disabled} />
    </form>
  );
}

export default CarForm;
