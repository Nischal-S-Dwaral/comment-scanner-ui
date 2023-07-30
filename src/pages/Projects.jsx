import React from 'react';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import QualityGateProjectsSummary from "../components/home/QualityGateProjectsSummary";
import CoverageProjectsSummary from "../components/home/CoverageProjectsSummary";
import {useNavigate} from "react-router-dom";
import {projectsData} from "../data";
import ProjectSummary from "../components/home/ProjectSummary";
import EditQualityGate from "../components/home/EditQualityGate";

const Container = styled.div `
`;

const Main = styled.div `
  display: flex;
  flex-direction: column;
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

    const data=projectsData

    return (
        <Container>
            <Main>
                <Navbar/>
                <ProjectsContainer>
                    <Sidebar>
                        <SidebarHeader>Summary</SidebarHeader>
                        <QualityGateProjectsSummary passed={6} failed={4}/>
                        <CoverageProjectsSummary coverages={[20,50,75,95,83,91,94,99,100,38,83,89,88,90,85]}/>
                        <EditQualityGate />
                    </Sidebar>
                    <MainContainer>
                        <Top>
                            <TotalProjectsText>{data.length} project(s)</TotalProjectsText>
                            <CreateProjectButton onClick={handleCreateProjectButton}>
                                Create New Project
                            </CreateProjectButton>
                        </Top>
                        <Bottom>
                            <ProjectSummary projects={data} />
                        </Bottom>
                    </MainContainer>
                </ProjectsContainer>
            </Main>
        </Container>
    );
};

export default Projects;
