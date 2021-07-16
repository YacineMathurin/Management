import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import StarsIcon from '@material-ui/icons/Stars';
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

const COLORS = ['#800080','#FF00FF','#000080','#0000FF','#008080','#00FFFF','#008000','#00FF00','#808000','#FFFF00','#800000','#FF0000']

export default function StatsTable(props) {
  const classes = useStyles();

  return (
    <Card style={{marginTop:"0.5em", marginRight:"1em"}}>
      <CardContent>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>  </TableCell>
              <TableCell>{props.title}</TableCell>
              <TableCell align="right">TC</TableCell>
              <TableCell align="right">G</TableCell>
              <TableCell align="right">PL</TableCell>
              <TableCell align="right">GRP</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row, index) => (
            <TableRow key={row.name}>
                {/* icon */}
                <TableCell align="right" style= {{color: COLORS[index]}}>
                    <Tooltip arrow title={<h3>{row.valeur}</h3>}>
                    <StarsIcon></StarsIcon>
                    </Tooltip>
                </TableCell>
                {/* hippodrome */}
                <TableCell>
                { (props.title == "Distance") && (<Tooltip arrow title={<h3>{props.title}: {row.valeur} m</h3>}><span><NumberFormat value={row.valeur} displayType={'text'} thousandSeparator=' '/> m</span></Tooltip>) }
                    { (props.title != "Distance") && (<Tooltip arrow title={<h3>{props.title}: {row.valeur}</h3>}><span>{row.valeur.substring(0,20)}</span></Tooltip>) }
                </TableCell>
                {/* nb de courses */}
                <TableCell align="right">{row.nbCourse}</TableCell>
                {/* gagnant */}
                { (row.gagnant >= 80) && (<TableCell align="right" style= {{color:"#1AA001"}}>{row.gagnant} %</TableCell>) }
                { (row.gagnant < 80) && (row.gagnant >= 50) && (<TableCell align="right" style= {{color:"#FF9200"}}>{row.gagnant} %</TableCell>) }
                { (row.gagnant < 50) && (<TableCell align="right" style= {{color: "#D50000"}}>{row.gagnant} %</TableCell>) }
                {/* place */}
                { (row.place >= 80) && (<TableCell align="right" style= {{color:"#1AA001"}}>{row.place} %</TableCell>) }
                { (row.place < 80) && (row.place >= 50) && (<TableCell align="right" style= {{color:"#FF9200"}}>{row.place} %</TableCell>) }
                { (row.place < 50) && (<TableCell align="right" style= {{color: "#D50000"}}>{row.place} %</TableCell>) }
                {/* show */}
                { (row.show >= 80) && (<TableCell align="right" style= {{color:"#1AA001"}}>{row.show} %</TableCell>) }
                { (row.show < 80) && (row.show >= 50) && (<TableCell align="right" style= {{color:"#FF9200"}}>{row.show} %</TableCell>) }
                { (row.show < 50) && (<TableCell align="right" style= {{color: "#D50000"}}>{row.show} %</TableCell>) }
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}