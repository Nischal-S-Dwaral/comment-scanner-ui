import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import QualityGateProjectsSummary from "../components/home/QualityGateProjectsSummary";
import CoverageProjectsSummary from "../components/home/CoverageProjectsSummary";
import {useNavigate} from "react-router-dom";
import ProjectSummary from "../components/home/ProjectSummary";
import EditQualityGate from "../components/home/EditQualityGate";
import {useSelector} from "react-redux";
import axios from "axios";
import Loading from "../components/Loading";

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

    const [projects, setProjects] = useState([]);
    const [qualityGate, setQualityGate] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const user = useSelector((state) => state.user.currentUser);

    const handleCreateProjectButton = () => {
        navigate("/projects/create", { replace: true });
    }

    useEffect(() => {
        const getQualityGate = async () => {
            setIsLoading(true);

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/api/qualityGate/getByUserId?userId='+user.uid,
                headers: { }
            };

            axios.request(config)
                .then((response) => {
                   if (response.data.returnCode === "0" ) {
                       setQualityGate(response.data.qualityGate);
                   } else {
                       console.log(response.data);
                   }
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        getQualityGate().then(() => {

            if (qualityGate !== '') {

                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'http://localhost:8080/api/summary/getByUserId?userId='+user.uid+'&qualityGate='+qualityGate,
                    headers: { }
                };

                axios.request(config)
                    .then((response) => {
                        if (response.data.returnCode === "0" ) {
                            setProjects(response.data.projectSummaryList);
                            setIsLoading(false);
                        } else {
                            console.log(response.data);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });

    },[qualityGate, user.uid]);

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
