import React from "react";

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className: string;
}
export const Button: React.FC<Props> = ({ onClick, className }) => {
  return (
    <div>
      <button onClick={onClick} className={className}>
        Search
      </button>
    </div>
  );
};
