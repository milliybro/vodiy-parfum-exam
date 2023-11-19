import { request } from "@/server/request";
import DynamicMetaData from "@/types/metaData";

import "./style.scss";
import Image from "next/image";
import Link from "next/link";
import AddButton from '../../../../components/button/AddButton';

export async function generateMetadata({ params, searchParams }: DynamicMetaData) {
  const { productId } = params;
  const {data} = await request.get(`product/${productId}`)
  return {
    title: data.title,
    description: data.description,
  };
}

const ProductPage = async ({
  params,
}: {
  params: { productId: string }
}) => {
  const {productId} = params;
  const {data: product} = await request.get(`product/${productId}`)
  const {data: category} = await request.get(`category/${product.category}`)

  return <section className="oneproduct">
    <div className="container">

    <div className="oneproduct__main">
      <div style={{marginBottom: "10px"}} className="links">
      <Link href="/">Bosh sahifa</Link> <span>/ </span>
    <Link href={`/allcategories/${category._id}`}>{category.name}</Link> <span>/ </span>
    <Link href="">{product.title}</Link>


      </div>

      <div className="product__row">
        <div className="oneproduct__product__img">
          <Image src={product.image.url} alt={product.title} fill />
        </div>
        <div className="product__content">
          <h3>{product.title}</h3>
          <p>Miqdor:</p>
          <p><span>{product.sold}</span></p>
          <p style={{color: "green"}}>Sotuvda <span>{product.quantity}</span> dona bor</p>
          <p>Narx:</p>
          <p style={{display: "flex", gap: "15px", alignItems: "center"}}><span>{product.price} so`m</span>  <span style={{fontSize: "14px"}} className="price-line">{product.price +9500}  so`m </span></p>
          <AddButton {...product}/>
          <p>Mahsulot haqida qisqacha:</p>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
    </div>
  </section>;
};

export default ProductPage;
