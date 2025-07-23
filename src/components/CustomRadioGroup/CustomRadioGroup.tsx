import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface CustomRadioGroupProps {
  name: string;
  label?: string;
  options: Option[];
  rules?: any;
  row?: boolean;
}

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
  name,
  label,
  options,
  rules,
  row = true,
}) => {
  const { control } = useFormContext();

  return (
    <FormControl component="fieldset">
      {label && (
        <FormLabel component="legend">
          <Typography fontWeight={600}>{label}</Typography>
        </FormLabel>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <RadioGroup {...field} row={row}>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {/** Error handling */}
            {rules?.required && fieldState?.error?.message && (
              <Typography variant="caption" color="error">
                {fieldState.error.message}
              </Typography>
            )}
          </>
        )}
      />
    </FormControl>
  );
};

export default CustomRadioGroup;
