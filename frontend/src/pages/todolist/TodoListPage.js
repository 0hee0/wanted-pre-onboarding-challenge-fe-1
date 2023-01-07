import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles, styled } from '@mui/styles';
import { Typography, Stack, Box, Grid, Button, TextField, IconButton } from '@mui/material';
import { USER_SERVER } from '../../Config';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import 'moment/locale/ko';
import Modal from '../../components/Modal';
import { checkFinalConsonant } from '../../utils/Format';


function TodoListPage() {
    const classes = useStyles();
    const [todos, setTodos] = useState([]);
    const [draft, setDraft] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [currentTodo, setCurrentTodo] = useState(undefined);
    const [method, setMethod] = useState("create");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getTodos();
    }, []);

    useEffect(() => {
        if (todos?.length && !currentTodo) {
            setCurrentTodo(todos[todos.length - 1]);
        }
    }, [todos])

    const getTodos = () => {
        axios({
            method: "get",
            url: `${USER_SERVER}/todos`,
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`
            }
        })
        .then(response => {
            // console.log('todos:',response?.data.data);
            if (response?.data?.data) {
                setTodos(response.data.data);
            }
        })
        .catch(error => {
            // console.log(error)
        })
    }

    const saveTodo = (event) => {
        if (method==="create") {
            createTodo();
        }
        else if (method==="update") {
            updateTodo();
        }
    }

    const createTodo = (event) => {
        if (!title) {
            alert("제목을 입력하셔야 합니다.");
            return;
        }

        axios({
            method: "post",
            url: `${USER_SERVER}/todos`,
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`
            },
            data: {
                "title": title,
                "content": content
            }
        })
        .then(response => {
            // console.log(response);
            if (response?.data) {
                setCurrentTodo(response.data?.data);
                handleDraft();
            }
        })
        .catch(error => {
            // console.log(error)
        })
    }

    const updateTodo = (event) => {
        if (!title) {
            alert("제목을 입력하셔야 합니다.");
            return;
        }

        axios({
            method: "put",
            url: `${USER_SERVER}/todos/${currentTodo?.id}`,
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`
            },
            data: {
                "title": title,
                "content": content
            }
        })
        .then(response => {
            // console.log(response);
            setCurrentTodo(response.data.data);
            getTodos();
            handleDraft();
        })
        .catch(error => {
            // console.log(error)
        })
    }

    const deleteTodo = () => {
        axios({
            method: "delete",
            url: `${USER_SERVER}/todos/${currentTodo?.id}`,
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`
            }
        })
        .then(response => {
            // console.log(response);
            handleDelete();
            setCurrentTodo(undefined);
            getTodos();
        })
        .catch(error => {
            // console.log(error)
        })
    }

    const handleDraft = (event) => {
        setDraft(!draft);
    }

    const handleCreate = (event) => {
        if (!draft) {
            handleDraft();
            setMethod("create");
            setTitle();
            setContent();
    
            let array = todos;
            let newTodo = {"id": 1, "title": "", "content": "", "createdAt": Date.now()}
            array.push(newTodo);
            setTodos(array);
            setCurrentTodo(newTodo);
        }
    }

    const handleUpdate = (event) => {
        handleDraft();
        setMethod("update");
        setTitle(currentTodo.title);
        setContent(currentTodo.content);
    }

    const handleDelete = (event) => {
        setOpen(!open);
    }

    const handleTodo = (todo) => (event) => {
        setCurrentTodo(todo);
        setDraft(false);
        getTodos();
    }

    const handleChange = (prop) => (event) => {
        let newValue = event.target.value;
        let array = todos;
        let index = todos?.length - 1;

        if (method==="update") {
            index = array.findIndex(x => x.id === currentTodo.id);
        }

        if (prop==="title") {
            setTitle(newValue);

            array[index].title = newValue;
            setTodos(array);
        }
        else if (prop==="content") {
            setContent(newValue);

            array[index].content = newValue;
            setTodos(array);
        }
    }

    return (
        <div className={classes.container}>
            <ShadowBox width="100%" height="40rem" p="2rem" backgroundColor="primary.light">
                <Box width="100%" px={1}>
                    <ShadowBox height="4rem" width="100%" px={2} backgroundColor="secondary.main" sx={{ display: "flex", alignItems: "center" }}>
                        <Stack direction="row" justifyContent="space-between" width="100%">
                            <IconButton onClick={handleCreate}>
                                <AddCircleOutlineIcon sx={{ fontSize: "2rem" }} />
                            </IconButton>
                            {draft ? (
                                <Button onClick={saveTodo}>
                                    <Typography fontWeight="700">저장하기</Typography>
                                </Button>
                            ) : (
                                <Stack direction="row" spacing={1}>
                                    <Button onClick={handleUpdate}>
                                        <Typography fontWeight="700">수정하기</Typography>
                                    </Button>
                                    <IconButton onClick={handleDelete}>
                                        <DeleteIcon sx={{ color: "primary.main", fontSize: "2rem" }} />
                                    </IconButton>
                                </Stack>
                            )}
                        </Stack>
                    </ShadowBox>
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={4} height="32rem">
                        <Box sx={{ height: "100%", overflowY: "auto", mt: 2 }}>
                            {todos?.length ? todos.slice(0).reverse().map(todo =>
                                <ShadowBoxWithHover key={todo.id} todoId={todo.id} currentId={currentTodo?.id} onClick={handleTodo(todo)} backgroundColor="#fff" mb={2} mx={1} py={2} px={3}>
                                    <Typography fontWeight="700" variant="h6" gutterBottom>{todo.title}</Typography>
                                    <Typography>{moment(todo.createdAt).format('YYYY년 MM월 DD일 HH시 mm분')}</Typography>
                                </ShadowBoxWithHover>
                            ) : null}
                        </Box>
                    </Grid>
                    <Grid item xs={8} mt={2} pr={1}>
                        <ShadowBox backgroundColor="#fff" py={3} px={4} height="31rem">
                            {draft ? (
                                <Stack spacing={2}>
                                    <TextField
                                        value={title}
                                        onChange={handleChange("title")}
                                        fullWidth
                                        variant="standard"
                                        inputProps={{ style: { fontSize: "24px", fontWeight: 700 } }}
                                        focused
                                    />
                                    <TextField
                                        className={classes.textFieldBgColor}
                                        value={content}
                                        onChange={handleChange("content")}
                                        multiline
                                        rows={15}
                                        fullWidth
                                        variant="filled"
                                        focused
                                    />
                                </Stack>
                            ) : (
                                <Box>
                                    {currentTodo ? (
                                        <Box>
                                            <Typography fontWeight="700" variant="h5" mb={2}>{currentTodo.title}</Typography>
                                            <Box height="22rem" pb={1}>
                                                <Box sx={{ height: "100%", overflowY: "auto" }}>
                                                <Typography sx={{ whiteSpace: 'pre-wrap' }}>{currentTodo.content}</Typography>
                                                </Box>
                                            </Box>
                                            <Typography color="gray" textAlign="end">생성일: {moment(currentTodo.createdAt).format('YYYY년 MM월 DD일 HH시 mm분')}</Typography>
                                            <Typography color="gray" textAlign="end">수정일: {moment(currentTodo.updatedAt).format('YYYY년 MM월 DD일 HH시 mm분')}</Typography>
                                        </Box>
                                    ) : null}
                                </Box>
                            )}
                        </ShadowBox>
                    </Grid>
                </Grid>
                
                {currentTodo?.title ? (
                    <Modal 
                        width="24rem"
                        open={open} 
                        onClose={handleDelete} 
                        handleSubmit={deleteTodo}
                        content={
                            <div>
                                <Typography color="black">{currentTodo.title}{checkFinalConsonant(currentTodo.title[currentTodo.title.length-1])} 삭제하시겠습니까?</Typography>
                            </div>
                        }
                    />
                ) : null}
            </ShadowBox>
        </div>
    )
}

export default TodoListPage

const useStyles = makeStyles(theme => ({
    container: {
        height: "100vh",
        minWidth: "1440px",
        width: "100vw",
        padding: "7rem 4rem",
    },
    textFieldBgColor: {
        "& .MuiFilledInput-root.Mui-focused": {
            backgroundColor: theme.palette.primary.light
        }
    }
}));

const ShadowBox = styled(Box)({
    boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
    '-webkit-box-shadow': "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
    borderRadius: "0.25rem"
})

const ShadowBoxWithHover = styled(ShadowBox, {
    shouldForwardProp: (prop) => prop !== 'todoId' && prop !== 'currentId'
})(({ theme, todoId, currentId }) => ({
    zIndex: 1,
    '&:hover': {
        boxShadow: `${theme.palette.secondary.light} 0px 0px 8px`,
        '-webkit-box-shadow': `${theme.palette.secondary.light} 0px 0px 8px`,
        cursor: "pointer"
    },
    boxShadow: todoId===currentId ? `${theme.palette.primary.dark} 0px 0px 8px` : "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
    '-webkit-box-shadow': todoId===currentId ? `${theme.palette.primary.dark} 0px 0px 8px` : "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
}));
