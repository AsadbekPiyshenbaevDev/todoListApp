import React from "react";
import { List, Form, SortAndSearch } from "./components";
import { MyButton, MyModal, MyPagination } from "./components/UI";
import { AiOutlinePlus } from "react-icons/ai";
import { NotificationManager } from "react-notifications";
import { useFilteredTodo } from "./hooks/useFiletered";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const [totalCount, setTotalCount] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  const [showForm, setShowForm] = React.useState(false);
  const [todoID, setTodoID] = React.useState(null);
  const [filteredTodo, setFilteredTodo] = React.useState({
    sortTodo: "",
    searchTodo: "",
  });

  const { sortTodo, searchTodo } = filteredTodo;

  const getTodos = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/todos", {
        params: {
          _limit: 5,
          _page: page,
        },
      });
      setTodos(response.data);
      setTotalCount(response.headers["x-total-count"]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = (newTodo) => {
    setTodos((prev) => [...prev, newTodo]);
    getTodos(currentPage);
    NotificationManager.success(
      "buyriq atqarildi :)",
      "Siz taza todo qostiniz!!!",
      3000
    );
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/todos/${id}`);

      if (response.status === 200) {
        const filterTodos = todos.filter((item) => item.id !== id);
        setTodos(filterTodos);
        getTodos(currentPage);
        NotificationManager.success(
          "buyriq atqarildi :)",
          "Siz awmetli oshiridiniz!",
          3000
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleID = (id) => {
    setTodoID(id);
    setShowForm(true);
  };

  const editTodo = (obj) => {
    const editArray = todos.map((el) => {
      if (el.id === obj.id) {
        return obj;
      }

      return el;
    });
    setTodos(editArray);

    localStorage.setItem("todos", JSON.stringify(editArray));
  };

  const showAddFormHandle = () => {
    setTodoID(null);
    setShowForm(true);
  };

  const handleSortTodo = (sort) => {
    setFilteredTodo((prev) => ({ ...prev, sortTodo: sort }));
  };

  const handleSearchTodo = (e) => {
    setFilteredTodo((prev) => ({ ...prev, searchTodo: e.target.value }));
  };

  const getSearchTodoAndSort = useFilteredTodo(todos, filteredTodo);

  React.useEffect(() => {
    getTodos(currentPage);
  }, [currentPage]);

  const handlePageClick = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  return (
    <>
      <main className="app">
        <div className="container">
          <MyButton
            onClick={showAddFormHandle}
            style={{ marginBottom: "20px", display: "flex", fontSize: "20px" }}
          >
            <AiOutlinePlus />
          </MyButton>
          {loading ? (
            <h2>loading...</h2>
          ) : error ? (
            <h2>Error: {error}</h2>
          ) : (
            <>
              <SortAndSearch
                sortFn={handleSortTodo}
                sortVal={sortTodo}
                searchVal={searchTodo}
                searchFn={handleSearchTodo}
              />
              <List
                data={getSearchTodoAndSort}
                remove={deleteTodo}
                handleID={handleID}
              />
              <MyPagination
                totalCount={totalCount}
                handlePageClick={handlePageClick}
                currentPage={currentPage}
              />
            </>
          )}
        </div>
      </main>
      <MyModal show={showForm} hide={setShowForm} setTodoID={setTodoID}>
        <Form
          create={addTodo}
          edit={editTodo}
          hideModal={setShowForm}
          id={todoID}
          setTodoID={setTodoID}
          data={todos}
        />
      </MyModal>
    </>
  );
};

export default App;
