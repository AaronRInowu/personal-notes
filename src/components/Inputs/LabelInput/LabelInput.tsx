import React, { InputHTMLAttributes } from "react";
import "./Labelinput.scss";

interface IlblInp extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClass?: string;
  labelClass?: string;
  error?: string;
}

export const LabelInput = (props: IlblInp) => {
  const {
    error,
    label,
    labelClass = "",
    containerClass = "",
    className = "",
    ...rest
  } = props;
  return (
    <div className={`lbl-container flex flex-col relative ${containerClass}`}>
      <label
        // className={`absolute place-label trans-3 top-2 left-2 ${labelClass}`}
        className={`place-label trans-3 ${labelClass}`}
      >
        {label}
      </label>
      <input
        placeholder={rest.placeholder ? rest.placeholder : " "}
        className={`form-input bot-border  ${className}`}
        {...rest}
      />
      {error && <label className="text-danger">*{error}</label>}
    </div>
  );
};
