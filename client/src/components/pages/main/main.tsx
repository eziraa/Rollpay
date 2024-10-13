import { Outlet } from "react-router";

export const MainPage = () => {
  return (
    <div className="bg-slate-50 border-spacing-5">
      <Outlet />
    </div>
  );
};
