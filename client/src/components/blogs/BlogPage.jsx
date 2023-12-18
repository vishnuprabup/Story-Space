import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import Blog from "./Blog";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getBlogAction } from "../../redux/features/stories/storySlice";
import { useDispatch, useSelector } from "react-redux";

const BlogPage = () => {
  const [didMount, setDidMount] = useState(false);

  const { blogId } = useParams();

  const dispatch = useDispatch();

  const data = useSelector((state) => state.stories);

  useEffect(() => {
    getDatafromApi();
  }, [blogId]);

  const getDatafromApi = () => {
    dispatch(getBlogAction({ blogId }))
      .then(() => {
        setDidMount(true);
      })
      .catch(() => setDidMount(false));
  };

  let blog = !data.loading && didMount ? data.data.data : null;

  const loadingStyle = {
    textAlign: "center",
    padding: "5rem 0rem",
  };

  return (
    <div className="container">
      <Navbar />
      {didMount ? <Blog {...blog} /> : <p style={loadingStyle}>Loading...</p>}
    </div>
  );
};

export default BlogPage;
