import React from 'react';
import styled from "styled-components";

const Container = styled.div `
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Title = styled.h4 `
  margin-bottom: 10px;
  padding: 5px;
`;

const CoverageContainer = styled.div `
  padding: 5px;
  display: flex;
  margin-bottom: 5px;
`;

const RangeText = styled.span `
  flex: 1;
`;

const RangeContainer = styled.div `
  flex: 2;
  display: flex;
`;

const NumberText = styled.span `
  margin-right: 5px;
`;

const PercentageContainer = styled.div `
  border: 0.5px solid black;  
  width: 100%;
`;

const PercentageFilled = styled.div `
  background-color: ${(props) => props.fillColor};
  width: ${(props) => props.percentage}%;
  top: 0;
  right: 0;
  height: 100%;
`;

const CoverageProjectsSummary = ({ coverages }) => {

    const greenColorCode = "#79da14";
    const redColorCode = "#e30903";
    const yellowColorCode = "#f3cb4e";
    const orangeColorCode = "#fd7c2c";

    let countGreaterThanOrEqual80 = 0;
    let countBetween60And80 = 0;
    let countBetween40And60 = 0;
    let countLessThan40 = 0;

    coverages.forEach(number => {
        if (number >= 80) {
            countGreaterThanOrEqual80++;
        } else if (number >= 60 && number < 80) {
            countBetween60And80++;
        } else if (number >= 40 && number < 60) {
            countBetween40And60++;
        } else {
            countLessThan40++;
        }
    });

    const total = coverages.length;

    return (
        <Container>
            <Title>
                Coverage
            </Title>
            <CoverageContainer>
                <RangeText>>=80%</RangeText>
                <RangeContainer>
                    <NumberText>
                        {countGreaterThanOrEqual80}
                    </NumberText>
                    <PercentageContainer>
                        <PercentageFilled percentage={(countGreaterThanOrEqual80 / total) * 100} fillColor={greenColorCode} />
                    </PercentageContainer>
                </RangeContainer>
            </CoverageContainer>
            <CoverageContainer>
                <RangeText>60-80%</RangeText>
                <RangeContainer>
                    <NumberText>
                        {countBetween60And80}
                    </NumberText>
                    <PercentageContainer>
                        <PercentageFilled percentage={(countBetween60And80 / total) * 100} fillColor={yellowColorCode} />
                    </PercentageContainer>
                </RangeContainer>
            </CoverageContainer>
            <CoverageContainer>
                <RangeText>40-60%</RangeText>
                <RangeContainer>
                    <NumberText>
                        {countBetween40And60}
                    </NumberText>
                    <PercentageContainer>
                        <PercentageFilled percentage={(countBetween40And60 / total) * 100} fillColor={orangeColorCode} />
                    </PercentageContainer>
                </RangeContainer>
            </CoverageContainer>
            <CoverageContainer>
                <RangeText>&lt;40%</RangeText>
                <RangeContainer>
                    <NumberText>
                        {countLessThan40}
                    </NumberText>
                    <PercentageContainer>
                        <PercentageFilled percentage={(countLessThan40 / total) * 100} fillColor={redColorCode} />
                    </PercentageContainer>
                </RangeContainer>
            </CoverageContainer>
        </Container>
    );
};

export default CoverageProjectsSummary;
