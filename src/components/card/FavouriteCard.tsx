"use client";

import { Fragment } from "react";
import useFav from "@/store/fav";
import Image from "next/image";
import FavType from "@/types/fav";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import "./FavCart.scss";
import useCart from "@/store/cart";

const FavouriteCard = () => {
  const { cart, removeFromCart } = useFav();
  const { addToCart } = useCart();

  let newCart: (FavType | null)[] = cart.map((product: FavType) => ({
    ...product,
  }));

  return (
    <Fragment>
      {cart?.length !== 0 ? (
        <div className="cart__row">
          {newCart?.map((product) => (
            <div key={product?.id} className="cart__card">
              <div className="cart__image">
                <Image
                  src={
                    product?.image ||
                    "https://www.junglescout.com/wp-content/uploads/2021/01/product-photo-water-bottle-hero.png"
                  }
                  alt={product?.title || "Uknown"}
                  fill
                />
              </div>
              <div className="cart__content">
                <h3>{product?.title || "Mahsulot"}</h3>
                <div>
                  <h3>{product?.price || "Mavjud emas"}so`m</h3>
                </div>
                <div className="add__remove__btn">
                  <button
                    className="remove__fav__btn add"
                    onClick={() =>
                      addToCart(
                        product?.id!,
                        product?.image!,
                        product?.title!,
                        product?.description!,
                        product?.price!
                      )
                    }
                  >
                    Savatga qo`shish
                  </button>
                  <button
                    className="remove__fav__btn remove"
                    onClick={() => removeFromCart(product?.id)}
                  >
                    <DeleteOutlineIcon />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="nodata__found">
          <h1>No data found...</h1>
        </div>
      )}
    </Fragment>
  );
};

export default FavouriteCard;
