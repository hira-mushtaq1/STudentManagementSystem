import React from "react";
import { TextField } from "@mui/material";

export default function SMInput(props) {
  const {
    label,
    onChange,
    value,
    type,
    disabled,
    required,
    fullWidth,
    InputProps,
  } = props;

  // -- TYPE CHECK
  // fullwidth: BOOLEAN
  // required: BOOLEAN
  // onChange: function

  return (
    <>
      <TextField
        label={label}
        fullWidth
        InputProps={InputProps}
        variant="standard"
        required={required}
        onChange={onChange}
        value={value}
        type={type}
        disabled={disabled}
      />
    </>
  );
}
