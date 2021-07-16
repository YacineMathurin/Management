import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';

const useStyles = makeStyles({
 
});



export default function TableProfilTopCourse(props) {
  const classes = useStyles();
  return (
    <Card style={{cursor:"pointer"}}>
      <CardContent>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">Nom</TableCell>
              <TableCell align="center">Performance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody> 
          {props.data.map((row, index) => (
            <TableRow key={row.name}>
                <TableCell align="left"><span>{row.nom}</span></TableCell>
                <TableCell align="center"><span>{row.victoire} victoires</span></TableCell>
            </TableRow>
            ))}
         
          </TableBody>
        </Table>
        <div style={{marginTop:"1em"}}>
          <span><i>{props.description}</i></span>
        </div>
      </CardContent>
    </Card>
  );
}