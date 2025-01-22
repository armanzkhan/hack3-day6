import React from "react";
import ProductDetail from "./ProductDetail";
import { client } from "@/sanity/lib/client";
import { Product } from "@/app/types/Types";

// Define the shape of the product that will be fetched
interface Products {
  _id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  tags: string[];
  image: string;
  description: string;
  available: boolean;
}

// Fetch product by ID
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

// Adjusting the Props type to match Next.js requirements
interface PageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const product = await getProduct(params.id);

  // Handle case where product is not found
  if (!product) {
    return <p>Product not found</p>;
  }

  // Pass the fetched product to ProductDetail
  return <ProductDetail product={product} />;
};

export default Page;
