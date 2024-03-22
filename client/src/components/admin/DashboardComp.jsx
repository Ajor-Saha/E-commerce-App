import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { FaShoppingBag } from "react-icons/fa";
import { Button, Progress, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.jpeg";

const DashboardComp = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [countProduct, setCountProduct] = useState({});
  const [totalComments, setCountComment] = useState(0);
  const { currentUser, accessToken } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://e-commerce-app-pearl-six.vercel.app/api/users/getUsers?perPage=5", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await fetch("https://e-commerce-app-pearl-six.vercel.app/api/product/getAllProducts?perPage=5", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setProducts(data.products);
          setTotalProducts(data.totalProducts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchCountProducts = async () => {
      try {
        const res = await fetch("https://e-commerce-app-pearl-six.vercel.app/api/product/countProduct", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setCountProduct(data.counts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://e-commerce-app-pearl-six.vercel.app/api/comment/getAllComment`,
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
        
        if (response.ok) {
          setCountComment(data.totalComments);
        }
      } catch (error) {
        console.error("Errro fetching Comments", error);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchProducts();
      fetchCountProducts();
      fetchComments();
    }
  }, [currentUser, accessToken]);

  return (
    <div className="px-3 dark:bg-gray-900 py-6 lg:py-8 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-gray-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />6
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-gray-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">
                Total Comments
              </h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiAnnotation className="bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-gray-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">
                Total Products
              </h3>
              <p className="text-2xl">{totalProducts}</p>
            </div>
            <FaShoppingBag className="bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />6
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 lg:gap-10 py-3 lg:py-6 lg:px-8 mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between  p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent users</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=users"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img
                        src={user?.avatar || avatar}
                        alt="user"
                        className="w-10 h-10 rounded-full bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 lg:px-5 rounded-md dark:bg-gray-800 gap-10">
          <h3 className="text-center text-lg py-3">Product Percentage</h3>
          <div className="flex flex-col justify-center py-5 items-center gap-10">
            <div className="flex gap-2">
              <h4 className="text-sm">Men</h4>
              <progress
                className="progress progress-secondary w-44 mt-2 dark:bg-white"
                value={countProduct?.men || 0}
                max="100"
              ></progress>
              <span className="text-sm">{`${countProduct?.men || 0}%`}</span>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="text-xs">Women</span>
              <progress
                className="progress progress-secondary w-44 mt-2 dark:bg-white"
                value={countProduct?.women || 0}
                max="100"
              ></progress>
              <span className="text-sm">{`${countProduct?.women || 0}%`}</span>
            </div>
            <div className="flex gap-2">
              <h4 className="text-sm">Kids</h4>
              <progress
                className="progress progress-secondary w-44 mt-2 dark:bg-white"
                value={countProduct?.kids}
                max="100"
              ></progress>
              <span className="text-sm">{`${countProduct?.kids || 0}%`}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between  p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent posts</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=products"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            {products &&
              products.map((product) => (
                <Table.Body key={product._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img
                        src={product.productImage}
                        alt="user"
                        className="w-14 h-10 rounded-md bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell className="w-96">{product.name}</Table.Cell>
                    <Table.Cell className="w-5">
                      {product.category.name}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;
