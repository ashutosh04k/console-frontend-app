import { Outlet } from "react-router-dom";
import main from "../../assets/stop.png";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 h-screen">
        <img src={main} alt="mainlogo" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-1 items-center justify-center bg-secondaryblue px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
