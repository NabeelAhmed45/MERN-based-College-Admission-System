import React from "react";

const Radio = ({ items, value, mapLabel, mapValue, ...rest }) => {
  return (
    <>
      {items.map((item, index) => (
        <div key={index}>
          <label>
            <input
              type="radio"
              value={mapValue ? mapValue(item) : item}
              checked={item === value}
              {...rest}
            />
            {mapLabel ? mapLabel(item) : item}
          </label>
        </div>
      ))}
    </>
  );
};

export default Radio;
