import React from "react";

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
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
