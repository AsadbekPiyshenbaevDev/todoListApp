import React from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { MyButton } from "../UI";
import classes from "./ListItem.module.css";
import { NotificationManager } from "react-notifications";

const ListItem = ({ dataItem, remove, edit }) => {
  const deleteItem = (id) => {
    if (window.confirm("Siz bul itemdi oshiriwge qayilsizba?")) {
      remove(id);
      return;
    }

    NotificationManager.warning(
      "Buyriq islemedi :)",
      "Siz buyriqti biykarlardiniz!",
      3000
    );
  };

  const editItem = (id) => {
    edit(id);
  };

  return (
    <div className={classes.item}>
      <div>
        <h1 className={classes.title}>{dataItem.title}</h1>
        <p className={classes.desc}>{dataItem.desc}</p>
      </div>
      <div className={classes.actions}>
        <MyButton data-trash onClick={() => deleteItem(dataItem.id)}>
          <FaTrashAlt />
        </MyButton>
        <MyButton onClick={() => editItem(dataItem.id)}>
          <FaEdit />
        </MyButton>
      </div>
    </div>
  );
};

export default ListItem;
