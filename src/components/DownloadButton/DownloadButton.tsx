import React from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";

type DownloadButtonProps = {
  url: string | null;
  resetStates: () => void;
};

const Link = styled.a`
 color: #f3d22d;
`;

const DownloadButton: React.FC<DownloadButtonProps> = ({ url, resetStates }) => {

    if(!url) {
        return;
    }

  return (
    <Link target="_blank" href={url} onClick={resetStates}>
      <Button variant="text" color="inherit" type="button">
        DOWNLOAD MP3
      </Button>
    </Link>
  );
};

export default DownloadButton;
