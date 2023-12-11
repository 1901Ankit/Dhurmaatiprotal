import React from "react";

const Input = (props) => {
  return (
    <input
      className={`${props.className} custom_input`}
      style={{
        height: props.height,
        width: props.width,
        paading: props.padding,
        border: props.border,
        borderRadius: props.rounded,
      }}
      onChange={props.onChange}
      id={props.id}
      value={props.id}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
