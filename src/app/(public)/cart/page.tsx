import { Metadata } from "next";

import CartCard from "@/components/card/CartCard";

import "./style.scss";

export const metadata: Metadata = {
  title: "Savat",
  description:
    "Vodiy Parfum | Savat",
};

const CartPage = () => {

  
  return <section className="cart">
    <div className="container">
      <CartCard/>
    </div>
  </section>;
};

export default CartPage;
