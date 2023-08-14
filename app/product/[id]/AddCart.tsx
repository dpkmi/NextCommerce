"use client";

import { useCartStore } from "@/store";
import { AddCartType } from "@/types/AddCartType";
import { useState } from "react";

export default function AddCart({
  name,
  image,
  unit_amount,
  id,
  quantity,
}: AddCartType) {
  const cartStore = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    cartStore.addProduct({ id, name, unit_amount, image, quantity });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={added}
        className=" my-4 btn btn-primary w-full"
      >
        {!added && <span>Add to cart</span>}
        {added && <span>Adding to cart 😁</span>}
      </button>
    </>
  );
}
