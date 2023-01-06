import React from 'react';
import { styled } from '@mui/styles';
import { Box, Link, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../services/actions/user_actions';


function NavBar() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state[0].auth);

    return (
        <NavBox>
            <Link href="/" underline="none">
                <Typography variant="h5" fontFamily="GangwonEduPowerExtraBoldA" fontWeight="700" color="#212121" sx={{ textShadow: "2px 2px #FFE1E1" }}>투두리스트</Typography>
            </Link>

            {auth? (
                <Typography color="#212121" fontWeight="700" onClick={(e) => dispatch(logoutUser())} sx={{ '&:hover': { cursor: "pointer" } }}>로그아웃</Typography>
            ) : (
                <Link href="/login" underline="none">
                    <Typography color="#212121" fontWeight="700">로그인</Typography>
                </Link>
            )}
            
        </NavBox>
    )
}

export default NavBar

const NavBox = styled(Box)({
    position: "fixed", 
    zIndex: 9, 
    alignItems: "center",
    width: "100vw",
    maxWidth: "100%",
    height: "5rem",
    padding: "3rem 4rem",
    display: "flex",
    justifyContent: "space-between",
})
