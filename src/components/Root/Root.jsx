import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="bg-[#F8FAFC]">
      <Navbar />
      <div className="min-h-[calc(100vh-80px)]">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default Root;