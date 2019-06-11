import React, { useEffect } from 'react';

import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import { Add, Edit, Pageview, ShortText, StarBorder, ShoppingCart } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";


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
  details: {
    marginTop: "10px"
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
  const [stands, setStands] = React.useState([]);
  const [selectedStand, setSelectedStand] = React.useState(undefined);

  useEffect(() => {
    fetch('/atrakcija')
      .then(res => res.json())
      .then(setAttractions);
  }, []);

  useEffect(() => {
    if (attractions.length === 0) return;
    fetch('/stand')
      .then(res => res.json())
      .then(setStands)
  }, [attractions]);

  function handleClick(id) {
    setOpen({ [id]: !open[id] });
  }

  let cjenikObj = selectedStand && JSON.parse(selectedStand.cjenik);

  let detailItems = cjenikObj && Object.keys(cjenikObj).map((imePive, index) =>
    <ListItem key={index} className={classes.nested}>
      <Typography variant="subtitle2">
        {imePive + " - " + cjenikObj[imePive]}
        <br/>
      </Typography>
    </ListItem>
  );
  let detailTitle = selectedStand && "Cjenik za štand: " + selectedStand.naziv;
  let shouldDisplayDetail = selectedStand !== undefined;

  return ( // Stavi ovdje neki container i u njega cjenik i djelatnike....
    <Container>
      <List
        component="nav"
        subheader={
          <ListSubheader className={classes.title}
                         component="div"
          >
            Attractions

            <IconButton href="/attraction/create">
              <Add/>
            </IconButton>
          </ListSubheader>
        }
        className={classes.center}
      >
        {attractions.map(attraction => {
            let stand = stands.filter(stand => stand.atrakcijaId === attraction.id)[0];

            return (<div key={attraction.id}>
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
                  <ListItem className={classes.nested} onClick={()=>setSelectedStand(stand)}>
                    <ListItemIcon>
                      <ShoppingCart/>
                    </ListItemIcon>
                    <Typography variant="subtitle2">
                      Štand {stand && stand.naziv}
                    </Typography>
                  </ListItem>
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
                  <Link to={`attraction/${attraction.id}/edit`}>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <Edit/>
                      </ListItemIcon>
                      <Typography variant="subtitle2">
                        Ažuriranje atrakcije
                      </Typography>
                    </ListItem>
                  </Link>
                </Collapse>
              </div>
            )
          }
        )}
      </List>

      {shouldDisplayDetail && (
        <List component="nav"
              aria-label="Main mailbox folders"
              className={classes.center + " " + classes.details}
              subheader={
                <ListSubheader> {detailTitle} </ListSubheader>
              }
        >
          {detailItems}
        </List>)
      }

    </Container>
  );

};

export default Attractions;