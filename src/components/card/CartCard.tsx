"use client";

import React, { useState, useEffect, Fragment } from "react";
import useCart from "@/store/cart";

import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import CartType from "@/types/cart";

import "./style.scss";
import useAuth from "@/store/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import select from "../../assets/check-cart.png";
import empty from "../../assets/empty.gif";
import { request } from "@/server/request";


const CartCard = () => {
  const [open, setOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [openModal, setOpenModal] = useState(false);
  const { isAuthenticated, user, setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [needComments, setNeedComments] = useState(false);
  const [comments, setComments] = useState("");


  const router = useRouter();

  const { cart, setCart } = useCart();

  let newCart: (CartType | null)[] = cart.map((product: CartType) => ({
    ...product,
  }));

  const increaseQuantity = (id: string) => {
    newCart = newCart.map((product) => {
      if (product?.id === id) {
        return {
          ...product,
          quantity: (product.quantity || 0) + 1,
        };
      } else {
        return product;
      }
    }) as (CartType | null)[];

    setCart(newCart.filter(Boolean) as CartType[]);
  };

  const decreaseQuantity = (id: string) => {
    newCart = newCart.map((product) => {
      if (product?.id === id) {
        const newQuantity = Math.max((product.quantity || 0) - 1, 0);
        if (newQuantity === 0) {
          return null;
        } else {
          return {
            ...product,
            quantity: newQuantity,
          };
        }
      } else {
        return product;
      }
    }) as (CartType | null)[];

    newCart = newCart.filter(Boolean) as (CartType | null)[];

    setCart(newCart.filter(Boolean) as CartType[]);
  };

  useEffect(() => {
    const newTotalPrice = newCart.reduce((acc, product) => {
      return acc + (product?.price || 0) * (product?.quantity || 0);
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [newCart]);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleOk = () => {};

  const createOrder = async () => {
    try {
      setLoading(true)
      const order = {
        cart: 
        newCart.map((product) => ({
          product: product?.id,
          quantity: product?.quantity,
        })),
        comment: comments,
      }
      await request.post("payment", order);
      localStorage.removeItem("CART");
      router.push("/");
      toast.success('Muvaffaqiyatli!');
    } finally {
      setLoading(true)
    }
  };
  return (
    <Fragment>
      <h1>
          Savatingizda, {cart.length}  mahsulot
        </h1>
      <div className="full-packet">
        <div className="cart-full">
          {cart.length !== 0 ? (
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
                      objectFit="contain"
                    />
                  </div>
                  <div className="cart__content">
                    <div>
                      <h4>{product?.title || "Mahsulot"}</h4>
                    </div>

                    <div className="cart__button__container">
                      <button
                        onClick={() => decreaseQuantity(product?.id || "id1")}
                      >
                        <RemoveIcon />
                      </button>
                      <span>{product?.quantity || 0}</span>
                      <button
                        onClick={() => increaseQuantity(product?.id || "id")}
                      >
                        <AddIcon />
                      </button>
                    </div>

                    <p>
                      {" "}
                      {product
                        ? product?.price * product?.quantity
                        : "Mavjud emas"}
                      so`m
                      <span>
                        {" "}
                        <br />{" "}
                        {product
                          ? (product?.price + 14200) * product?.quantity
                          : "Mavjud emas"}{" "}
                        so`m
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="nodata__found">
              <Image src={empty} alt="empty" />
              <h1>Savatda hozircha mahsulot yo`q</h1>
            </div>
          )}
        </div>
        <div className="order-full">
          <div className="cart__order">
            <div>
              <Image src={select} alt="" />
              <div>
                <h3>Siz uchun eshikkacha bepul yetkazib berish mavjud</h3>
                <h4>Tanlovingizga ko`ra tez yetkazib berish</h4>
              </div>
              <hr />
            </div>
            <hr />
            <div className="order-price">
              <h4>Buyurtmangiz</h4>
              <h4>Mahsulotlar ({cart.length})</h4>
            </div>
            <h3>Jami: {totalPrice} so`m </h3>
          {needComments ? (<textarea onChange={(e) => setComments(e.target.value)} id="comment" placeholder="Sharx qoldirish..."></textarea>) : (<p className="sharx" onClick={() => setNeedComments(true)}>Sharx yozish</p>)}

            <button onClick={createOrder} className="order-btn">Rasmiylashtirishga o`tish</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CartCard;
