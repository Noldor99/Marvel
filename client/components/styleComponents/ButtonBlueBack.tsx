import { Button, styled } from '@mui/material'


const ButtonBlueBack = styled(Button)(({ theme }) => ({
  // border: `1px solid ${tokens(theme.palette.mode).borderColor}`,
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: '#1900D5 !important',
    color: 'white',
  }
}));


export default ButtonBlueBack
