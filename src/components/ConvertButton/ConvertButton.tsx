import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";


const StyledButton = styled(Button)({
    color: "#000",
    padding: "1.1rem 0.5rem 1rem 0.5rem",
    lineHeight: "unset",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0, 
    backgroundColor: '#F3D226',
    width: "100px",
});

const ConvertButton: React.FC = () => {
  return (
    <StyledButton variant="text" type="submit">
      convert
    </StyledButton>
  );
};

export default ConvertButton;
