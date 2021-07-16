import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles({
  table: {
    minWidth: 530,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function ProfilTableCourse(props) {
  const classes = useStyles();

  return (
    <Card style={{marginTop:"0.5em", marginRight:"1em", cursor:"pointer"}}>
      <CardContent>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date </TableCell>
              <TableCell>Prix </TableCell>
              <TableCell>Catégorie </TableCell>
              <TableCell>Allocation </TableCell>
              <TableCell>Trotteur </TableCell>
              <TableCell>Driver </TableCell>
              <TableCell>Handicap </TableCell>
              <TableCell>Réduc. </TableCell>
              <TableCell>Chrono. </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {props.data.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell><span>{row.date}</span></TableCell>
              <TableCell><span>{row.prix}</span></TableCell>
              <TableCell><span>{row.categorie}</span></TableCell>
              <TableCell><span><NumberFormat value={row.allocation} displayType={'text'} thousandSeparator=' '/> €</span></TableCell>
              <TableCell><span>{row.trotteur}</span></TableCell>
              <TableCell><span>{row.driver}</span></TableCell>
              <TableCell align="center"><span>{row.handicap}</span></TableCell>
              <TableCell align="center"><span>{row.reduc}</span></TableCell>
              <TableCell align="center"><span>{row.temps}</span></TableCell>
            </TableRow>
            ))}

          </TableBody>
        </Table>
        <div style={{marginTop:"1em"}}>
          <span><i>Les trotteurs gagnants sur les dix dernières courses similaires (hippodrome - distance).</i></span>
        </div>
      </CardContent>
    </Card>
  );
}