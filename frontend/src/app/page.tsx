"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import MainLayout from "../components/layouts/main";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStore } from "../store/store";

const categories = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports",
  "Books",
];

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { addToCart } = useStore();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products?limit=10&page=${page}`
      );
      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      toast.error(
        "Failed to fetch products. Please try again. Error: " + `${error}`
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCategoryChange = (index: number) => {
    setSelectedCategory(index);
    setProducts([]);
    setPage(1);
    fetchProducts();
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <MainLayout>
      <ToastContainer />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          {/* <h2 className="text-2xl font-bold text-primary mb-4 text-center">Categories</h2> */}
          <div className="relative">
            {/* Mobile Carousel */}
            <div className="md:hidden overflow-x-auto flex items-center space-x-2 pb-2 px-4">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-3 py-2 text-sm rounded-full whitespace-nowrap flex-shrink-0 ${
                    selectedCategory === index
                      ? "bg-primary text-secondary"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => handleCategoryChange(index)}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Desktop Centered List */}
            <div className="hidden md:flex justify-center items-center space-x-4">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 text-base rounded-full ${
                    selectedCategory === index
                      ? "bg-primary text-secondary"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => handleCategoryChange(index)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg overflow-hidden shadow-md flex flex-col"
                >
                  <div className="relative w-full h-36 sm:h-48">
                    <Image
                      src={product.image}
                      alt={product.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-2 sm:p-4 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm sm:text-lg font-semibold  mb-1 sm:mb-2 truncate">
                        {product.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex flex-col mt-auto">
                      <span className="text-sm sm:text-lg font-bold text-secondary truncate mb-2">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-secondary text-white/80 text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 rounded hover:bg-secondary transition-colors w-full"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {loading && (
          <div className="flex justify-center items-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}

        {!loading && (
          <div className="mt-8 text-center">
            <button
              onClick={fetchProducts}
              className="bg-secondary text-white px-6 py-3 rounded-full hover:bg-primary transition-colors"
            >
              Load More Products
            </button>
          </div>
        )}
      </main>
    </MainLayout>
  );
}
