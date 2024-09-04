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
import { FaBoxesPacking } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";

//INFO Assets
import PowerByInfinitePixel from "../widgets/PowerByInfinitePixel";

//INFO Admin
import Logout from "@admin_product_management/Logout";

const AdminSidebar = ({
  showSidebar,
  setShowSidebar,
  setSelectedPage,
  user,
  role,
}) => {
  const navigate = useNavigate();

  const closeSidebar = () => {
    gsap.to(".admin-sidebar", {
      x: "-100%",
      duration: 0.2,
      ease: "power3.inOut",
    });
    setTimeout(() => setShowSidebar(false), 500);
  };

  const menuItems = [
    { icon: <FaEye />, label: "View Site", onClick: () => navigate("/home") },
    {
      icon: <FaHome />,
      label: "Dashboard",
      onClick: () => setSelectedPage("dashboard"),
    },
    {
      icon: <FaPlus />,
      label: "Add Product",
      onClick: () => setSelectedPage("add-product"),
    },
    {
      icon: <FaBoxesPacking />,
      label: "Product Manager",
      onClick: () => setSelectedPage("manage-products"),
    },
    {
      icon: <FaUsers />,
      label: "Users Manager",
      onClick: () => setSelectedPage("users-manager"),
    },
    {
      icon: <BsCashCoin />,
      label: "Payments",
      onClick: () => setSelectedPage("payments"),
    },
  ];

  return (
    <div
      className={`admin-sidebar fixed left-0 top-0 z-50 h-full transform bg-gray-800 bg-opacity-95 text-white ${
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
        {menuItems.map((item, index) => (
          <div key={index}>
            <li>
              <button
                className="flex items-center space-x-2 text-lg hover:text-gray-300"
                onClick={() => {
                  closeSidebar();
                  item.onClick();
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
            {index < menuItems.length - 1 && (
              <hr className="border-gray-600 my-2" />
            )}
          </div>
        ))}
      </ul>

      {/* login user / logout button */}
      <div className="absolute w-full bottom-52">
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
  setSelectedPage: propTypes.func.isRequired,
  user: propTypes.object.isRequired,
  role: propTypes.string.isRequired,
};

export default AdminSidebar;
