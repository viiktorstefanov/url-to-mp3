import React, { useState } from "react";
import DownloadButton from "../DownloadButton/DownloadButton";
import request from "../../service/api";
import ConvertButton from "../ConvertButton/ConvertButton";
import { TextField } from "@mui/material";
import styled from "styled-components";

type FormProps = {
  switchLoading: () => void;
};

type FormState = {
  downloadUrl: string;
  error: string | null;
};

const Form: React.FC<FormProps> = ({ switchLoading }) => {
  const [state, setState] = useState<FormState>({
    downloadUrl: "",
    error: null,
  });

  const onSubmit = async (e: React.FormEvent) => {
    setState((prev) => ({ ...prev, error: null }));
    e.preventDefault();

    if (state.downloadUrl) {
      try {
        switchLoading();
        const responseUrl = await request(state.downloadUrl);

        setState((prevState) => ({
          ...prevState,
          downloadUrl: responseUrl,
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
      downloadUrl: e.target.value,
    }));
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledInput
        id="standard-basic"
        label="Youtube URL"
        variant="standard"
        onChange={onChange}
      />
      {state.downloadUrl?.length === 0 && <ConvertButton />}
      {state.downloadUrl?.length > 0 && (
        <DownloadButton url={state.downloadUrl} />
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
  width: "400px",
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
