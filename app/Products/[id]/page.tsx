import React from "react";
import ProductDetail from "./ProductDetail";
import { client } from "@/sanity/lib/client";

const getProduct = async (id: string) => {
  const product = await client.fetch(
    `*[_type == "food" && _id == $id][0]{
        _id,
        name,
        category,
        price,
        originalPrice,
        tags,
        "image": image.asset->url,
        description,
        available
      }`,
    { id }
  );
  return product;
};

interface Props {
  params: {
    id: string;
  };
}

const Page = async ({ params }: Props) => {
  const product = await getProduct(params.id);

  if (!product) {
    return <p>Product not found</p>;
  }

  return <ProductDetail product={product} />;
};

export default Page;

