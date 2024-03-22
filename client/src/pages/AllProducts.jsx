import { Button, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/card/ProductCard';

const AllProducts = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(9);
  const [totalPages, setTotalPages] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }
   
    const fetchProducts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`https://e-commerce-app-pearl-six.vercel.app/api/product/getProducts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setProducts(data.products);
        setTotalPages(Math.ceil(data.totalProducts / perPage));
        setLoading(false);
        
      }
    };

    fetchProducts();

  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value })
    }

    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({ ...sidebarData, category });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <div className='flex flex-col md:flex-row py-18 dark:bg-gray-900'>
      <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex   items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <TextInput
              placeholder='Search...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
              <option value='desc'>Latest</option>
              <option value='asc'>Oldest</option>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id='category'
            >
              <option value='uncategorized'>Uncategorized</option>
              <option value='Shirt'>Shirt</option>
              <option value='Hoodie'>Hoodie</option>
              <option value='Panjabi'>Panjabi</option>
              <option value='Jacket'>Jacket</option>
              <option value='Skirts'>Skirts</option>
              <option value='Gown'>Gown</option>
              <option value='T-shirt'>T-Shirt</option>
              <option value='Trouser'>Sports Trouser</option>
            </Select>
          </div>
          <Button type='submit' outline gradientDuoTone='purpleToPink'>
            Apply Filters
          </Button>
        </form>
      </div>
      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
          Products results:
        </h1>
        <div className='p-7 flex flex-wrap justify-evenly gap-4'>
        {!loading && products.length === 0 && (
            <p className='text-xl text-gray-500'>No products found.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}
          {!loading &&
            products &&
            products
              .slice((currentPage - 1) * perPage, currentPage * perPage)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-5">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-3 py-1 mx-1 rounded-lg ${currentPage === index + 1 ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllProducts
