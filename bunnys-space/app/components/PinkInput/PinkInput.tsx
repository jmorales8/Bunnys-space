import React from "react";
import "./pinkInput.css";

interface PinkInputProps {
  state: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  name: string;
  id?: string;
  required?: boolean;
}

export function PinkInput({
  state,
  value,
  onChange,
  placeholder,
  type = "text",
  name,
  id,
  required,
}: PinkInputProps) {
  return (
    <div className="col-3">
      <input
        className={`${
          state ? "effect-20__night login__input__night" : "effect-20"
        } ${value ? "has-content" : ""} login__input`}
        type={type}
        name={name}
        id={id ?? name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <span className="focus-border">
        <i></i>
      </span>
    </div>
  );
}
