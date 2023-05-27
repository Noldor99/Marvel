import { Box, Button, Grid } from '@mui/material'
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
import { useRouter } from 'next/router';
import ButtonBlueBack from '@/components/styleComponents/ButtonBlueBack';


const Home = () => {

  const { heroes, totalPage } = useTypedSelector(state => state.hero);
  const { currentPage } =
    useTypedSelector(state => state.filter);

  const dispatch = useDispatch()
  const router = useRouter()


  const { width } = useWindowDimensions();

  const [fetchReposAll, { isLoading }] = useLazyGetHeroesQuery()


  useEffect(() => {
    fetchReposAll({ count: 0, offset: 0 })
  }, [currentPage, fetchReposAll]);

  // Розбиття масиву heroes на сторінки
  const startIndex = (currentPage - 1) * 4;
  const endIndex = startIndex + 4;
  const heroesPagination = heroes.slice(startIndex, endIndex);

  return (
    <MainLayout>
      <Box sx={{ pt: 2, pb: 2 }}>
        <ButtonBlueBack
          sx={{ mb: 2 }}
          fullWidth
          onClick={() => router.push('/createhero/ADD')}
        >
          Create Hero
        </ButtonBlueBack>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ pb: '30px' }}>
          {isLoading ? [...new Array(4)].map(() => null)
            : heroesPagination.map((hero: IHero) =>
              <Grid
                item xs={12} sm={6} md={3}
                sx={{ display: 'flex', justifyContent: 'center' }}
                key={hero._id}
              >
                <Cart hero={hero} />
              </Grid>
            )}
        </Grid>
        <Pagination
          size={width < 768 ? 'small' : 'medium'}
          page={currentPage}
          onChange={(e, p) => dispatch(setCurrentPageAction(p))}
          count={totalPage}
          color="primary" />
      </Box>
    </MainLayout >
  )
}

export default Home
