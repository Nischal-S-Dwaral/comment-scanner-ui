import React, {useState} from 'react';
import styled from "styled-components";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {Autocomplete} from "@mui/lab";
import Loading from "../Loading";
import {useSelector} from "react-redux";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

    const languages = [
        { label: 'Java', value: 'java' }
    ];

    const user = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();

    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [owner, setOwner] = useState('');
    const [repositoryName, setRepositoryName] = useState('');
    const [personalAccessToken, setPersonalAccessToken] = useState('');
    const [language, setLanguage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLanguageChange = (event, newValue) => {
        setSelectedLanguage(newValue);
        if (newValue) {
            setLanguage(newValue.value);
        } else {
            setLanguage(null);
        }
    };

    const isOptionEqualToValue = (option, value) => {
        return option.value === value.value;
    };

    const handleSaveConfigurationClick = async () => {
        if (!owner || !repositoryName || !personalAccessToken || !language) {
            setErrorMessage("Please fill up all the required informations.");
            setOpenErrorDialog(true);
        } else {
            setIsLoading(true);
            setErrorMessage('');

            let projectId;

            axios
                .post('http://localhost:8080/api/project/add', {
                    encodedAccessToken: personalAccessToken,
                    owner: owner,
                    repository: repositoryName,
                    userId: user.uid,
                    language: language
                })
                .then((createProjectResponse) => {

                    if (createProjectResponse.data.returnCode === "0") {
                        projectId = createProjectResponse.data.projectId;

                        // Introduce a delay of 2 seconds using setTimeout
                        return new Promise((resolve) => {
                            setTimeout(resolve, 2000); // 2 seconds delay
                        });
                    } else {
                        setIsLoading(false);
                    }
                })
                .then(() => {
                    return axios.post('http://localhost:8080/api/java/addSpringBoot', null, {
                        params: {
                            projectId: projectId,
                        },
                    });
                })
                .then((addSpringBootResponse) => {
                    if (addSpringBootResponse && addSpringBootResponse.data.returnCode === "0") {
                        return axios.post('http://localhost:8080/api/summary/add', null, {
                            params: {
                                projectId: projectId,
                            },
                        });
                    } else {
                        setIsLoading(false);
                    }
                })
                .then((addSummaryResponse) => {
                    if (addSummaryResponse && addSummaryResponse.data.returnCode === "0") {
                        navigate("/projects", { replace: true });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
                });
        }
    }

    const handleCancelClick = () => {
        setOwner('');
        setRepositoryName('');
        setPersonalAccessToken('');
        setLanguage('');
        handleCancelButtonClick(false)
    }

    const handleErrorDialogClose = (event) => {
       event.preventDefault();
       setOpenErrorDialog(false);
    };

    return (
        isLoading ? (
                <LoadingContainer>
                    <Loading loadingText={'Loading... Scanning Project'}/>
                </LoadingContainer>
            ) : (
                <>
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
                            <ConfigurationContainer>
                                <TextContainer>
                                    <TextHeader>Language *</TextHeader>
                                    <TextComment>
                                        Please select the coding language of the repository
                                    </TextComment>
                                </TextContainer>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={languages}
                                    getOptionLabel={(option) => option.label}
                                    onChange={handleLanguageChange}
                                    value={selectedLanguage}
                                    isOptionEqualToValue={isOptionEqualToValue}
                                    sx={{ flex: 1 }}
                                    renderInput={(params) => <TextField {...params} label="Language" />}
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
                        {
                            errorMessage &&
                            <Dialog
                                open={openErrorDialog}
                                onClose={handleErrorDialogClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Error while creating project!!"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        {errorMessage}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={handleErrorDialogClose}
                                        autoFocus
                                        style={{ width: '100%' }}
                                    >
                                        Okay
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        }
                    </Container>
                </>
            )
    );
};

export default GitHubConfiguration;
