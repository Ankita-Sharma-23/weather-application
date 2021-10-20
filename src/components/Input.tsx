import React from "react";
interface Props {
  type: string;
  value: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input: React.FC<Props> = ({
  type,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
