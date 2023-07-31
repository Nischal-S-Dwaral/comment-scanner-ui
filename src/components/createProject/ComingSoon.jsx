import React from 'react';
import styled from "styled-components";

const Container = styled.div ``;

const ComingSoonImage = styled.img `
  width: 100%;
  height: 100%;
`;

const ComingSoon = () => {
    return (
        <Container>
            <ComingSoonImage src="/coming_soon.png" alt="ComingSoon"/>
        </Container>
    );
};

export default ComingSoon;
