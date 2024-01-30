// react router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


// context provider
import CartProvider from "./context/CartProvider";
// layout
import RootLayout from "./layout/RootLayout";
// pages
import Home from "./pages/Home";
import ExploreProduct from "./pages/ExploreProducts";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";

// react toast
import { Toaster } from "react-hot-toast";

const router = (
  <Routes>
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="explore/:category" element={<ExploreProduct />} />
      <Route path="product/:productId" element={<Product />} />
      <Route path="checkout" element={<Checkout />} />
    </Route>
  </Routes>
);

function App() {
  return (
    <>
      <CartProvider>
      <Router>{router}</Router>
        <Toaster
         reverseOrder={false} 
          toastOptions={{
            style: {
              padding: "16px",
              fontSize: "1.6rem",
            },
           duration: 5000,
          }}
        />
      </CartProvider>
    </>
  );
}

export default App;
