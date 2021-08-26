import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  cardmedia: {
    height: 200
  }
});

export const ImageCard = ({tennisImage}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cardmedia}
        image={tennisImage}
        title="Tennis Courts"
      />
    </Card>
  );
}