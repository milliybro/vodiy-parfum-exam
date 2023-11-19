"use client";
import Slider from "react-slick";

import "./style.scss";
import useLatestProducts from "@/store/latestProducts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FavoriteBorderIconOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import useCart from "@/store/cart";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from "@mui/icons-material/Favorite";
import Loading from "../loading/Loading";
import useFav from "@/store/fav";

const CarouselProduct = () => {
  const { data: latestProducts, getData: getLatestProducts } =
    useLatestProducts();

  const { addToCart, cart } = useCart();
  const { cart: favCart, addToFav } = useFav();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timerId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    getLatestProducts();
  }, [getLatestProducts]);

  const isProductInFav = (productId: string) => {
    return favCart.some((favCartProduct) => favCartProduct.id === productId);
  };

  const isProductInCart = (productId: string) => {
    return cart.some((cartProduct) => cartProduct.id === productId);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <Slider {...settings}>
          {latestProducts?.map((product) => (
            <div className="product__border" key={product?._id}>
              <div className="products__card">
                <div className="product__img">
                  <Image
                    src={
                      product?.image.url ||
                      "data:image/jpeg;base64,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"
                    }
                    alt={product?.title || "Product"}
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
                      <FavoriteBorderIcon />
                    )}
                  </button>
                </div>
                <Link
                  href={`/allproducts/${product?._id}`}
                  className="product__content"
                >
                  <h3>{product?.title || "Nomsiz mahsulot"}</h3>
                  <p>{product?.price || "Narxlanmagan"} so`m</p>
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
                    className="product__button"
                    disabled={isProductInCart(product?._id) ? true : false}
                  >
                    {isProductInCart(product?._id)
                      ? "Qo`shilgan + "
                      : "Savatga qo`shish"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default CarouselProduct;
