import 'react-calendar/dist/Calendar.css';

import { useState } from 'react';
import { Calendar } from 'react-calendar';

type DatepickerProps = {
  selectRange?: boolean;
  onSetVisit: () => void;
};

const Datepicker = ({ onSetVisit, selectRange }: DatepickerProps) => {
  const [value, setValue] = useState(new Date());

  function onChangeDate(nextValue?: Date) {
    setValue(nextValue as Date);
  }

  return (
    <div
      className="flex justify-center items-end sm:items-center 
    lg:px-16 lg:justify-end fixed left-0 w-full z-20"
    >
      <div
        className="bg-WHITE w-full px-8 pt-12 pb-8 flex flex-col 
      items-center rounded-t-3xl sm:rounded-3xl sm:w-3/5 lg:w-2/6 z-50 relative"
      >
        <Calendar
          onChange={() => onChangeDate()}
          value={value}
          selectRange={selectRange && selectRange}
          className="bg-SECONDARY/30 rounded-lg text-base 
          lg:text-base px-2 lg:px-2 py-1 relative z-40"
        />
        <div className="text-sm lg:text-sm font-semibold w-full flex gap-6 mt-4 px-2">
          <button className="w-full border-PRIMARY border-2 h-10 rounded-md text-PRIMARY">
            Reset
          </button>
          <button className="h-10 bg-PRIMARY w-full rounded-md text-WHITE" onClick={onSetVisit}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default Datepicker;
