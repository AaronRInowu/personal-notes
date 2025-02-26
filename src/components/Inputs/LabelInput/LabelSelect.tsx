import React, { SelectHTMLAttributes } from "react";
import "./Labelinput.scss";

interface IlblInp extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  containerClass?: string;
  labelClass?: string;
  error?: string;
  options: { value: string | number; name: string | number }[];
}

export const LabelSlect = (props: IlblInp) => {
  const {
    error,
    label,
    labelClass = "",
    containerClass = "",
    options,
    className = "",
    ...rest
  } = props;
  return (
    <div
      className={`lbl-container min-w-[120px] flex flex-col relative ${containerClass}`}
    >
      <label
        className={`absolute place-label trans-3 top-2 left-2 ${labelClass}`}
      >
        {label}
      </label>
      <select className={`form-input  ${className}`} {...rest}>
        <option value={undefined} hidden>
          ---
        </option>
        {options.length > 0 &&
          options.map((m, i) => {
            return (
              <option value={m.value} key={m.value + "_" + i}>
                {m.name}
              </option>
            );
          })}
      </select>
      {error && <label className="text-danger">*{error}</label>}
    </div>
  );
};
