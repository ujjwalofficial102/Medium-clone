interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <div className="max-w-xl p-2 pb-4 border-b border-gray-200">
      <div className="flex space-x-2 items-center">
        <div>
          <Avatar name={authorName || "unknown"} />
        </div>
        <div className="font-semibold">{authorName || "unknown"}</div>
        <div className="text-2xl text-gray-400">•</div>
        <div className="text-sm text-gray-500">{publishedDate}</div>
      </div>
      <div className="text-xl font-bold mt-4">{title}</div>
      <div className="text-md font-thin">
        {content.length > 100 ? content.slice(0, 100) + "..." : content}
      </div>
      <div className="text-sm text-gray-400 font-medium mt-4">{`${Math.ceil(
        content.length / 100
      )} min read`}</div>
      {/* <div className="bg-gray-500 h-px w-full mt-2"></div> */}
    </div>
  );
};

export default BlogCard;

export function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
        {name.split(" ")[0][0].toUpperCase()}
        {name.split(" ").length === 2 && name.split(" ")[1][0].toUpperCase()}
      </span>
    </div>
  );
}
