type PaginationProps = {
  number: number;
  nextPage: boolean;
  currentPage: number;
  previousPage: boolean;
  onPageChange: (arg: number) => void;
};

const Pagination = ({
  onPageChange,
  number,
  nextPage,
  currentPage,
  previousPage,
}: PaginationProps) => {
  const pages = [];
  const pageNeighbours = 1; // Number of pages to show before and after the current page

  const startPage = Math.max(2, currentPage - pageNeighbours);
  const endPage = Math.min(number - 1, currentPage + pageNeighbours);

  if (startPage > 2) {
    pages.push(
      <div
        key={1}
        onClick={() => onPageChange(1)}
        className="py-2 w-8 text-center font-semibold
         rounded-md text-xs cursor-pointer border-2 border-PRIMARY/30"
      >
        1
      </div>,
    );
    pages.push(
      <div key="start-dots" className="py-2 w-8 font-semibold text-center rounded-md text-sm">
        ...
      </div>,
    );
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <div
        key={i}
        onClick={() => onPageChange(i)}
        className={`py-2 w-8 text-center font-semibold rounded-md text-xs cursor-pointer ${
          i === currentPage ? 'text-WHITE bg-PRIMARY' : 'border-2 border-PRIMARY/30'
        }`}
      >
        {i}
      </div>,
    );
  }

  if (endPage < number - 1) {
    pages.push(
      <div key="end-dots" className="py-2 w-8 font-semibold text-center rounded-md text-sm">
        ...
      </div>,
    );
    pages.push(
      <div
        key={number}
        onClick={() => onPageChange(number)}
        className="py-2 w-8 text-center font-semibold rounded-md 
        text-xs cursor-pointer border-2 border-PRIMARY/30"
      >
        {number}
      </div>,
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div className="mt-6 mx-auto w-2/6">
        <div className="flex gap-3 justify-center items-center w-full">
          <button
            className={`font-semibold text-sm cursor-pointer 
              ${currentPage === 1 || !previousPage ? 'text-grey-1' : ''}`}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!previousPage || currentPage === 1}
          >
            Prev
          </button>
          <div className="flex gap-1">{pages}</div>
          <button
            className={`font-semibold text-sm cursor-pointer ${!nextPage && 'text-grey-1'}`}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === number}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
