import React from "react";
import { Route, Routes } from "react-router-dom";
import EditorLayout from "./EditorLayout";
import Editor from "./screens/Editor";
import Comments from "./screens/comments/Comments";
import ManagePosts from "./screens/posts/EManagePosts";
import EditPost from "./screens/posts/EditPost";
import Categories from "./screens/categories/Categories";
import EditCategories from "./screens/categories/EditCategories";

const EditorRoutes = () => (
  <Routes>
    <Route path="/" element={<EditorLayout />}>
      <Route index element={<Editor/>} />
      <Route path="comments" element={<Comments />} />
      <Route path="posts/manage" element={<ManagePosts />} />
      <Route path="posts/manage/edit/:slug" element={<EditPost />} />
      <Route path="categories/manage" element={<Categories />} />
      <Route path="categories/manage/edit/:slug" element={<EditCategories />} />
    </Route>
  </Routes>
);

export default EditorRoutes;
