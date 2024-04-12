import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/utils/MainLayout";

const KidsProductPage = () => {
  const { productName } = useParams();

  return (
    
      <div className="pt-32 min-h-screen dark:bg-matteBlack flex flex-col gap-5">
        <h1 className="text-center">{productName}</h1>
        {/* Add your product details or content here */}
        <p className="text-center">No Product yet</p>
      </div>
    
  );
};

export default KidsProductPage;
