import { Avatar } from "./BlogCard";

const Appbar = () => {
  return (
    <div className="border-b py-4 mx-auto max-w-7xl items-center border-gray-200 flex justify-between px-10">
      <div className="font-sans font-medium text-xl">Medium</div>
      <div>
        <Avatar name="Ujjwal Mishra" />
      </div>
    </div>
  );
};

export default Appbar;
