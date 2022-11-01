import { Button } from "@mui/material";
import React from "react";

export default function SMButton(props) {
  const { label, onClick, startIcon, endIcon, color, padding } = props;
  return (
    <>
      <Button
        onClick={onClick}
        endIcon={endIcon}
        startIcon={startIcon}
        color={color}
        sx={{ padding: { padding } }}
        variant="contained"
      >
        {label}
      </Button>
    </>
  );
}
