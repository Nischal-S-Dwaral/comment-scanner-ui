import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {greenColorCode, redColorCode} from "../../constants";

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
  background-color: ${(props) => props.fillcolor};
  width: ${(props) => props.percentage}%;
  top: 0;
  right: 0;
  height: 100%;
`;

const QualityGateProjectsSummary = ({ projects }) => {

    const [passPercentage, setPassPercentage] = useState(0.0);
    const [failPercentage, setFailPercentage] = useState(0.0);
    const [passed, setPassed] = useState(0);
    const [failed, setFailed] = useState(0);


    useEffect(() => {
        setPassed(projects.filter((project) => project.qualityGatePass === 'PASSED').length);
        setFailed(projects.filter((project) => project.qualityGatePass === 'FAILED').length);
    }, [projects]);

    useEffect(() => {
        const total = passed + failed;
        const pass = (passed / total) * 100;
        const fail = (failed / total) * 100;

        setPassPercentage(pass);
        setFailPercentage(fail);
    }, [passed, failed]);


    return (
        <>
            {(passPercentage !== 0.0 || failPercentage !== 0.0) && (
                <Container>
                    <Title>Quality Gate</Title>
                    <QualityContainer>
                        <QualityText>Passed</QualityText>
                        <NumberContainer>
                            <NumberText>{passed}</NumberText>
                            <PercentageContainer>
                                <PercentageFilled percentage={passPercentage} fillcolor={greenColorCode} />
                            </PercentageContainer>
                        </NumberContainer>
                    </QualityContainer>
                    <QualityContainer>
                        <QualityText>Failed</QualityText>
                        <NumberContainer>
                            <NumberText>{failed}</NumberText>
                            <PercentageContainer>
                                <PercentageFilled percentage={failPercentage} fillcolor={redColorCode} />
                            </PercentageContainer>
                        </NumberContainer>
                    </QualityContainer>
                </Container>
            )}
        </>
    );
};

export default QualityGateProjectsSummary;
