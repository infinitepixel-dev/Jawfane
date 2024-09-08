//UsersManager.jsx

/*
A component to manage users in the admin dashboard
*/

//INFO React Libraries
import { useState, useEffect, useRef, useCallback } from "react";
import propTypes from "prop-types";

//INFO Animation Libraries
import { gsap } from "gsap";

import "./UsersManager.module.css";

const UsersManager = ({ storeId, roleMapData }) => {
  // const APIUrl = `${window.location.protocol}//${window.location.hostname}:3030`;

  const APIUrl = `https://vps.infinitepixel.dev:3030`;

  console.log("APIUrl:", APIUrl);

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    email: "",
    name: "",
    role: "",
    store_id: storeId, //Associates with the store
  });
  const [editUser, setEditUser] = useState(null);
  const [modalMessage, setModalMessage] = useState(""); // State to manage the modal message
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const usersListRef = useRef(null);
  const modalRef = useRef(null); // Ref for the modal element

  const getUsers = useCallback(async () => {
    try {
      const response = await fetch(`${APIUrl}/users-data`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const users = await response.json();
      setUsers(users);

      // GSAP animation for users list
      gsap.fromTo(
        usersListRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }
      );
    } catch (error) {
      console.error("There was an error!", error);
    }
  }, [APIUrl]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Function to show the modal with GSAP animation
  const showMessageModal = (message) => {
    setModalMessage(message);
    setShowModal(true);

    // GSAP animation for showing the modal
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
    );

    setTimeout(() => {
      // GSAP animation for hiding the modal after 3 seconds
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => setShowModal(false), // Hide modal after animation
      });
    }, 1000); // Modal will stay visible for 3 seconds
  };

  // Add a new user
  const handleAddUser = () => {
    fetch(`${APIUrl}/users-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newUser,
        role_id: roleMapData.roles[newUser.role],
      }),
    }).then(() => {
      getUsers();
      setUsers([...users, newUser]);
      setNewUser({ email: "", name: "", role: "user", store_id: storeId }); // Reset newUser state
      showMessageModal("User added successfully"); // Show success modal
    });
  };

  // Edit User
  const handleEditUser = async (id) => {
    console.log("edit user:", editUser);

    try {
      const response = await fetch(
        `${APIUrl}/users-data/edit/${id}/${storeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...editUser,
            role: editUser.role,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const responseData = await response.json(); // Await the response JSON
      console.log("Response:", responseData);

      // Update the users list after a successful edit
      setUsers(
        users.map((user) =>
          user.id === id
            ? { ...user, ...editUser, role: roleMapData.roles[editUser.role] }
            : user
        )
      );
      setEditUser(null);
      showMessageModal("User updated successfully"); // Show success modal
    } catch (error) {
      console.error("Error updating user:", error);
      showMessageModal("Failed to update user"); // Show failure modal
    }
  };

  // Delete a user
  const handleDeleteUser = (id) => {
    //pull new user list to ensure the user is in the db to delete

    console.log(`Deleting user with id: ${id} and store id: ${storeId}`);
    if (!id || !storeId) {
      console.error("Missing user ID or store ID");
      return;
    }

    // Fetch with DELETE
    fetch(`${APIUrl}/users-data/delete/${id}/${storeId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setUsers(users.filter((user) => user.id !== id));
          showMessageModal("User deleted successfully"); // Show success modal
        } else {
          console.error("Delete request failed", response);
          showMessageModal("Failed to delete user"); // Show failure modal
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        showMessageModal("Failed to delete user"); // Show failure modal
      });
  };

  return (
    <div className="bg-gray-50 p-5 bg-opacity-5 rounded-lg text-slate-300">
      <h2 className="mb-6 text-center text-2xl font-bold">User Management</h2>

      {/* Modal */}
      {showModal && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className=" p-4 rounded shadow-lg">
            <p className="text-lg font-semibold">{modalMessage}</p>
          </div>
        </div>
      )}

      {/* Add New User Section */}
      <div className="rounded-lg bg-slate-300 bg-opacity-20 text-slate-300 p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-semibold">Add New User</h3>
        <div className="mb-4 grid gap-4">
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="rounded border p-2 transition duration-150 focus:ring-2 focus:ring-blue-500 placeholder-slate-300 placeholder:italic bg-slate-300 bg-opacity-20 text-slate-300 shadow-lg"
          />
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="rounded border p-2 transition duration-150 focus:ring-2 focus:ring-blue-500 placeholder-slate-300 placeholder:italic bg-slate-300 bg-opacity-20 text-slate-300 shadow-lg"
          />
          <select
            defaultValue="select-role"
            onChange={(e) =>
              setNewUser({
                ...newUser,
                role: e.target.value,
                role_id: roleMapData.roles[e.target.value],
              })
            }
            className={`rounded border p-2 transition duration-150 focus:ring-2 focus:ring-blue-500 bg-slate-300 bg-opacity-20 text-slate-300 shadow-lg 
  ${!newUser.role ? "italic" : ""}`} // Apply italic when no role is selected
          >
            <option
              value="select-role" // This ensures the placeholder is selected by default
              disabled
              className="italic text-slate-400" // Italicize and style the placeholder
            >
              Select a role
            </option>
            <option value="admin" className="bg-opacity-100">
              Admin
            </option>
            <option value="storeManager" className="bg-opacity-100">
              Store Manager
            </option>
            <option value="user" className="bg-opacity-100">
              User
            </option>
          </select>

          <button
            onClick={handleAddUser}
            className="rounded bg-blue-500 px-4 py-2 text-slate-200 font-bold transition duration-200 hover:bg-blue-600"
          >
            Add User
          </button>
        </div>
      </div>

      {/* All Users List */}
      <div className="mt-8 rounded-lg bg-slate-300 bg-opacity-20 text-slate-300 p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-semibold text-center sm:text-left">
          Existing Users
        </h3>
        <ul ref={usersListRef} className="space-y-4">
          {users.map((user, index) => (
            <li
              key={index}
              className="flex flex-col items-start justify-between space-y-3 rounded bg-slate-300 bg-opacity-20  p-4 shadow-md sm:flex-row sm:items-center sm:space-y-0"
            >
              {/* User Details */}
              <div className="w-full sm:w-auto ">
                <p className=" font-medium text-center sm:text-left">
                  {user.name}
                </p>
                <p className="text-slate-850 text-center sm:text-left">
                  {user.email}
                </p>
                <p className="text-slate-750 text-center sm:text-left">
                  {roleMapData.reverseRoleMap[user.role_id]}
                </p>
              </div>

              {/* Action Buttons */}

              <div className="flex w-full space-x-3  justify-center sm:w-auto sm:justify-end sm:space-x-3">
                <button
                  onClick={() => setEditUser(user)}
                  className="w-full rounded bg-green-600 px-4 py-2 text-sm font-bold text-slate-200 transition duration-200 hover:bg-green-700 sm:w-auto"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="w-full rounded bg-red-500 px-4 py-2 text-sm font-bold text-slate-200 transition duration-200 hover:bg-red-600 sm:w-auto"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit User Section */}
      {editUser && (
        <div className="mt-8 rounded-lg bg-slate-300 bg-opacity-20 p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-slate-300">
            Edit Existing User
          </h3>
          <div className="grid gap-4">
            <input
              type="email"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  email: e.target.value,
                })
              }
              className="rounded border p-2 transition duration-150 focus:ring-2 focus:ring-blue-500 bg-slate-300 bg-opacity-20 text-slate-300 shadow-lg"
            />
            <input
              type="text"
              value={editUser.name}
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  name: e.target.value,
                  role: roleMapData.reverseRoleMap[editUser.role_id],
                })
              }
              className="rounded border p-2 transition duration-150 focus:ring-2 focus:ring-blue-500 bg-slate-300 bg-opacity-20 text-slate-300 shadow-lg"
            />
            <select
              defaultValue={editUser.role}
              onChange={(e) =>
                setNewUser({
                  ...editUser,
                  role: e.target.value,
                  role_id: roleMapData.roles[e.target.value],
                })
              }
              className={`rounded border p-2 transition duration-150 focus:ring-2 focus:ring-blue-500 bg-slate-300 bg-opacity-20 text-slate-300 shadow-lg 
  ${!editUser.role ? "italic" : ""}`} // Apply italic when no role is selected
            >
              <option
                value="select-role" // This ensures the placeholder is selected by default
                disabled
                className="italic text-slate-400" // Italicize and style the placeholder
              >
                Select a role
              </option>
              <option value="admin" className="bg-opacity-100">
                Admin
              </option>
              <option value="storeManager" className="bg-opacity-100">
                Store Manager
              </option>
              <option value="user" className="bg-opacity-100">
                User
              </option>
            </select>

            <div className="flex items-center gap-4 ">
              <button
                onClick={() => handleEditUser(editUser.id)}
                className="rounded bg-green-600 px-4 py-2 text-slate-200 transition duration-200 hover:bg-green-700"
              >
                Save Changes
              </button>

              <button
                onClick={() => setEditUser(null)}
                className="rounded bg-red-500 px-4 py-2 text-slate-200 transition duration-200 hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

UsersManager.propTypes = {
  storeId: propTypes.number.isRequired,
  roleMapData: propTypes.object.isRequired,
};

export default UsersManager;
