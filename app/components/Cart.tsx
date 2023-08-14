"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import formatPrice from "@/util/PriceFormat";
import { IoAddCircle, IoRemove, IoRemoveCircle } from "react-icons/io5";
import basket from "@/public/basket.png";
import { AnimatePresence, motion } from "framer-motion";
import Checkout from "./Checkout";
import OrderConfirmed from "./OrderConfirmed";

export default function Cart() {
  const cartStore = useCartStore();

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);

  return (
    // Background
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0  bg-black/25"
    >
      {/* Cart */}
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        className="bg-base-200 absolute right-0 top-0 h-screen p-12 overflow-y-scroll w-full lg:w-2/5"
      >
        {cartStore.onCheckout === "cart" && (
          <>
            <button
              onClick={() => cartStore.toggleCart()}
              className="txt-sm font-bold pb-12"
            >
              Back to store
            </button>
          </>
        )}

        {cartStore.onCheckout === "checkout" && (
          <>
            <button
              onClick={() => cartStore.setCheckout("cart")}
              className="txt-sm font-bold pb-12"
            >
              Back to cart
            </button>
          </>
        )}

        {/* Cart items */}
        {cartStore.onCheckout === "cart" && (
          <>
            {cartStore.cart.map((item) => (
              <motion.div
                layout
                key={item.id}
                className="flex p-4 gap-4 bg-base-100 my-4 rounded-lg"
              >
                <Image
                  src={item.image}
                  alt="{item.name}"
                  width={100}
                  height={100}
                  className="w-28 h-28 object-cover rounded-md"
                />

                <motion.div layout>
                  <h2>{item.name}</h2>
                  <div className="flex gap-2 items-center">
                    <h2>Aantal: {item.quantity}</h2>
                    <div className="flex items-center text-lg">
                      <button
                        onClick={() =>
                          cartStore.removeProduct({
                            id: item.id,
                            image: item.image,
                            name: item.name,
                            unit_amount: item.unit_amount,
                            quantity: item.quantity,
                          })
                        }
                      >
                        <IoRemoveCircle />
                      </button>
                      <button
                        onClick={() =>
                          cartStore.addProduct({
                            id: item.id,
                            image: item.image,
                            name: item.name,
                            unit_amount: item.unit_amount,
                            quantity: item.quantity,
                          })
                        }
                      >
                        <IoAddCircle />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm">
                    {item.unit_amount && formatPrice(item.unit_amount)}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </>
        )}
        {/* Checkout and total */}
        {cartStore.cart.length > 0 && cartStore.onCheckout === "cart" ? (
          <motion.div layout>
            <p>Total: {formatPrice(totalPrice)} </p>

            <button
              onClick={() => cartStore.setCheckout("checkout")}
              className="py-2 mt-4 bg-primary text-white rounded-md w-full"
            >
              Check out
            </button>
          </motion.div>
        ) : null}
        {/* Checkout form */}
        {cartStore.onCheckout === "checkout" && <Checkout />}
        {cartStore.onCheckout === "success" && <OrderConfirmed />}
        <AnimatePresence>
          {!cartStore.cart.length && cartStore.onCheckout === "cart" && (
            <motion.div
              animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              className="flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75"
            >
              <h1>Uh ohhh... it's empty 🥲</h1>
              <Image src={basket} alt="empty cart" width={200} height={200} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
