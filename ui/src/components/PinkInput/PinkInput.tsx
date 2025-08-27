import React from "react";
interface PinkInputProps {
  state: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}

export function PinkInput({
  state,
  value,
  onChange,
  placeholder,
  type,
}: PinkInputProps) {
  return (
    <div className="col-3 input-effect">
      <input
        className={`${
          state ? "effect-20__night login__input__night" : "effect-20"
        } ${value ? "has-content" : ""} login__input`}
        type={type == undefined ? "text" : "password"}
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
