import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Auth from "./components/auth/Auth";
import Home from "./components/home/Home";
import { useSelector } from "react-redux";
import Write from "./components/write/Write";
import MyStory from "./components/myStories/MyStory";
import BlogPage from "./components/blogs/BlogPage";
import Modal from "./components/modal/Modal";
import Update from "./components/update-story/Update";

function App() {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />
        <Route
          path="/write"
          element={user ? <Write /> : <Navigate to="/auth" />}
        />
        <Route
          path="/my-story"
          element={user ? <MyStory /> : <Navigate to="/auth" />}
        />
        <Route
          path="/blog/:blogId"
          element={user ? <BlogPage /> : <Navigate to="/auth" />}
        />
        <Route path="/modal" element={<Modal />} />
        <Route
          path="/update/:blogId"
          element={user ? <Update /> : <Navigate to="/auth" />}
        />
      </Routes>
    </div>
  );
}

export default App;
