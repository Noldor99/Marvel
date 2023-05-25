import { Container, Grid, Toolbar, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import useWindowDimensions from '../hook/useWindowDimensions';
import MainLayout from '@/layouts/MainLayout';
import { setCurrentPageAction } from '@/store/slice/filterSlice';
import { useTypedSelector } from '@/hook/useTypedSelector';
import { useLazyGetHeroesQuery } from '@/store/api/heroApi';
import { IHero } from '@/model';
import Cart from '@/components/Cart';


const Home = () => {

  const { heroes, totalPage } = useTypedSelector(state => state.hero);
  const { currentPage } =
    useTypedSelector(state => state.filter);

  const dispatch = useDispatch()

  console.log(heroes)

  const { width } = useWindowDimensions();

  const [fetchReposAll, { isLoading }] = useLazyGetHeroesQuery()


  useEffect(() => {
    fetchReposAll({ count: currentPage })
  }, [currentPage, fetchReposAll]);

  return (
    <MainLayout>
      <Toolbar />

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ pb: '30px' }}>
        {isLoading ? [...new Array(4)].map(() => null)
          : heroes?.map((hero: IHero) =>
            <Grid
              item xs={12} sm={6} md={3}
              sx={{ display: 'flex', justifyContent: 'center' }}
              key={hero._id}
            >
              <Cart
                hero={hero}
              />
            </Grid>
          )}
      </Grid>
      <Pagination
        size={width < 768 ? 'small' : 'medium'}
        page={currentPage}
        onChange={(e, p) => dispatch(setCurrentPageAction(p))}
        count={totalPage}
        color="primary" />
    </MainLayout >
  )
}

export default Home