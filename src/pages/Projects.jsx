import React from 'react';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import QualityGateProjectsSummary from "../components/home/QualityGateProjectsSummary";
import CoverageProjectsSummary from "../components/home/CoverageProjectsSummary";
import {useNavigate} from "react-router-dom";
import ProjectSummary from "../components/home/ProjectSummary";
import EditQualityGate from "../components/home/EditQualityGate";
import Loading from "../components/Loading";
import {projectData, qualityGateData} from "../data";

const Container = styled.div `
`;

const Main = styled.div `
  display: flex;
  flex-direction: column;
`;

const LoadingContainer  = styled.div `
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProjectsContainer = styled.div`
  padding: 25px;
  display: flex;
  min-height: 85vh;
`;

const Sidebar = styled.div`
  flex: 1;
  padding: 10px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;

const SidebarHeader = styled.div `
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 20px;
  height: 8%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainContainer = styled.div`
  flex: 4;
  padding: 10px;
`;

const Top = styled.div `
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  padding-bottom: 10px;
  align-items: center;
  height: 8%;
`;

const TotalProjectsText = styled.p `
  font-size: 16px;
  font-weight: bold;
`;

const CreateProjectButton = styled.button `
  color: white;
  background-color: black;
  padding: 10px 35px;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
`;

const Bottom = styled.div `
  display: flex;
`;

const Projects = () => {

    const navigate = useNavigate();

    const handleCreateProjectButton = () => {
        navigate("/projects/create", { replace: true });
    }

    const projects = projectData.projectSummaryList
    const qualityGate = qualityGateData.qualityGate
    const isLoading = false

    return (
        <Container>
            <Main>
                <Navbar/>
                {
                    isLoading ? (
                        <LoadingContainer>
                            <Loading loadingText={'Loading... Getting Projects'}/>
                        </LoadingContainer>
                    ) : (
                        projects.length > 0 && (
                            <>
                                <ProjectsContainer>
                                    <Sidebar>
                                        <SidebarHeader>Summary</SidebarHeader>
                                        <QualityGateProjectsSummary projects={projects}/>
                                        <CoverageProjectsSummary projects={projects}/>
                                        <EditQualityGate qualityGate={qualityGate} />
                                    </Sidebar>
                                    <MainContainer>
                                        <Top>
                                            <TotalProjectsText>{projects.length} project(s)</TotalProjectsText>
                                            <CreateProjectButton onClick={handleCreateProjectButton}>
                                                Create New Project
                                            </CreateProjectButton>
                                        </Top>
                                        <Bottom>
                                            {
                                                qualityGate && (
                                                    <>
                                                        <ProjectSummary projects={projects} qualityGate={qualityGate} />
                                                    </>
                                                )
                                            }
                                        </Bottom>
                                    </MainContainer>
                                </ProjectsContainer>
                            </>
                        )
                    )
                }
            </Main>
        </Container>
    );
};

export default Projects;
