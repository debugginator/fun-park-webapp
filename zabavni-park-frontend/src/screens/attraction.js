import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    width: 600,
  },
  media: {
    height: 140,
  },
});

function Attraction(props) {
  const classes = useStyles();
  const [attraction, setAttraction] = useState({
    naziv: "",
    opis: "",
    avatarUrl: "",
    ocjenaTezine: ""
  });

  useEffect(() => {
    fetch("/atrakcija/" + props.match.params.id)
      .then(res => res.json())
      .then(setAttraction);
  }, []);

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={attraction.avatarURL}
          title={attraction.naziv}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {attraction.naziv}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {attraction.opis}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography variant="button" component="p">
          Ocjena težine: {attraction.ocjenaTezine}
        </Typography>
      </CardActions>
    </Card>
  );
}

export default Attraction;
