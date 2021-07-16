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
import Avatar from '@material-ui/core/Avatar';
import EuroOutlinedIcon from '@material-ui/icons/EuroOutlined';
import Badge from '@material-ui/core/Badge';


//https://github.com/gregnb/mui-datatables/blob/master/README.md

const originalFetch = require('isomorphic-fetch');
const fetch = require('fetch-retry')(originalFetch);

class TableBibliotheque extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey : props.apiKey,
      synthese : this.props.synthese,
    }
  }

  redirection(date, hippodrome, course){
    this.props.callbackToRecherche(date, "Hippodrome.Nom == " + hippodrome + " ET Course.Numero == " + course )
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

  retour(data) {
    localStorage.setItem("lastQuery", data);
    this.props.callbackRetourDetails(data)
  }

  componentDidMount() {
   
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
        noMatch: "Aucune sélection trouvée",
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
        label: " ",
        name: "requete",
        options: {
          display:true,
          filter: true,
          sort: false,
          customBodyRender: (data, tableMeta) => {
            var notif = tableMeta.rowData[2];
            return (
              <div onClick={() => this.retour(data) } style={{cursor:"pointer"}}>
              <center>
              <Badge badgeContent={notif} color="primary">
                <img width="24" height="24" src="./images/binoculars2.png"/>
              </Badge>
              </center>
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
        label: "Requête de recherche",
        name: "requete",
        options: {
          display:true,
          filter: false,
          sort: false,
          customBodyRender: (data) => {
            var combi = data;
            if (combi.length > 90)
              combi = combi.substring(0,90).concat('...')
                return (
                  <div  onClick={() => this.retour(data) } style={{cursor:"pointer"}}>
                  <Tooltip arrow title={<h3>{data}</h3>}>
                <span>{combi}</span>
                </Tooltip>
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
        label: "engagement",
        name: "engagement",
        options: {
          display:false,
          filter: false,
          sort: true,
          customBodyRender: (data) => {
            return (
              <Avatar style={{backgroundColor:"#3F51B5", width:"28px", height:"20px"}} variant="square"><span style={{fontSize:"12px"}}>{data}</span></Avatar>
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
        label: "Gagnant",
        name: "reussite",
        options: {
          display:true,
          filter: false,
          sort: true,
          customBodyRender: (data, tableMeta) => {
            return (
              <Rating name="size-medium" value={data} precision={0.5} max={4} readOnly  />
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
        label: "Placé",
        name: "reussitePlace",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (data,tableMeta) => {
            return (
              <Rating name="size-medium" value={data} precision={0.5} max={4} readOnly  />
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
        name: "rendement",
        options: {
          display: false,
          filter: true,
          sort: true,
          customBodyRender: (data,tableMeta) => {
            return (
              <span></span>
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
        name: "rendementPlace",
        options: {
          display: false,
          filter: true,
          sort: true,
          customBodyRender: (data,tableMeta) => {
            return (
              <span></span>
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
        label: "Rde.",
        name: " ",
        options: {
          display: true,
          filter: true,
          sort: true,
          customBodyRender: (data,tableMeta) => {
            var rde = tableMeta.rowData[5];
            var rdePL = tableMeta.rowData[6];

            if(rde > 0 || rdePL > 0){
              return (
                <EuroOutlinedIcon style={{color:"#3F51B5"}} fontSize="small"  />
                )
            }else{
              return (
                <span></span>
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

export default TableBibliotheque;
