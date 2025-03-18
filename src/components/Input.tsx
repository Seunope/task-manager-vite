// import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
// import { UseFormRegisterReturn } from 'react-hook-form';

// type Props = {
//   type?: string;
//   width?: string;
//   label?: string;
//   disabled?: boolean;
//   requiredLabel?: boolean;
//   helpText?: string;
//   inputClassName?: string;
//   LeadingIcon?: () => JSX.Element;
//   TrailingIcon?: () => JSX.Element;
//   innerRef?: UseFormRegisterReturn;
//   inputType?: 'default' | 'success' | 'warning' | 'error';
// };

// export default function Input(
//   props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & Props,
// ) {
//   const {
//     id,
//     label,
//     width,
//     requiredLabel,
//     disabled,
//     readOnly,
//     helpText,
//     innerRef,
//     className,
//     LeadingIcon,
//     TrailingIcon,
//     inputClassName,
//     inputType = 'default',
//   } = props;

//   const helpTextColor = () => {
//     let color = 'grey-beau';

//     if (inputType === 'success') {
//       color = 'meador';
//     } else if (inputType === 'warning') {
//       color = 'yellow';
//     } else if (inputType === 'error') {
//       color = 'orange';
//     }

//     return color;
//   };

//   return (
//     <div className={`${width}`}>
//       {label && (
//         <label htmlFor={id} className="text-xs md:text-sm font-semibold">
//           {`${label} `}
//           {requiredLabel && <span className="text-RED">*</span>}
//         </label>
//       )}
//       <div
//         className={`mt-2 flex items-center  bg-white ${className} rounded-lg relative ${
//           (disabled || readOnly) && 'bg-grey'
//         }`}
//       >
//         {LeadingIcon && (
//           <span className="mx-2">
//             <LeadingIcon />
//           </span>
//         )}
//         <input
//           {...props}
//           {...innerRef}
//           className={`w-full md:h-12 py-3 text-xs md:text-sm font-normal
//             placeholder:font-normal placeholder:text-sm
//             bg-BACKGROUND/50 border-0 rounded-md outline-PRIMARY px-6 ${inputClassName}`}
//         />
//         {TrailingIcon && (
//           <span className="absolute right-5">
//             <TrailingIcon />
//           </span>
//         )}
//       </div>
//       {helpText && <small className={`text-xs my-2 text-${helpTextColor()}`}>{helpText}</small>}
//     </div>
//   );
// }

import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type Props = {
  type?: string;
  width?: string;
  label?: string;
  disabled?: boolean;
  requiredLabel?: boolean;
  helpText?: string;
  inputClassName?: string;
  LeadingIcon?: React.ComponentType;
  TrailingIcon?: React.ComponentType;
  error?: string | boolean; // Add error prop for Formik compatibility
  inputType?: 'default' | 'success' | 'warning' | 'error';
};

export default function Input(
  props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & Props,
) {
  const {
    id,
    label,
    width,
    requiredLabel,
    disabled,
    readOnly,
    helpText,
    className,
    LeadingIcon,
    TrailingIcon,
    inputClassName,
    inputType = 'default',
    error, // Add error to destructured props
  } = props;

  const helpTextColor = () => {
    let color = 'grey-beau';

    if (inputType === 'success') {
      color = 'meador';
    } else if (inputType === 'warning') {
      color = 'yellow';
    } else if (inputType === 'error' || error) {
      color = 'orange';
    }

    return color;
  };

  return (
    <div className={`${width}`}>
      {label && (
        <label htmlFor={id} className="text-xs md:text-sm font-semibold">
          {`${label} `}
          {requiredLabel && <span className="text-RED">*</span>}
        </label>
      )}
      <div
        className={`mt-2 flex items-center bg-white ${className} rounded-lg relative ${
          (disabled || readOnly) && 'bg-grey'
        } ${error ? 'border-RED border-2' : ''}`}
      >
        {LeadingIcon && (
          <span className="mx-2">
            <LeadingIcon />
          </span>
        )}
        <input
          {...props}
          className={`w-full md:h-12 py-3 text-xs md:text-sm font-normal 
            placeholder:font-normal placeholder:text-sm 
            bg-BACKGROUND/50 border-0 rounded-md outline-PRIMARY px-2 md:px-6 
            ${error ? 'border-RED' : ''} 
            ${inputClassName}`}
        />
        {TrailingIcon && (
          <span className="absolute right-5">
            <TrailingIcon />
          </span>
        )}
      </div>
      {(helpText || error) && (
        <small className={`text-xs my-2 ${error ? 'text-RED' : `text-${helpTextColor()}`}`}>
          {error || helpText}
        </small>
      )}
    </div>
  );
}
