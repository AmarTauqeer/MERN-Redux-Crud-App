import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ productPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];

  if (totalProducts !== 0) {
    for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
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
