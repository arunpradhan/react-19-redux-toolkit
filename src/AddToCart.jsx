import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearAllItem } from './redux/slice';

function AddToCart() {
    const dispatch = useDispatch();

    // Used for Single Item
    // const selector = useSelector((state) => state.cart.value);
    // console.log("selector", selector);
    // return <button className="cart-btn">Cart ({selector})</button>;

    // Used for Multiple Items
    const cartSelector = useSelector((state) => state.cart.items);
    // console.log("cartSelector", cartSelector.length);


    return (
        <div>
            <button className="cart-btn" onClick={() => dispatch(clearAllItem())} style={{ marginRight: '5px' }}>Clear Cart</button>
            <Link to="/cart">
                <button className="cart-btn">Cart ({cartSelector.length ? cartSelector.length : 0})</button>
            </Link>
        </div>
    )

}
export default AddToCart