// Add the "use client" directive to mark this as a client-side component
"use client";

import React, { useEffect, useState } from "react";
import ProductDetail from "./ProductDetail";
import { client } from "@/sanity/lib/client";
import { Product } from "@/app/types/Types";
import { useRouter } from "next/router";

// Manually type the PageProps for the dynamic route
interface PageProps {
  params: Promise<{ id: string }>
}

// Function to fetch the product based on ID
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

// Page component for displaying a product's details
const Page = ({params}) => {

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    
    const fetchProduct = async () => {
      const fetchedProduct = await getProduct(params.id);
      setProduct(fetchedProduct);
    };

    fetchProduct();
  }, [params.id]);

  // Render loading state or product details
  if (!product) {
    return <p>Loading...</p>;
  }

  return <ProductDetail product={product} />;
};

export default Page;
