//UsersManager.jsx
/*
A component that allows the admin to manage users allowed in the admin dashboard
*/

//INFO React Libraries
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

//INFO Animation Libraries
import { gsap } from "gsap";

const UsersManager = ({ storeId }) => {
  // console.log("Store ID:", storeId);

  const APIUrl = `${window.location.protocol}//${window.location.hostname}:3030`;

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    email: "",
    name: "",
    role: "user",
    store_id: storeId, //Associates with the store
  });
  const [editUser, setEditUser] = useState(null);
  const usersListRef = useRef(null);

  const roleMap = {
    user: 3, // User has role_id = 3
    admin: 1, // Admin has role_id = 1
    storeManager: 2, // Store Manager has role_id = 2
  };

  const reverseRoleMap = {
    1: "admin",
    2: "storeManager",
    3: "user",
  };

  useEffect(() => {
    const getUsers = async () => {
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
    };

    getUsers();
  }, [APIUrl]);

  //v1
  // Add a new user
  // const handleAddUser = () => {
  //     //POST with fetch
  //     fetch(`${APIUrl}/users-data`, {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(newUser),
  //     }).then(() => {
  //         setUsers([...users, newUser])
  //         setNewUser({ email: '', name: '', role: 'user' })
  //     })
  // }

  //v2
  // Add a new user
  const handleAddUser = () => {
    fetch(`${APIUrl}/users-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newUser,
        role_id: roleMap[newUser.role], // Convert role name to role_id before sending to the backend
      }),
    }).then(() => {
      setUsers([...users, newUser]);
      setNewUser({ email: "", name: "", role: "user", store_id: storeId }); // Reset newUser state
    });
  };

  //v1
  // Update an existing user
  // const handleEditUser = (id) => {
  //     //Fetch with PUT
  //     fetch(`${APIUrl}/${id}`, {
  //         method: 'PUT',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(editUser),
  //     }).then(() => {
  //         setUsers(
  //             users.map((user) =>
  //                 user.id === id ? { ...user, ...editUser } : user
  //             )
  //         )
  //         setEditUser(null)
  //     })
  // }

  //v2
  // Edit User
  const handleEditUser = (id) => {
    fetch(`${APIUrl}/users-data/edit/${id}/${storeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...editUser,
        role_id: roleMap[editUser.role], // Convert role name to role_id before sending to the backend
      }),
    }).then(() => {
      setUsers(
        users.map((user) =>
          user.id === id
            ? { ...user, ...editUser, role: roleMap[editUser.role] }
            : user
        )
      );
      setEditUser(null);
    });
  };

  // Delete a user
  const handleDeleteUser = (id) => {
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
        } else {
          console.error("Delete request failed", response);
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div className="bg-gray-50 p-5 ">
      <h2 className="mb-6 text-center text-2xl font-bold">User Management</h2>

      {/* Temp Navbar */}
      <nav aria-label="Page navigation" className="mb-8">
        <ul className="flex justify-center space-x-6">
          <li>
            <Link
              to="/add-product"
              className="text-lg font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
            >
              Add Product
            </Link>
          </li>
          <li>
            <Link
              to="/merch"
              className="text-lg font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
            >
              Merch Page
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="text-lg font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
            >
              Cart Page
            </Link>
          </li>
          <li>
            <Link
              to="/checkout"
              className="text-lg font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
            >
              Checkout Page
            </Link>
          </li>
          <li>
            <Link
              to="/users-manager"
              className="text-lg font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
            >
              Users Manager
            </Link>
          </li>
        </ul>
      </nav>

      <div className="rounded-lg bg-slate-300 p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-semibold">Add New User</h3>
        <div className="mb-4 grid gap-4">
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="rounded border p-2 transition duration-150 focus:ring-2 focus:ring-blue-500 placeholder-gray-500 placeholder:italic"
          />
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="rounded border p-2 transition duration-150 focus:ring-2 focus:ring-blue-500 placeholder-gray-500 placeholder:italic"
          />
          <select
            // value={newUser.role}
            onChange={(e) =>
              setNewUser({
                ...newUser,
                role: e.target.value,
                role_id: roleMap[e.target.value],
              })
            }
            className="rounded border p-2 transition duration-150 focus:ring-2 focus:ring-blue-500"
          >
            <option defaultValue="Select a role" disabled className="italic">
              Select a role
            </option>
            <option value="admin">Admin</option>
            <option value="storeManager">Store Manager</option>
            <option value="user">User</option>
          </select>

          <button
            onClick={handleAddUser}
            className="rounded bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600"
          >
            Add User
          </button>
        </div>
      </div>

      <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-semibold">All Users</h3>
        <ul ref={usersListRef} className="space-y-4">
          {users.map((user, index) => (
            <li
              key={index}
              className="flex items-center justify-between rounded bg-gray-200 p-4 shadow-md"
            >
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-500">{reverseRoleMap[user.role_id]}</p>
              </div>
              <div className="space-x-3">
                <button
                  onClick={() => setEditUser(user)}
                  className="rounded bg-green-600 px-3 py-1 text-white transition duration-200 hover:bg-green-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="rounded bg-red-500 px-3 py-1 text-white transition duration-200 hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {editUser && (
        <div className="mt-8 rounded-lg  p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold">Edit User</h3>
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
              className="rounded border p-2 transition duration-150 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={editUser.name}
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  name: e.target.value,
                })
              }
              className="rounded border p-2 transition duration-150 focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newUser.role}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  role: e.target.value,
                  role_id: roleMap[e.target.value],
                })
              }
              className="rounded border p-2 transition duration-150 focus:ring-2 focus:ring-blue-500  bg-white"
            >
              <option value="admin">Admin</option>
              <option value="storeManager">Store Manager</option>
              <option value="user">User</option>
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
};

export default UsersManager;
