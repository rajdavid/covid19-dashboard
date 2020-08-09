import React, {Component} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
class DataTableComponent extends Component {
    
     componentDidMount() {
        
   }
   componentDidUpdate() {
    
   }
    
    // lifecycle function
    render() {
        const { classes } = this.props;
        return (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">States/UT </StyledTableCell>
                    <StyledTableCell align="center">Confirmed</StyledTableCell>
                    <StyledTableCell align="center">Active</StyledTableCell>
                    <StyledTableCell align="center">Recovered</StyledTableCell>
                    <StyledTableCell align="center">Deceased</StyledTableCell>
                    <StyledTableCell align="center">Test Per Million</StyledTableCell>
                    <StyledTableCell align="center">Total ICU Beds</StyledTableCell>        
                  </TableRow>
                </TableHead>
                      <TableBody>
                        {this.props.val
                            .filter(row => row.state !== 'State Unassigned'
                                && row.state !=='Total')
                            .map((row) => (
                      <StyledTableRow key={
                          row.state
                      } >
                      <StyledTableCell component="th" scope="row" align="center">
                              {row.state}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.confirmed}</StyledTableCell>
                      <StyledTableCell align="center">{row.active}</StyledTableCell>
                      <StyledTableCell align="center">{row.recovered}</StyledTableCell>
                    <StyledTableCell align="center">{row.deaths}</StyledTableCell>
                    <StyledTableCell align="center">{row.testspermillion}</StyledTableCell>
                    <StyledTableCell align="center">{row.numicubeds}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          );
    }

}
export default withStyles(useStyles, { withTheme: true })(DataTableComponent);