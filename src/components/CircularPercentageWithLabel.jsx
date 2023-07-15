import React from 'react';
import {Box, CircularProgress, Typography} from "@mui/material";

const CircularPercentageWithLabel = ({ percentage, fromOverview }) => {
    return (
        <Box
            sx={{
                width: fromOverview ? '200px' : '70px',
                height: fromOverview ? '200px' : '70px',
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    border: fromOverview ? `28px solid lightgrey` : `10px solid lightgrey`,
                    borderRadius: "50%",
                    boxSizing: "border-box",
                }}
            />
            <CircularProgress
                variant="determinate"
                value={percentage}
                thickness={6}
                style={{ width: "100%", height: "100%", color: "lightsalmon" }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                    fontSize={fromOverview ? 48 : 16}
                >
                    {`${Math.round(percentage)}%`}
                </Typography>
            </Box>
        </Box>
    );
};

export default CircularPercentageWithLabel;
