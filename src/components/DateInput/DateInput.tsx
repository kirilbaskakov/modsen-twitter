import { ChangeEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import monthes from '@/constants/monthes';
import daysInMonth from '@/utils/daysInMonth';

const DateInput = ({ defaultValue }: { defaultValue?: Date }) => {
  const { setValue, register } = useFormContext();
  const [date, setDate] = useState(defaultValue ?? new Date());

  const currYear = new Date().getFullYear();
  const years = Array.from(
    { length: currYear - 1900 + 1 },
    (_, i) => currYear - i
  );

  const onMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newDate = new Date(date);
    const newMonth = monthes.indexOf(e.target.value);
    const days = daysInMonth(newMonth, date.getFullYear());
    if (date.getDate() > days) {
      newDate.setDate(days);
    }
    newDate.setMonth(newMonth);
    setDate(newDate);
    setValue('birthday', newDate);
  };

  const onDayChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newDate = new Date(date);
    newDate.setDate(Number(e.target.value));
    setDate(newDate);
    setValue('birthday', newDate);
  };

  const onYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newDate = new Date(date);
    const newYear = Number(e.target.value);
    const days = daysInMonth(newDate.getMonth(), newYear);
    if (date.getDate() > days) {
      newDate.setDate(days);
    }
    newDate.setFullYear(newYear);
    setDate(newDate);
    setValue('birthday', newDate);
  };

  const days = new Array(daysInMonth(date.getMonth(), date.getFullYear()))
    .fill(0)
    .map((_, index) => index + 1);

  return (
    <div className="flex gap-4">
      <div className="relative basis-1/2">
        <select
          id="month-select"
          className="peer"
          value={monthes[date.getMonth()]}
          onChange={onMonthChange}
        >
          {monthes.map(month => (
            <option key={month} className="dark:bg-black">
              {month}
            </option>
          ))}
        </select>
        <label className="label" htmlFor="month-select">
          Month
        </label>
      </div>
      <div className="relative basis-1/4">
        <select
          id="day-select"
          className="peer"
          value={date.getDate()}
          onChange={onDayChange}
        >
          {days.map(day => (
            <option key={day} className="dark:bg-black">
              {day}
            </option>
          ))}
        </select>
        <label className="label" htmlFor="day-select">
          Month
        </label>
      </div>
      <div className="relative basis-1/4">
        <select
          id="year-select"
          className="peer"
          value={date.getFullYear()}
          onChange={onYearChange}
        >
          {years.map(year => (
            <option key={year} className="dark:bg-black">
              {year}
            </option>
          ))}
        </select>
        <label className="label" htmlFor="year-select">
          Month
        </label>
      </div>
      <input type="hidden" {...register('birthday')} />
    </div>
  );
};

export default DateInput;
