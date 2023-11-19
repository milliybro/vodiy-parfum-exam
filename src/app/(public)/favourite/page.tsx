import { Metadata } from "next";

import FavouriteCard from "@/components/card/FavouriteCard";

import "./style.scss";

export const metadata: Metadata = {
  title: "Istaklarim",
  description:
    "Vodiy parfum | Istaklarim",
};

const FavouritePage = () => {
  
  return <section>
    <div className="container">
      <h1 style={{paddingTop: "50px", marginBottom: "50px", fontSize: "24px"}}>Istaklarim</h1>
      <FavouriteCard/>
    </div>
  </section>;
};

export default FavouritePage;
