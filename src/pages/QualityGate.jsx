import React from 'react';
import styled from "styled-components";

const Container = styled.div `
`;

const Main = styled.div `
  display: flex;
`;

const QualityGate = () => {
    return (
        <Container>
            <Main>
                This is the quality gate page
            </Main>
        </Container>
    );
};

export default QualityGate;
