import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {greenColorCode, orangeColorCode, redColorCode, yellowColorCode} from "../../constants";

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
  flex: 1;
`;

const PercentageContainer = styled.div `
  border: 0.5px solid black;  
  width: 100%;
  flex: 12;
`;

const PercentageFilled = styled.div `
  background-color: ${(props) => props.fillColor};
  width: ${(props) => props.percentage}%;
  top: 0;
  right: 0;
  height: 100%;
`;

const CoverageProjectsSummary = ({ projects }) => {

    const [countGreaterThanOrEqual80, setCountGreaterThanOrEqual80] = useState(0);
    const [countBetween60And80, setCountBetween60And80] = useState(0);
    const [countBetween40And60, setCountBetween40And60] = useState(0);
    const [countLessThan40, setCountLessThan40] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const coverages = projects.map(project => project.coveragePercentage);
        setTotal(coverages.length);

        let countGE80 = 0;
        let count60To80 = 0;
        let count40To60 = 0;
        let countLT40 = 0;

        coverages.forEach(number => {
            if (number >= 80) {
                countGE80++;
            } else if (number >= 60 && number < 80) {
                count60To80++;
            } else if (number >= 40 && number < 60) {
                count40To60++;
            } else {
                countLT40++;
            }
        });

        // Update the state with the new counts
        setCountGreaterThanOrEqual80(countGE80);
        setCountBetween60And80(count60To80);
        setCountBetween40And60(count40To60);
        setCountLessThan40(countLT40);
    }, [projects]);

    return (
        <Container>
            <Title>
                Documentation Coverage
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
