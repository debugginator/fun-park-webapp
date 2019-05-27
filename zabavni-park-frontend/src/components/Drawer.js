import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Stars } from "@material-ui/icons";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));


function ClippedDrawer() {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar}/>
      <List>
        <Link to={"/attractions"}>
          <ListItem button>
            <ListItemIcon>
              <Stars/>
            </ListItemIcon>
            <ListItemText primary="Atrakcije"/>
          </ListItem>
        </Link>

        <Link to={"stands"}>
          <ListItem button>
            <ListItemIcon>
              <Stars/>
            </ListItemIcon>
            <ListItemText primary="Štandovi"/>
          </ListItem>
        </Link>

        <Link to={"about-park"}>
          <ListItem button>
            <ListItemIcon>
              <Stars/>
            </ListItemIcon>
            <ListItemText primary="O parku"/>
          </ListItem>
        </Link>
      </List>
      <Divider/>
    </Drawer>
  );
}

export default ClippedDrawer;
