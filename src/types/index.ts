import { RegisterOptions } from "react-hook-form";
export interface CustomTextFieldProps {
  name: string;
  label?: string;
  type: string;
  width?: string;
  height?: string;
  multiline?: any;
  minRows?: number;
  maxRows?: number;
  readOnly?: boolean;
  maxLength?: number;
  disabled?: boolean;
  placeholder: string;
  description?: string;
  autoComplete?: string;
  defaultValue?: string;
  rules?: RegisterOptions;
  showHelperText?: boolean;
  allowOnly?: "numeric" | "alphabetic" | "alphanumeric" | "decimal";
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
  onFocus?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
  endAdornment?: React.ReactNode;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
}
