// import { COLORS } from "constant";
// import { CustomTextFieldProps } from "types";
import React, { useState, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  CloseRounded,
  Info,
  VisibilityOff,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Box,
  TextField,
  InputLabel,
  IconButton,
  Typography,
  InputAdornment,
  Stack,
} from "@mui/material";
import { CustomTextFieldProps } from "types";
import { COLORS } from "constant";

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  name,
  type,
  rules,
  label,
  width,
  height,
  onBlur,
  minRows,
  maxRows,
  onFocus,
  disabled,
  multiline,
  maxLength,
  allowOnly,
  description,
  placeholder,
  defaultValue,
  autoComplete,
  readOnly = false,
  showHelperText = true,
  endAdornment,
  onKeyDown,
  ...props
}) => {
  const { control, formState } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const patterns = {
        numeric: /[^0-9]/g,
        decimal: /[^0-9.]/g,
        alphabetic: /[^a-zA-Z]/g,
        alphanumeric: /[^a-zA-Z0-9]/g,
      };

      if (allowOnly && patterns[allowOnly]) {
        e.target.value = value.replace(patterns[allowOnly], "");
      }

      if (maxLength && e.target.value.length > maxLength) {
        e.target.value = e.target.value.slice(0, maxLength);
      }
    },
    [allowOnly, maxLength]
  );

  // Label
  const renderLabel = () => (
    <Stack direction="column" gap={"4px"}>
      <Typography
        variant="h2_bold"
        component={InputLabel}
        sx={{ color: COLORS.gray.dark }}
      >
        {label}
      </Typography>
      <Typography variant="h6_light" mb={1}>
        {description}
      </Typography>
    </Stack>
  );

  // Helper Text
  const renderHelperText = (errorMessage?: string) => {
    if (!showHelperText || !errorMessage) return "";

    return (
      <Typography
        component="span"
        variant="caption"
        sx={{
          display: "flex",
          alignItems: "center",
          color: COLORS.error.main,
          marginLeft: -2,
          textTransform: "none",
        }}
      >
        <InputAdornment position="start">
          <Info
            sx={{
              color: COLORS.error.main,
              rotate: "180deg",
              width: 16,
            }}
          />
        </InputAdornment>
        {errorMessage}
      </Typography>
    );
  };

  // Password Adornment
  const renderPasswordAdornment = () => {
    if (type !== "password") return null;

    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          edge="end"
        >
          {showPassword ? (
            <VisibilityOff sx={{ color: COLORS.gray.light }} />
          ) : (
            <VisibilityOutlined sx={{ color: COLORS.gray.light }} />

            // <Box
            //   component="img"
            //   src="/assets/icons/Eye_icon.svg"
            //   sx={{ color: COLORS.gray.light }}
            // />
          )}
        </IconButton>
      </InputAdornment>
    );
  };

  // TextField
  return (
    <Box width={{ md: width, sm: width, xs: "100%" }}>
      {renderLabel()}
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <TextField
            variant="outlined"
            disabled={disabled}
            {...field}
            placeholder={placeholder || ""}
            {...props}
            defaultValue={defaultValue || ""}
            fullWidth
            multiline={multiline}
            minRows={minRows}
            maxRows={maxRows}
            error={!!fieldState.error}
            sx={{
              "& .MuiInputBase-root": {
                height: height || "inherit",
              },
            }}
            helperText={renderHelperText(fieldState.error?.message?.toString())}
            type={showPassword ? "text" : type}
            inputProps={{
              maxLength,
              onInput: handleInputChange,
            }}
            InputProps={{
              endAdornment: endAdornment ? endAdornment : <div />,
              readOnly,
              autoComplete,
            }}
            onBlur={(event) => {
              field.onBlur();
              onBlur?.(event);
            }}
            onFocus={onFocus}
            {...(onKeyDown ? { onKeyDown } : {})}
          />
        )}
      />
    </Box>
  );
};

export default CustomTextField;
