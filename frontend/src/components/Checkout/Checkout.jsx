import Stepper from './Stepper';
import { Paper, Typography, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { generateCheckoutToken } from '../../functions/index';
import Loader from '../Loader/Loader';

import { AddressForm, PaymentForm, ConfirmationPage } from './Forms/index';
import './Checkout.css';

const Checkout = ({ cart, isLoading, setLoading }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [token, setToken] = useState(null);
    const [shippingData, setshippingData] = useState({});
    const [paymentSuccess, setPaymentSuccess] = useState(false);


    const next = () => {
        setActiveStep(activeStep + 1);
    }
    const back = () => {
        setActiveStep(activeStep - 1);
    }

    useEffect(() => {
        if (cart.id !== undefined) generateCheckoutToken(cart.id, setToken, setLoading)
    }, [cart]);


    return (isLoading) ? <Loader /> : (<>
        <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '7px' }}>Checkout Form</Typography>
        <Grid container padding={3}>
            <Grid item xs={12} className="grid">
                <Paper elevation={10} className="paperStyle">
                    <Typography sx={{textAlign: 'center', fontSize: '10px'}}>Demo razorpay card is 4111 1111 1111 1111. <br/>Expiry date is any future instance. CVV is any 3-digit number<br/>If OTP is not sent on mobile number, enter any 6 digit number for above card details</Typography>
                    <br /><br />
                    <Stepper activeStep={activeStep} />
                    <br />
                    {activeStep === 0 && <AddressForm next={next} shippingData={setshippingData} />}
                    {activeStep === 1 && token && <PaymentForm token={token} back={back} next={next} userData={shippingData} payment_success={setPaymentSuccess} />}
                    {activeStep === 2 && <ConfirmationPage payment_success={paymentSuccess} />}
                </Paper>
            </Grid>
        </Grid>
    </>
    )
}

export default Checkout;