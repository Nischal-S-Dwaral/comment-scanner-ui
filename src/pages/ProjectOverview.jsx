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
import {projectOverviewData} from "../data";
import {Dialog, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

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

    const projects = projectOverviewData.projectSummaryList
    const latestCoverage = projectOverviewData.latestCoverage;
    const qualityGateResult = projectOverviewData.qualityGateResult

    let hasChange = false;
    let changePercentage = 0;
    const isLoading = false;
    let isIncrease = false;

    if (projects.length > 1) {
        hasChange = true;
        changePercentage = projectOverviewData.changePercentage
        isIncrease = projectOverviewData.increase
    }

    const [demoModal, setDemoModal] = useState(false);

    const columns = [
        {field: "coveragePercentage", headerName: "Coverage", width: 250},
        {field: "date", headerName: "Date", width: 250},
        {field: "time", headerName: "Time", width: 200},
        {field: "qualityGatePass", headerName: "Result", width: 200},
    ];

    const handleReScanProject = () => {
        setDemoModal(true);
    };

    const handleDemoDialogClose = (event) => {
        event.preventDefault();
        setDemoModal(false);
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
                            {
                                demoModal &&
                                <Dialog
                                    open={demoModal}
                                    onClose={handleDemoDialogClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        ALERT
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            This is just a demo!!
                                        </DialogContentText>
                                    </DialogContent>
                                </Dialog>
                            }
                        </>
                    )
                )
            }
        </Container>
    );
};

export default ProjectOverview;
