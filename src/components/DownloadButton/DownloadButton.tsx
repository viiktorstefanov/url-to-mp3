import React from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const DownloadButton: React.FC = () => {
  return (
    <Button variant="text">
        <StyledFileDownloadIcon />
    </Button>
  )
};

const StyledFileDownloadIcon = styled(FileDownloadIcon)`
  color: #ffffff; 
  font-size: 2rem; 
  margin-right: 10px; 
  &:hover {
    color: #f3d22d; 
  }
`;

export default DownloadButton;
