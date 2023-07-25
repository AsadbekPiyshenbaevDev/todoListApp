import React from "react";
import classes from "./MySelect.module.css";

const MySelect = ({ title, options, value, onChange }) => {
  return (
    <select
      value={value}
      className={classes.mySelect}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="" disabled>
        {title}
      </option>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default MySelect;
