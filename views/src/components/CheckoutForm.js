import {useState} from "react";
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js"
import {useStore} from "../App";
import axios from "axios";

export default function CheckoutForm(props) {
    const stripe = useStripe();
    const elements = useElements();
    // const promise = useStore((state) => (state.stripe))
    const [isPaymentLoading, setPaymentLoading] = useState(false);

    const setSuccess = useStore((state) => state.setSuccess);
    const setError = useStore((state) => state.setError);

    const completeOrder = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setPaymentLoading(true);
        // const clientSecret = getClientSecret();
        setSuccess(true)
        const paymentResult = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment/${props.amount}`,
            }
        })
        .then((response) =>{
            console.log(response)
            if (response.error){
                setError(paymentResult.error.message);
            } else if (response.paymentIntent.status === "requires_payment_method"){
                axios
                    .patch('http://localhost:3000/charge/success', {
                        charge: props.amount
                    })
                    .then(() => {
                        window.location.reload()
                    })
            }
        })
        setPaymentLoading(false);
    };

    return (
        <form onSubmit={completeOrder}>
            <PaymentElement/>
            <button disabled={isPaymentLoading}>
                <span >
                    {isPaymentLoading ? "Αποστολή..." : "Υποβολή"}
                </span>
            </button>

        </form>
    );
}