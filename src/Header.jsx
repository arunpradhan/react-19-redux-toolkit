import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

function Header() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/product-list">Product List</Link></li>                
            </ul>
            <AddToCart/>
        </nav>

    );
}

export default Header;