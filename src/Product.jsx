import { useDispatch, useSelector } from 'react-redux';

import { addItem, removeItem } from './redux/slice';
import { useEffect } from 'react';
import { fetchProducts } from './redux/productSlice';

function Product() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    const productList = useSelector((state) => state.products.items)
    console.log(productList);

    const cartSelector = useSelector((state) => state.cart.items);
    console.log("cartSelector", cartSelector.length);

    return (
        <>
            <h1>Products List</h1>
            <div className="grid">
                {
                    productList.length && productList.map((item) => (
                        <div className='card' key={item.id}>
                            <img src={item.thumbnail} />
                            <div className='content'>
                                <div className='title'>{item.title}</div>
                                <div className='brand'>{item.brand}</div>
                                <div className='price'>{item.price}</div>
                                <div>
                                    {
                                        cartSelector.find(cartItem => cartItem.id === item.id) ?
                                            <button onClick={() => dispatch(removeItem(item))} className='button-remove'>Remove From Cart</button>
                                            :
                                            <button onClick={() => dispatch(addItem(item))}>Add To Cart</button>
                                    }

                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
}
export default Product