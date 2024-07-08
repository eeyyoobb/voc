import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Admin from "./screens/Admin";
import Comments from "./screens/comments/Comments";
import ManagePosts from "./screens/posts/ManagePosts";
import EditPost from "./screens/posts/EditPost";
import Categories from "./screens/categories/Categories";
import EditCategories from "./screens/categories/EditCategories";
import Users from "./screens/users/Users";

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminLayout />}>
      <Route index element={<Admin />} />
      <Route path="comments" element={<Comments />} />
      <Route path="posts/manage" element={<ManagePosts />} />
      <Route path="posts/manage/edit/:slug" element={<EditPost />} />
      <Route path="categories/manage" element={<Categories />} />
      <Route path="categories/manage/edit/:slug" element={<EditCategories />} />
      <Route path="users/manage" element={<Users />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
