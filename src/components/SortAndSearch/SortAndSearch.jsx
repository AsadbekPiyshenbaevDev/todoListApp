import React from "react";
import { MyInput, MySelect } from "../UI";
import classes from "./SortAndSearch.module.css";

const SortAndSearch = ({sortFn, sortVal, searchVal, searchFn}) => {
  return (
    <div className={classes.sortBlock}>
      <MySelect
        title="Sort"
        value={sortVal}
        options={[
          { value: "title", name: "title" },
          { value: "desc", name: "description" },
        ]}
        onChange={sortFn}
      />
      <MyInput placeholder="Search todo..." value={searchVal} onChange={searchFn} />
    </div>
  );
};

export default SortAndSearch;
