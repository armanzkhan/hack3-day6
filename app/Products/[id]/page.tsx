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

interface Props {
  product: Product;  // The product will be passed to the page as a prop
}

// Page component that will display the product details
const Page = ({ product }: Props) => {
  // Handle case where product is not found
  if (!product) {
    return <p>Product not found</p>;
  }

  // Pass the fetched product to ProductDetail
  return <ProductDetail product={product} />;
};

export default Page;

// getServerSideProps to fetch product data on the server side
export const getServerSideProps = async (context: { params: { id: string } }) => {
  const { id } = context.params;
  
  // Fetch the product using the ID from the URL params
  const product = await getProduct(id);

  // If no product found, return a 404 page
  if (!product) {
    return {
      notFound: true,  // Will show a 404 page if the product is not found
    };
  }

  // If product is found, return it as a prop to the page
  return {
    props: {
      product,  // Pass the product data to the page as a prop
    },
  };
};
