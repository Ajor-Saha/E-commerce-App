import { Button, Modal, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";

const DashComments = () => {
  const { currentUser, accessToken } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentId, setCommentIdToDelete] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 9;

  useEffect(() => {
    fetchComments();
  }, [currentPage]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://e-commerce-app-pearl-six.vercel.app/api/comment/getAllComment?page=${currentPage}&perPage=${perPage}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Comments");
      }
      const data = await response.json();
      setComments(data.comments);
      setTotalPages(Math.ceil(data.totalComments / perPage));
    } catch (error) {
      console.error("Errro fetching Comments", error);
    }
  };

  const handleDeleteComment = async () => {
    try {
      const response = await fetch(`https://e-commerce-app-pearl-six.vercel.app/api/comment/deleteComment/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setComments((prev) => prev.filter((comment) => comment._id !== commentId));
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error deleting Comment:", error);
      alert("Failed to delete Comment: " + error.message);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <div>
        <h1 className="text-center text-lg font-bold py-1">All Comments</h1>
      </div>
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
          <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Number of likes</Table.HeadCell>
              <Table.HeadCell>ProductId</Table.HeadCell>
              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body className="divide-y" key={comment._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  
                  <Table.Cell>{comment.content}</Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  <Table.Cell>{comment.productId}</Table.Cell>
                  <Table.Cell>{comment.userId}</Table.Cell>
                  
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
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
        <p>You have no comments yet!</p>
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
              <Button color="failure" onClick={handleDeleteComment}>
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

export default DashComments;
