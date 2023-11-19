"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { InputBase } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIconOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import useCart from "@/store/cart";
import useFav from "@/store/fav";
import { request } from "@/server/request";

import "./productCard.scss";
import ProductType from "@/types/product";
import { LIMIT } from "@/constants";

interface ParamTypes {
  limit: number;
  search: string;
  page: number;
  category?: string;
}

const ProductCard = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const { addToCart, cart: cartItems } = useCart();
  const { addToFav, cart } = useFav();

  useEffect(() => {
    const getCategories = async () => {
      const { data: categories } = await request.get("category");
      setCategories(categories);
    };
    getCategories();

    const getProducts = async () => {
      const params: ParamTypes = {
        page,
        limit: LIMIT,
        search,
      };
      if (category) {
        params.category = category;
      }
      const {
        data: { products, total },
      } = await request.get("product", { params });
      setProducts(products);
      setTotal(total);
    };
    getProducts();
  }, [setCategories, setProducts, page, search, category]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const sortByCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
    setPage(1);
  };

  const controlPages = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log(value);
  };

  const isProductInFav = (productId: string) => {
    return cart.some((cartProduct) => cartProduct.id === productId);
  };

  const isProductInCart = (productId: string) => {
    return cartItems.some((cartProduct) => cartProduct.id === productId);
  };

  const priceSorting = (sort: string) => {
    setSort(sort);
  };

  return (
    <div>
      <div className="products-top">
        <InputBase
          className="search"
          sx={{ ml: 1, flex: 1 }}
          placeholder="Mahsulotlarni izlash..."
          value={search}
          
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleSearch(event)
          }
          inputProps={{ "aria-label": "search products" }}
        />
        <div style={{display: "flex", gap: "10px", paddingTop: "10px", paddingLeft: "8px"}}>
        <select
          onChange={(event) => sortByCategory(event)}
          className="category-sort"
          style={{ height: "100%" }}
        >
          <option value="" style={{ height: "100%" }}>
            Barcha kategoriyalar
          </option>
          {categories?.map((category: { _id: string; name: string }) => (
            <option
              key={category?._id}
              style={{ height: "100%" }}
              value={category?._id}
            >
              {category?.name}
            </option>
          ))}
        </select>
          <select
            onChange={(e) => priceSorting(e.target.value)}
            name="price-sort"
          >
            <option value="">Narxi bo`yicha saralash</option>
            <option value="price">Arzonroq</option>
            <option value="-price">Qimmatroq</option>
          </select>
          <select
            onChange={(e) => priceSorting(e.target.value)}
            name="price-sort"
          >
            <option value="">Yangiligi bo`yicha saralash</option>
            <option value={`""`}>Yaqinda qo`shilgan</option>
            <option value="oldest">Avval qo`shilgan</option>
          </select>
          <select
            onChange={(e) => priceSorting(e.target.value)}
            name="price-sort"
          >
            <option value="">Buyurtma bo`yicha saralash</option>
            <option value={`sold`}>Ko`p buyurtirilgan</option>
            <option value="-sold">Kam buyurtirilgan</option>
          </select>
        </div>
      </div>
      <div className="allproducts__row">
        {products?.map((product: ProductType) => (
          <div key={product?._id} className="allproducts__card">
            <div className="product__img">
              <Image
                src={product?.image.url}
                alt={product?.title || "X mahsulot"}
                fill
                objectFit="cover"
              />
              <button
                onClick={() =>
                  addToFav(
                    product?._id,
                    product?.image.url,
                    product?.title,
                    product?.description,
                    product?.price
                  )
                }
                className="favourite__btn"
              >
                {isProductInFav(product?._id) ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderIconOutlined />
                )}
              </button>
              <div className="category__info">{product?.category.name}</div>
            </div>
            <Link
              href={`/allproducts/${product?._id}`}
              className="allproducts__content"
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>{product?.title || "X mahsulot"}</h3>
                <p>Sotuvda {product?.quantity || "Noaniq"} dona bor</p>
              </div>
              <p className="price-line">
                {product?.price + 9500 || "Narxlanmagan"} so`m
              </p>
              <h4>{product?.price || "Narxlanmagan"} so`m</h4>
            </Link>
            <div className="button__wrapper">
              <button
                onClick={() =>
                  addToCart(
                    product?._id,
                    product?.image.url,
                    product?.title,
                    product?.description,
                    product?.price
                  )
                }
                className={
                  isProductInCart(product?._id) ? "in-cart" : "product__btn"
                }
              >
                {isProductInCart(product?._id)
                  ? "Qo`shilgan"
                  : "Savatga qo`shish"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {total / LIMIT > 1 ? (
          <Pagination
            count={Math.ceil(total / LIMIT)}
            page={page}
            onChange={(event, value) => controlPages(event, value)}
            boundaryCount={2}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProductCard;
