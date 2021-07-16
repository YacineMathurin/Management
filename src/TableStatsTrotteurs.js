import React from "react";
import MUIDataTable from "mui-datatables";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { columns } from './data/dataPageStatsTrotteurs';
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import StatsPieChart from './StatsPieChart'
import StatsTable from './StatsTable'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Scrollbars } from 'react-custom-scrollbars';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import LastPerformanceTable from './LastPerformanceTable';
import CurrentStatsTable from './CurrentStatsTable';
import LineChart from './LineChart';

//https://github.com/gregnb/mui-datatables/blob/master/README.md

const originalFetch = require('isomorphic-fetch');
const fetch = require('fetch-retry')(originalFetch);

class TableStatsTrotteurs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey : props.apiKey,
      synthese : this.props.synthese, // synthese = data to display
      openDialogProfil: false,
      statsTable1: null,
      choixStats: "hippodromes",
    }
  }

  componentWillReceiveProps(props){
    this.setState({ synthese: props.synthese})
  }

  handleDialogProfilOpen = () => {
    this.setState({ openDialogProfil: true })
  }

  handleDialogProfilClose = () => {
    this.setState({ statsTable1: null }) // close dialog - reset data
    this.setState({ openDialogProfil: false })
  }

  handleClickHippodromes = () => {
    this.setState({ choixStats: "hippodromes" })
  }
  handleClickDrivers = () => {
    this.setState({ choixStats: "drivers" })
  }
  handleClickEntraineurs = () => {
    this.setState({ choixStats: "entraineurs" })
  }
  handleClickCategories = () => {
    this.setState({ choixStats: "categories" })
  }
  handleClickDistances = () => {
    this.setState({ choixStats: "distances" })
  }
  handleClickFerrages = () => {
    this.setState({ choixStats: "ferrages" })
  }
  render() {
  
  const options = {
    filter: false,
    responsive: 'scrollFullHeight',
    selectableRowsHeader: false,
    selectableRows:false, // remove checkbox
    expandableRows: true,
    expandableRowsOnClick: false,
    pagination: false,
    viewColumns: false,
    rowsPerPage: 20,
    print: false,
    download: false,
    sort: true,
    search: false,
    textLabels: {
      body: {
        noMatch: "Aucun trotteur trouvé",
      },
      pagination: {
        next: "Suivant",
        previous: "Retour",
        rowsPerPage: "lignes par page:",
        displayRows: "sur",
      },
      filter: {
        all: "Tout",
        title: "FILTRES",
        reset: "Effacer",
      },
    },
     setTableProps: () => {
       return {
        size: "small",
       };
     },
      setCellHeaderProps: () => {
        return {
        };
    },
    renderExpandableRow: (rowData, rowMeta) => {
      const colSpan = rowData.length + 1;
      const historique = this.state.synthese[rowMeta.dataIndex]['historique']
      const stats = this.state.synthese[rowMeta.dataIndex]
      
      return (
        <TableRow>
          <TableCell colSpan={colSpan}>
          <Grid container>
          <Grid item xs={12}>
            <LastPerformanceTable data={historique}/>
          </Grid>
          <Grid style={{marginTop:"1em"}} item xs={6}>
            <CurrentStatsTable data={stats}/>
          </Grid>
          <Grid style={{marginTop:"1em"}} item xs={6}>
            <LineChart data={historique}/>  
          </Grid>
          </Grid> 
            
          </TableCell>
        </TableRow>
      );
    },
    // open details statistics page
    // use cellClick to avoid conflict with onRowExpendable
    onCellClick: (cellData, cellMeta) => {
      // https://github.com/gregnb/mui-datatables/issues/425
      // cellMeta.rowIndex = original index
      // cellMeta.dataIndex = index current (after filtering par exemple)
      const trotteurSelect = this.state.synthese[cellMeta.dataIndex]['P_TROTTEUR']
      /*const driverSelect = this.state.synthese[cellMeta.dataIndex]['P_DRIVER']
      const entraineurSelect = this.state.synthese[cellMeta.dataIndex]['P_ENTRAINEUR']*/
      
      // get data
      fetch(`http://vps-17d340a0.vps.ovh.net:8080/profilsWS?token=${this.state.apiKey}&TROTTEUR=${trotteurSelect}`, { retry: 3, retryDelay: 1000 })
      .then(res => res.json())
      .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
        // var tmp1 = { values: [] }
        // data.hippodromes.map((item) => {
        //   tmp1.values.push({
        //     'name': item.valeur,
        //     'nbcourse': item.nbCourse,
        //     'freq': item.frequence
        //   })
        // })
        this.setState({ 'statsTable1': data.profilTrotteur})
      }
      })
      .catch((error) => {
        console.log('Request failed', error)
      })
      this.handleDialogProfilOpen()
    }
    };
  
    const theme = createMuiTheme({
      overrides: {
        MUIDataTableSelectCell: {
          expandDisabled: {
            // Soft hide the button.
            visibility: 'hidden',
          },
        },
      },
    });

    
    return (
      <div style={{width:'100%'}}>
      {/* Section dialog statistics  */}
      <Dialog
      //fullWidth='false'
      maxWidth='1100px'
      open={this.state.openDialogProfil}
      onClose={this.handleDialogProfilClose}
      >
      {(this.state.statsTable1 != null) && ( <div>
      <DialogTitle>Profil du trotteur <span>{ this.state.statsTable1.trotteur }</span>         
        <div align='right'><ButtonGroup variant="text" color="primary">
          <Button onClick={this.handleClickHippodromes}>Par Hippodrome</Button>
          <Button onClick={this.handleClickDistances}>Par Distance</Button>
          <Button onClick={this.handleClickDrivers}>Par Driver</Button>
          <Button onClick={this.handleClickEntraineurs}>Par Entraineur</Button>
          <Button onClick={this.handleClickFerrages}>Par Ferrage</Button>
          <Button onClick={this.handleClickCategories}>Par Catégorie</Button>
        </ButtonGroup></div>
      </DialogTitle>
      <DialogContent dividers>
      <Scrollbars style={{ width: 1100, height: 600 }}>
      <DialogContentText>
        <Grid container>
          <Grid item xs={5}>
          {(this.state.choixStats != null && this.state.choixStats == "hippodromes") && (
            <StatsPieChart data={ this.state.statsTable1.hippodromes }/>
          )}

          {(this.state.choixStats != null && this.state.choixStats == "distances") && (
            <StatsPieChart data={ this.state.statsTable1.distance }/>
          )}

          {(this.state.choixStats != null && this.state.choixStats == "drivers") && (
            <StatsPieChart data={ this.state.statsTable1.drivers }/>
          )}

          {(this.state.choixStats != null && this.state.choixStats == "entraineurs") && (
            <StatsPieChart data={ this.state.statsTable1.entraineur }/>
          )}

          {(this.state.choixStats != null && this.state.choixStats == "ferrages") && (
            <StatsPieChart data={ this.state.statsTable1.deferrage }/>
          )}

          {(this.state.choixStats != null && this.state.choixStats == "categories") && (
            <StatsPieChart data={ this.state.statsTable1.categorie }/>
          )}

          </Grid>
          <Grid item xs={7}>
          {(this.state.choixStats != null && this.state.choixStats == "hippodromes") &&  (
            <StatsTable title="Hippodrome" data={ this.state.statsTable1.hippodromes }/>
          )}

          {(this.state.choixStats != null && this.state.choixStats == "distances") &&  (
            <StatsTable title="Distance" data={ this.state.statsTable1.distance }/>
          )}

          {(this.state.choixStats != null && this.state.choixStats == "drivers") &&  (
            <StatsTable title="Driver" data={ this.state.statsTable1.drivers }/>
          )}

          {(this.state.choixStats != null && this.state.choixStats == "entraineurs") &&  (
            <StatsTable title="Entraineur" data={ this.state.statsTable1.entraineur }/>
          )}

          {(this.state.choixStats != null && this.state.choixStats == "ferrages") &&  (
            <StatsTable title="Ferrage" data={ this.state.statsTable1.deferrage }/>
          )}

          {(this.state.choixStats != null && this.state.choixStats == "categories") &&  (
            <StatsTable title="Catégorie" data={ this.state.statsTable1.categorie }/>
          )}

          </Grid>
        </Grid>
      </DialogContentText>
      </Scrollbars>
      </DialogContent>
      <DialogActions>
      <Button onClick={this.handleDialogProfilClose} color="primary" autoFocus>Fermer</Button>
      </DialogActions> </div>)}
      </Dialog>


      {/* Section table statistics  */}
      { (this.state.synthese != null) && (
      <MuiThemeProvider theme={theme}>
      <MUIDataTable title={""} data={this.state.synthese}
      columns={columns} options={options} />
      </MuiThemeProvider> ) }
      { (this.state.synthese == null) && (<center><CircularProgress disableShrink /></center>) }
      </div>
    );
  }
}

export default TableStatsTrotteurs;
