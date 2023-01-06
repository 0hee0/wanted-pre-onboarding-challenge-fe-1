import React, { useState, useEffect } from 'react';
import { styled } from '@mui/styles';
import { Box, Link, Typography } from '@mui/material';


function NavBar() {
    const [bgColor, setBgColor] = useState("black");
    const [visibility, setVisibility] = useState("flex");

    useEffect(() => {
        if (window.location.pathname === "/") {
            setBgColor("black");
        }

        window.addEventListener('scroll', updateScroll);
    }, [window.location.pathname]);

    const updateScroll = () => {
        let scrollPosition = window.scrollY || document.documentElement.scrollTop;
        if (window.location.pathname === "/") {
            setBgColor("black");
            scrollPosition < 1080 ? setBgColor("black") : setBgColor("inherit");
        }
    }
    
    const NavBox = styled(Box)({
        position: "fixed", 
        zIndex: 9, 
        display: `${visibility}`, 
        alignItems: "center",
        width: "100vw",
        maxWidth: "100%",
        height: "5rem",
    })
    
    return (
        <NavBox sx={{ backgroundColor: bgColor }}>
            <Link href="/" underline="none" pl={3}>
                <Typography variant="h6" fontWeight="700">Logo</Typography>
            </Link>

            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ pl: "12rem" }}>
                    <Link href="/" underline="none">
                        <Typography variant="h6"></Typography>
                    </Link>
                </Box>
            </Box>
        </NavBox>
    )
}

export default NavBar
