import { createTheme, responsiveFontSizes } from '@material-ui/core/styles'

export let theme = createTheme({
  "palette": {
    "common": {
      "black": "#000",
      "white": "#fff"
    },
    "background": {
      "paper": "#fff",
      "default": "#fafafa"
    },
    "primary": {
      "light": "rgba(89, 210, 188, 1)",
      "main": "rgba(20, 160, 140, 1)",
      "dark": "rgba(0, 113, 95, 1)",
      "contrastText": "#fff"
    }
  }
});

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
