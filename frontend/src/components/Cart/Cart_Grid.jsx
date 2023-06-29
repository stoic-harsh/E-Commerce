import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CartCard from './Cart_Card';
import Loader from '../Loader/Loader';

import { useNavigate } from 'react-router-dom';
import { emptyCart } from '../../functions/index';

const Cart_Grid = ({ cart, setCart, setLoading, isLoading }) => {

    const navigate = useNavigate();

    const Filled_Grid = () => {
        return <>
            <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '7px' }}>Cart</Typography>
            <Grid container spacing={2} padding={3}>
                {
                    cart.line_items.map((item) => {
                        return <Grid key={item.id} item md={12} lg={6} xl={4} style={{ display: 'flex' }}>
                            <CartCard item={item} setCart={setCart} setLoading={setLoading} />
                        </Grid>
                    })
                }
                <Grid item xs={12}>
                    <div style={{ display: 'flex', marginTop: '25px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Subtotal : {cart.subtotal.formatted_with_symbol}
                        </Typography>
                        <div><Button variant="contained" sx={{ backgroundColor: '#ff0065', margin: '10px 0 0 12px' }} onClick={() => {
                            emptyCart(setCart, setLoading);
                        }}>Empty Cart</Button>
                            <Button variant="contained" sx={{ backgroundColor: 'green', margin: '10px 0 0 12px' }} onClick={() => {
                                navigate('/checkout');
                            }}>Checkout</Button></div>
                    </div>
                </Grid>
            </Grid>
        </>
    }


    const Empty_Grid = () => {
        return <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', fontSize: '3.8vw', whiteSpace: 'nowrap' }}>
            Cart is empty !! <br />
            Head to home page to contine shopping
        </div>
    }


    return (isLoading) ? <Loader /> : (
        (cart.line_items !== undefined) && (cart.line_items.length === 0 ? <Empty_Grid /> : <Filled_Grid />)
    )

}

export default Cart_Grid;