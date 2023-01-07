import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/styles';
import { Box, Link, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, loginSuccess } from '../services/actions/user_actions';


function NavBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(state => state[0].auth);
    const success = useSelector(state => state[0].successLogout);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // console.log(auth, window.location.pathname)
        if (!window.localStorage.getItem("token") && window.location.pathname==="/") {
            setOpen(true); 
        }
        if (auth) {
            navigate("/");
        }
        else {
            if (window.localStorage.getItem("token")) {
                dispatch(loginSuccess(window.localStorage.getItem("token")))
            }
        }
    }, [auth]);

    useEffect(() => {
        if (open) {
            setOpen(false);
            // alert("로그인 후 서비스를 이용해주시기 바랍니다.");
            navigate("/login");   
            return;
        }
    }, [open]);

    useEffect(() => {
        if (success) {
            alert("로그인 후 서비스를 이용해주시기 바랍니다.");
        }
    }, [success]);

    return (
        <NavBox>
            <Link href="/" underline="none">
                <Typography variant="h5" fontFamily="GangwonEduPowerExtraBoldA" fontWeight="700" color="accent.main" sx={{ textShadow: "2px 2px #FFE1E1" }}>투두리스트</Typography>
            </Link>

            {auth? (
                <Typography color="accent.main" fontWeight="700" onClick={(e) => dispatch(logoutUser())} sx={{ '&:hover': { cursor: "pointer" } }}>로그아웃</Typography>
            ) : null}
            
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
