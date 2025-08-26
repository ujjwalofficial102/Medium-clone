import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="space-y-8 mt-5 flex flex-col items-center">
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <div>
        <Appbar />
      </div>
      <div className="flex justify-center">
        <div className="space-y-2">
          {blogs.map((blog: any) => (
            <div key={blog.id}>
              <BlogCard
                id={blog.id}
                authorName={blog?.author.name || "Anonymous"}
                title={blog?.title}
                content={blog?.content}
                publishedDate="23-Aug-2025"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
