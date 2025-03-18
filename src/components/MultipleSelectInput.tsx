import React, { useState } from 'react';

type Options = { id: string; variantName: string };

type MultipleSelectInputProps = {
  options: Options[];
  selectedOptions: Options[];
  onSetSelectedOptions: (arg: Options) => void;
};

function MultipleSelectInput({
  selectedOptions,
  onSetSelectedOptions,
  options,
}: MultipleSelectInputProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Options[]>([]);

  //   const options = [
  //     "Apple",
  //     "Banana",
  //     "Cherry",
  //     "Date",
  //     "Elderberry",
  //     "Fig",
  //     "Grape",
  //   ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    if (value) {
      const filteredSuggestions = options.filter((option: Options) =>
        option.variantName.toLowerCase().startsWith(value.toLowerCase()),
      );
      setSuggestions(filteredSuggestions);
      console.log(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: Options) => {
    onSetSelectedOptions(suggestion);

    setInputValue('');
    setSuggestions([]);
  };

  return (
    <div className="w-full max-w-md p-4 bg-BACKGROUND mb-4 rounded shadow">
      <div className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full p-2 border rounded placeholder:text-sm placeholder:font-normal"
          placeholder="Type to search..."
        />
        {suggestions.length > 0 && (
          <ul className="border mt-2 rounded">
            {suggestions.map((suggestion: Options) => (
              <li
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {suggestion.variantName}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Selected Options:</h3>
        <ul className="list-disc pl-5">
          {selectedOptions.map((option: Options) => (
            <li key={option.id} className="mb-1">
              {option.variantName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MultipleSelectInput;
