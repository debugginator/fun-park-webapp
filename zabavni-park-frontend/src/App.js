import React, { useEffect } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from '@material-ui/core/Container';

import Attractions from './screens/attractions';
import Attraction from './screens/attraction';
import Home from "./screens/home";

import Header from './components/Header';
import Drawer from "./components/Drawer";


const App = () => {
  const [parks, setParks] = React.useState([{ id: 0, naziv: "" }]);

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

        <Container style={{ margin: "auto" }}>
          <Route exact path="/" component={() => <Home park={parks[0]}/>}/>
          <Route exact path="/attractions" component={Attractions}/>
          <Route path="/attraction/:id" component={Attraction}/>
          {/*<Route path="/topics" component={Topics} />*/}
        </Container>
      </div>
    </Router>
  );
};

export default App;