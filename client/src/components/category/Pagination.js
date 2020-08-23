import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ categoryPerPage, totalCategories, paginate }) => {
  const pageNumbers = [];

  if (totalCategories !== 0) {
    for (let i = 1; i <= Math.ceil(totalCategories / categoryPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">

            <Link to="#" onClick={() => paginate(number)} className="page-link">
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
