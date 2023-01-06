import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import NavBar from './components/NavBar';
import MainPage from './pages/main/MainPage';
import NotFound from './pages/NotFound';

function App() {
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Suspense fallback={(<div>Loading...</div>)}>
                    <Router>
                        <NavBar />
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/*" element={<NotFound />} />
                        </Routes>
                    </Router>
                </Suspense>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
