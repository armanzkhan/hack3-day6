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

import { NextPage } from "next";

// Define the PageProps type that reflects the dynamic route's params
interface PageProps {
  params: {
    id: string;
  };
}

const Page: NextPage<PageProps> = ({ params }) => {
  // Fetch the product in the component using the params
  const [product, setProduct] = React.useState<Product | null>(null);

  React.useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProduct(params.id);
      setProduct(fetchedProduct);
    };

    fetchProduct();
  }, [params.id]);

  // Handle loading or when product is not found
  if (!product) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  // Pass the fetched product to ProductDetail
  return <ProductDetail product={product} />;
};

export default Page;
