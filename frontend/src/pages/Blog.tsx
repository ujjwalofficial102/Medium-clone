import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div>{blog ? <FullBlog blog={blog} /> : <div>Blog not found</div>}</div>
  );
};

export default Blog;
