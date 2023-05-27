import { Box, Container, Grid, Stack } from '@mui/material';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Swiper from '../../components/Swiper';
import { useRouter } from 'next/router';
import { useCreateImageHeroMutation, useCreateSuperpowerMutation, useDeleteSuperpowerMutation, useLazyGetHeroQuery } from '@/store/api/heroApi';
import { IPower } from '@/model';
import Supserpowers from '@/components/Supserpowers';
import UploadButtons from '@/components/UploadButtons';
import FlexBetween from '@/components/styleComponents/FlexBetween';

const SigneProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const [fetch, { data: hero }] = useLazyGetHeroQuery();

  const [createImageHero, { error: createError }] = useCreateImageHeroMutation();


  useEffect(() => {
    //@ts-ignore
    fetch({ id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateImage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fileInput = event.currentTarget['file-upload'] as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('heroId', id as string);
      formData.append('picture', file);
      //@ts-ignore
      await createImageHero(formData);
    }
  };

  return (
    <Container
      sx={{
        mt: '80px',
        justifyContent: 'center',
        display: 'flex',
        mb: 4,
        width: '100%'
      }}
      maxWidth="sm"

    >
      <Card sx={{ maxWidth: 800, display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Grid container>
          <Grid item xs={12}>
            <Swiper hero={hero} />
          </Grid>
          <Grid item>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Stack spacing={2}>
                <Typography gutterBottom variant="h5" component="div">
                  {hero?.nickname} ({hero?.real_name})
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {hero?.catch_phrase}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {hero?.origin_description}
                </Typography>
              </Stack>
            </CardContent>
            <CardContent>
              <Supserpowers hero={hero} />
              <form onSubmit={handleCreateImage}>
                <Grid container sx={{ mt: 2 }}>
                  <Grid item xs={10}>
                    <UploadButtons handleImageChange={() => { }} />
                  </Grid>
                  <Grid item xs={2} display="flex" justifyContent='flex-end'>
                    <Button type="submit">Submit</Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent >
            <CardActions sx={{ justifyContent: 'space-between' }}>
              <Button size="small">Share</Button>
              <Button size="small" onClick={() => router.back()}>
                Back
              </Button>
            </CardActions>
          </Grid>
        </Grid>

      </Card>
    </Container>
  );
};

export default SigneProduct;
