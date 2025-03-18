import SearchBar from './Search';
import Input from './Input';
import { ChangeEvent } from 'react';

type DateRangeFilterProps = {
  toDate: string;
  fromDate: string;
  justify?: string;
  isToDate?: boolean;
  searchTerm: string;
  minEndDate?: string;
  minStartDate?: string;
  showSearchbar?: boolean;
  handleClearFilter: () => void;
  handleSearchQuery: (arg: string) => void;
  handleSelectEndDate: (arg: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSelectStartDate: (arg: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

const DateRangeFilter = ({
  toDate,
  isToDate,
  fromDate,
  searchTerm,
  minEndDate,
  minStartDate,
  justify = 'md:justify-end',
  showSearchbar = true,
  handleSearchQuery,
  handleClearFilter,
  handleSelectEndDate,
  handleSelectStartDate,
}: DateRangeFilterProps) => {
  return (
    <>
      <div className="sm:flex sm:justify-between items-center gap-2 w-full mt-8">
        {showSearchbar && (
          <div className="hidden sm:flex w-[40%] relative">
            <SearchBar className="lg:w-[90%]" placeholder="Search" onSearch={handleSearchQuery} />
          </div>
        )}
        <div
          className={`w-full flex gap-2 items-center justify-center ${justify} flex-wrap md:flex-nowrap mb-4`}
        >
          <Input
            type="date"
            name="fromDate"
            label="From"
            inputClassName="bg-WHITE border-2 border-PRIMARY"
            value={fromDate}
            min={minStartDate}
            onChange={handleSelectStartDate}
          />

          <span className="mt-6 font-bold">-</span>
          <Input
            type="date"
            name="toDate"
            label="To"
            inputClassName={`bg-WHITE border-2 border-PRIMARY ${!isToDate ? 'w-[120px]' : ''}`}
            value={isToDate ? toDate : ''}
            disabled={!fromDate}
            min={minEndDate}
            onChange={handleSelectEndDate}
          />
          {((toDate && isToDate) || searchTerm) && (
            <button
              className="w-[120px] px-1 md:px-4 py-2 md:py-2 bg-SECONDARY 
            rounded-md text-green text-xs md:text-base md:mt-8"
              onClick={handleClearFilter}
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>
      {(toDate || searchTerm) && (
        <span className="font-semibold italic text-GREY text-xs md:text-sm">
          {isToDate
            ? `Search result for dates 
                  between "${fromDate} to ${isToDate ? toDate : ''}"`
            : searchTerm
              ? `Search result for search term "${searchTerm}"`
              : ''}
        </span>
      )}
    </>
  );
};

export default DateRangeFilter;
