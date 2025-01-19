import React, { useState } from "react";
import DownloadButton from "../DownloadButton/DownloadButton";
import request from "../../service/api";
import ConvertButton from "../ConvertButton/ConvertButton";
import { Box } from "@mui/material";
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
        
        if (!responseUrl) {
          setState((prevState) => ({
            ...prevState,
            error: "Wrong Youtube URL",
            downloadUrl: "",
            value: "",
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
      downloadUrl: "",
      value: "",
      isConverted: false,
    }));
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      
      <Row>
        <StyledInput
          placeholder="Youtube URL"
          value={state.value}
          onChange={onChange}
        />

        <ConvertButton />
      </Row>

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
  margin: auto;
  gap: 3rem;
`;

const Row = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledInput = styled.input`
  width: 630px;
  padding: 1rem 0.5rem 1rem 0;
  padding-left: 1rem;
  border: none;
  font-family: Roboto;
  font-size: 1rem;
  border-radius: 8px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background-color: #ffffff;
`;

const StyledSpan = styled.span`
  color: #d32f2f;
`;

export default Form;
