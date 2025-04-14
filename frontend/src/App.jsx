import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LogIn from './pages/login';
import Home from './pages/home';
import PrivateRoute from './authenticate/privateRoute';

function App() {
    return (
        <Router>


                <Routes>
                    <Route path="/" element={<LogIn />} />
                    <Route path="/home" element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                        } />
                </Routes>

        </Router>
    );
}

export default App;
