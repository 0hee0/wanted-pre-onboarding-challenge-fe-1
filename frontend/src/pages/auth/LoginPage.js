import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../services/actions/user_actions';
import { makeStyles, styled } from '@mui/styles';
import { TextField, Container, Typography, Button, Box, Stack } from '@mui/material';
import LoginIcon from '../../assets/icons/LoginIcon.png';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';


function LoginPage() {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const errorMessage = useSelector(state => state[0].error);
    const success = useSelector(state => state[0].success);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    useEffect(() => {
        if (success) {
            navigate("/");
        }
    }, [success]);

    const handleSubmit = (event) => {
        let dataToSubmit = {
            email: email,
            password: password
        }

        dispatch(loginUser(dataToSubmit));
    }

    const enterKey = (event) => {
        if (window.event.key == 'Enter') {
            handleSubmit();
        }
    }

    return (
        <div className={classes.container}>
            <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img src={LoginIcon} height="280px" />
                {errorMessage ? (
                    <Stack backgroundColor="error.light" direction="row" spacing={1} height="3.5rem" width="100%" alignItems="center" p={2} m1={1} mt={1} mb={2} sx={{ borderRadius: "4px" }}>
                        <WarningAmberIcon color="error" />
                        <Typography fontSize="12px">
                            {errorMessage}
                        </Typography>
                    </Stack>
                ) : <Box height="3.5rem" mt={1} mb={2} />}
                <TextField
                    required
                    id="email-input"
                    label="이메일"
                    autoComplete="current-email"
                    fullWidth
                    margin="small"
                    sx={{ marginBottom: "1rem" }}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={enterKey}
                />
                <TextField
                    required
                    id="password-input"
                    label="비밀번호"
                    type="password"
                    autoComplete="current-password"
                    fullWidth
                    margin="small"
                    sx={{ marginBottom: "1rem" }}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={enterKey}
                />
                <Box my={2} width="100%">
                    <Button onClick={handleSubmit} fullWidth size="large" color="primary" variant="contained" sx={{ height: "3.5rem" }}>
                        <Typography fontWeight="700">로그인</Typography>
                    </Button>
                </Box>
                <Stack direction="row" spacing={1}>
                    <Typography>투두리스트가 처음이세요? </Typography>
                    <BlackLink to="/signup"><Typography color="secondary" fontWeight="600">회원가입</Typography></BlackLink>
                </Stack>
            </Container>
        </div>
    )
}

export default LoginPage


const useStyles = makeStyles({
    container: {
        height: "100vh",
        minWidth: "1440px",
        width: "100vw",
        padding: "5rem 0",
    },
})

const BlackLink = styled(Link)({
    textDecoration: "none",
    color: "black"
})
