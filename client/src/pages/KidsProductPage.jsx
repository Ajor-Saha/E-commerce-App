import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/utils/MainLayout";

const KidsProductPage = () => {
  const { productName } = useParams();

  return (
    
      <div className="py-32">
        <h1>{productName}</h1>
        {/* Add your product details or content here */}
      </div>
    
  );
};

export default KidsProductPage;
