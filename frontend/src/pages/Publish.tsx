import { useState } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const publishHandler = async () => {
    if (!title || !description) return;
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content: description,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      navigate(`/blog/${res.data?.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <Appbar />
      </div>
      {/* <div>{JSON.stringify({ title: title, description: description })}</div> */}
      <div>
        <div className="flex justify-center m-4 ">
          <input
            type="text"
            placeholder="Enter Title..."
            className="font-bold w-full max-w-7xl text-2xl border rounded-md px-4 py-2 border-gray-200 focus:outline-blue-500"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center m-4 h-100">
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Write an article..."
            className="resize-none border rounded-md border-gray-200 p-2 w-full max-w-7xl focus:outline-blue-500"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={publishHandler}
            className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white py-2 px-6 rounded-md"
          >
            Publish Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publish;
