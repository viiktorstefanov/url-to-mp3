import React, { useState } from "react";
import DownloadButton from "../DownloadButton/DownloadButton";
import request from "../../service/api";
import ConvertButton from "../ConvertButton/ConvertButton";
import { Box, TextField } from "@mui/material";
import styled from "styled-components";

type FormProps = {
  switchLoading: () => void;
};

type FormState = {
  value: string;
  downloadUrl: string;
  error: string | null;
  isConverted: boolean;
};

const Form: React.FC<FormProps> = ({ switchLoading }) => {
  const [state, setState] = useState<FormState>({
    value: "",
    downloadUrl: "",
    error: null,
    isConverted: false,
  });

  const onSubmit = async (e: React.FormEvent) => {
    setState((prev) => ({ ...prev, error: null }));
    
    e.preventDefault();

    if (state.value) {
      try {
        switchLoading();
        const responseUrl = await request(state.value);

        if(responseUrl.length === 0) {
          setState((prevState) => ({
            ...prevState,
            error: 'Wrong Youtube URL',
            downloadUrl: '',
            value: '',
            isConverted: false,
          }));
          return;
        }

        setState((prevState) => ({
          ...prevState,
          downloadUrl: responseUrl,
          isConverted: true,
        }));


      } catch (error: any) {
        if (error.response.data.message) {
          setState((prevState) => ({
            ...prevState,
            error: error.response.data.message,
          }));
        }
      } finally {
        switchLoading();
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      value: e.target.value,
      error: null,
    }));
  };

  const resetStates = () => {
    setState((prevState) => ({
      ...prevState,
      downloadUrl: '',
      value: '',
      isConverted: false,
    }))
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledInput
        id="standard-basic"
        label="Youtube URL"
        variant="standard"
        value={state.value}
        onChange={onChange}
      />
      
      {!state.isConverted && <Box>
        <ConvertButton />
      </Box>}
      {state.isConverted && (
        <DownloadButton url={state.downloadUrl} resetStates={resetStates} />
      )}
      {state.error && <StyledSpan>{state.error}</StyledSpan>}
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 0 0 0;
  gap: 3rem;
  margin: auto;
`;

const StyledInput = styled(TextField)({
  maxWidth: "600px",
  width: "500px",
  backgroundColor: "#ffffff",
  "& .MuiInputBase-input": {
    paddingLeft: "0.5rem",
  },
  "& .MuiInputLabel-root": {
    color: "#000",
    paddingLeft: "0.5rem",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#000",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "rgb(205, 177, 36)",
  },
});

const StyledSpan = styled.span`
  color: #d32f2f;
`;

export default Form;
