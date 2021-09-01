import { createTheme, responsiveFontSizes } from '@material-ui/core/styles'

export let theme = createTheme({
    palette: {
      common: {
        black: "#000",
        white: "#fff"
      },
    background: {
      "paper": "#fff",
      "default": "#fafafa"
    },
    primary: {
      main: '#00695c',
    },
    secondary: {
      main: '#c8e6c9',
    },
}});

theme.typography.html = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};

theme = responsiveFontSizes(theme)
