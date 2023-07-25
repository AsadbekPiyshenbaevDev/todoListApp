import React from "react";

export const useFilteredTodo = (data, filter) => {
  const getSortTodo = React.useMemo(() => {
    if (filter.sortTodo) {
      return data.sort((a, b) =>
        a[filter.sortTodo].localeCompare(b[filter.sortTodo])
      );
    }

    return data;
  }, [data, filter.sortTodo]);

  return React.useMemo(() => {
    return getSortTodo.filter((el) =>
      el.title.toLowerCase().includes(filter.searchTodo.toLowerCase().trim())
    );
  }, [getSortTodo, filter.sortTodo, filter.searchTodo]);
};
