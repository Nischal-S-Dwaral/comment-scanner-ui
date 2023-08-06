import React from 'react';
import styled from 'styled-components';
import { CircularProgress, Typography } from "@mui/material";

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Spinner = styled(CircularProgress)`
  margin-bottom: 1rem;
`;

const LoadingText = styled(Typography)`
  font-size: 1.2rem;
`;

const Loading = ({ loadingText = 'Loading...' }) => {
    return (
        <LoadingContainer>
            <Spinner />
            <LoadingText variant="h6">{loadingText}</LoadingText>
        </LoadingContainer>
    );
};

export default Loading;
