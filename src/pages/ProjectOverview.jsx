import React from 'react';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import ProjectAppBar from "../components/projects/ProjectAppBar";
import QualityGateStatusOverview from "../components/projects/QualityGateStatusOverview";
import CoverageOverview from "../components/projects/CoverageOverview";
import {DataGrid} from "@mui/x-data-grid";

const Container = styled.div `
  display: flex;
  flex-direction: column;
`;

const Main = styled.div `
  padding: 50px;
  display: flex;
`;

const Left = styled.div `
  width: 35%;
  display: flex;
  flex-direction: column;
`;

const SubHeader = styled.h3 `
  margin-bottom: 20px;
`;

const Right = styled.div `
  width: 65%;
  margin-left: 50px;
`;

const ActivityDataGridContainer = styled.div `
  background-color: white;
  width: 100%;
`;

const ProjectOverview = () => {

    const qualityGateResult = "passed";

    const data = [
        {
            id: 1,
            coverage: "72%",
            date: "2023/05/12",
            time: "09:30"
        },
        {
            id: 2,
            coverage: "75%",
            date: "2023/07/23",
            time: "14:00"
        },
        {
            id: 3,
            coverage: "84%",
            date: "2023/11/19",
            time: "19:45"
        }
    ]

    const columns = [
        { field: "coverage", headerName: "Coverage", width: 300 },
        { field: "date", headerName: "Date", width: 300 },
        { field: "time", headerName: "Time", width: 200 }
    ];

    return (
        <Container>
            <Navbar/>
            <ProjectAppBar item="overview"/>
            <Main>
                <Left>
                    <SubHeader>Quality Gate Status</SubHeader>
                    <QualityGateStatusOverview status={qualityGateResult}/>
                </Left>
                <Right>
                    <SubHeader>Coverage</SubHeader>
                    <CoverageOverview hasChange={true} isIncrease={true} changePercentage={10} coveragePercentage={93}/>
                    <SubHeader>Activity</SubHeader>
                    <ActivityDataGridContainer>
                        <DataGrid
                            rows={data}
                            columns={columns}
                            pagination
                            pageSizeOptions={[3]}
                        />
                    </ActivityDataGridContainer>
                </Right>
            </Main>
        </Container>
    );
};

export default ProjectOverview;
