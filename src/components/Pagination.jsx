import React from 'react';

const Pagination = ({ total, limit, currentPageValue, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="pagination">
      {currentPageValue > 1 && (
        <button onClick={() => onPageChange(currentPageValue - 1)}>Previous</button>
      )}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={currentPageValue === index + 1 ? 'active' : ''}
        >
          {index + 1}
        </button>
      ))}
      {currentPageValue < totalPages && (
        <button onClick={() => onPageChange(currentPageValue + 1)}>Next</button>
      )}
    </div>
  );
};

export default Pagination;
