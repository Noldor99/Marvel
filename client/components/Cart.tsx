import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IHero } from '@/model';
import { useRouter } from 'next/router';
import { useDeleteHeroMutation } from '@/store/api/heroApi';
import { Grid } from '@mui/material';
import FlexBetween from './styleComponents/FlexBetween';


interface CartProps {
  hero: IHero;
}

const Cart: React.FC<CartProps> = ({ hero }: CartProps) => {
  const [deleteHero, { isLoading: deleteLoading, error: deleteError }] = useDeleteHeroMutation();

  const router = useRouter();

  const apiPort = process.env.NEXT_PUBLIC_API_PORT || '5000';
  const imageUrl = `http://localhost:${apiPort}/${hero.title_images}`;

  const shortenText = (text: string, n: number) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat('...');
      return shortenedText;
    }
    return text;
  };

  return (
    <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', width: '100%' }}>
      <CardMedia component="img" alt="green iguana" height="340" image={imageUrl} />
      <CardContent sx={{ flex: '1 0 auto', maxHeight: '200px', overflow: 'auto' }}>
        <Typography gutterBottom variant="h5" component="div">
          {hero.nickname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {shortenText(hero.origin_description, 180)}
        </Typography>
      </CardContent>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}></CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FlexBetween>
              <Button
                size="small"
                onClick={() => deleteHero({ id: hero._id })}
              >Delete</Button>
              <Button size="small" onClick={() => router.push(`heroInfo/${hero._id}`)}>
                Learn More
              </Button>
            </FlexBetween>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="outlined"
              color="success"
              onClick={() => router.push(`/createhero/${hero._id}`)}
            >
              Edit Hero
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default Cart;

