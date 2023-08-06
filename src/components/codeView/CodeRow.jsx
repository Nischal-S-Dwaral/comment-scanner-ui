import React from 'react';
import styled from "styled-components";
import Popover from "@mui/material/Popover";

const Container = styled.div `
  display: flex;
  width: 100%;
  background-color: ${(props) => props.fillColor};
`;

const LeftContainer = styled.div `
  display: flex;
  width: 5%;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  justify-content: space-between;
`;

const LineNumber = styled.span `
  margin-left: 10px;
`;

const PopOverIcon = styled.div `
  width: 8px;
  height: 100%;
  cursor: pointer;
`;

const RightContainer = styled.div `
  width: 95%
`;

const CodeLine = styled.span `
  margin-left: 3px;
  white-space: pre;
`;

const CodeRow = ({ lineNumber, code, isHighlight = false, highlightColor = "", popOverText = "" }) => {

    const containerFillColor = isHighlight
        ? highlightColor === "red"
            ? "#f1bcbc"
            : highlightColor === "orange"
                ? "#f5e0cc"
                : "#e2f5d1"
        : "none";

    const formattedCode = code.replace(/<SPACE>/g, ' ');

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopOverClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopOverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const popoverId = open ? 'popover' : undefined;

    return (
        <Container fillColor={containerFillColor}>
            <LeftContainer>
                <LineNumber>{lineNumber}</LineNumber>
                {
                    isHighlight && (
                        <PopOverIcon
                            style={{
                                backgroundColor: highlightColor
                            }}
                            onClick={handlePopOverClick}
                        />
                    )
                }
            </LeftContainer>
            <RightContainer>
                <CodeLine>{formattedCode}</CodeLine>
            </RightContainer>
            <Popover
                id={popoverId}
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopOverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div style={{ padding: '10px' }}>{popOverText}</div>
            </Popover>
        </Container>
    );
};

export default CodeRow;
