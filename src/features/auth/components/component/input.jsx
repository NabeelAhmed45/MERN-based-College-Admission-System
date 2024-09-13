import React from "react";

const Input = (props) => {
  const {  ...rest } = props;
  return (
    <div>
      <input {...rest}  />
    </div>
  );
};

export default Input;
