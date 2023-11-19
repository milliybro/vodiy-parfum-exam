import Carousel from "@/components/slider/Slider";
import Link from "next/link";

import CategoryRow from "@/components/card/CategoryCard";

import "@/general-styles/public-home.scss";
import CarouselProduct from "@/components/latest/Slider";

export default function Home() {
  return (
    <section className="home">
      <div className="container">
        <div className="home__main">
          <Carousel />
        </div>
        <div className="home__categories__header">
          <h1 className="home__title__categories">Yangi kelganlar</h1>
        </div>
        <div className="home__main">
          <CarouselProduct />
        </div>
        <div className="home__categories__header">
          <h1 className="home__title__categories">Mahsulotlar kategoriyasi</h1>
        </div>
        <div className="home__categories">
          <CategoryRow />
        </div>
      </div>
    </section>
  );
}
