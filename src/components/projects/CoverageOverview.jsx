import React from 'react';
import styled from "styled-components";
import {ErrorOutline} from "@mui/icons-material";
import CircularPercentageWithLabel from "../CircularPercentageWithLabel";

const Container = styled.div `
  display: flex;
  margin-bottom: 20px;
`;

const Left = styled.div `
  flex: 1;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: white;
  padding: 30px;
  height: 250px;
  width: 100%;
`;

const CoverageChangeMainContainer = styled.div `
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CoverageChangeContainer = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChangeImage = styled.img `
  width: 100%;
  height: 100%;
`;

const ChangePercentage = styled.div `
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  font-weight: 800;
`;

const ChangeText = styled.h3 `
  width: 100%;
  justify-content: center;
  display: flex;
  color: darkgray;
`;

const NoCoverageChangeContainer = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const Right = styled.div ` 
  flex: 1;
  display: flex;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: white;
  padding: 30px;
  margin-left: 10px;
  height: 250px;
  width: 100%;
`;

const CoverageOverview = ({ hasChange, isIncrease, changePercentage, coveragePercentage }) => {
    return (
        <Container>
            <Left>
                {
                    hasChange ?
                        <CoverageChangeMainContainer>
                            <CoverageChangeContainer>
                                {
                                    isIncrease ?
                                        <ChangeImage src="/increase.png" alt="Increase"/>
                                        :
                                        <ChangeImage src="/decrease.png" alt="Decrease"/>
                                }
                                <ChangePercentage>{changePercentage} %</ChangePercentage>
                            </CoverageChangeContainer>
                            <ChangeText>Change from previous scan</ChangeText>
                        </CoverageChangeMainContainer>
                        :
                        <NoCoverageChangeContainer>
                            <ErrorOutline style={{ width: '60%', height: '60%' }}/>
                            No Changes Present
                        </NoCoverageChangeContainer>
                }
            </Left>
            <Right>
                <CircularPercentageWithLabel percentage={coveragePercentage} fromOverview={true}/>
            </Right>
        </Container>
    );
};

export default CoverageOverview;
