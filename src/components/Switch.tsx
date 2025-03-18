import { DetailedHTMLProps, InputHTMLAttributes, useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export default function Switch(
  props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label: string;
    opacity?: string;
    innerRef?: UseFormRegisterReturn;
  },
) {
  const {
    id,
    label,
    innerRef,
    className,
    disabled = false,
    onChange = () => {},
    checked: check = false,
    opacity = 'bg-opacity-70',
  } = props;
  const [checked, setChecked] = useState<boolean>(check);

  useEffect(() => {
    setChecked((prev) => (check !== prev ? check : prev));
    return () => setChecked(false);
  }, [check]);

  return (
    <>
      <label className={`flex cursor-pointer font-medium ${className}`} htmlFor={id}>
        {label && <span className="mv-0 dark text-sm mr-2">{label}</span>}
        <input
          hidden
          id={id}
          {...props}
          {...{ checked }}
          type="checkbox"
          className="hidden"
          onChange={(e) => {
            onChange(e);
            setChecked(!checked);
          }}
          {...innerRef}
        />
        <div
          className={`w-12 h-6 relative ${
            checked ? 'bg-PRIMARY' : 'bg-grey-1'
          } rounded-xl flex items-center px-1 mr-2 ${
            disabled ? `cursor-not-allowed ${opacity}` : ``
          }`}
        >
          <div
            className={`w-4 h-4 absolute bg-WHITE rounded-xl ${checked ? 'left-7' : 'left-1'}`}
          />
        </div>
      </label>
    </>
  );
}
