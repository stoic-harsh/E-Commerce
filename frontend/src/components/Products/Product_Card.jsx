import { Card, CardMedia, CardContent, CardActions, IconButton, Typography } from '@mui/material';
import { Favorite as FavoriteIcon, Share as ShareIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { addToCart } from '../../functions/index';

export default function Product_Card({ item, setCart, setLoading }) {
    const truncate = (str, limit)=>{
        return (str.length > limit ? str.substring(0, limit) + "..." : str);
      }

    function parseToString(text){
        return text.replace(/(<([^>]+)>)/ig, "");
    }

  return (
    <Card style={{ boxShadow: '0 0 8px rgba(0,0,0,0.55)', display: 'flex', flexFlow: 'column', width:'100%' }}>
      
      <CardMedia
        component="img"
        height="194"
        image={item.image.url}
        alt="product_image"
      />
      <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '13.5px' }}>
          <Typography variant="h6" sx={{ color: 'rgb(0,0,0)' }}>
              {truncate(item.name, 34)}
          </Typography>
          <Typography variant="h6" sx={{ color: '#8B008B' }}>
              {item.price.formatted_with_symbol}
          </Typography>
          </div>
        <Typography variant="body2" color="text.secondary">
          {truncate(parseToString(item.description), 200)}
        </Typography>
      </CardContent>
      <div style={{ flexGrow: 1 }}/>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <div style={{ flexGrow: 1 }} />
        <IconButton onClick={()=>{
          addToCart(setCart, item.id, 1, setLoading);
        }}>
        <ShoppingCartIcon sx={{ color: 'rgb(0,0,0)' }}/>
        </IconButton>
      </CardActions>
      
    </Card>
  );
}
