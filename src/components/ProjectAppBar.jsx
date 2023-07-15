import React from 'react';
import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";
import {Code, Home, Preview} from "@mui/icons-material";

const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: white;
`;

const Main = styled.div`
  display: flex;
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 40px;
`;

const ProjectTitle = styled.h2``;

const HomeCircle = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #d9d6d6;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Middle = styled.div`
  flex: 3;
  display: flex;
  margin-left: 40px;
`;

const MenuItem = styled.div`
  padding: 10px 0;
  cursor: pointer;
  width: 100px;
  font-size: 16px;
  transition: all 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 4px solid transparent;
  border-bottom-color: ${({ active }) => (active ? '#000000' : 'transparent')};
  margin-right: 15px;
  
  &:hover {
    transform: scale(1.05);
    background-color: rgba(239, 232, 232, 0.2);
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 10px 40px;
`;

const ProjectAppBar = ({ item }) => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const projectName = searchParams.get('project');
    const id = searchParams.get('id');

    const navigate = useNavigate();

    const handleItemClick = (path) => {
        navigate('/dashboard/' + path +"?id=" + id + "&project=" + projectName);
    };

    return (
        <Container>
            <Main>
                <Left>
                    <ProjectTitle>Project: {projectName}</ProjectTitle>
                </Left>
                <Middle>
                    <MenuItem active={item === 'overview'} onClick={() => handleItemClick('overview')}>
                        <Preview style={{ marginRight: '10px' }} />Overview
                    </MenuItem>
                    <MenuItem active={item === 'code'} onClick={() => handleItemClick('code')}>
                        <Code style={{ marginRight: '10px' }} />Code
                    </MenuItem>
                </Middle>
                <Right>
                    <HomeCircle>
                        <Home style={{ cursor: 'pointer'}} onClick={() => navigate("/")}/>
                    </HomeCircle>
                </Right>
            </Main>
        </Container>
    );
};

export default ProjectAppBar;
