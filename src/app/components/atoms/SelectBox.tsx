import React from "react";

type SelectBoxProps = {
  title: string;
  selected?: boolean;
  onSelect?: () => void;
};

const SelectBox = ({ title, onSelect, selected }: SelectBoxProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`
        flex items-center justify-center 
        h-10 px-6 rounded-xl font-semibold
        border-2 duration-130
        ${
          selected
            ? "border-blue-400"
            : "border-gray-400/50 hover:border-blue-400"
        }
      `}
    >
      {title}
    </button>
  );
};

export default SelectBox;
