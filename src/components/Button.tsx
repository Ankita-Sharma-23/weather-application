import React from "react";

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className: string;
  label:string;
}
export const Button: React.FC<Props> = ({ onClick, className ,label}) => {
  return (
    <div>
      <button onClick={onClick} className={className}>
        {label}
      </button>
    </div>
  );
};
