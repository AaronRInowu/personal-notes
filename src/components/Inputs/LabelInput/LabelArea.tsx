import React, { TextareaHTMLAttributes } from "react";
import "./Labelinput.scss";

interface IlblInp extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  containerClass?: string;
  labelClass?: string;
  error?: string;
}

export const LabelArea = (props: IlblInp) => {
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
        className={`absolute place-label trans-3 top-2 left-2 ${labelClass}`}
      >
        {label}
      </label>
      <textarea
        placeholder={rest.placeholder ? rest.placeholder : " "}
        className={`form-input bot-border  ${className}`}
        {...rest}
      />
      {error && <label className="text-danger">*{error}</label>}
    </div>
  );
};
