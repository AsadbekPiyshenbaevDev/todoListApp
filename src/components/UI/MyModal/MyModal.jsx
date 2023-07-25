import React from "react";
import MyButton from "../MyButton/MyButton";
import classes from "./MyModal.module.css";

const MyModal = ({ children, ...props }) => {
  const { show, hide, setTodoID } = props;

  React.useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    }

    if (!show) {
      document.body.style.overflow = "auto";
    }
  }, [show]);

  const hideModal = () => {
    hide(false);
  };

  return (
    <div
      className={
        show ? `${classes.modal} ${classes.active}` : `${classes.modal}`
      }
      onClick={hideModal}
    >
      <div
        className={classes.modalInner}
        onClick={(event) => event.stopPropagation()}
      >
        <button className={classes.modalCloseBtn} onClick={hideModal}>
          &times;
        </button>
        <div className={classes.modalBlock}>
          <div>{children}</div>
          <div>
            <MyButton onClick={hideModal}>close</MyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyModal;
