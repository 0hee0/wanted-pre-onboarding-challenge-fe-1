import React from 'react';
import { Typography, Stack } from '@mui/material';


function MainPage() {
    return (
        <Stack height="100vh" alignItems="center" justifyContent="center">
            <Typography variant="h4" gutterBottom>React boiler plate</Typography>
            <Typography variant="h5" fontStyle="italic">with theme set using MUI</Typography>
        </Stack>
    )
}

export default MainPage
