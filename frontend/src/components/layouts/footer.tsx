import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-secondary">About Us</h3>
            <p className="text-sm">Gloval is your go-to store for all your needs. We offer a wide range of products at competitive prices.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-secondary">Customer Service</h3>
            <ul className="text-sm">
              <li className="mb-2"><Link href="/contact" className="hover:text-secondary">Contact Us</Link></li>
              <li className="mb-2"><Link href="/faq" className="hover:text-secondary">FAQ</Link></li>
              <li className="mb-2"><Link href="/shipping" className="hover:text-secondary">Shipping Information</Link></li>
              <li className="mb-2"><Link href="/returns" className="hover:text-secondary">Returns & Exchanges</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-secondary">Quick Links</h3>
            <ul className="text-sm">
              <li className="mb-2"><Link href="/products" className="hover:text-secondary">All Products</Link></li>
              <li className="mb-2"><Link href="/categories" className="hover:text-secondary">Categories</Link></li>
              <li className="mb-2"><Link href="/deals" className="hover:text-secondary">Special Deals</Link></li>
              <li className="mb-2"><Link href="/blog" className="hover:text-secondary">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-secondary">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter for updates and exclusive offers.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button
                type="submit"
                className="bg-primary text-secondary px-4 py-2 text-sm rounded-r-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Gloval. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



