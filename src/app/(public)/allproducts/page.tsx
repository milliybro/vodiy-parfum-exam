import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Metadata } from "next";

import ProductCard from "@/components/card/ProductCard";

import "./style.scss";

export const metadata: Metadata = {
  title: "Barcha mahsulotlar",
  description:
    "Vodiy Parfum | Barcha mahsulotlar",
};


const AllProductsPage = async() => {
  return (
    <main>
      <div className="all-products container">
        <ProductCard />
      </div>
        <ToastContainer/>
    </main>
  );
}

export default AllProductsPage;

