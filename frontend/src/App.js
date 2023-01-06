import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import NavBar from './components/NavBar';
import TodoListPage from './pages/todolist/TodoListPage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';


function App() {
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Suspense fallback={(<div>Loading...</div>)}>
                    <Router>
                        <NavBar />
                        <Routes>
                            <Route path="/" element={<TodoListPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignUpPage />} />
                            <Route path="/*" element={<NotFound />} />
                        </Routes>
                    </Router>
                </Suspense>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
