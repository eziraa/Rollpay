export default function BodyLoader() {
  return (
    <div className="w-full p-5 px-7 text-center fixed inset-0 flex-col items-center justify-center space-y-4 bg-slate-100/25  h-full backdrop-blur-sm drop-shadow-md ">
      {/* <div className="flex items-center justify-between bg-slate-50 w-full h-1/6">
        <div className="flex-col space-y-3 h-fit w-fit p-4 align-middle justify-end  ">
          <div className="h-6 w-36 bg-slate-300 "></div>
          <div className="h-6 w-52 bg-slate-300 "></div>
          <div className="h-6 w-36 bg-slate-300 "></div>
        </div>
        <div className="flex-col space-y-3   h-20 w-48 p-4 align-middle justify-center  ">
          <div className="h-16 w-full bg-slate-300 "></div>
        </div>
      </div>
      <div className="w-full flex justify-start border-spacing-2 p-3 space-x-3 border-slate-600 h-20 bg-slate-200/70">
        <div className="border-slate-600 border-spacing-4 h-full w-2/5 bg-white"></div>
        <div className="w-36 h-full bg-slate-300/70 "></div>
      </div>
      <div className="flex-col h-20 w-full space-y-4 ">
        <div className="h-full w-full bg-slate-300/70"></div>
      </div>
      <div className="w-full flex-1 min-h-56  flex-col ">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            className={`h-12  w-full ${
              index % 2 === 0 ? "bg-slate-50/70" : "bg-slate-200/70"
            }`}
          ></div>
        ))}
      </div> */}
      <span className="text-2xl  font-extralight ">Loading...</span>
    </div>
  );
}
