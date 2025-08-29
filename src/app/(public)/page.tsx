"use client";
import Banner from "@/temp/banner";

import { API_ENDPOINTS } from "@/lib";
import { useGet } from "@/hooks";

export interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

export interface Cart {
  id: number;
  products: Product[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface CartResponse {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

export default function PublicHomePage() {
  const { data, loading } = useGet<CartResponse>(API_ENDPOINTS.TEMP.CARTS, {
    onSuccess: async (data) => {
      console.log("RESPONSE inline => ", data);
    },
  });

  console.log("data outline => ", data);
  console.log("loading outline => ", loading);

  return (
    <div>
      <Banner />
    </div>
  );
}
