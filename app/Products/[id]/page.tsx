import React from "react";
import ProductDetail from "./ProductDetail";
import { client } from "@/sanity/lib/client";
import { Product } from "@/app/types/Types";

// Fetch product by ID directly within the component
const getProduct = async (id: string): Promise<Product | null> => {
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
  params: { id: string }; // Params are passed from the URL
}

const Page = async ({ params }: Props) => {
  const product = await getProduct(params.id); // Fetch product data based on ID

  // Handle case where product is not found
  if (!product) {
    return <p>Product not found</p>;
  }

  // Pass the fetched product to ProductDetail
  return <ProductDetail product={product} />;
};

export default Page;
