import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";
import Appbar from "../components/Appbar";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex space-x-80 justify-center mt-10">
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      </div>
    );
  }
  return (
    <div>{blog ? <FullBlog blog={blog} /> : <div>Blog not found</div>}</div>
  );
};

export default Blog;
