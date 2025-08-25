import type { Blog } from "../hooks";
import Appbar from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center pt-15">
        <div className="grid grid-cols-12 space-x-4 px-10 w-full max-w-7xl">
          <div className="col-span-8 space-y-2">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-gray-500">Posted on August 25, 2025</div>
            <div className="mt-4">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="text-gray-500 mb-2">Author</div>
            <div className="flex items-center gap-4 pt-4">
              <div>
                <Avatar name={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>

                <div className="font-thin text-sm pt-2">
                  Random catch phrase about the author's ability to grab the
                  user's attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
