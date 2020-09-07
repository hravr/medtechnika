import React from "react";
import s from "./Pagination.module.css";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      {...{ pageCount }}
      {...{ onPageChange }}
      containerClassName={s.pagination__container}
      activeClassName={s.pagination__active__link}
      previousLabel=""
      nextLabel=""
      pageClassName={s.pagination__link}
    />
  );
};

export default Pagination;
