import React, { useEffect } from 'react';
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { Add, ShortText } from '@material-ui/icons';
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


const Stands = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [stands, setStands] = React.useState([]);

  useEffect(() => {
    fetch('/stand')
      .then(res => res.json())
      .then(setStands);
  }, []);

  function handleClick(id) {
    setOpen({ [id]: !open[id] });
  }

  return (
    <List
      component="nav"
      subheader={
        <ListSubheader className={classes.title}
                       component="div"
        >
          Štandovi

          <IconButton href="/stand/create">
            <Add/>
          </IconButton>
        </ListSubheader>
      }
      className={classes.center}
    >
      {stands.map(stand => {
        let cjenikObj = JSON.parse(stand.cjenik);
        return (
          <div key={stand.id}>
            <Divider/>
            <List component="div" disablePadding>
              <ListItem button onClick={() => handleClick(stand.id)}>
                <ListItemText primary={stand.naziv}/>
                {open[stand.id] ? <ExpandLess/> : <ExpandMore/>}
              </ListItem>
            </List>
            <Collapse in={open[stand.id]}
                      style={{ backgroundColor: "antiquewhite" }}
                      timeout="auto"
                      unmountOnExit>
              <ListItem>
                <ListItemText primary={"Cjenik"}/>
              </ListItem>
              {Object.keys(cjenikObj).map((imePive, index) =>
                <ListItem key={index} className={classes.nested}>
                  <ListItemIcon>
                    <ShortText/>
                  </ListItemIcon>
                  <Typography variant="subtitle2">
                    {imePive + " - " + cjenikObj[imePive]}
                  </Typography>
                </ListItem>)}
            </Collapse>
          </div>
        );
      })}
    </List>
  );

};

export default Stands;