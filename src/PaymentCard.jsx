import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { clearAllItem } from './redux/slice';

// Connect React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./validation/registerSchema";

export default function PaymentCard() {
    const dispatch = useDispatch();
    const redirect = useNavigate();
    // function handlePayNow() {
    //     dispatch(clearAllItem())
    //     console.log("Order Placed!")
    //     redirect("/product-list")
    // }

    // initialize Form
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    });
    const onSubmit = (data) => {
        console.log("Form Data:", data);
        dispatch(clearAllItem())
        alert("Order Placed! Successfully")
        redirect("/product-list")
    };

    const handleCardNumber = (val) => {
        console.log(val);
        return val
            .replace(/\D/g, "")      // remove non-digits
            .replace(/(.{4})/g, "$1 ")
            .trim();
    }

    return (
        <>
            <h2>Payment Details</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" {...register("fullName")} placeholder="John Doe" />
                    {errors.fullName && <p className="error">{errors.fullName.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" {...register("email")} placeholder="john@example.com" />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input type="text" {...register("cardNumber", { onChange: (e) => { e.target.value = handleCardNumber(e.target.value); } })} placeholder="1234 5678 9012 3456" maxLength={19} />
                    {errors.cardNumber && <p className="error">{errors.cardNumber.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input type="text" {...register("expiryDate")} placeholder="MM/YY" />
                    {errors.expiryDate && <p className="error">{errors.expiryDate.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="cvvNumber">CVV</label>
                    <input type="text" {...register("cvvNumber")} placeholder="123" maxLength={3}/>
                    {errors.cvvNumber && <p className="error">{errors.cvvNumber.message}</p>}
                </div>
                {/* <button className="pay-btn" onClick={handlePayNow}>Pay Now</button> */}
                <button type="submit" className="pay-btn">Register & Pay Now</button>
            </form>
        </>
    )
}