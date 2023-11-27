import React from 'react';
import styled from "styled-components";
import {ChevronRight, Source} from "@mui/icons-material";
import CodeRow from "./CodeRow";
import {linesOfCodeData} from "../../data";

const Container = styled.div `
  width: 100%;
  height: 100%;
`;

const MainContainer = styled.div `
  margin: 20px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const TopContainer = styled.div `
  display: flex;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const HeaderContainer = styled.div `
  flex: 5;
  display: flex;
  align-items: center;
`;

const ProjectName = styled.h4 `
  color: #484242;
  padding: 0 3px;
`;

const Path = styled.h4 `
  padding: 0 3px;
`;

const NumberOfLines = styled.div `
  flex: 1;
`;

const Coverage = styled.div `
  flex: 1;
`;

const BottomContainer = styled.div ``;

const CodeView = ({ projectName, classId }) => {

    const linesOfCodes = linesOfCodeData.lineOfCodes
    const coverage = linesOfCodeData.coverage
    const path = linesOfCodeData.path

    return (
        <Container>
            {
                linesOfCodes.length > 0 && (
                    <>
                        <MainContainer>
                            <TopContainer>
                                <HeaderContainer>
                                    <Source style={{ color: "#F8D775" }}/>
                                    <ProjectName>{projectName}</ProjectName>
                                    <ChevronRight/>
                                    <Path>{path}</Path>
                                </HeaderContainer>
                                <NumberOfLines>
                                    Lines: {linesOfCodes.length}
                                </NumberOfLines>
                                <Coverage>
                                    Coverage: {coverage}%
                                </Coverage>
                            </TopContainer>
                            <BottomContainer>
                                {
                                    linesOfCodes.map((codeRow) => (
                                        <CodeRow
                                            key={codeRow.lineNumber}
                                            lineNumber={codeRow.lineNumber}
                                            code={codeRow.code}
                                            isHighlight={codeRow.highlight}
                                            highlightColor={codeRow.highlightColor}
                                            popOverText={codeRow.commentText}
                                        />
                                    ))}
                            </BottomContainer>
                        </MainContainer>
                    </>
                )
            }
        </Container>
    );
};

export default CodeView;
