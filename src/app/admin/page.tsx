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
    <div className="progress-main-all">
  <div className="progressdiv" data-percent="13" total-data={total} offuse-data="2">
    <svg className="progress" width="200" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path className="grey" d="M 45 156 A 80 80 124 1 1 137 155" fill='none' stroke-dasharray="404" stroke-dashoffset="0" />
      <path className="grey-path-2" d="M 45 156 A 80 80 124 1 1 137 155" fill='none' stroke-dasharray="404" stroke-dashoffset="0" />
      <path className="offline" fill='transparent' stroke-dasharray="404.5" stroke-dashoffset="404" d="M 45 156 A 80 80 124 1 1 137 155" />
      <path className="online" fill='transparent' stroke-dasharray="404.5" stroke-dashoffset="404" d="M 45 156 A 80 80 124 1 1 137 155" />
      <path className="white1" fill='transparent' stroke-dasharray="0 408" stroke-dashoffset="404" d="M 45 156 A 80 80 124 1 1 137 155" />

    </svg>
  </div>
  <div className="progress-main-text">
    <div className="user-data">
      <span className="user-div d-div1">
      </span>
      <p>Total User: {total}</p>
    </div>
    <div className="user-data">
      <span className="user-div d-div2"></span>
      <p>Active User: 13</p>
    </div>
    <div className="user-data">
      <span className="user-div d-div3"></span>
      <p>Inactive User: {total-13}</p>
    </div>
  </div>
</div>
   </div>;
};

export default DashboardPage;
