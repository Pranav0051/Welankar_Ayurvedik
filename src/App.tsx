import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { CartItem, Product } from "./data/products";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatbotWidget from "./components/ChatbotWidget";
import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import AdminLayout from "./pages/admin/AdminLayout";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("ayurveda_cart_v2");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("ayurveda_cart_v2", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, qty: i.qty + quantity } : i
        );
      }
      return [...prev, { product, qty: quantity }];
    });
  };

  const updateQty = (productId: number, qty: number) => {
    if (qty <= 0) {
      setCartItems(prev => prev.filter(i => i.product.id !== productId));
    } else {
      setCartItems(prev =>
        prev.map(i => (i.product.id === productId ? { ...i, qty } : i))
      );
    }
  };

  const removeItem = (productId: number) => {
    setCartItems(prev => prev.filter(i => i.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar cartItems={cartItems} />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home onAddToCart={addItem} />} />
            <Route
              path="/products"
              element={<ProductListing onAddToCart={addItem} />}
            />
            <Route
              path="/products/:slug"
              element={<ProductDetail onAddToCart={addItem} />}
            />
            <Route
              path="/cart"
              element={
                <Cart
                  items={cartItems}
                  onUpdateQty={updateQty}
                  onRemove={removeItem}
                  onClearCart={clearCart}
                />
              }
            />
            <Route path="/admin/*" element={<AdminLayout />} />
          </Routes>
        </div>
        <Footer />
        <ChatbotWidget onAddToCart={addItem} />
      </div>
    </BrowserRouter>
  );
}
