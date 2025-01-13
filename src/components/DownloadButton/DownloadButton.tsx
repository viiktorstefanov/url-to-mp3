import React from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";

type DownloadButtonProps = {
  url: string | null;
};

const Link = styled.a`
 color: #f3d22d;
`;

const DownloadButton: React.FC<DownloadButtonProps> = ({ url }) => {

    if(!url) {
        return;
    }

  return (
    <Link target="_blank" href={url}>
      <Button variant="text" color="inherit" type="submit">
        DOWNLOAD MP3
      </Button>
    </Link>
  );
};

export default DownloadButton;
