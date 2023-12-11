import React from "react";

const Button = (props) => {
  return (
    <button
      className={`${props.className} `}
      style={{
        height: props.height,
        width: props.width,
        padding: props.padding,
        border: props.border,
        borderRadius: props.rounded,
        backgroundColor: props.bg,
      }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
