import React, { useEffect } from 'react';

import Avatar from '@material-ui/core/Avatar';
import MasterDetail from "./components/MasterDetail";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Container from '@material-ui/core/Container';

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    // backgroundColor: theme.palette.grey.A100,
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    justifyContent: 'center'
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
  }
}));


const App = () => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [attractions, setAttractions] = React.useState([]);

  useEffect(() => {
    fetch('/atrakcija')
      .then(res => res.json())
      .then(setAttractions);
  }, []);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <Container className={classes.container}>
      <h1>Attractions</h1>
      <List
        component="nav"
        subheader={<ListSubheader component="div">Attractions</ListSubheader>}
        className={classes.root}
      >
        {attractions.map(attraction =>
          <Collapse key={attraction.id} in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <Avatar alt="Attraction avatar"
                          src={attraction.avatarURL}
                          className={classes.avatar}/>
                </ListItemIcon>
                <ListItemText primary={attraction.naziv}/>
              </ListItem>
            </List>
          </Collapse>)
        }

      </List>
      <MasterDetail/>
    </Container>
  );

}

export default App;