import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ReceiptLongSharpIcon from '@mui/icons-material/ReceiptLongSharp';
import { RAZORPAY_PUBLIC_KEY } from '../../../../config/config';
const axios = require('axios');

const Payment_Form = ({ back, token, userData, payment_success, next }) => {

    const subtitleStyle = {
        fontWeight: 'bold',
        fontFamily: 'monospace',
        alignSelf: 'flex-start',
        fontSize: '16px',
        marginBottom: '5px'
    }

    const buttonDivStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    }

    const ListItem = ({ primaryText, subtext, secondaryText }) => {
        return <>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', flexFlow: 'column', width: '48%' }}>
                    <Typography>{primaryText}</Typography>
                    <Typography variant="subtitle2">{subtext}</Typography>
                </div>
                {secondaryText}
            </div>
            <br />
        </>;
    }

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }


    const initiatePayment = async () => {
        try {
            await loadScript("https://checkout.razorpay.com/v1/checkout.js");

            const response = await axios.post('/generate-order', { token, userData });

            if (response) {
                const { amount, id, currency, notes } = response.data;
                const { name, email } = notes;

                const options = {
                    key: RAZORPAY_PUBLIC_KEY, 
                    amount: amount.toString(),
                    currency: currency,
                    name: "Harshit_Gupta@ReactKART",
                    description: "e-commerce",
                    image: 'https://media-exp1.licdn.com/dms/image/C5603AQHz2Rsw_8bxxg/profile-displayphoto-shrink_200_200/0/1643182965623?e=1651708800&v=beta&t=BnkR62ITT4Z8fxb2xwkcVUGU_95ojmojNXKXs3FJEAI',
                    order_id: id,
                    handler: async function (response) {
                        const data = {
                            orderCreationId: id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaySignature: response.razorpay_signature,
                        };

                        if(data.razorpaySignature) { payment_success(true); }
                        next();
                    },
                    prefill: {
                        name: name,
                        email: email
                    },
                    notes: {
                        address: "ReactKART Corporate Office",
                    },
                    theme: {
                        color: "#14c75e",
                        backdrop_color: "#000000cc" 
                    },
                };
        
                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            }

            
        } catch (err) {
            window.alert(err.response.statusText);
        }

    }

    return <div style={{ padding: '0 20px', display: 'flex', flexFlow: 'column', width: '100%' }}>
        <span style={subtitleStyle}>Order Summary</span>
        <hr />
        <br />
        {
            token.live.line_items.map((item) => {
                return <ListItem key={item.product_id} primaryText={item.product_name} subtext={item.quantity} secondaryText={`${item.price.formatted_with_symbol} x ${item.quantity} =  ${item.line_total.formatted_with_code}`} />
            })
        }

        <div style={buttonDivStyle}>
            <Button variant="outlined" color="error" onClick={back}>Previous</Button>
            <Button variant="outlined" className="lastButtonMargin" onClick={async() => { initiatePayment(); }}>Pay {token.live.subtotal.formatted_with_symbol}  <ReceiptLongSharpIcon /></Button>
        </div>
    </div >;
}

export default Payment_Form;