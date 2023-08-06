import React, {useState} from 'react';
import styled from "styled-components";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {SelectChangeEvent} from "@mui/material";
import {useSelector} from "react-redux";
import axios from "axios";

const Container = styled.div `
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Title = styled.h4 `
  margin-bottom: 10px;
  padding: 5px;
`;

const EditContainer = styled.div `
  padding: 5px;
  display: flex;
  margin-bottom: 5px;
`;

const Button = styled.button `
  color: white;
  background-color: black;
  padding: 10px 35px;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;
`;

const EditQualityGate = ({ qualityGate }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [selectedQualityGate, setSelectedQualityGate] = useState(qualityGate);
    const user = useSelector((state) => state.user.currentUser);

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleSelectChange = (event: SelectChangeEvent) => {
        setSelectedQualityGate(event.target.value);
    };

    const handleSubmitClick = () => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/api/qualityGate/update?userId='+user.uid+'&qualityGate='+selectedQualityGate,
            headers: { }
        };

        axios.request(config)
            .then((response) => {
                if (response.data.returnCode === "0" ) {
                    window.location.reload();
                } else {
                    console.log(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleResetClick = () => {
        setSelectedQualityGate(qualityGate);
        setIsEditing(false);
    };

    return (
        <Container>
            <Title>
                Edit Quality Gate Percentage
            </Title>
            <EditContainer>
                <FormControl
                    fullWidth
                    disabled={!isEditing}
                >
                    <InputLabel id="demo-simple-select-label">Pass Percentage</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Pass Percentage"
                        value={selectedQualityGate}
                        onChange={handleSelectChange}
                    >
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={55}>55</MenuItem>
                        <MenuItem value={60}>60</MenuItem>
                        <MenuItem value={65}>65</MenuItem>
                        <MenuItem value={70}>70</MenuItem>
                        <MenuItem value={75}>75</MenuItem>
                        <MenuItem value={80}>80</MenuItem>
                        <MenuItem value={85}>85</MenuItem>
                        <MenuItem value={90}>90</MenuItem>
                        <MenuItem value={95}>95</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
            </EditContainer>
            {isEditing ? (
                <div>
                    <Button onClick={handleSubmitClick}>
                        Submit
                    </Button>
                    <Button onClick={handleResetClick}>
                        Reset
                    </Button>
                </div>
            ) : (
                <Button onClick={handleEditClick}>
                    Edit
                </Button>
            )}
        </Container>
    );
};

export default EditQualityGate;
