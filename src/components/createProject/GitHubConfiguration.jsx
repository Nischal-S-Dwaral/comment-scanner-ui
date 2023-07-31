import React, {useState} from 'react';
import styled from "styled-components";
import {TextField} from "@mui/material";

const Container = styled.div `
  display: flex;
  flex-direction: column;
`;

const Top = styled.div `
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 24px;
  font-weight: bold;
`;

const Middle = styled.div `
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ConfigurationContainer = styled.div `
  display: flex;
  align-items: flex-start;
  padding: 15px;
`;

const TextContainer = styled.div `
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const TextHeader = styled.h3 ``;

const TextComment = styled.div `
  font-size: 14px;
  font-weight: lighter;
`;

const Bottom = styled.div `
  display: flex;
  padding: 20px;
  justify-content: space-between;
  background-color: #e3e2e2;
`;

const Button = styled.button `
  color: white;
  background-color: black;
  padding: 10px 35px;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
`;

const GitHubConfiguration = ({ handleCancelButtonClick }) => {

    const [owner, setOwner] = useState('');
    const [repositoryName, setRepositoryName] = useState('');
    const [personalAccessToken, setPersonalAccessToken] = useState('');

    const handleSaveConfigurationClick = () => {}

    const handleCancelClick = () => {
        setOwner('');
        setRepositoryName('');
        setPersonalAccessToken('');
        handleCancelButtonClick(false)
    }

    return (
        <Container>
            <Top>
                Create a configuration
            </Top>
            <Middle>
                <ConfigurationContainer>
                    <TextContainer>
                        <TextHeader>Repository Owner *</TextHeader>
                        <TextComment>
                            Give name of the owner of the repository. Include hyphens as well if it is exists.
                        </TextComment>
                    </TextContainer>
                    <TextField
                        id="outlined-controlled"
                        label="Owner"
                        value={owner}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setOwner(event.target.value);
                        }}
                        style={{ flex: 1, marginLeft: '10px' }}
                    />
                </ConfigurationContainer>
                <ConfigurationContainer>
                    <TextContainer>
                        <TextHeader>Repository Name *</TextHeader>
                        <TextComment>
                            Provide the name of the repository. Include hyphens or special characters as well if it is exists.
                        </TextComment>
                    </TextContainer>
                    <TextField
                        id="outlined-controlled"
                        label="Repository"
                        value={repositoryName}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setRepositoryName(event.target.value);
                        }}
                        style={{ flex: 1, marginLeft: '10px' }}
                    />
                </ConfigurationContainer>
                <ConfigurationContainer>
                    <TextContainer>
                        <TextHeader>Personal Access Token *</TextHeader>
                        <TextComment>
                            Comment Scanner requires your GitHub personal access token to scan the codebase to get the coverage and report the quality gate status. To create this token, <a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens" target="_blank" rel="noopener noreferrer">please click this link</a>. This will be encoded and saved.
                        </TextComment>
                    </TextContainer>
                    <TextField
                        id="outlined-controlled"
                        label="Access Token"
                        value={personalAccessToken}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPersonalAccessToken(event.target.value);
                        }}
                        style={{ flex: 1, marginLeft: '10px' }}
                    />
                </ConfigurationContainer>
            </Middle>
            <Bottom>
                <Button onClick={handleSaveConfigurationClick}>
                    Save configuration
                </Button>
                <Button onClick={handleCancelClick}>
                    Cancel
                </Button>
            </Bottom>
        </Container>
    );
};

export default GitHubConfiguration;
