import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

const Appbar = () => {
  return (
    <div className="border-b py-4 mx-auto max-w-7xl items-center border-gray-200 flex justify-between px-10">
      <Link to={"/blogs"}>
        <div className="font-sans font-medium text-xl">Medium</div>
      </Link>
      <div className="flex items-center gap-4">
        <div>
          <Link to={"/publish"}>
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-1.5 text-center cursor-pointer"
            >
              New
            </button>
          </Link>
        </div>
        <div>
          <Avatar name="Ujjwal Mishra" />
        </div>
      </div>
    </div>
  );
};

export default Appbar;
