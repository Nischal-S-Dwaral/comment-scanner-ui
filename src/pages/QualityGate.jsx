import React from 'react';
import styled from "styled-components";
import Navbar from "../components/Navbar";

const Container = styled.div `
`;

const Main = styled.div `
  display: flex;
`;

const QualityGate = () => {
    return (
        <Container>
            <Main>
                <Navbar/>
                This is the quality gate page
            </Main>
        </Container>
    );
};

export default QualityGate;
