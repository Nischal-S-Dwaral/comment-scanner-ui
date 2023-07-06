import React from 'react';
import styled from "styled-components";
import {greenColorCode, redColorCode} from "../constants";
import CircularPercentageWithLabel from "./CircularPercentageWithLabel";

const Container = styled.div `
  display: flex;
  width: 100%;
`;

const Left = styled.div `
  flex: 1;
  padding: 15px;
`;

const Right = styled.div `
  flex: 1;
  padding: 15px 15px 15px 0;
`;

const Card = styled.div `
  height: 210px;
  background-color: white;
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

const LanguageIcon = styled.img `
  width: 120px;
  height: 120px;
`;

const ProjectSummary = ({ projects }) => {

    const projectColumn1Element = [];
    const projectColumn2Element = [];

    projects.forEach((element, index) => {
        if (index % 2 === 0) {
            projectColumn1Element.push(element);
        } else {
            projectColumn2Element.push(element);
        }
    });

    return (
        <Container>
            <Left>
                {projectColumn1Element.map((element) => (
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
                                <LanguageIcon src="/java.png" alt="Java" />
                            </LanguageContainer>
                        </Bottom>
                    </Card>
                ))}
            </Left>
            <Right>
                {projectColumn2Element.map((element) => (
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
                                <LanguageIcon src="/java.png" alt="Java" />
                            </LanguageContainer>
                        </Bottom>
                    </Card>
                ))}
            </Right>
        </Container>
    );
};

export default ProjectSummary;
