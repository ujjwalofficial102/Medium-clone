const Quotes = () => {
  return (
    <div className="p-10 bg-slate-200 h-screen flex flex-col items-center justify-center space-y-4">
      <div className="max-w-md text-start text-2xl font-bold">
        "The customer support i received was exceptional. The support team went
        above and beyond to address my concerns."
      </div>
      <div className="w-full max-w-md">
        <div className="text-lg font-bold ">Julius Winfield</div>
        <div className="text-sm font-medium text-slate-400">
          CEO | Acme Corp
        </div>
      </div>
    </div>
  );
};

export default Quotes;
