"use client";
import React from 'react';
import MainLayout from '../../components/layouts/main';
import Image from 'next/image';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Product, useStore } from '../../store/store';

const Cart: React.FC = () => {
  const { items: cartItems, addToCart, removeFromCart } = useStore();

  const updateQuantity = (id: number, newQuantity: number) => {
    const item = cartItems.find((item:Partial<any>) => item.id === id);
    if (item) {
      if (newQuantity > item.quantity) {
        addToCart(item as Product );
      } else if (newQuantity < item.quantity) {
        removeFromCart(id);
      }
    }
  };

  const removeItem = (id: number) => {
    if (cartItems.find((item:Partial<any>) => item.id === id)) {
      removeFromCart(id);
    }
  };

  const total = cartItems.reduce((sum:number, item:Partial<any>) => sum + item.price * item.quantity, 0);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-secondary">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center border-b border-gray-200 py-4">
                  <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                    <Image src={item.image || 'https://placehold.co/400x400'} alt={item.title} width={96} height={96} className="object-cover" />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h2 className="text-lg font-semibold ">{item.title}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button 
                        className="text-secondary hover:text-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button 
                        className="text-secondary hover:text-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button 
                    className="ml-4 text-red-500 hover:text-red-700"
                    onClick={() => removeItem(item.id)}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="md:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4 text-secondary">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>$5.00</span>
                </div>
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">${(total + 5).toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full bg-secondary text-white py-2 px-4 rounded-md mt-6 hover:bg-secondary transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Cart;
