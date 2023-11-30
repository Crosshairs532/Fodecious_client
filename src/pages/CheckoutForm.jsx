/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Axios/useaxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const CheckoutFrom = ({ package_cat }) => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [error, setError] = useState('')
    const stripe = useStripe();
    const { user } = useAuth();
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setclientSecret] = useState('')
    const elements = useElements();
    const package_price = {
        'silver': 70,
        'gold': 80,
        'platinum': 100
    }
    const price = package_price[`${package_cat}`]
    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setclientSecret(res.data.clientSecret)
                })
        }
    }, [price, axiosSecure, package_cat])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card', card
        }
        )
        if (error) {
            console.log('payment error', error);
            setError(error.message)
        }
        else {
            console.log('payment method', paymentMethod);
            setError('')
        }

        // confirm payment
        const { paymentIntent, error: ConfError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'anonymous',
                }
            }
        })
        if (ConfError) {
            console.log('confirmed error', ConfError);
        }
        else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);
                // payment take database e pathabo 
                const payment = {
                    email: user.email,
                    price: package_price[`${package_cat}`],
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    badge: package_cat
                }
                const res = await axiosSecure.post('/payments', payment)
                if (res.data.insertedId) {
                    const badge_update = await axiosSecure.patch(`/admin/badge_update`, payment);
                    if (badge_update.data.modifiedCount > 0) {
                        Swal.fire({
                            title: `You have Earned ${package_cat}`,
                            footer: ' you can now Request for Meal',
                            showClass: {
                                popup: `
                                animate__animated
                                animate__fadeInUp
                                animate__faster
                              `
                            },
                            hideClass: {
                                popup: `
                                animate__animated
                                animate__fadeOutDown
                                animate__faster
                              `
                            }
                        });
                    }

                }
            }
        }
    }
    return (
        <div className=' flex justify-center items-center  min-h-[100vh]'>
            <form onSubmit={handleSubmit} className=" bg-f-icon p-6 rounded-md w-[400px] shadow-md  mx-auto">
                <div className="mb-4">
                    <label className="block text-white text-sm font-semibold mb-2">Card Details</label>
                    <CardElement className="w-full p-2 border border-white rounded" options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#FFFF',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }} />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary py-3 w-full"

                >
                    Pay Now
                </button>
                <p>{error}</p>
                <p className="text-red-600">{error}</p>
                {transactionId && <p className=" text-f-green"> Your transaction id: {transactionId}</p>}
            </form>


        </div>
    );
};

export default CheckoutFrom;