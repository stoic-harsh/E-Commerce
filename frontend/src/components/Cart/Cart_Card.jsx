import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { AddCircleTwoTone, RemoveCircleTwoTone, RemoveShoppingCartOutlined } from '@mui/icons-material';
import { updateCart, removeFromCart } from '../../functions/index';

export default function Cart_Card({ item, setCart, setLoading }) {

  return (
    <Card sx={{ display: 'flex', boxShadow: '0 0 8px rgba(0,0,0,0.55)', width: '100%' }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={item.image.url}
        alt="product_img"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {item.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {item.price.formatted_with_code}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous" onClick={() => {
            updateCart(item.id, item.quantity - 1, setCart);
          }}>
            <RemoveCircleTwoTone sx={{ color: 'rgb(0,0,0)' }} />
          </IconButton>
          <Typography variant="h6" sx={{ margin: '0 8px' }}>
            {item.quantity}
          </Typography>
          <IconButton aria-label="next" onClick={() => {
            updateCart(item.id, item.quantity + 1, setCart, setLoading);
          }}>
            <AddCircleTwoTone sx={{ color: 'rgb(0,0,0)' }} />
          </IconButton>
          <div style={{ flexGrow: 1 }} />
          <IconButton onClick={() => {
            removeFromCart(item.id, setCart, setLoading);
          }}>
            <RemoveShoppingCartOutlined sx={{ color: 'rgb(0,0,0)' }} />
          </IconButton>
        </Box>
      </Box>

    </Card>
  );
}
