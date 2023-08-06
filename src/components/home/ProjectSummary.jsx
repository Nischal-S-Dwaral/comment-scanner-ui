import React from 'react';
import styled from "styled-components";
import CoverageProjectSummaryCard from "./CoverageProjectSummaryCard";

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

const ProjectSummary = ({ projects, qualityGate }) => {

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
                   <CoverageProjectSummaryCard element={element} qualityGate={qualityGate}/>
                ))}
            </Left>
            <Right>
                {projectColumn2Element.map((element) => (
                    <CoverageProjectSummaryCard element={element} qualityGate={qualityGate}/>
                ))}
            </Right>
        </Container>
    );
};

export default ProjectSummary;
