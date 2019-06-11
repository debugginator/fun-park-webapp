import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';


function HomeScreen({ park }) {
  return (
    <div style={{ margin: "auto", textAlign: "center" }}>
      <CssBaseline/>
      <Typography variant="h5">
        Dobrodošli na stranicu zabavnog parka:
      </Typography>
      <Typography variant="h2">
        {park.naziv}
      </Typography>
      <img src={park.pozadinskaSlika} alt="Park cover image"/>

      <Typography variant="body2" component="p">
        {park.opis}
      </Typography>
    </div>
  );
}

export default HomeScreen;