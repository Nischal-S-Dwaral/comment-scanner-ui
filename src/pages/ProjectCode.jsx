import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import ProjectAppBar from "../components/ProjectAppBar";
import FolderTree from "../components/FolderTree";
import FolderExplorer from "../components/FolderExplorer";
import {Dialog} from "@mui/material";
import {useLocation} from "react-router-dom";
import CodeView from "../components/codeView/CodeView";

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

const ProjectCode = () => {

    const [apiResponse, setApiResponse] = useState([
        {
            path: "src/main/java/org/msc/web/dev",
            coverage: "80%",
            isBaseDirectory: true,
            directories: [
                {
                    coverage: "70%",
                    name: "constant"
                },
                {
                    coverage: "60%",
                    name: "controller"
                },
                {
                    coverage: "80%",
                    name: "service"
                }
            ],
            files: [
                {
                    coverage: "58%",
                    name: "Application.java"
                }
            ]
        },
        {
            path: "src/main/java/org/msc/web/dev/constant",
            coverage: "50%",
            isBaseDirectory: false,
            directories: [],
            files: [
                {
                    coverage: "30%",
                    name: "Constants.java"
                },
                {
                    coverage: "80%",
                    name: "JavaSpringBootConstants.java"
                }
            ]
        },
        {
            path: "src/main/java/org/msc/web/dev/controller",
            coverage: "90%",
            isBaseDirectory: false,
            directories: [],
            files: [
                {
                    coverage: "90%",
                    name: "RestController.java"
                }
            ]
        },
        {
            path: "src/main/java/org/msc/web/dev/service",
            coverage: "40%",
            isBaseDirectory: false,
            directories: [
                {
                    coverage: "60%",
                    name: "impl"
                }
            ],
            files: [
                {
                    coverage: "58%",
                    name: "UseCasesAdaptorFactory.java"
                },
                {
                    name: "IUseCaseImplementation.java",
                    coverage: "80%"
                }
            ]
        },
        {
            path: "src/main/java/org/msc/web/dev/service/impl",
            coverage: "80%",
            isBaseDirectory: false,
            directories: [
                {
                    coverage: "50%",
                    name: "github"
                },
                {
                    coverage: "40%",
                    name: "java"
                }
            ],
            files: [
                {
                    coverage: "100%",
                    name: "package-info.java"
                }
            ]
        },
        {
            path: "src/main/java/org/msc/web/dev/service/impl/github",
            coverage: "80%",
            isBaseDirectory: false,
            directories: [],
            files: [
                {
                    coverage: "100%",
                    name: "package-info.java"
                },
                {
                    coverage: "100%",
                    name: "Fetch.java"
                }
            ]
        },
        {
            path: "src/main/java/org/msc/web/dev/service/impl/java",
            coverage: "40%",
            isBaseDirectory: false,
            directories: [],
            files: [
                {
                    coverage: "60%",
                    name: "package-info.java"
                },
                {
                    coverage: "20%",
                    name: "Add.java"
                }
            ]
        }
    ]);

    const [currentPath, setCurrentPath] = useState("");
    const [openCodeModal, setCodeOpenModal] = useState(false);
    const [className, setClassName] = useState('');

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const projectName = searchParams.get('project');

    useEffect(() => {
        const baseDirectories = apiResponse.filter((directory) => directory.isBaseDirectory);
        if (baseDirectories) {
            const baseDirectory = baseDirectories[0];
            setCurrentPath(baseDirectory.path);
        }
    }, [apiResponse]);

    useEffect(() => {
        if (className) {
            setCodeOpenModal(true);
        }
    },[className]);

    const handleChangeInPath = (newPath) => {
        setCurrentPath(newPath);
    }

    const handleClassClick = (clickClassName) => {
        setClassName(clickClassName);
    }

    const handleCloseCodeModel = () => {
        setCodeOpenModal(false);
        setClassName('');
    };

    return (
        <Container>
            <Navbar/>
            <ProjectAppBar item="code"/>
            <Main>
                {
                    currentPath && (
                        <>
                            <Left>
                                <Header>Quick Access</Header>
                                <FolderTree
                                    apiResponse={apiResponse}
                                    handleChangeInPath={handleChangeInPath}
                                    handleClassClick={handleClassClick}
                                />
                            </Left>
                            <Right>
                                <FolderExplorer
                                    apiResponse={apiResponse}
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
                    <CodeView projectName={projectName} className={className}/>
                </Dialog>
            </Main>
        </Container>
    );
};

export default ProjectCode;
