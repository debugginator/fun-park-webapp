import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));


const AttractionForm = ({attraction, handleChange, submit}) => {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="standard-name"
        label="Naziv"
        className={classes.textField}
        value={attraction.naziv}
        onChange={handleChange('naziv')}
        margin="normal"
      />
      <TextField
        id="standard-name"
        label="Opis"
        className={classes.textField}
        value={attraction.opis}
        onChange={handleChange('opis')}
        margin="normal"
      />
      <TextField
        id="standard-name"
        label="AvatarURL"
        className={classes.textField}
        value={attraction.avatarURL}
        onChange={handleChange('avatarURL')}
        margin="normal"
      />
      <TextField
        id="standard-number"
        label="OcjenaTezine"
        className={classes.textField}
        type="number"
        value={attraction.ocjenaTezine}
        onChange={handleChange('ocjenaTezine')}
        margin="normal"
      />
      <Button variant="outlined" color="primary" onClick={submit}>
        Save
      </Button>
    </form>
  );
};


export default AttractionForm;