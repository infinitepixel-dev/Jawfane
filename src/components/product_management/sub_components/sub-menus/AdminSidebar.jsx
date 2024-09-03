//AdminSidebar.jsx

/*
A sidebar component for the admin dashboard
*/

import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";

//INFO Animation Libraries
import { gsap } from "gsap";

//INFO Icons
import { FaTimes, FaPlus, FaUsers, FaHome, FaEye } from "react-icons/fa";

//INFO Assets
import PowerByInfinitePixel from "../widgets/PowerByInfinitePixel";

//INFO Admin
import Logout from "@admin_product_management/Logout";

const AdminSidebar = ({ showSidebar, setShowSidebar, user, role }) => {
  const navigate = useNavigate();

  const closeSidebar = () => {
    gsap.to(".admin-sidebar", {
      x: "-100%",
      duration: 0.5,
      ease: "power3.inOut",
    });
    setTimeout(() => setShowSidebar(false), 500);
  };

  return (
    <div
      className={`admin-sidebar fixed left-0 top-0 z-50 h-full transform bg-gray-800 bg-opacity-95  text-white ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
      style={{
        zIndex: 1000,
        backdropFilter: "blur(2em)",
      }}
    >
      <div className="flex items-center justify-between p-4">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button onClick={closeSidebar} className="pl-4">
          <FaTimes color="red" className="text-2xl" />
        </button>
      </div>
      <ul className="ml-4 mt-8 space-y-4">
        <li>
          <button
            className="flex items-center space-x-2  text-lg hover:text-gray-300"
            onClick={() => {
              closeSidebar();
              navigate("/home");
            }}
          >
            <FaEye />
            <span>View Site</span>
          </button>
        </li>
        <li>
          <button
            className="flex items-center space-x-2  text-lg hover:text-gray-300"
            onClick={() => {
              closeSidebar();
              navigate("/dashboard");
            }}
          >
            <FaHome />
            <span>Dashboard</span>
          </button>
        </li>
        <li>
          <button
            className="flex items-center space-x-2 text-lg hover:text-gray-300"
            onClick={() => {
              closeSidebar();
              navigate("/add-product");
            }}
          >
            <FaPlus />
            <span>Add Product</span>
          </button>
        </li>
        <li>
          <button
            className="flex items-center space-x-2 text-lg hover:text-gray-300"
            onClick={() => {
              closeSidebar();
              navigate("/users-manager");
            }}
          >
            <FaUsers />
            <span>Users Manager</span>
          </button>
        </li>
        {/* Add more admin components here */}
      </ul>

      <div className="absolute w-full bottom-52 ">
        <Logout user={user} role={role} />
      </div>

      {/* display powerby at the bottom center of the menu */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <PowerByInfinitePixel />
      </div>
    </div>
  );
};

AdminSidebar.propTypes = {
  showSidebar: propTypes.bool.isRequired,
  setShowSidebar: propTypes.func.isRequired,
  user: propTypes.object.isRequired,
  role: propTypes.string.isRequired,
};

export default AdminSidebar;
