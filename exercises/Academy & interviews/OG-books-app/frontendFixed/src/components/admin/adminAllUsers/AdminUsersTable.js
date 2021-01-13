import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Checkbox } from '@material-ui/core';
import BanOptions from './banUser/BanOptions';
import UnbanUser from './banUser/UnbanUser';

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
    minWidth: 100,
  },
});

const AdminUsersTable = ({token, users,setUpdate}) =>{
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">User id</StyledTableCell>
            <StyledTableCell>Display Name</StyledTableCell>
            <StyledTableCell align="right">Role</StyledTableCell>
            <StyledTableCell align="right">Banned</StyledTableCell>
                      <StyledTableCell align="center">Ban reason</StyledTableCell>
                      <StyledTableCell align="center">Ban / Unban</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
                  {users.map((user) => {
                      const banned=user.isBanned?true:false
                      return (
                      <StyledTableRow key={user.id}>
                          <StyledTableCell align="left">{user.id}</StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                              {user.display_name}
                          </StyledTableCell>
                          <StyledTableCell align="right">{user.role}</StyledTableCell>
                          <StyledTableCell align="right">
                              <Checkbox checked={banned}  />
                          </StyledTableCell>
                          <StyledTableCell align="center" >{banned ? user.reason : '-'}</StyledTableCell>
                          <StyledTableCell align="center">
                                  {!banned ?
                                      <BanOptions token={token} userId={user.id} setUpdate={setUpdate} />
                                      : <UnbanUser token={token} userId={user.id} setUpdate={setUpdate}/>}
                          </StyledTableCell>
                      </StyledTableRow>
                  )})}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default AdminUsersTable;