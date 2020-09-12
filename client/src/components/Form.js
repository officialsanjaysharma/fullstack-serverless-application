import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() => ({
  formControl: {
    margin: 10,
    width: 200
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  return (
    <div>
      <FormControl variant='outlined' className={classes.formControl} >
        <InputLabel htmlFor='outlined-age-native-simple'>Category</InputLabel>
        <Select
          native
          value={props.filter}
          onChange={e => props.handleFilter(e)}
          label='Filter'
          inputProps={{
            name: 'Filter',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label='None' value='' />
          {
            props.category.map((i, index) => <option key={index} value={i}>{i}</option>)
          }
        </Select>
      </FormControl>
    </div>
  );
}
