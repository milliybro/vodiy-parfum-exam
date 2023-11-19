"use client";

import useCategories from "@/store/categories";
import Image from "next/image";
import React, { useEffect } from "react";

import "./style.scss";
import Link from "next/link";

const CategoryRow = () => {
  const { data: categories, getData: getCategories, loading } = useCategories();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <div className="category__row">
    {categories?.map((category) => (
      <div key={category?._id} className="category__card">
        <div className="category__img">
          <Image src={category?.image.url} alt={category?.name} fill />
        </div>
        <div className="category__content">
          <Link href={`/allcategories/${category?._id}`}>{category?.name}</Link>
        </div>
      </div>
    ))}
  </div>
  );
};

export default CategoryRow;
