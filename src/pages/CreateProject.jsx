import React, {useState} from 'react';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import {Dialog} from "@mui/material";
import ComingSoon from "../components/createProject/ComingSoon";
import GitHubConfiguration from "../components/createProject/GitHubConfiguration";
import GitHubImage from "../img/github.png";
import GitLabImage from "../img/gitlab.png";


const Container = styled.div `
`;

const Main = styled.div `
  display: flex;
  flex-direction: column;
`;

const CreatePageContainer = styled.div `
  padding: 60px;
  display: flex;
`;

const Left = styled.div `
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1 `
  font-weight: bold;
  margin-bottom: 30px;
`;

const Description = styled.h3 `
  margin-bottom: 30px;
  font-weight: normal;
`;

const Right = styled.div `
  flex: 1;
  display: flex;
`;

const Option = styled.div `
  display: flex!important;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  width: 225px;
  height: 225px;
  background-color: white;
  border: 0.5px solid black;
  border-radius: 3px;
  margin-right: 15px;
  padding: 16px 8px;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const OptionIcon = styled.img `
  width: 50%;
  height: 50%;
`;

const OptionText = styled.h2 `
  font-weight: bold;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
`;

const OptionComment = styled.h4 `
  font-weight: bold;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CreateProject = () => {

    const [openGitLabConfigurationModal, setOpenGitLabConfigurationModal] = useState(false);
    const [openGitHubConfigurationModal, setOpenGitHubConfigurationModal] = useState(false);

    const handleCloseGitHubConfigurationModel = () => {
        setOpenGitHubConfigurationModal(false);
    };

    const handleGitHubOptionClick = () => {
        setOpenGitHubConfigurationModal(true)
    }

    const handleCancelButtonClick = (value) => {
        setOpenGitHubConfigurationModal(value);
    }

    const handleCloseGitLabConfigurationModel = () => {
        setOpenGitLabConfigurationModal(false);
    };

    const handleGitLabOptionClick = () => {
        setOpenGitLabConfigurationModal(true);
    };

    return (
        <Container>
            <Main>
                <Navbar/>
                <CreatePageContainer>
                    <Left>
                        <Title>
                            How do you want to create your project?
                        </Title>
                        <Description>
                            Create your project from your favorite DevOps platform by setting up the configuration.
                        </Description>
                    </Left>
                    <Right>
                        <Option onClick={handleGitHubOptionClick}>
                            <OptionIcon src={GitHubImage} alt="GitHub" />
                            <OptionText>From GitHub</OptionText>
                            <OptionComment>Set up configuration</OptionComment>
                        </Option>
                        <Option onClick={handleGitLabOptionClick}>
                            <OptionIcon src={GitLabImage} alt="GitLab" />
                            <OptionText>From GitLab</OptionText>
                            <OptionComment>Set up configuration</OptionComment>
                        </Option>
                    </Right>
                </CreatePageContainer>
                <Dialog
                    open={openGitHubConfigurationModal}
                    onClose={handleCloseGitHubConfigurationModel}
                    disableBackdropClick
                >
                    <GitHubConfiguration
                        handleCancelButtonClick={handleCancelButtonClick}
                    />
                </Dialog>
                <Dialog
                    open={openGitLabConfigurationModal}
                    onClose={handleCloseGitLabConfigurationModel}
                >
                    <ComingSoon/>
                </Dialog>
            </Main>
        </Container>
    );
};

export default CreateProject;
