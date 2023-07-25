import React from "react";
import { MyInput, MyButton, MyModal } from "../UI";
import classes from "./Form.module.css";
// import { v4 } from "uuid";

import axios from "axios";

const Form = ({ create, hideModal, id, data, edit, setTodoID }) => {
  const [formVal, setFormVal] = React.useState({
    title: "",
    desc: "",
  });
  const [modalShow, setModalShow] = React.useState(false);
  const [findEl, setFindEl] = React.useState(null);

  const { title, desc } = formVal;

  const handleFormValue = (e) => {
    const { value, name } = e.target;
    setFormVal((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => {
    setFormVal({
      title: "",
      desc: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !desc) {
      setModalShow(true);
      return;
    }

    if (title && desc) {
      if (!id) {
        const newTodo = { ...formVal };

        const response = await axios.post(
          "http://localhost:8080/todos",
          newTodo
        );

        create(response.data);
        reset();
        hideModal(false);
      } else {
        const response = await axios.put(`http://localhost:8080/todos/${id}`, {
          ...findEl,
          ...formVal,
        });

        edit(response.data);
        setTodoID(null);
        reset();
        hideModal(false);
      }
    }
  };

  React.useEffect(() => {
    if (id) {
      const findTodo = data.find((item) => item.id === id);
      setFindEl(findTodo);
      setFormVal(findTodo);
    }

    return () => {
      setFormVal({
        title: "",
        desc: "",
      });
      setFindEl(null);
    };
  }, [id]);

  return (
    <>
      <div className={classes.formBlock}>
        <h1>ID: {id}</h1>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className="formControl">
            <MyInput
              type="text"
              name="title"
              placeholder="title"
              value={title}
              onChange={handleFormValue}
            />
          </div>
          <div className="formControl">
            <MyInput
              type="text"
              name="desc"
              placeholder="desc"
              value={desc}
              onChange={handleFormValue}
            />
          </div>
          <div className={classes.actions}>
            <MyButton type="submit">{id ? "edit todo" : "add todo"}</MyButton>
            <MyButton type="reset" onClick={reset}>
              reset todo
            </MyButton>
          </div>
        </form>
      </div>
      <MyModal show={modalShow} hide={setModalShow}>
        <div className={classes.modalTitleBlock}>
          <h2 className={classes.modalTitle}>formani toltirin!!!</h2>
        </div>
      </MyModal>
    </>
  );
};

export default Form;
