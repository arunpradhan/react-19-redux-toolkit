import * as yup from 'yup' 

export const registerSchema = yup.object({
    fullName: yup
    .string()
    .required("Please provide your Full Name"),

    email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

    cardNumber: yup
    .string()
    // .matches(/^\d{16}$/, "Card Number must be 16 digits") // for card number like 1234567890123456
    .matches(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, "Card number must be 16 digits and in format 1234 5678 9012 3456") // for card number like 1234 5678 9012 3456
    .required("Please Provide the Card Number"),

    expiryDate: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry Date must be MM/YY")
    .required("Please provide Expiry Date"),

    cvvNumber: yup
    .string()
    .matches(/^\d{3}$/, "CVV must be exactly 3 digits")
    .required("Please provide CVV Number")
})