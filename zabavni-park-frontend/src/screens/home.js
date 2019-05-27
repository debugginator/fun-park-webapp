import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function HomeScreen({ park }) {
  return (
    <React.Fragment>
      <CssBaseline/>
      <Container maxWidth="sm">
        <Typography variant="h5">
          Dobrodošli na stranicu zabavnog parka:
        </Typography>
        <Typography variant="h2">
          {park.naziv}
        </Typography>
        <img src={park.pozadinskaSlika} alt="Park cover image"/>
      </Container>
    </React.Fragment>
  );
}

export default HomeScreen;