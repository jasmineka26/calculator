const History = ({ onClick, title, historyMonitor = [] }) => {
  const handleClick = () => {
    if (onClick) onClick(title);
  };
  return (
    <div className="h-full flex flex-col justify-between items-center">
      <div className="flex flex-row justify-between items-center p-3 w-full h-12 rounded-t-lg shadow-lg bg-slate-800">
        <div className="select-none text-white font-bold">History</div>
        <div>
          <button onClick={handleClick} className="text-red-700 hover:text-red-800 active:text-green-500">
            {title}
          </button>
        </div>
      </div>
      <div className="w-full h-full p-1 flex flex-col items-center gap-1 overflow-auto">
        {historyMonitor.reverse().map((h, i) => (
          <div key={i} className="w-full">
            <div className="w-full h-12 bg-slate-800 rounded text-white p-1 flex justify-center items-center gap-2 overflow-x-auto">
              <span>{h.formula}</span>
              <span>=</span>
              <span>{h.result}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
