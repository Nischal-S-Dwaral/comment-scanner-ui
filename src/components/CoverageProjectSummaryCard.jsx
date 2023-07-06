import React from 'react';
import styled from "styled-components";
import {greenColorCode, redColorCode} from "../constants";
import CircularPercentageWithLabel from "./CircularPercentageWithLabel";

const Card = styled.div `
  height: 160px;
  background-color: #e9f5f5;
  border-radius: 5px;
  border: 0.5px solid black;
  margin-bottom: 15px;
  padding: 25px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Top = styled.div `
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
`;

const ProjectName = styled.h2 ``;

const QualityGateStatus = styled.div `
  color: black;
  background-color: ${(props) => (props.qualityGatePass === 'PASSED' ? greenColorCode : redColorCode)};
  padding: 10px 35px;
  font-size: 16px;
  border-radius: 10px;
`;

const Bottom = styled.div `
  display: flex;
`;

const CoverageContainer = styled.div `
  flex: 1;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.h3 `
  margin-bottom: 10px;
`;

const LanguageContainer = styled.div `
  flex: 1;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LanguageIconContainer = styled.div `
  height: 70px;
  width: 70px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LanguageIcon = styled.img `
  width: 50px;
  height: 50px;
  z-index: 1;
`;

const LastAnalysisContainer = styled.div `
  flex: 1;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LastAnalysisText = styled.h4 `
  margin-bottom: 10px;
  color: blue;
  display: flex;
  align-items: center;
  height: 100%;
`;

const CoverageProjectSummaryCard = ({ element }) => {
    return (
        <Card key={element.id}>
            <Top>
                <ProjectName>{element.projectName}</ProjectName>
                <QualityGateStatus qualityGatePass={element.qualityGatePass}>
                    {element.qualityGatePass}
                </QualityGateStatus>
            </Top>
            <Bottom>
                <CoverageContainer>
                    <Text>Coverage</Text>
                    <CircularPercentageWithLabel percentage={element.coveragePercentage} />
                </CoverageContainer>
                <LanguageContainer>
                    <Text>Language</Text>
                    <LanguageIconContainer>
                        <LanguageIcon src="/java.png" alt="Java" />
                    </LanguageIconContainer>
                </LanguageContainer>
                <LastAnalysisContainer>
                    <Text>Last Analysis</Text>
                    <LastAnalysisText>{element.lastAnalysis}</LastAnalysisText>
                </LastAnalysisContainer>
            </Bottom>
        </Card>
    );
};

export default CoverageProjectSummaryCard;
