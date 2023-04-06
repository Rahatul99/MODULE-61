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
        // console.log(products);//i can set anything from sate here
        const storedCart = getShoppingCart();
        const savedCart = [];
        //step 1: get id
        for(const id in storedCart){
            // step 2 get the product by using id
            const addedProduct = products.find(product => product.id === id);

            if(addedProduct){
                //step 3: get quantity of the product
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                //step 4:add the added to the saved cart
                savedCart.push(addedProduct);
            }
            // console.log(addedProduct);
            //step 3: get quantity of the product
            // const quantity = storedCart[id];
            // addedProduct.quantity = quantity;
        }
        //step 5:set the cart
        setCart(savedCart);
    },[products]);




    //handler comes from product jsx cause of react's uni directional behaviour i cant set value from a lower componnet to upper componnet..2.cart(previously added).product newly added.

    const handleAddToCart = (product) =>{
        // const newCart = [...cart, product];

        let newCart = [];
        //if product doesnt exist in the cart, then set quantity =1;
        //if exist update quantity by 1
        const exists = cart.find(pd =>pd.id === product.id);
        if(!exists){
            product.quantity =1;
            newCart = [...cart, product]
        }
        else{
            exists.quantity = exists.quantity + 1;
            const remaning = cart.filter(pd=>pd.id !== product.id);
            newCart = [...remaning, exists]
        }


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