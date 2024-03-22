import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "flowbite-react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import avatar from "../../assets/avatar.jpeg";

const DashUsers = () => {
  const { currentUser, accessToken } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserIdToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 9;

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `https://e-commerce-app-pearl-six.vercel.app/api/users/getUsers?page=${currentPage}&perPage=${perPage}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data.users);
      setTotalPages(Math.ceil(data.totalUsers / perPage));
    } catch (error) {
      console.error("Errro fetching users", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`https://e-commerce-app-pearl-six.vercel.app/api/users/deleteUser/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
        if (response.ok) {
            setUsers((prev) => prev.filter((user) => user._id !== userId));
            setShowModal(false);
        } else {
            console.log(data.message);
        }

    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user: " + error.message);
    }
  };
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        <div>
            <h1 className="text-center text-lg font-bold py-1">All users</h1>
        </div>
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body className="divide-y" key={user._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={user?.avatar || avatar}
                      alt={user.username}
                      className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          <div className="flex justify-center mt-8">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  className={`mx-1 px-4 py-2 bg-blue-500 text-white rounded ${
                    currentPage === page ? "bg-blue-600" : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              )
            )}
          </div>
        </>
      ) : (
        <p>You have no users yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashUsers;
