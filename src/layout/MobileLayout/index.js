import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Avatar, Container, Toolbar, Typography } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Box } from '@mui/system';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import LogoWhite from 'ui-component/LogoWhite';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MobileLayout = () => {
    const [value, setValue] = React.useState(0);

    return (
        <Container maxWidth="sm">
            <AppBar
                sx={{ backgroundColor: '#DB1F1F', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, marginBottom: 2 }}
                position="static"
            >
                <Toolbar>
                    <Avatar alt="Remy Sharp" src="" />
                    <Typography variant="h6" color="white" component="div" sx={{ flexGrow: 1, marginLeft: 1 }}>
                        Bagas
                    </Typography>
                    <LogoWhite />
                </Toolbar>
            </AppBar>
            <main style={{ padding: 10, paddingBottom: 100 }}>
                <Outlet />
            </main>
            <BottomNavigation
                sx={{ width: '100%', position: 'fixed', bottom: 0, borderTop: 1 }}
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction icon={<HomeIcon color="error" />} />
            </BottomNavigation>
        </Container>
    );
};

export default MobileLayout;
