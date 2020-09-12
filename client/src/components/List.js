import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
  grid: {
    marginTop: 20,
    padding: 10,
  },
  avatar: {
    height: 100,
    width: 100
  },
  overflowText: {
    overflow: "hidden",
    paddingRight: 10
  }
}));

export default function AlignItemsList(props) {
  const classes = useStyles();
  return (
    <Grid item container className={classes.grid} component={Paper} elevation={2} spacing={3}>
      <Grid item md={3} xs={6}>
        <Avatar variant="square" className={classes.avatar} src={props.data.image_uri} />
      </Grid>
      <Hidden mdUp>
        <Grid item className={classes.overflowText} xs={6} md={0}>
          <Typography variant="body1"  >{props.data.display_name}</Typography>
          <Typography variant="body1">{props.data.category_name}</Typography>
          <Typography>{props.data.description ? props.data.description : "Description not available"}</Typography>
        </Grid>
      </Hidden>
      <Hidden smDown>
        <Grid className={classes.overflowText} item md={3} >
          <Typography variant="body1" >{props.data.display_name}</Typography>
        </Grid>
        <Grid className={classes.overflowText} item md={3} >
          <Typography variant="body1">{props.data.category_name}</Typography>
        </Grid>
        <Grid className={classes.overflowText} item md={3} >
          <Typography >{props.data.description ? props.data.description : "Description not available"}</Typography>
        </Grid>
      </Hidden>
    </Grid>
  );
}
