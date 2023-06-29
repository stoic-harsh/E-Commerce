import { ProductGrid, CartGrid, Navbar, Checkout } from './components/index';

import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { fetchProducts, fetchCart } from './functions/index';

import './App.css';


export default function App() {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts(setProducts, setLoading);
        fetchCart(setCart, setLoading);
    }, []);

    return <BrowserRouter>

            <Navbar cart={cart} />

            <Routes>
                <Route path='/' element={<ProductGrid items={products} isLoading={loading} setLoading={setLoading} setCart={setCart} />} />
                <Route path='/cart' element={<CartGrid cart={cart} setCart={setCart} isLoading={loading} setLoading={setLoading}/>} />
                <Route path='/checkout' element={<Checkout cart={cart} isLoading={loading} setLoading={setLoading}/>} />
            </Routes>

    </BrowserRouter>;
}