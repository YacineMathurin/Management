import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchIcon from '@material-ui/icons/Search';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import React from 'react';



const useStyles = makeStyles({
  
  table: {
    cursor: "pointer",
    // minWidth: "320px",
    // maxWidth: "320px",
  },
  space: {
    lineHeight: '2px',
  },
  saut:{
    marginBottom: '1em',
  },
  tableCell: {
    paddingRight: 1,
    paddingLeft: 1
  },
  numeric: {
    fontSize: 'medium',
  },
  divleft: {
    // float: 'left',
    // verticalAlign: 'middle',
    // textAlign: 'center',
    // marginRight: '10px',
    // marginTop: '8px',
  },
  gagnant: {
    // backgroundColor: "#3F51B5",
  },
  margin: {
    // margin: 1,
  },
  
  place: {
    // backgroundColor: "#3F6AB5",
  },
  codeSelection:{
    fontSize: "1.2em",
  },
  card: {
    // maxWidth: 350,
    // minWidth: 350,
  },

  head:{
    height: 5,
  },

  invisible:{
    // backgroundColor: "#FAFAFA",
  },
  title: {
    // flex: '1 1 100%',
  },
});



const data = [
  {"id":1,"code":"S-0001","utilisateur":"information@dataturf.fr","backtestDTO":[{"id":1,"idSelection":1,"progression":"up","exp":"1 252","pari":"SIMPLE_PLACE","pourcentageReussite":58,"solde":"-5.8","rendement":"36.8","evolution":{"bilan":[{"date":"01/01/2020", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":-1, "mise":"1", "gain":1.80, "solde":230.50},
  {"date":"20/12/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":-1, "mise":"1", "gain":-1, "solde":225.50},
  {"date":"15/12/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":1, "mise":"1", "gain":1.80, "solde":220.50},
  {"date":"12/12/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":1, "mise":"1", "gain":1.20, "solde":225.50},
  {"date":"10/12/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":1, "mise":"1", "gain":28.0, "solde":230.50},
  {"date":"09/12/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":1, "mise":"1", "gain":3.80, "solde":230.50},
  {"date":"01/12/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":1, "mise":"1", "gain":1.60, "solde":230.50},
  {"date":"26/11/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":-1, "mise":"1", "gain":-1, "solde":230.50},
  {"date":"20/11/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":-1, "mise":"1", "gain":-1, "solde":230.50},
  {"date":"15/11/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":-1, "mise":"1", "gain":-1, "solde":230.50},
  {"date":"14/11/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":1, "mise":"1", "gain":3.10, "solde":230.50},
  {"date":"13/11/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":-1, "mise":"1", "gain":-1, "solde":230.50},
  {"date":"08/11/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":1, "mise":"1", "gain":1.80, "solde":230.50},
  {"date":"04/11/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":-1, "mise":"1", "gain":-1, "solde":230.50},
  {"date":"02/11/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":1, "mise":"1", "gain":4.30, "solde":230.50},
  {"date":"15/10/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":1, "mise":"1", "gain":4.80, "solde":230.50},
  {"date":"13/10/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":1, "mise":"1", "gain":2.10, "solde":230.50},
  {"date":"10/10/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":1, "mise":"1", "gain":1.10, "solde":230.50},
  {"date":"08/10/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":-1, "mise":"1", "gain":-1, "solde":230.50},]}}]},
  {"id":2,"code":"S-0452","utilisateur":"information@dataturf.fr","backtestDTO":[{"id":1,"idSelection":1,"progression":"down","exp":"89","pari":"SIMPLE_GAGNANT","pourcentageReussite":86,"solde":"10.8","rendement":"2.5","evolution":{"bilan":[{"date":"01/01/2020", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":-1, "mise":"1", "gain":1.80, "solde":230.50},
  {"date":"20/12/2019", "heure":"13:50", "hippodrome":"VINCENNES", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":1, "mise":"1", "gain":-1, "solde":225.50},
  {"date":"15/12/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":1, "mise":"1", "gain":-1, "solde":220.50},
  {"date":"12/12/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":1, "mise":"1", "gain":2.80, "solde":225.50},
  {"date":"10/12/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":1, "mise":"1", "gain":1.10, "solde":230.50},
  {"date":"09/12/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":-1, "mise":"1", "gain":-1, "solde":230.50},
  {"date":"01/12/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":-1, "mise":"1", "gain":35.80, "solde":230.50},
  {"date":"26/11/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":-1, "mise":"1", "gain":1.80, "solde":230.50},
  {"date":"20/11/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":1, "mise":"1", "gain":10.80, "solde":100.50},
  {"date":"15/11/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":-1, "mise":"1", "gain":-1, "solde":230.50},
  {"date":"14/11/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":1, "mise":"1", "gain":-1, "solde":230.50},
  {"date":"13/11/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":-1, "mise":"1", "gain":-1, "solde":230.50},
  {"date":"08/11/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":-1, "mise":"1", "gain":-1, "solde":230.50},
  {"date":"04/11/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":1, "mise":"1", "gain":-1, "solde":100.50},
  {"date":"02/11/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":-1, "mise":"1", "gain":26.80, "solde":230.50},
  {"date":"15/10/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":-1, "mise":"1", "gain":12.80, "solde":50.50},
  {"date":"13/10/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":-1, "mise":"1", "gain":-1, "solde":230.50},
  {"date":"10/10/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":-1, "mise":"1", "gain":1.50, "solde":230.50},
  {"date":"08/10/2019", "heure":"13:50", "hippodrome":"CABOURG", "course":"C1 - PRIX DU ROC DES OMBRES", "combinaison":"15 - CAPRI DE HOUELLE", "typePari":"SP", "statusPari":1, "mise":"1", "gain":6.50, "solde":230.50},]}}]},  
];



export default function TableSelections(props) {
  const classes = useStyles();
  
  function clickSelection(callbackFunction, data) {
    callbackFunction(data)
  }
  
  function handleClickFavorite(e) {
    alert("chargement des selections favori de l'utilisateur");
  }
  
  function handleClickUp(e) {
    alert("chargement des selections performantes");
  }
  
  function handleClickDown(e) {
    alert("chargement des selections en baisse de forme");
  }
  
  function handleClickSearch(e) {
    // alert("ouverture de la recherche (filterDTF)");
    props.callbackFunctionSelectionSearch()
  }
  
  return (
   <Box style={{height:'75%'}}>
        
   <Card>
   <CardHeader className={classes.head}
  
   action={
    
      <ButtonGroup size="small" aria-label="small outlined button group">
      <IconButton onClick={handleClickFavorite} aria-label="delete" className={classes.margin}>
        <Tooltip placement="left-start" title="mes sélections">
          <FavoriteIcon fontSize="small" />
        </Tooltip>
        </IconButton>
        <IconButton onClick={handleClickUp} aria-label="up" className={classes.margin}>
        <Tooltip placement="top" title="sélections performantes">
          <TrendingUpIcon fontSize="small" />
          </Tooltip>
        </IconButton>
      <IconButton onClick={handleClickDown} aria-label="down" className={classes.margin}>
      <Tooltip placement="top" title="sélections en baisse">
          <TrendingDownIcon fontSize="small" />
          </Tooltip>
        </IconButton>
      <IconButton onClick={handleClickSearch} aria-label="search" className={classes.margin}>
      <Tooltip placement="right-start" title="Recherche">
          <SearchIcon fontSize="small" />
          </Tooltip>
        </IconButton>

        
</ButtonGroup>
    
  }
   
   />
    
       <CardContent> 
      <Table stickyHeader className={classes.table} size='small' >
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}  align="center"><b>Pari</b></TableCell>
            <TableCell className={classes.tableCell} align="center"><b>Exp.</b></TableCell>
            <TableCell className={classes.tableCell} align="center"><b>R.</b></TableCell>
            <TableCell className={classes.tableCell} align="right"><b>Gain</b></TableCell>
            <TableCell className={classes.tableCell} align="right"><b>Rde.</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data.map(row => (
            <TableRow hover="true" key={row.name} onClick={() => clickSelection(props.callbackFunctionSelectionChoose, row)} >
              
              {(row.backtestDTO[0].pari == 'SIMPLE_PLACE') && (
                    <TableCell className={classes.tableCell} align="center"><span style={{fontSize:"1em", color: "#3F51B5"}}>SP</span></TableCell>
              )}
              {(row.backtestDTO[0].pari == 'SIMPLE_GAGNANT') && (
                    <TableCell className={classes.tableCell} align="center"><span style={{fontSize:"1em", color: "#3F51B5"}}>SG</span></TableCell>
              )}

                <TableCell className={classes.tableCell} align="center">
                    
                    <span className={classes.numeric} style={{color:"#7B7B7B", fontSize:"1em"}}>
                       {row.backtestDTO[0].exp}</span>
                 </TableCell>


{(row.backtestDTO[0].pourcentageReussite >= 0 && row.backtestDTO[0].pourcentageReussite < 30 ) && (
  <TableCell className={classes.tableCell} align="center">
  
  <span className={classes.numeric} style={{color:"#D50000", fontSize:"1em"} }>
    {row.backtestDTO[0].pourcentageReussite + " %"}</span>
    </TableCell>
)}
{(row.backtestDTO[0].pourcentageReussite >= 30 && row.backtestDTO[0].pourcentageReussite < 60  ) && (
  <TableCell className={classes.tableCell} align="center">

  <span className={classes.numeric}  style={{color:"#FF9200", fontSize:"1em"}}>
    {row.backtestDTO[0].pourcentageReussite  + " %"}</span>
   
    </TableCell>
)}

{(row.backtestDTO[0].pourcentageReussite >= 60   ) && (
  <TableCell className={classes.tableCell} align="center">

  <span className={classes.numeric}  style={{color:"#1AA001", fontSize:"1em"}}>
    {row.backtestDTO[0].pourcentageReussite  + " %"}</span>
   
    </TableCell>
)}



              {(row.backtestDTO[0].solde >= 0) && (
                    <TableCell className={classes.tableCell} align="right">
                    
                    <span className={classes.numeric} style={{color:"#1AA001", fontSize:"1em"} }>
                      {row.backtestDTO[0].solde + " €"}</span>
                      </TableCell>
              )}
              {(row.backtestDTO[0].solde < 0) && (
                    <TableCell className={classes.tableCell} align="right">
                  
                    <span className={classes.numeric}  style={{color:"#D50000", fontSize:"1em"}}>
                      {row.backtestDTO[0].solde  + " €"}</span>
                     
                      </TableCell>
              )}


              {(row.backtestDTO[0].rendement >= 0) && (
                    <TableCell className={classes.tableCell} align="right">
                    
                    <span className={classes.numeric} style={{color:"#1AA001", fontSize:"1em"} }>
                      {row.backtestDTO[0].rendement + " %"}</span>
                      </TableCell>
              )}
              {(row.backtestDTO[0].rendement < 0) && (
                    <TableCell className={classes.tableCell} align="right">
                  
                    <span className={classes.numeric}  style={{color:"#D50000", fontSize:"1em"}}>
                      {row.backtestDTO[0].rendement  + " %"}</span>
                     
                      </TableCell>
              )}

              
                 
              

                
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </CardContent> 
                
      </Card>
    </Box>
  );
}