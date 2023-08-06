import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {ChevronRight, Source, TextSnippet} from "@mui/icons-material";
import {useLocation} from "react-router-dom";

const Container = styled.div `
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div `
  display: flex;
  margin-bottom: 20px;
  align-items: center;
`;

const ProjectName = styled.h3 `
  color: #484242;
  padding: 0 10px;
`;

const Path = styled.h3 `
  padding: 0 10px;
`;

const FolderContainer = styled.div `
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const Hr = styled.hr `
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const RowEntryContainer = styled.div ``;

const RowEntry = styled.div `
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const CoverageText = styled.p `
  font-weight: bold;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
`;

const RowEntryFolderName = styled.div `
  display: flex;
  align-items: center;
`;

const RowCoverageText = styled.p `
  display: flex;
`;

const FolderExplorer = ({ apiResponse, parameterCurrentPath, handleClassClick }) => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const projectName = searchParams.get('project');

    const [currentPath, setCurrentPath] = useState(parameterCurrentPath);
    const [directory, setDirectory] = useState(null);

    useEffect(() => {
        setCurrentPath(parameterCurrentPath);
    }, [parameterCurrentPath]);

    useEffect(() => {
        const filteredDirectory = apiResponse.find((dir) => dir.path === currentPath);
        if (filteredDirectory) {
            setDirectory(filteredDirectory);
        }
    }, [currentPath, apiResponse]);

    const handleSubFolderClick = (parentDirectoryPath, clickedDirectoryName) => {
        setCurrentPath(`${parentDirectoryPath}/${clickedDirectoryName}`);
    }

    return (
        <Container>
            <HeaderContainer>
                <Source style={{ color: "#F8D775" }}/>
                <ProjectName>{projectName}</ProjectName>
                <ChevronRight/>
                <Path>{currentPath}</Path>
            </HeaderContainer>
            {
                directory && (
                    <FolderContainer>
                        <Hr/>
                        <RowEntryContainer>
                            <RowEntry>
                                <CoverageText>Coverage</CoverageText>
                            </RowEntry>
                        </RowEntryContainer>
                        <Hr/>
                        <RowEntryContainer>
                            <RowEntry>
                                <RowEntryFolderName>
                                    <Source style={{ color: "#F8D775", marginRight: '5px' }}/>
                                    {directory.path}
                                </RowEntryFolderName>
                                <RowCoverageText>
                                    {directory.coverage}
                                </RowCoverageText>
                            </RowEntry>
                        </RowEntryContainer>
                        <Hr style={{ marginBottom: '30px' }}/>
                        <Hr/>
                        {
                            directory.directories && (
                                <>
                                    {directory.directories.map((item) => (
                                        <RowEntryContainer key={item.name}>
                                            <RowEntry onClick={() => handleSubFolderClick(directory.path, item.name)}>
                                                <RowEntryFolderName>
                                                    <Source style={{ color: "#F8D775", marginRight: '5px' }}/>
                                                    {item.name}
                                                </RowEntryFolderName>
                                                <RowCoverageText>
                                                    {item.coverage}
                                                </RowCoverageText>
                                            </RowEntry>
                                            <Hr/>
                                        </RowEntryContainer>
                                    ))}
                                </>
                            )
                        }
                        {
                            directory.files && (
                                <>
                                    {directory.files.map((item) => (
                                        <RowEntryContainer>
                                            <RowEntry onClick={() => handleClassClick(item.id)}>
                                                <RowEntryFolderName>
                                                    <TextSnippet style={{ color: "#6a5acd", marginRight: '5px' }}/>
                                                    {item.name}
                                                </RowEntryFolderName>
                                                <RowCoverageText>
                                                    {item.coverage}
                                                </RowCoverageText>
                                            </RowEntry>
                                            <Hr/>
                                        </RowEntryContainer>
                                    ))}
                                </>
                            )
                        }
                    </FolderContainer>
                )
            }
        </Container>
    );
};

export default FolderExplorer;
