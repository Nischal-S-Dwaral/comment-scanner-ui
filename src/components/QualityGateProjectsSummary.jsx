import React from 'react';
import styled from "styled-components";

const Container = styled.div `
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Title = styled.h4 `
  margin-bottom: 10px;
  padding: 5px;
`;

const QualityContainer = styled.div `
  padding: 5px;
  display: flex;
  margin-bottom: 5px;
`;

const QualityText = styled.span `
  flex: 1;
`;

const NumberContainer = styled.div `
  flex: 3;
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

const QualityGateProjectsSummary = ({ passed, failed }) => {
    const greenColorCode = "#79da14";
    const redColorCode = "#e30903";

    const total = passed + failed;
    const passPercentage = (passed / total) * 100;
    const failPercentage = (failed / total) * 100;

    return (
        <Container>
            <Title>
                Quality Gate
            </Title>
            <QualityContainer>
                <QualityText>Passed</QualityText>
                <NumberContainer>
                    <NumberText>
                        {passed}
                    </NumberText>
                    <PercentageContainer>
                        <PercentageFilled percentage={passPercentage} fillColor={greenColorCode} />
                    </PercentageContainer>
                </NumberContainer>
            </QualityContainer>
            <QualityContainer>
                <QualityText>Failed</QualityText>
                <NumberContainer>
                    <NumberText>
                        {failed}
                    </NumberText>
                    <PercentageContainer>
                        <PercentageFilled percentage={failPercentage} fillColor={redColorCode} />
                    </PercentageContainer>
                </NumberContainer>
            </QualityContainer>
        </Container>
    );
};

export default QualityGateProjectsSummary;
