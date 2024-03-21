import { Link } from "react-router-dom";


const ImageCard = ({ product }) => {
  const productId = product._id;
    return (
      <Link to={`/product/${productId}`}>
        <div className="bg-white cursor-pointer rounded overflow-hidden group relative before:absolute before:inset-0 before:z-10 before:bg-black before:opacity-50">
        <img src={product.productImage} alt="Blog Post 1" className="w-full h-96 object-cover group-hover:scale-110 transition-all duration-300" />
        <div className="p-6 absolute bottom-0 left-0 right-0 z-20">
          <span className="text-sm block mb-2 text-yellow-400 font-semibold">10 FEB 2023 | BY JOHN DOE</span>
          <h3 className="text-xl font-bold text-white">{product.name}</h3>
          <div className="mt-4">
            <p className="text-gray-200 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.</p>
          </div>
        </div>
      </div>
      </Link>
    );
};

export default ImageCard;
