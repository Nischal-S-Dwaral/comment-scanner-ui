import React, {useState} from 'react';
import styled from "styled-components";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {SelectChangeEvent} from "@mui/material";

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

const EditQualityGate = () => {

    const [qualityGate, setQualityGate] = useState(70);

    const handleSelectChange = (event: SelectChangeEvent) => {
        setQualityGate(event.target.value);
    };

    const handleSubmitClick = () => {
        console.log('clicked submit- ',qualityGate);
    };

    return (
        <Container>
            <Title>
                Edit Quality Gate Percentage
            </Title>
            <EditContainer>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Pass Percentage</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Pass Percentage"
                        value={qualityGate}
                        onChange={handleSelectChange}
                    >
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={60}>60</MenuItem>
                        <MenuItem value={70}>70</MenuItem>
                        <MenuItem value={80}>80</MenuItem>
                        <MenuItem value={90}>90</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
            </EditContainer>
            <Button onClick={handleSubmitClick}>
                Submit
            </Button>
        </Container>
    );
};

export default EditQualityGate;
