import React from "react";
const TextBox = (props) => {
  return (
    <div
      className={`h-28 w-full bg-gray-800 text-white text-center outline-none rounded-md hover:outline-orange-500 `}>
      {props.title}
      </div>
  );
};

export default TextBox;
