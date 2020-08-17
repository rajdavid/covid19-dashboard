import React, { Component } from 'react';
import { makeStyles ,withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({

  root: {
            padding:"10px",
            width: "200px",
            height: "222px",
            minWidth: "200px",
      
    },  
   bullet: {
    display: 'inline-block',
    margin: '2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 25,
    fontWeight:"bold",
  },
    pos: {
        marginLeft: 12,
        marginRight: 12,
        marginTop:12,
        marginBottom: 12,
  },
});
class MetricsCard extends Component {
  render() {
    const {classes} = this.props
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h6" component="h4">
            {this.props.text}
          </Typography>
          <Typography variant="h7" component="h2">
            {this.props.val}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
export default withStyles(useStyles) (MetricsCard)