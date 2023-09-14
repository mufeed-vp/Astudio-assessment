import React from 'react';
import User from "./pages/User";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Product from "./pages/Product"
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<User />} />
       <Route path="/product" element={<Product />} />
      {/*<Route path="*" element={<NoPage />} /> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
