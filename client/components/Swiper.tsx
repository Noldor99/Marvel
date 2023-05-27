import * as React from 'react';
import Box from '@mui/material/Box';
import Carousel from 'react-material-ui-carousel';
import { IHero, IImageHero } from '@/model';
import { useDeleteImageHeroMutation } from '@/store/api/heroApi';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';


interface SwiperProps {
  hero?: IHero;
}

const Swiper: React.FC<SwiperProps> = ({ hero }: SwiperProps) => {
  const [deleteImageHero, { isLoading: deleteLoading, error: deleteError }] = useDeleteImageHeroMutation();

  const handleDeleteImage = (imageId: string) => {
    deleteImageHero({ id: imageId });
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 3 }}>
      <Carousel>
        {hero?.images_hero.map((item: IImageHero, index: number) => {
          const apiPort = process.env.NEXT_PUBLIC_API_PORT || '5000';
          const imageUrl = `http://localhost:${apiPort}/${item.image}`;

          return (
            <Box key={index}>
              <Box
                component="img"
                sx={{
                  height: 255,
                  display: 'block',
                  maxWidth: 400,
                  overflow: 'hidden',
                  margin: '0 auto'
                  // width: '100%',
                }}
                src={imageUrl}
                alt={hero.nickname}
              />
              <IconButton
                color="error"
                sx={{ ml: 5 }}
                onClick={() => handleDeleteImage(item._id)}>
                <Delete />
              </IconButton>
            </Box>

          );
        })}
      </Carousel>
    </Box>
  );
};

export default Swiper;
