"use client";

import useUsers from "@/store/users";
import useCategories from "@/store/categories"
import useProducts from "@/store/products"
import {useEffect} from "react";

import "./style.scss";
import "@/components/loading/Loading"

const DashboardPage = () => {
  const {getUsers, total, loading} = useUsers();
  const {data: categories, getData} = useCategories();
  const {total: products, getProducts} = useProducts();

  useEffect(() => {
    getUsers();
    getData();
    getProducts();
  }, [getUsers, getData, getProducts])

  return <div className="dashboard">
    <h1>Hello admin!</h1>
   </div>;
};

export default DashboardPage;
