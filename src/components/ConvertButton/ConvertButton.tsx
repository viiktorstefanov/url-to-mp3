import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const StyledButton = styled(Button)(({ theme }) => ({
  color: "#000",
  padding: "1.1rem 0.5rem 1rem 0.5rem",
  lineHeight: "unset",
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  backgroundColor: "#F3D226",
  width: "100px",
  height: "51px",
  [theme.breakpoints.down("sm")]: {
    padding: "0.8rem 0.3rem",
    width: "80px",
    fontSize: "0.8rem",
  },
  [theme.breakpoints.up("md")]: {
    width: "120px",
  },
}));

const ConvertButton: React.FC = () => {
  return (
    <StyledButton variant="text" type="submit">
      convert
    </StyledButton>
  );
};

export default ConvertButton;
