import React, { CSSProperties } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import styled from "styled-components";

const override: CSSProperties = {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

type LoaderProps = {
  isLoading: boolean;
};

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <LoaderWrapper>
          <PulseLoader
            color={"#f3d22d"}
            loading={true}
            cssOverride={override}
            size={15}
            aria-label="Loading"
            data-testid="loader"
          />
        </LoaderWrapper>
      )}
    </>
  );
};

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000000;
`;

export default Loader;
