import React from 'react';
import styled from "styled-components";
import ComingSoonIcon from "../../img/coming_soon.png"

const Container = styled.div ``;

const ComingSoonImage = styled.img `
  width: 100%;
  height: 100%;
`;

const ComingSoon = () => {
    return (
        <Container>
            <ComingSoonImage src={ComingSoonIcon} alt="ComingSoon"/>
        </Container>
    );
};

export default ComingSoon;
