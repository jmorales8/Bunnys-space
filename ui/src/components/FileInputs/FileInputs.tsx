import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export type ReusableFileInputProps = {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
  visible?: boolean;
  required?: boolean;
  accept?: string;
  disabled?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  preview?: boolean;
  previewWidth?: number;
  previewHeight?: number;
  imgStyle?: React.CSSProperties;
  labelClassName?: string;
};

export const ReusableFileInput: React.FC<ReusableFileInputProps> = ({
  label,
  file,
  onChange,
  visible = true,
  required = false,
  accept = "image/*",
  disabled = false,
  inputProps,
  preview = true,
  previewWidth = 200,
  previewHeight = 200,
  imgStyle,
  labelClassName = "custom-file-upload",
}) => {
  const [previewURL, setPreviewURL] = useState<string | undefined>(undefined);
  const lastURL = useRef<string | undefined>(undefined);

  const themeContext = useContext(ThemeContext);
  if (!themeContext) throw new Error("DarkMode must be used within a ThemeProvider");
  const { isDarkMode } = themeContext;

  // Build/cleanup object URLs when "file" changes
  useEffect(() => {
    // cleanup old url
    if (lastURL.current) {
      URL.revokeObjectURL(lastURL.current);
      lastURL.current = undefined;
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewURL(url);
      lastURL.current = url;
    } else {
      setPreviewURL(undefined);
    }
    return () => {
      if (lastURL.current) {
        URL.revokeObjectURL(lastURL.current);
        lastURL.current = undefined;
      }
    };
  }, [file]);

  if (!visible) return null;

  return (
    <div className="fileInputs">
      <label className={isDarkMode ? "fileInputs__button__night" : "fileInputs__button"}>
        {label}
        <input
          type="file"
          required={required}
          accept={accept}
          disabled={disabled}
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          {...inputProps}
        />
      </label>

      {preview && previewURL && (
        <img
          src={previewURL}
          width={previewWidth}
          height={previewHeight}
          alt={label}
          style={{ objectFit: "cover", borderRadius: 8, ...imgStyle }}
        />
      )}
    </div>
  );
};
