import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles({
  card: {
    margin: "auto",
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
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    fetch("/atrakcija/" + props.match.params.id)
      .then(res => res.json())
      .then(setAttraction);
  }, []);

  useEffect(() => {
    fetch("/djelatnik/byAttr/" + props.match.params.id)
      .then(res => res.json())
      .then(setWorkers);
  }, []);

  const handleDelete = async () => {
    const rawResponse = await fetch('/atrakcija/' + props.match.params.id, {
      method: 'DELETE',
    });
    const status = await rawResponse.json();

    console.log(status);
    window.location.replace("/");
  };

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

      <CardActions>
        <Typography variant="button" component="p">
          Djelatnici:
          {
            workers.map(worker =>
              <Typography key={worker.djelatnik.id} variant="body2" color="textSecondary" component="p">
                {worker.osoba.ime} {worker.osoba.prezime} ({worker.djelatnik.brTekucegRacuna})
              </Typography>
            )
          }
        </Typography>
      </CardActions>

      <IconButton onClick={handleDelete}>
        <DeleteIcon/>
      </IconButton>
    </Card>
  );
}

export default Attraction;
