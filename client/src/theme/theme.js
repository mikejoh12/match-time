import { createTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { blueOrangeTheme } from './themeObjects';

export let theme = createTheme(blueOrangeTheme);

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
