import React from 'react';
import { Grid } from '@mui/material';
import Navbar from '../navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@emotion/react';

const GlobalLayout = ({children}) => {
    const theme=useTheme()
    console.log(theme)
    return (
        <Grid container direction="column">
            {/* Navbar component */}
            <Grid item mb={15}>
                <Navbar></Navbar>
            </Grid>

            {/* Main content area */}
            <Grid item container>
                <Grid item xs={false} sm={1} /> {/* Empty column for spacing on small screens */}
                <Grid item xs={12} sm={10}>
                    <Outlet></Outlet>
                </Grid>
                <Grid item xs={false} sm={1} /> {/* Empty column for spacing on small screens */}
            </Grid>
        </Grid>
    );
}

export default GlobalLayout;
