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



export default function TableProfilVitesseCourse(props) {
  const classes = useStyles();

  return (
    <Card style={{cursor:"pointer"}}>
      <CardContent>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Allure</TableCell>
              <TableCell align="center">Chronomètre</TableCell>
              <TableCell align="center">Vitesse</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>  
                <TableCell>Rapide</TableCell>
                <TableCell align="center">{props.data.chronoRapide}</TableCell>
                <TableCell align="center">{props.data.VRapide}</TableCell>
            </TableRow>
            <TableRow>  
                <TableCell>Lente</TableCell>
                <TableCell align="center">{props.data.chronoLent}</TableCell>
                <TableCell align="center">{props.data.VLent}</TableCell>
            </TableRow>
            <TableRow>  
                <TableCell>Moyenne</TableCell>
                <TableCell align="center">{props.data.chronoMoy}</TableCell>
                <TableCell align="center">{props.data.VMoy}</TableCell>
            </TableRow>
         
          </TableBody>
        </Table>
        <div style={{marginTop:"1em"}}>
          <span><i>Le profil vitesse de la piste ({props.data.taille} courses étudiées).</i></span>
        </div>
      </CardContent>
    </Card>
  );
}