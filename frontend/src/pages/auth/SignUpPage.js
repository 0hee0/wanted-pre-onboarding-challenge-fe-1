import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../../services/actions/user_actions';
import { makeStyles, styled } from '@mui/styles';
import { TextField, Container, Typography, Stack, Button, Box, InputAdornment } from '@mui/material';
import { emailValidator, passwordValidator } from '../../utils/Validator';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SignUpIcon from '../../assets/icons/SignUpIcon.png';
import DoneIcon from '@mui/icons-material/Done';


let submitFlag = false;   // 중복 클릭 차단

export default function SignUpPage() {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const errorMessage = useSelector(state => state[0].error);
    const alertMessage = useSelector(state => state[0].alert);
    const success = useSelector(state => state[0].success);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordConfirmValid, setPasswordConfirmValid] = useState(false);

    useEffect(() => {
        window.scrollTo({top: 1});
    }, []);

    useEffect(() => {
        if (success) {
            navigate("/login");
        }
        if (alertMessage) {
            alert(alertMessage);
        }

    }, [success]);

    useEffect(() => {
        if (email) {
            setEmailValid(emailValidator(email));
        }
    }, [email]);
    
    useEffect(() => {
        handlePasswordConfirmValid();
    }, [password, confirmPassword]);

    const submitCheck = () => {
        if (submitFlag) {
            return submitFlag;
        }
        else {
            submitFlag = true;
            return false;
        }
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
        setPasswordValid(passwordValidator(event.target.value));
    }

    const handlePasswordConfirmValid = () => {
        if (password && confirmPassword) {
            if (password === confirmPassword) {
                setPasswordConfirmValid(true);
            }
            else {
                setPasswordConfirmValid(false);
            }
        }
    }

    const enterKey = (event) => {
        if (window.event.key == 'Enter') {
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        if (submitCheck()) { return; }

        if (passwordValid && passwordConfirmValid) {
            let dataToSubmit = {
                email: email,
                password: password
            }

            dispatch(signUpUser(dataToSubmit));
        }
        else if (!passwordConfirmValid) {
            alert("비밀번호가 일치하지 않습니다.");
        }

        submitFlag = false;
    }

    return (
        <div className={classes.container}>
            <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img src={SignUpIcon} height="280px" />
                {errorMessage || (email && !emailValid) || (password && !passwordValid) || (confirmPassword && !passwordConfirmValid) ? (
                    <Stack backgroundColor="error.light" direction="row" spacing={1} height="3.5rem" width="100%" alignItems="center" p={2} m1={1} mb={2} sx={{ borderRadius: "4px" }}>
                        <WarningAmberIcon color="error" />
                        <Typography fontSize="12px">
                            {errorMessage ? (
                                errorMessage
                            ) : (
                                email && !emailValid ? (
                                    "유효하지 않은 이메일입니다."
                                ) : (
                                    password && !passwordValid ? (
                                        "비밀번호는 8자리 이상이어야 합니다."
                                    ) : (
                                        confirmPassword && !passwordConfirmValid ? (
                                            "비밀번호가 일치하지 않습니다."
                                        ) : null
                                    )
                                )
                            )}
                        </Typography>
                    </Stack>
                ) : <Box height="3.5rem" m1={1} mb={2} />}
                
                <TextField
                    id="email-input"
                    placeholder="이메일"
                    value={email}
                    fullWidth
                    margin="small"
                    sx={{ marginBottom: "1rem" }}
                    onChange={(e) => setEmail(e.target.value)}
                    color={emailValid ? "success" : null}
                    focused={emailValid}
                    InputProps={
                        emailValid ? {
                            endAdornment: (
                            <InputAdornment position="end">
                                <DoneIcon color="success" />
                            </InputAdornment>
                            ),
                        } : null
                    }
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
                    onChange={handlePassword}
                    color={passwordValid ? "success" : null}
                    focused={passwordValid}
                    InputProps={
                        passwordValid ? {
                            endAdornment: (
                            <InputAdornment position="end">
                                <DoneIcon color="success" />
                            </InputAdornment>
                            ),
                        } : null
                    }
                    onKeyDown={enterKey}
                />
                <TextField
                    required
                    id="confirm-password-input"
                    label="비밀번호 확인"
                    type="password"
                    autoComplete="current-confirm-password"
                    fullWidth
                    margin="small"
                    sx={{ marginBottom: "1rem" }}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    color={passwordConfirmValid ? "success" : null}
                    focused={passwordConfirmValid}
                    InputProps={
                        passwordConfirmValid ? {
                            endAdornment: (
                            <InputAdornment position="end">
                                <DoneIcon color="success" />
                            </InputAdornment>
                            ),
                        } : null
                    }
                    onKeyDown={enterKey}
                />
                <Box my={2} width="100%">
                    <Button disabled={!emailValid || !passwordValid || !passwordConfirmValid} onClick={handleSubmit} variant="contained" fullWidth sx={{ height: "3.5rem" }}>
                        <Typography fontWeight="700">가입 완료</Typography>
                    </Button>
                </Box>
                <Stack direction="row" spacing={1}>
                    <Typography>이미 투두리스트에 가입하셨나요? </Typography>
                    <BlackLink to="/login">
                        <Typography color="secondary" fontWeight="600">로그인</Typography>
                    </BlackLink>
                </Stack>
            </Container>
        </div>
    )
}


const useStyles = makeStyles({
    container: {
        height: "100vh",
        minWidth: "1440px",
        width: "100vw",
        padding: "5rem 0",
    },
});

const BlackLink = styled(Link)({
    textDecoration: "none",
    color: "black"
})
