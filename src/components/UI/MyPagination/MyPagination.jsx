import React from "react";
import { sizeCount } from "../../../utils/sizeCount";
import MyButton from "../MyButton/MyButton";

const MyPagination = ({ totalCount, handlePageClick, currentPage }) => {
  const res = sizeCount(totalCount, 5);

  let numbers = [];

  for (let i = 1; i <= res; i++) {
    numbers.push(i);
  }

  return (
    <div style={{ display: "flex", gap: "5px", margin: "12px 0px" }}>
      {numbers.map((el) => (
        <MyButton
          key={el}
          onClick={() => handlePageClick(el)}
          style={{
            backgroundColor: currentPage === el && "rgb(26, 64, 176)",
          }}
        >
          {el}
        </MyButton>
      ))}
    </div>
  );
};

export default MyPagination;
