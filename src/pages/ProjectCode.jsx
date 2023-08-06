import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import ProjectAppBar from "../components/projects/ProjectAppBar";
import FolderTree from "../components/projects/FolderTree";
import FolderExplorer from "../components/projects/FolderExplorer";
import {Dialog} from "@mui/material";
import {useLocation} from "react-router-dom";
import CodeView from "../components/codeView/CodeView";
import axios from "axios";
import Loading from "../components/Loading";

const Container = styled.div `
  display: flex;
  flex-direction: column;
`;

const Main = styled.div `
  padding: 50px;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div `
  width: 30%;
  height: 100%;
`;

const Header = styled.h3 `
  margin-bottom: 20px;
  color: #484242;
`;

const Right = styled.div `
  width: 67%;
  height: 100%;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProjectCode = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const projectName = searchParams.get('project');
    const projectId = searchParams.get('id');

    const [projectCodeStructure, setProjectCodeStructure] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPath, setCurrentPath] = useState("");
    const [openCodeModal, setCodeOpenModal] = useState(false);
    const [classId, setClassId] = useState('');

    useEffect(() => {

        setIsLoading(true);
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/api/project/getProjectCodeStructure?projectId='+projectId,
            headers: { }
        };

        axios.request(config)
            .then((response) => {
                if (response.data.returnCode === "0") {
                    setProjectCodeStructure(response.data.projectCodeDirectoryStructureList);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }, [projectId]);


    useEffect(() => {
        if (projectCodeStructure.length > 0) {
            const baseDirectories = projectCodeStructure.filter((directory) => directory.baseDirectory);
            if (baseDirectories) {
                const baseDirectory = baseDirectories[0];
                setCurrentPath(baseDirectory.path);
            }
        }
    }, [projectCodeStructure]);

    useEffect(() => {
        if (classId) {
            setCodeOpenModal(true);
        }
    },[classId]);

    const handleChangeInPath = (newPath) => {
        setCurrentPath(newPath);
    }

    const handleClassClick = (clickClassId) => {
        setClassId(clickClassId);
    }

    const handleCloseCodeModel = () => {
        setCodeOpenModal(false);
        setClassId('');
    };

    return (
        <Container>
            <Navbar/>
            <ProjectAppBar item="code"/>
            {
                isLoading ? (
                    <LoadingContainer>
                        <Loading loadingText={'Loading... Getting Project Code'}/>
                    </LoadingContainer>
                ) : (
                    projectCodeStructure.length > 0 && (
                        <>
                            <Main>
                                {
                                    currentPath && (
                                        <>
                                            <Left>
                                                <Header>Quick Access</Header>
                                                <FolderTree
                                                    apiResponse={projectCodeStructure}
                                                    handleChangeInPath={handleChangeInPath}
                                                    handleClassClick={handleClassClick}
                                                />
                                            </Left>
                                            <Right>
                                                <FolderExplorer
                                                    apiResponse={projectCodeStructure}
                                                    parameterCurrentPath={currentPath}
                                                    handleClassClick={handleClassClick}
                                                />
                                            </Right>
                                        </>
                                    )
                                }
                                <Dialog
                                    open={openCodeModal}
                                    onClose={handleCloseCodeModel}
                                    fullWidth
                                    maxWidth={false}
                                >
                                    <CodeView projectName={projectName} classId={classId}/>
                                </Dialog>
                            </Main>
                        </>
                    )
                )
            }
        </Container>
    );
};

export default ProjectCode;
