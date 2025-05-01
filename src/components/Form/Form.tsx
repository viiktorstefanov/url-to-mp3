import React, { useState } from "react";
import DownloadButton from "../DownloadButton/DownloadButton";
import request from "../../service/api";
import ConvertButton from "../ConvertButton/ConvertButton";
import { Box } from "@mui/material";
import styled from "styled-components";
import useIsMobile from "../../hooks/useIsMobile";

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
  const isMobile = useIsMobile();

  const [state, setState] = useState<FormState>({
    value: "",
    downloadUrl: "",
    error: null,
    isConverted: false,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, error: null }));

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
        if (error.response?.data?.message) {
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
      <Row className={isMobile ? "mobile" : ""}>
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
  padding: 3rem 1rem 0;
  margin: auto;
  gap: 3rem;
  width: 100%;
`;

const Row = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 570px;
  gap: 0;
`;

const StyledInput = styled.input`
  flex-grow: 1;
  padding: 1rem;
  font-family: Roboto, sans-serif;
  font-size: 1rem;
  border: none;
  border-radius: 8px 0 0 8px;
  background-color: #ffffff;
  white-space: nowrap;
  overflow-x: auto;
  text-overflow: ellipsis;

  &:focus {
    outline: none;
  }
`;

const StyledSpan = styled.span`
  color: #d32f2f;
`;

export default Form;
