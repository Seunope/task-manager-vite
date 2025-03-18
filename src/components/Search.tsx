import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';

type SearchBarProps = {
  placeholder?: string;
  className?: string;
  onSearch: (arg: string) => void;
};

const SearchBar = ({ placeholder, onSearch, className }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     onSearch(query);
  //   }
  // };

  return (
    <div
      className={`mb-4 sm:mb-0 flex w-full sm:w-1/2 md:w-2/5 lg:w-1/3 relative items-center ${className}`}
    >
      <input
        type="text"
        className="w-full h-10 rounded-full 
        text-sm bg-SECONDARY/50 sm:bg-WHITE border-0 
        font-medium pl-10 pr-4 outline-SECONDARY"
        value={query}
        onChange={handleInputChange}
        // onKeyDown={handleKeyDown}
        placeholder={placeholder || 'Search...'}
      />
      <IoSearch className="text-xl text-GREY absolute left-3" />
    </div>
  );
};

export default SearchBar;
