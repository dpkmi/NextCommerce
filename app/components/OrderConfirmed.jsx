"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import dancing from "@/public/dancing.gif";
import Link from "next/link";
import { useCartStore } from "@/store";
import { useEffect } from "react";

export default function OrderConfirmed() {
  const cartStore = useCartStore();

  useEffect(() => {
    cartStore.setPaymentIntent("");
    cartStore.clearCart();
  }, []);

  const handleCheckoutOrder = () => {
    setTimeout(() => {
      cartStore.setCheckout("cart");
    }, 1000);
    cartStore.toggleCart();
  };

  return (
    <motion.div
      className="flex items-center justify-center my-12 flex-col"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="p-12 rounded-md text-center">
        <h1 className="font-2xl text-3xl pb-3">Your order has been placed</h1>
        <h2>Check your email for the receipt</h2>
        <Image
          src={dancing}
          alt="Order confirmed width={400} height={400}"
          className="py-8"
        />
      </div>
      <div className="flex flex-col gap-4">
        <Link href={"/dashboard"}>
          <button
            onClick={handleCheckoutOrder}
            className="font-medium bg-teal-600 text-white px-6 py-2 rounded-md"
          >
            Check your Order
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
