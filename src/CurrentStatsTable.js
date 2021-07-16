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

const useStyles = makeStyles({
 
});



export default function CurrentStatsTable(props) {
  const classes = useStyles();

  return (
    <Card style={{cursor:"pointer"}}>
      <CardContent>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell align="right"></TableCell>
              <TableCell>TC</TableCell>
              <TableCell>G</TableCell>
              <TableCell>PL</TableCell>
              <TableCell>GRP</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
            <TableCell><Tooltip arrow title={<h3>Hippodrome</h3>}><span>{props.data["P_HIPPODROME"].substring(0,20)}</span></Tooltip></TableCell>
            <TableCell>{props.data["P_NB_HIPP"]}</TableCell>
            <TableCell>{props.data["P_HIPP_G"]} %</TableCell>
            <TableCell>{props.data["P_HIPP_PL"]} %</TableCell>
            <TableCell>{props.data["P_HIPP_SHOW"]} %</TableCell>
            </TableRow>
            
            <TableRow>
            <TableCell><Tooltip arrow title={<h3>Distance</h3>}><span>{props.data["P_DISTANCE"]} m</span></Tooltip></TableCell>
            <TableCell>{props.data["P_NB_DIST"]}</TableCell>
            <TableCell>{props.data["P_DIST_G"]} %</TableCell>
            <TableCell>{props.data["P_DIST_PL"]} %</TableCell>
            <TableCell>{props.data["P_DIST_SHOW"]} %</TableCell>
            </TableRow>

            <TableRow>
            <TableCell><Tooltip arrow title={<h3>Driver</h3>}><span>{props.data["P_DRIVER"]}</span></Tooltip></TableCell>
            <TableCell>{props.data["P_NB_DRIV"]}</TableCell>
            <TableCell>{props.data["P_DRIV_G"]} %</TableCell>
            <TableCell>{props.data["P_DRIV_PL"]} %</TableCell>
            <TableCell>{props.data["P_DRIV_SHOW"]} %</TableCell>
            </TableRow>

            <TableRow>
            <TableCell><Tooltip arrow title={<h3>Entraineur</h3>}><span>{props.data["P_ENTRAINEUR"]}</span></Tooltip></TableCell>
            <TableCell>{props.data["P_NB_ENTR"]}</TableCell>
            <TableCell>{props.data["P_ENTR_G"]} %</TableCell>
            <TableCell>{props.data["P_ENTR_PL"]} %</TableCell>
            <TableCell>{props.data["P_ENTR_SHOW"]} %</TableCell>
            </TableRow>

            <TableRow>
            <TableCell><Tooltip arrow title={<h3>Driver / Entraineur</h3>}><span>Driver / Entraineur</span></Tooltip></TableCell>
            <TableCell>{props.data["P_NB_DRIV_ENTR"]}</TableCell>
            <TableCell>{props.data["P_DRIV_ENTR_G"]} %</TableCell>
            <TableCell>{props.data["P_DRIV_ENTR_PL"]} %</TableCell>
            <TableCell>{props.data["P_DRIV_ENTR_SHOW"]} %</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}