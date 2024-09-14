"use client";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, handlePageChange }) => {
  const renderPaginationButtons = () => {
    const buttons = [];
    // Show first two pages, current page, and last two pages
    if (currentPage > 2) {
      buttons.push(
        <button key={1} className="join-item btn" onClick={() => handlePageChange(1)}>
          1
        </button>,
      );
      buttons.push(
        <button key="ellipsis1" className="join-item btn btn-disabled">
          ...
        </button>,
      );
    }

    // Show current page - 1, current page, and current page + 1
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
      buttons.push(
        <button
          key={i}
          className={`join-item btn ${i === currentPage ? "btn-active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>,
      );
    }

    // Add ellipsis and last page button
    if (currentPage < totalPages - 1) {
      buttons.push(
        <button key="ellipsis2" className="join-item btn btn-disabled">
          ...
        </button>,
      );
      buttons.push(
        <button key={totalPages} className="join-item btn" onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </button>,
      );
    }

    return buttons;
  };

  return (
    <div className="join flex justify-center">
      <button className="join-item btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      {renderPaginationButtons()}
      <button
        className="join-item btn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
