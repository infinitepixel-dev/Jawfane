/*
A sidebar component for the admin dashboard.
Ensures menu items never overlap with the logout or footer sections.
*/

import { useNavigate } from "react-router-dom"
import propTypes from "prop-types"

//INFO Animation Libraries
import { gsap } from "gsap"

//INFO Icons
import { FaTimes, FaPlus, FaUsers, FaHome, FaEye } from "react-icons/fa"
import { FaBoxesPacking } from "react-icons/fa6"
import { LiaShippingFastSolid } from "react-icons/lia"
import { BsCashCoin } from "react-icons/bs"

//INFO Assets
import DevelopedByInfinitePixel from "../widgets/DevelopedByInfinitePixel"

//INFO Admin
import Logout from "@admin_product_management/Logout"

const AdminSidebar = ({
  showSidebar,
  setShowSidebar,
  setSelectedPage,
  user,
  role,
}) => {
  const navigate = useNavigate()

  const closeSidebar = () => {
    gsap.to(".admin-sidebar", {
      x: "-100%",
      duration: 0.2,
      ease: "power3.inOut",
    })
    setTimeout(() => setShowSidebar(false), 500)
  }

  const menuItems = [
    {
      icon: <FaEye />,
      label: "View Website",
      onClick: () => navigate("/home"),
    },
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
    {
      icon: <LiaShippingFastSolid />,
      label: "Shipping",
      onClick: () => setSelectedPage("shipping"),
    },
  ]

  return (
    <div
      className={`admin-sidebar fixed top-0 z-50 h-full transform bg-gray-800 bg-opacity-90 text-slate-200 ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out flex flex-col`}
      style={{
        left: 0,
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

      {/* Ensure the menu section is scrollable and occupies remaining height */}
      <div className="flex-1 px-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
        <ul className="mt-8 space-y-4">
          {menuItems.map((item, index) => (
            <div key={index}>
              <li>
                <button
                  className="flex items-center space-x-2 text-lg font-extrabold text-slate-200 hover:text-indigo-500"
                  onClick={() => {
                    closeSidebar()
                    item.onClick()
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
              {index < menuItems.length - 1 && (
                <hr className="my-2 border-gray-600" />
              )}
            </div>
          ))}
        </ul>
      </div>
      <hr className="my-2 border-gray-600" />
      {/* Stick the logout button and footer to the bottom */}
      <div className="flex flex-col items-center justify-end px-4 space-y-20">
        {/* Logout button */}
        <div className="flex justify-center w-full">
          <Logout user={user} role={role} />
        </div>
        {/* Developed by Infinite Pixel */}
        <div className="flex justify-center w-full">
          <DevelopedByInfinitePixel />
        </div>
      </div>
    </div>
  )
}

AdminSidebar.propTypes = {
  showSidebar: propTypes.bool.isRequired,
  setShowSidebar: propTypes.func.isRequired,
  setSelectedPage: propTypes.func.isRequired,
  user: propTypes.object.isRequired,
  role: propTypes.string.isRequired,
}

export default AdminSidebar
