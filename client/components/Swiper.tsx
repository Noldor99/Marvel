import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Carousel from 'react-material-ui-carousel'
import { IHero } from '@/model';



interface SwiperProps {
  hero?: IHero
}




const Swiper: React.FC<SwiperProps> = ({ hero }: SwiperProps) => {


  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{hero?.nickname}</Typography>
      </Paper>
      <Carousel>
        {hero?.images_hero.map((item, index) => (

          <Box
            key={index}
            component="img"
            sx={{
              height: 255,
              display: 'block',
              maxWidth: 400,
              overflow: 'hidden',
              margin: '0 auto'
              // width: '100%',
            }}
            src={item.image}
            alt={hero.nickname}
          />
        ))}
      </Carousel>
    </Box>
  );
}

export default Swiper;
