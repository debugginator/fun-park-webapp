import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { ArrowDropDownCircle } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    fontSize: "3rem",
    alignSelf: "flex-end",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));


function Header({ parks }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed"
              className={classes.appBar}
      >
        <Toolbar>
          <IconButton href="#"
                      onClick={handleMenuClick}
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="Menu">
            <ArrowDropDownCircle className={classes.icon}/>
          </IconButton>
          <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {parks.map(park =>
              <Link to="/" key={park.id}>
                <MenuItem
                  onClick={handleMenuClose}
                  button="primary"
                  component="div"
                >
                  {park.naziv}
                </MenuItem>
              </Link>
            )}
          </Menu>


          <Typography variant="h4">
            {parks[0].naziv}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;