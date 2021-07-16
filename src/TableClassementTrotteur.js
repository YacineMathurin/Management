import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Rating from '@material-ui/lab/Rating';
import MUIDataTable from "mui-datatables";
import React from "react";
import * as Const from './Constant';
import ExtensionIcon from '@material-ui/icons/Extension';
import EventIcon from '@material-ui/icons/Event';
import Typography from '@material-ui/core/Typography';

//https://github.com/gregnb/mui-datatables/blob/master/README.md

const originalFetch = require('isomorphic-fetch');
const fetch = require('fetch-retry')(originalFetch);

class TableClassementTrotteur extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey : props.apiKey,
      synthese : this.props.synthese,
    }
  }

  redirection(date, trotteur){
    this.props.callbackToRecherche(date, "Trotteur.Nom == " + trotteur)
  }

  callbackDetailsSelection(data, expandedRows) {
    // save the expandedRows
    // expandedRows is string format
    var arr = []
    var tmp = JSON.parse(expandedRows)
    for (var i=0; i < tmp.length; i++) {
      arr.push(tmp[i]['index'])
    }
    localStorage.setItem('expandedRows', JSON.stringify(arr))
    this.props.callbackDetailsSelection(data)
  }

  componentWillReceiveProps(props) {
    this.setState({ synthese: props.synthese })
    
  }

  componentDidMount() {
    /*fetch(Const.URL_WS_SYNTHESE + `?token=${this.state.apiKey}&TYPE=JOUR`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
      this.setState({ synthese: data})
      }
    })
    .catch((error) => {
      console.log('Request failed', error)
    })*/
  } 

  render() {
  
  let glExpendableRows = "" // keep track of the rows expanded (array json > string)
  
  const options = {
    page: localStorage.getItem('page') ? parseInt(JSON.parse(localStorage.getItem('page'))) : 0,
    rowsExpanded: localStorage.getItem('expandedRows') ? JSON.parse(localStorage.getItem('expandedRows')) : [],  // rows expanded at start
    filter: false,
    filterType: 'dropdown',
    responsive: 'scrollFullHeight',
    selectableRowsHeader: false,
    selectableRows: false, // remove checkbox
    expandableRows: false,
    expandableRowsOnClick: false,
    pagination: true,
    viewColumns: false,
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
    isRowExpandable: (dataIndex, expandedRows) => {
      // Prevent expand/collapse of any row if there are 4 rows expanded already (but allow those already expanded to be collapsed)
      //if (expandedRows.data.length > 4 && expandedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
      glExpendableRows = JSON.stringify(expandedRows['data'])
      return true;
    },
    onChangePage: (page) => {
      localStorage.setItem('page', JSON.stringify(page))
    },
    // none : rowsExpanded: [0, 1],
    renderExpandableRow: (rowData, rowMeta) => {
     
    },
    //onRowsExpand: (curExpanded, allExpanded) => console.log(curExpanded, allExpanded)

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

    const defaultCellStyle = { fontSize: '14px' }
    
    const columns = [
    
      {
        label: "Date",
        name: "type",
        options: {
          display:false,
          filter: true,
          sort: false,
          customBodyRender: (data) => {
            if (data == "AUJOURD'HUI") {
              return (
                <Tooltip title="Aujourd'hui">
               <span style={{fontSize:"18px"}}>{new Date().toLocaleDateString("fr-FR", options)}</span>
               </Tooltip>
              )}
              else {
  
                return (
                  <Tooltip title="Demain">
                  <EventIcon/>
                  </Tooltip>
                ) 
               
              }
          },
  
          
          setCellProps: () => {
            return {
             style: defaultCellStyle 
            };
          },
          setCellHeaderProps: () => {
            return {
              style: defaultCellStyle 
          };
        },
      }
      },
      {
        label: "Hippodrome",
        name: "hippodrome",
        options: {
          display:false,
          filter: true,
          sort: false,
          customBodyRender: (data) => {
            return (
              <span>{data}</span>
            )
          },
          setCellProps: () => {
            return {
             style: defaultCellStyle 
            };
          },
          setCellHeaderProps: () => {
            return {
              style: defaultCellStyle 
          };
        },
      }
      },
      {
        label: " ",
        name: "course",
        options: {
          display:true,
          filter: true,
          sort: false,
          customBodyRender: (data, tableMeta) => {
            return (
              <div onClick={() => this.redirection(tableMeta.rowData[0], tableMeta.rowData[3].replace(/ /g, "_") ) } style={{cursor:"pointer"}}>
              <center><img width="24" src="./images/binoculars2.png"/></center>
              </div>
            )
          },
          setCellProps: () => {
            return {
             style: defaultCellStyle 
            };
          },
          setCellHeaderProps: () => {
            return {
              style: defaultCellStyle 
          };
        },
      }
      },
      {
        label: "Trotteur",
        name: "trotteur",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (data,tableMeta) => {
            var date = tableMeta.rowData[0];
            if (date == "AUJOURD'HUI") {
              date = new Date().toLocaleDateString("fr-FR", options);
            }else{
              var today= new Date()
              date =new Date(today.setDate(today.getDate()+1)).toLocaleDateString("fr-FR", options);
              
              
            }
            return (
               <div style={{cursor:"pointer"}} onClick={() => this.redirection(tableMeta.rowData[0], tableMeta.rowData[3].replace(/ /g, "_")) }>
                 <span>{data}</span><br/>
                 <Typography color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">{date + " - " + tableMeta.rowData[1] + " - " +  tableMeta.rowData[2]} </Typography>
                 
                 
               </div>
               
            )
          },
          setCellProps: () => {
            return {
             style: defaultCellStyle 
            };
          },
          setCellHeaderProps: () => {
            return {
              style: defaultCellStyle 
          };
        },
      }
      },
      {
        label: "Score",
        name: "rating",
        options: {
          display:true,
          filter: false,
          sort: true,
          customBodyRender: (data) => {
            return (
              <Rating name="read-only" value={data} readOnly />
            )
        },
        setCellProps: () => {
          return {
           style: defaultCellStyle 
          };
        },
        setCellHeaderProps: () => {
          return {
            style: defaultCellStyle 
        };
      },
      }
      },
      {
        label: " ",
        name: "numCourse",
        options: {
          display:false,
          filter: false,
          sort: true,
          customBodyRender: (data) => {
           
              return (
                {data}
              )
        },
        setCellProps: () => {
          return {
           style: defaultCellStyle 
          };
        },
        setCellHeaderProps: () => {
          return {
            style: defaultCellStyle 
        };
      },
      }
      },
      
    ];

 
    return (
      <div style={{width:'100%'}}>

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

export default TableClassementTrotteur;
