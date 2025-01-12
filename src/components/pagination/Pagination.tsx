import React from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";
interface PaginationProps {
  pageCount: number;
  onPageChange: (selected: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  return (
    <div className="pagination">
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(event) => onPageChange(event.selected)}
        containerClassName={"pagination-container"}
        activeClassName={"active"}
        previousClassName={"previous"}
        nextClassName={"next"}
        disabledClassName={"disabled"}
      />
    </div>
  );
};

export default Pagination;
