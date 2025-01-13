import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const StyledButton = styled(Button)({
    color: "#f3d22d",
    width: "200px"
});

const ConvertButton: React.FC = () => {
  return (
    <StyledButton variant="text" type="button">
      convert
    </StyledButton>
  );
};

export default ConvertButton;
