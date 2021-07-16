import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles({
 
});



export default function LastPerformanceTable(props) {
  const classes = useStyles();

  return (
    <Card style={{cursor:"pointer"}}>
      <CardContent>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Hippodrome</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Catégorie</TableCell>
              <TableCell align="center">Allocation</TableCell>
              <TableCell align="center">Distance</TableCell>
              <TableCell>Classement</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {props.data.map((row, index) => (
            <TableRow key={row.name}>
                <TableCell><span>{row.date}</span></TableCell>
                <TableCell><Tooltip arrow title={<h3>{row.hippodrome}</h3>}><span>{row.hippodrome.substring(0,20)}</span></Tooltip></TableCell>
                <TableCell><Tooltip arrow title={<h3>{row.prix}</h3>}><span>{row.prix.substring(0,150)}</span></Tooltip></TableCell>
                <TableCell><span>{row.categorie}</span></TableCell>
                <TableCell align="center"><span><NumberFormat value={row.allocation} displayType={'text'} thousandSeparator=' '/> €</span></TableCell>
                <TableCell align="center"><span><NumberFormat value={row.distance} displayType={'text'} thousandSeparator=' '/> m</span></TableCell>
                <TableCell align="center"><span>{row.place}</span></TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
        <div style={{marginTop:"1em"}}>
          <span><i>Les performances récentes du trotteur sur les hippodromes Français.</i></span>
        </div>
      </CardContent>
    </Card>
  );
}