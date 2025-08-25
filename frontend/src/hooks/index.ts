import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
  id: string;
  title: string;
  content: string;
  published?: boolean;
  author: {
    name: string;
  };
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setBlogs(res.data.blogs);
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        console.error("Error fetching blogs", error);
        if (error.response?.data?.message) {
          console.log(error.response.data.message); // backend error
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return {
    loading,
    blogs,
  };
};

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/get/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setBlog(res.data.blog);
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        console.error("Error fetching blogs", error);
        if (error.response?.data?.message) {
          console.log(error.response.data.message); // backend error
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  return {
    loading,
    blog,
  };
};
