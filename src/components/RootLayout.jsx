import { Box, Drawer, Grid} from '@mui/material'
import { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar';
import Feed from '../pages/Feed';
import RightSidebar from './RightSidebar';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }
    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: 'background.default',
                color: 'text.primary',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Navbar (fixed at top) */}
            <Navbar onDrawerToggle={handleDrawerToggle} />

            {/* Main Content Area */}
            <Box component="main" sx={{ flexGrow: 1, p: { xs: 1, md: 2 }, pt: { xs: 8, md: 10 } }}>
                <Grid container spacing={{ xs: 2 }}>

                    {/* Left Sidebar (Desktop View) */}
                    <Grid
                        size={{ md: 2 }}
                        sx={{
                            display: { xs: 'none', md: 'block' },
                        }}
                    >
                        <Sidebar onLinkClick={handleDrawerToggle} />
                    </Grid>

                    {/* Mobile Sidebar (Drawer View) */}
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                        }}
                    >
                        <Sidebar onLinkClick={handleDrawerToggle} />
                    </Drawer>

                    {/* Center Feed */}
                    <Grid size={{ xs:12, md: 10 }}>
                        <Outlet />
                    </Grid>
                    
                </Grid>
            </Box>
        </Box>
    )
}
