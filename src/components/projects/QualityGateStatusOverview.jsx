import React from 'react';
import styled from "styled-components";
import {Cancel, CheckCircle} from "@mui/icons-material";
import {greenColorCode, redColorCode} from "../../constants";

const QualityGateStatusContainer = styled.div `
  padding: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const QualityGateResult = styled.div `
  display: flex;
`;

const QualityGateIcon = styled.div `
  width: 60px;
  height: 60px;
  background-color: ${(props) => props.fillColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-right: 15px;
`;

const QualityGateTextContainer = styled.div ``;

const QualityGateText = styled.h4 `
  color: darkgray;
  margin-bottom: 5px;
`;

const QualityGateStatusText = styled.h1 `
`;

const ImageContainer = styled.div `
  padding: 50px;
`;

const ImageIcon = styled.img `
  width: 100%;
  height: 100%;
`;

const QualityGateStatusOverview = ({ status }) => {
    return (
        <QualityGateStatusContainer>
            <QualityGateResult>
                {
                    status === "PASSED" ?
                        <QualityGateIcon fillColor={greenColorCode}>
                            <CheckCircle style={{ height:' 40px', width: '40px'}}/>
                        </QualityGateIcon>
                        :
                        <QualityGateIcon fillColor={redColorCode}>
                            <Cancel style={{ height:' 40px', width: '40px'}}/>
                        </QualityGateIcon>
                }
                <QualityGateTextContainer>
                    <QualityGateText>Quality Gate</QualityGateText>
                    <QualityGateStatusText>{status.toString().toUpperCase()}</QualityGateStatusText>
                </QualityGateTextContainer>
            </QualityGateResult>
            <ImageContainer>
                {
                    status === "PASSED" ?
                        <ImageIcon src="/passedQualityGate.png" alt="Passed"/>
                        :
                        <ImageIcon src="/failedQualityGate.png" alt="Failed"/>
                }
            </ImageContainer>
        </QualityGateStatusContainer>
    );
};

export default QualityGateStatusOverview;
