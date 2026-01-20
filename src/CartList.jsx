import { useSelector, useDispatch } from "react-redux";
import { removeItem } from './redux/slice';
import { useEffect, useState } from "react";
import './cartlist.css'
import PaymentCard from "./PaymentCard";

function CartList() {
    const cartSelector = useSelector((state) => state.cart.items);
    console.log("cartSelector", cartSelector);

    const [cartItems, setCartItems] = useState(cartSelector);
    const dispatch = useDispatch();

    const [showCheckout, setShowCheckout] = useState(false);

    useEffect(() => {
        setCartItems(cartSelector)
    },[cartSelector])

    const manageQuantity = (id, q) => {
        console.log("manageQuantity", id, q);
        let quantity = parseInt(q) > 1 ? parseInt(q) : 1
        const cartTempItems = cartSelector.map((item) => {
            return item.id === id ?
                { ...item, quantity } : item
        })
        // check cart array 1st item  
        // console.log(cartTempItems[0]);

        setCartItems(cartTempItems)
    }

    const handleCheckout = () => {
        console.log("checkout");
        setShowCheckout(true)
    }
    
    return (
        <div className="container">
            <div className="cart">
                <h1>Cart Page</h1>
                {
                    cartItems.length > 0 ? cartItems.map((itm) => (
                        <div className="cart-item" key={itm.id}>
                            <img src={itm.thumbnail} style={{ width: '33%' }} alt={itm.title} />
                            <div className="item-details">
                                <h3>{itm.title}</h3>
                                <p>${(itm.quantity ? itm.price * itm.quantity : itm.price).toFixed(2)}</p>
                            </div>
                            <div className="quantity-controls">
                                <input onChange={(e) => manageQuantity(itm.id, e.target.value)} type="number" min="1" max="10" defaultValue="1" style={{ marginRight: '5px' }} />
                            </div>
                            {
                                showCheckout != true ?
                                <button onClick={() => dispatch(removeItem(itm))} className='remove-btn'>Remove</button>
                                : null
                            }
                        </div>
                    )) : null
                }

                <div className="total">
                    <p>Total Item: <span id="total">{cartItems.length}</span></p>
                    <p>Total: $<span id="total">{(cartItems.reduce((sum, items) => items.quantity ? sum + items.price * items.quantity : sum + items.price, 0)).toFixed(2)}</span></p>
                </div>
                
                {
                    showCheckout != true ? <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button> : null
                }
            </div>
            <div className="payment" style={{border: showCheckout === true ? '1px solid #ddd' : 'none'}}>
                {
                    showCheckout === true ? <PaymentCard/> : null
                }
                
            </div>

        </div>
    )
}
export default CartList;