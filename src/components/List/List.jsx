import React from "react";
import ListItem from "../ListItem/ListItem";
import { NotData } from "../UI";
import classes from "./List.module.css";

const List = ({ data, remove, handleID }) => {
  if (!data.length) {
    return (
      <NotData>
        <h1>Info data not array!!!</h1>
      </NotData>
    );
  }

  return (
    <div className={classes.list}>
      {data.map((todo) => (
        <ListItem
          dataItem={todo}
          key={todo.id}
          remove={remove}
          edit={handleID}
        />
      ))}
    </div>
  );
};

export default List;
