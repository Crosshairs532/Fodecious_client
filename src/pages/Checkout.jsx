import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../pages/CheckoutForm'
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT}`);
const Checkout = () => {
    const param = useParams();
    console.log(param.package_cat);
    return (
        <div className=" px-11">
            <div>

            </div>
            <div>
                <Elements
                    stripe={stripePromise}>
                    <CheckoutForm package_cat={param.package_cat} ></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};
export default Checkout;