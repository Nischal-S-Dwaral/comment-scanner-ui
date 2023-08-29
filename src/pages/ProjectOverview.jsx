import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import ProjectAppBar from "../components/projects/ProjectAppBar";
import QualityGateStatusOverview from "../components/projects/QualityGateStatusOverview";
import CoverageOverview from "../components/projects/CoverageOverview";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {useLocation} from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  padding: 50px;
  display: flex;
`;

const Left = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
`;

const SubHeader = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubHeaderText = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const ReScanProjectButton = styled.button`
  color: white;
  background-color: black;
  padding: 10px 35px;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
`;

const Right = styled.div`
  width: 65%;
  margin-left: 50px;
`;

const ActivityDataGridContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 303px;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProjectOverview = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('id');
    const quality = searchParams.get('quality');

    const [projects, setProjects] = useState([]);
    const [latestCoverage, setLatestCoverage] = useState(0);
    const [hasChange, setHasChange] = useState(false);
    const [isIncrease, setIsIncrease] = useState(false);
    const [changePercentage, setChangePercentage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [qualityGateResult, setQualityGateResult] = useState('');


    useEffect(() => {

        setIsLoading(true);
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/api/summary/getByProjectId?projectId=' + projectId + '&qualityGate=' + quality,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                if (response.data.returnCode === "0") {

                    const summaryList = response.data.projectSummaryList;
                    setProjects(summaryList);
                    setLatestCoverage(response.data.latestCoverage);
                    setQualityGateResult(response.data.qualityGateResult);
                    setIsLoading(false);

                    if (summaryList.length > 1) {
                        setHasChange(true);
                        setChangePercentage(response.data.changePercentage);
                        setIsIncrease(response.data.isIncrease);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }, [projectId, quality]);

    const columns = [
        {field: "coveragePercentage", headerName: "Coverage", width: 250},
        {field: "date", headerName: "Date", width: 250},
        {field: "time", headerName: "Time", width: 200},
        {field: "qualityGatePass", headerName: "Result", width: 200},
    ];

    const handleReScanProject = () => {
        setIsLoading(true);

        axios
            .post('http://localhost:8080/api/java/updateSpringBoot', null, {
                params: {
                    projectId: projectId,
                },
            })
            .then((response) => {
                if (response.data.returnCode === "0") {
                    // Second API call
                    return axios.post('http://localhost:8080/api/summary/add', null, {
                        params: {
                            projectId: projectId,
                        },
                    });
                } else {
                    setIsLoading(false);
                }
            })
            .then((response) => {
                if (response) {
                    console.log(JSON.stringify(response.data));
                }
                setIsLoading(false);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    return (
        <Container>
            <Navbar/>
            <ProjectAppBar item="overview"/>
            {
                isLoading ? (
                    <LoadingContainer>
                        <Loading loadingText={'Loading... Getting Project Information'}/>
                    </LoadingContainer>
                ) : (
                    projects.length > 0 && (
                        <>
                            <Main>
                                <Left>
                                    <SubHeader>Quality Gate Status</SubHeader>
                                    <QualityGateStatusOverview status={qualityGateResult}/>
                                </Left>
                                <Right>
                                    <SubHeader>
                                        <SubHeaderText>Coverage</SubHeaderText>
                                        <ReScanProjectButton onClick={handleReScanProject}>Re-Scan
                                            Project</ReScanProjectButton>
                                    </SubHeader>
                                    <CoverageOverview hasChange={hasChange}
                                                      isIncrease={isIncrease}
                                                      changePercentage={changePercentage}
                                                      coveragePercentage={latestCoverage}/>
                                    <SubHeader>Activity</SubHeader>
                                    <ActivityDataGridContainer>
                                        <DataGrid
                                            rows={projects}
                                            columns={columns}
                                            pagination
                                            autoPageSize
                                            components={{
                                                Toolbar: GridToolbar,
                                            }}
                                        />
                                    </ActivityDataGridContainer>
                                </Right>
                            </Main>
                        </>
                    )
                )
            }
        </Container>
    );
};

export default ProjectOverview;
