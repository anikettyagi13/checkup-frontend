import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#5FA8D3',
    },
    secondary: {
      main: '#CFADFF',
    },
    red: {
      main: '#F84E8C',
    },
    green: {
      main: '#7EC9A6',
    },
    dark: {
      main: '#1F4F6B',
    },
  },
  space: {
    borderRadius: '10',
  },
  typography: {
    h1: {
      fontFamily: 'Poppins',
      fontSize: '2.7rem',
      color: '#1B3038',
      fontWeight: '900',
    },
    h3: {
      fontFamily: 'Poppins',
      color: '#1B3038',
      fontSize: '1.5rem',
      fontWeight: '600',
    },
    h6: {
      fontFamily: 'Poppins',
      color: '#1B3038',
      fontSize: '1.2rem',
      fontWeight: '500',
    },
    body1: {
      fontFamily: 'Poppins',
      color: '#1B3038',
      fontSize: '1rem',
      fontWeight: '600',
    },
    body2: {
      fontFamily: 'Poppins',
      color: '#1B3038',
      fontSize: '1rem',
      fontWeight: '600',
    },
    subtitle1: {
      fontFamily: 'Poppins',
      color: '#1B3038',
      fontSize: '0.7rem',
      fontWeight: '600',
    },
    subtitle2: {
      fontFamily: 'Poppins',
      color: '#1B3038',
      fontSize: '0.7rem',
      fontWeight: '500',
    },
  },
})

export default theme
