import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Add, Edit, Pageview, ShortText, StarBorder } from '@material-ui/icons';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
  root: {
    width: "50%",
    maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
  center: {
    width: "800px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: theme.palette.background.paper,
    // color: theme.palette.common.white
  },
  container: {
    margin: "auto",
    // backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  title: {
    // color: theme.palette.common.white,
    margin: theme.spacing(4, 0, 2),
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
  }
}));


const Attractions = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [attractions, setAttractions] = React.useState([]);

  useEffect(() => {
    fetch('/atrakcija')
      .then(res => res.json())
      .then(setAttractions);
  }, []);

  function handleClick(id) {
    setOpen({ [id]: !open[id] });
  }

  return (
    <Container className={classes.container}>
      <List
        component="nav"
        subheader={
          <ListSubheader className={classes.title}
                         component="div"
          >
            Attractions

            <IconButton href="#">
              <Add/>
            </IconButton>
          </ListSubheader>
        }
        className={classes.center}
      >
        {attractions.map(attraction =>
          <div key={attraction.id}>
            <Divider/>
            <List component="div" disablePadding>
              <ListItem button onClick={() => handleClick(attraction.id)}>
                <ListItemIcon>
                  <Avatar alt="Attraction avatar"
                          src={attraction.avatarURL}
                          className={classes.avatar}/>
                </ListItemIcon>
                <ListItemText primary={attraction.naziv}/>
                {open[attraction.id] ? <ExpandLess/> : <ExpandMore/>}
              </ListItem>
            </List>
            <Collapse in={open[attraction.id]}
                      style={{ backgroundColor: "antiquewhite" }}
                      timeout="auto"
                      unmountOnExit>
              <ListItem className={classes.nested}>
                <ListItemIcon>
                  <ShortText/>
                </ListItemIcon>
                <Typography variant="subtitle2">
                  {attraction.opis}
                </Typography>
              </ListItem>
              <ListItem className={classes.nested}>
                <ListItemIcon>
                  <StarBorder/>
                </ListItemIcon>
                <Typography variant="subtitle2">
                  {attraction.ocjenaTezine}
                </Typography>
              </ListItem>
              <Link to={"attraction/" + attraction.id}>
                <ListItem button
                          className={classes.nested}
                >
                  <ListItemIcon>
                    <Pageview/>
                  </ListItemIcon>
                  <Typography variant="subtitle2">
                    Pregled atrakcije
                  </Typography>
                </ListItem>
              </Link>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <Edit/>
                </ListItemIcon>
                <Typography variant="subtitle2">
                  Ažuriranje atrakcije
                </Typography>
              </ListItem>
            </Collapse>
          </div>
        )}
      </List>
    </Container>
  );

};

export default Attractions;