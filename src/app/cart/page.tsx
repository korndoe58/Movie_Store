"use client";
import { useCartStore } from "@/utils/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CountdownPopup from "../components/Countdown";

const CartPage = () => {
  const { products, totalItems, totalPrice, removeFromCart,clearFromCart } = useCartStore();
  const [popupVisible, setPopupVisible] = useState(false);

  const handleCheckout = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleClearCart = () => {
    clearFromCart();
  };

  

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);



  return (
    <div className="h-[calc(100vh-6rem)] bg-black md:h-[calc(100vh)] flex flex-col text-white lg:flex-row">
      {/* PRODUCTS CONTAINER */}
      <div className="h-1/2 p-4 flex flex-col justify-center  lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        {/* SINGLE ITEM */}
        {products.map((item) => (
          <div className="flex items-center justify-between mb-4 p-4 bg-white/20 rounded-lg " key={item.id}>
            <div className="">
              <div className="uppercase flex gap-6  text-xl font-bold">
                <div>{item.title}</div> 
                <div className="">x{item.quantity}</div>
              </div>
              <span>{item.optionTitle}</span>
            </div >
            <div className="flex gap-4">
                <h2 className="font-bold ">${item.price}</h2>
                <span
                  className="cursor-pointer"
                  onClick={() => removeFromCart(item)}
                >
                  X
                </span>
            </div>
            
            
          </div>
        ))}
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 p-4 bg-black text-white flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Subtotal ({totalItems} items)</span>
          <span className="">${totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Discount</span>
          <span className="text-green-500">
            {totalItems >= 5 ? '20%' :
            totalItems >= 3 ? ' 10%' :
            'No Discount'
            }
            </span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">TOTAL(INCL. VAT)</span>
          <span className="font-bold">
            {totalItems >= 5 ? totalPrice * 0.80 :
            totalItems >= 3 ? totalPrice * 0.90 :
            totalPrice
            }
            </span>
        </div>
        
        <div className="flex justify-between items-center">
            <Link className="bg-white/30 hover:bg-black/50 text-white p-[.9rem] rounded-md w-max uppercase " href={'/'}>Shop More</Link>
            {/* Add a button to clear the cart */}
            <button className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-md" onClick={handleClearCart}>
            CLEAR CART
            </button>

            <button
              className=" bg-white/30  hover:bg-black/50 w-max text-white p-3 rounded-md "
              onClick={handleCheckout}
            >
              CHECKOUT
            </button>
        </div>
        <div className="flex justify-center">{popupVisible && <CountdownPopup onClose={handleClosePopup} />}</div>

      </div>
    </div>
  );
};

export default CartPage;