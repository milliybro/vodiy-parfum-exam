"use client";

import {useEffect, useState} from "react";
import { request } from "@/server/request";
import Image from "next/image";
import Alert from '@mui/material/Alert';
import prod from "@/assets/newProduct.jpg"

import "./style.scss";


interface Image {
  public_id: string;
  url: string;
}

interface Product {
  checked: boolean;
  sold: number;
  _id: string;
  title: string;
  price: number;
  description: string;
  image: Image;
  quantity: number;
  createdAt: string,
}

interface CartItem {
  _id: string;
  product: Product;
}

interface Order {
  status: string;
  _id: string;
  userId: string;
  cart: CartItem[];
}


const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderProducts, setOrderProducts] = useState<Product[]>([]);


  useEffect(() => {
      const getUserPayments = async () => {
        const { data } = await request.get("auth/payments");
        setOrders(data);
        const products = data.map((order: Order) => order.cart.map((item: any) => item.product)).flat();
        setOrderProducts(products);
      };
      getUserPayments();
  }, [])



  return <div className="container">
    <h1 className="order__title">Buyurtmalarim</h1>
    <div className="order__row">
      {orderProducts.map((product) => (
        <div key={product?._id} className="order__card">
          <div className="order__image">
            <Image src={product?.image?.url || prod} alt={product?.title} width={50} height={50} />
          </div>
          <h2>{product?.title || "Noma`lum mahsulot"}</h2>
          <p>{product?.price || "X"} so`m</p>
          <h3 className="status">Buyurtma qabul qilindi</h3>
        </div>
      ))}
    </div>
  </div>;
};

export default OrdersPage;



