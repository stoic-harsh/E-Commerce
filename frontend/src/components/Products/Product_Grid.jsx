import ProductCard from './Product_Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Loader from '../Loader/Loader';

const Product_Grid = ({ items, isLoading, setCart, setLoading })=>{


    return (isLoading) ? <Loader /> : (
        <>
        <Typography variant="h4" sx={{textAlign: 'center', marginTop: '7px'}}>Products</Typography>
        <Grid container spacing={2} padding={3}>
    {
    items.map((item)=>{
        return <Grid key={item.id} item xs={12} sm={6} md={4} lg={3} xl={3} sx={{ display: 'flex' }}>
            <ProductCard item={item} setCart={setCart} setLoading={setLoading}/>
        </Grid>
    })
    }
    
</Grid>
</>
    )

}

export default Product_Grid;