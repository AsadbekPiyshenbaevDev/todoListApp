import React from "react";
import classes from "./NotData.module.css";

const NotData = ({ children }) => {
  return <div className={classes.notData}>{children}</div>;
};

export default NotData;
