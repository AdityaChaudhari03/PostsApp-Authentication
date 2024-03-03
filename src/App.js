import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/SignupForm";
import PostList from "./components/PostList";
import WritePost from "./components/WritePost";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          <Route exact path="/" element={<Signup />} />
          <Route exact path="/posts" element={<PostList />} />
          <Route path="/write" element={<WritePost />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
