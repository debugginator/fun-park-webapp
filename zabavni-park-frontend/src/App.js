import React, { useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from '@material-ui/core/Container';

import Attractions from './screens/attractions';
import Attraction from './screens/attraction';
import Home from "./screens/home";
import AttractionEdit from "./screens/attractionEdit";
import AttractionCreate from "./screens/attractionCreate";
import Stands from "./screens/stands";

import Header from './components/Header';
import Drawer from "./components/Drawer";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    margin: "auto",
    maxWidth: "unset",
  },
}));

const App = () => {
  const [parks, setParks] = React.useState([{ id: 0, naziv: "" }]);
  const classes = useStyles();

  useEffect(() => {
    fetch("/zabavni-park")
      .then(res => res.json())
      .then(setParks);
  }, []);

  return (
    <Router>
      <div>
        <Header parks={parks}/>
        <Drawer/>
        <div style={{ marginTop: 150 }}/>

        <Container className={classes.content}>
          <Switch>
            <Route exact path="/" component={() => <Home park={parks[0]}/>}/>
            <Route exact path="/about-park" component={() => <Home park={parks[0]}/>}/>
            <Route exact path="/attractions" component={Attractions}/>
            <Route exact path="/attraction/create" component={AttractionCreate}/>
            <Route exact path="/attraction/:id" component={Attraction}/>
            <Route exact path="/attraction/:id/edit" component={AttractionEdit}/>

            <Route exact path="/stands" component={Stands}/>
          </Switch>
        </Container>
      </div>
    </Router>
  );
};

export default App;