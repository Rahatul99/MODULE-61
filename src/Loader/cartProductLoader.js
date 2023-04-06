import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async() =>{
    const loadedProducts = await fetch('products.json');
    const products = await loadedProducts.json();


    //if cart data is in database, you have to use async await


    //here iam getting data from db
    const storedCart = getShoppingCart();
    console.log(storedCart);
    const saveCart = [];

    for(const id in storedCart){
        const addedProduct = products.find(pd => pd.id === id);
        if(addedProduct){
            // console.log('here is it', storedCart[id])
            const quantity = storedCart[id];
            addedProduct.quantity = quantity; 
            saveCart.push(addedProduct);
        }
    }

    return saveCart;
}

export default cartProductsLoader