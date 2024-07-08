import React from "react";
import { Route, Routes } from "react-router-dom";
import ArticleDetailPage from "./articleDetail/ArticleDetailPage";
import BlogPage from "./BlogPage";

function App({ darkMode }) {
  return (
     <Routes>
        <Route path="/" element={<BlogPage darkMode={darkMode} />} />
        <Route path="/blog/:slug" element={<ArticleDetailPage darkMode={darkMode} />} />
    </Routes> 
  );
}

export default App;
