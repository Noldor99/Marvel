import { ListItemButton, styled } from '@mui/material'



const ListItemButtonBlue = styled(ListItemButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#1900D5 !important',
    color: '#fff',
    borderRadius: '4px',
    '& .MuiSvgIcon-root': {
      // color: `${tokens(theme.palette.mode).white.DEFAULT} !important`,
    },
  }
}));


export default ListItemButtonBlue
