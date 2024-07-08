import React from "react";
import styled from "styled-components";
import { usePagination, DOTS } from "../hooks/usePagination";

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  text-base: text-gray-600;
  background-color: ${({ theme }) => theme.buttonBackground};
  border: 1px solid ${({ theme }) => theme.borderColor};
  &:hover {
    background-color: ${({ theme }) => theme.buttonHoverBackground};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  &.rounded-l-xl {
    border-radius: 0.75rem 0 0 0.75rem;
  }
  &.rounded-r-xl {
    border-radius: 0 0.75rem 0.75rem 0;
  }
  &.selected {
    color: white;
    background-color: ${({ theme }) => theme.buttonSelectedBackground};
  }
`;

const Ellipsis = styled.span`
  cursor: default;
  width: 100%;
  padding: 0.5rem 1rem;
  text-base: text-gray-600;
  background-color: ${({ theme }) => theme.body};
`;

const Pagination = ({
  onPageChange,
  currentPage,
  siblingCount = 1,
  totalPageCount,
}) => {
  const paginationRange = usePagination({
    currentPage,
    siblingCount,
    totalPageCount,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };
  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <PaginationContainer>
      <div className="flex items-center">
        <Button
          disabled={currentPage === 1}
          onClick={onPrevious}
          className="rounded-l-xl"
        >
          <svg
            width="9"
            fill="currentColor"
            height="8"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
          </svg>
        </Button>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <Ellipsis key={pageNumber}>&#8230;</Ellipsis>;
          }

          return (
            <Button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={pageNumber === currentPage ? "selected" : ""}
            >
              {pageNumber}
            </Button>
          );
        })}

        <Button
          disabled={currentPage === lastPage}
          onClick={onNext}
          className="rounded-r-xl"
        >
          <svg
            width="9"
            fill="currentColor"
            height="8"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
          </svg>
        </Button>
      </div>
    </PaginationContainer>
  );
};

export default Pagination;
