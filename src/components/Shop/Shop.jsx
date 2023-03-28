import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);

    //to take all data that recived by handleAddToCart(event handler)..we need a state here 
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data=> setProducts(data))
    }, []);


    // to get previously stored cart
    useEffect( ()=>{
        const storedCart = getShoppingCart()
        console.log(storedCart)
    },[])

    //handler comes from product jsx cause of react's uni directional behaviour i cant set value from a lower componnet to upper componnet..2.cart(previously added).product newly added.

    const handleAddToCart = (product) =>{
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id)
        // getShoppingCart()
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product product={product} 
                                                     key={product.id}
                                                     handleAddToCart={handleAddToCart}
                                                     >

                                            </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;