import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
  },
  backgroundColor :{
    background: '#FF6347',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontWeight:"bolder",
    flexGrow: 1,
    
  }
  ,
}));


export default function AppHeader() {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.backgroundColor}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
                Covid-19 DashBoard - India
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}