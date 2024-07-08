import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import "./App.css";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import TubeApp from "./pages/tube/Tube-App";
import BookApp from "./pages/Books/Book-App";
import HomePage from "./pages/home/HomePage";
import BlogApp from "./pages/blog/Blog-App";
import AdminApp from "./pages/admin/admin/Admin-App";
import EditorApp from "./pages/admin/editor/Editor-App";
import QuizApp from "./pages/Quizzes/Quiz-App";
import Navbar from "./common/Header";
import { darkTheme, lightTheme } from "./utils/Theme";

const PrivateRoute = ({ children, userInfo }) => {
  return userInfo ? children : <Navigate to="/login" />;
};

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { userInfo } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <div className="App font-opensans">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<HomePage darkMode={darkMode} />} />
          <Route path="/register" element={<RegisterPage  />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/admin/*"
            element={
              <PrivateRoute userInfo={userInfo}>
                <AdminApp darkMode={darkMode} currentUser={userInfo} />
              </PrivateRoute>
            }
          />
          <Route
            path="/editor/*"
            element={
              <PrivateRoute userInfo={userInfo}>
                <EditorApp darkMode={darkMode} currentUser={userInfo} />
              </PrivateRoute>
            }
          />
          <Route
            path="/blog/*"
            element={
              <PrivateRoute userInfo={userInfo}>
                <BlogApp darkMode={darkMode} currentUser={userInfo} />
              </PrivateRoute>
            }
          />
          <Route path="/quiz/*" element={<QuizApp darkMode={darkMode} />} />
          <Route
            path="/tube/*"
            element={
              <PrivateRoute userInfo={userInfo}>
                <TubeApp darkMode={darkMode} currentUser={userInfo} />
              </PrivateRoute>
            }
          />
          <Route
            path="/book/*"
            element={
              <PrivateRoute userInfo={userInfo}>
                <BookApp darkMode={darkMode} currentUser={userInfo} />
              </PrivateRoute>
            }
          />
        </Routes>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
