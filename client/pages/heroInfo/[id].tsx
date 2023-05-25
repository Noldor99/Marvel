import { Container, Toolbar } from '@mui/material'
import { useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Swiper from '../../components/Swiper';
import { useRouter } from 'next/router';
import { useLazyGetHeroQuery } from '@/store/api/heroApi';

const SigneProduct = () => {

  const router = useRouter();
  const { id } = router.query;
  const [fetch, { data: hero }] = useLazyGetHeroQuery()

  useEffect(() => {
    //@ts-ignore
    fetch({ id })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (

    <Container
      sx={{ mt: '80px', justifyContent: 'center', display: 'flex' }}
      maxWidth="sm"
    >

      <Card sx={{
        maxWidth: 400,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Swiper hero={hero} />
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography gutterBottom variant="h5" component="div">
            {hero?.nickname}
          </Typography>
          <Typography variant="body2" color="text.secondary" >
            {hero?.origin_description}
          </Typography>
        </CardContent>
        <CardContent>

        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between' }}>
          <Button size="small">Share</Button>
          <Button size="small" onClick={() => router.back()}
          >Back</Button>
        </CardActions>
      </Card>
    </Container>
  )
}

export default SigneProduct