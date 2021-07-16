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
import NumberFormat from 'react-number-format';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

//https://github.com/gregnb/mui-datatables/blob/master/README.md

const originalFetch = require('isomorphic-fetch');
const fetch = require('fetch-retry')(originalFetch);

class TableHistoriqueDriver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey : props.apiKey,
      synthese : this.props.synthese,
      nomDriver: this.props.driver,
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
    expandableRows: true,
    expandableRowsOnClick: true,
    pagination: true,
    viewColumns: false,
    print: false,
    download: false,
    sort: false,
    search: false,
    textLabels: {
      body: {
        noMatch: "Aucune performance trouvée",
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
      const colSpan = rowData.length + 1;
      var obj = JSON.parse(JSON.stringify(rowData[9].props.children));
      var arr = Object.values(obj);
      const data = arr;

      var condition = rowData[10].props.children;

      const defaultCellStyle = { fontSize: '12px' }
      const columns = [
        {
          label: "N°",
          name: "num",
          options: {
            filter: false,
            sort: false,
            customBodyRender: (data, tableMeta) => {
              return (
                <div style={{cursor:"pointer"}}>
                <span>N°{data}</span>
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
            };
          },
        }
        },
        {
          label: "Trotteur",
          name: "trotteurNom",
          options: {
            filter: false,
            sort: false,
            customBodyRender: (data, tableMeta) => {
            
              var gain = tableMeta.rowData[8];
              
              
                return (
                  <div style={{cursor:"pointer"}}>
                    <Tooltip arrow title={<h3>Gain carrière : {gain}</h3>}>
                  <span>{data}</span>
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
            };
          },
        }
        },
        {
          label: "Def.",
          name: "deferrage",
          options: {
            filter: false,
            sort: false,
            customBodyRender: (data, tableMeta) => {
              return (
                <div style={{cursor:"pointer"}}>
                <span>{data}</span>
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
            };
          },
        }
        },
        
        {
          label: "Driver",
          name: "driverNom",
          options: {
            filter: false,
            sort: false,
            customBodyRender: (data, tableMeta) => {
              var codeColor="black";
              
              if(this.state.nomDriver == data){
                return (
                  <div style={{cursor:"pointer"}}>
                  <span style={{color:"#3F51B5"}}><b>{data}</b></span>
                  </div>
                )
              }else{
                return (
                  <div style={{cursor:"pointer"}}>
                  <span style={{color:"black"}}>{data}</span>
                  </div>
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
            };
          },
        }
        },
        {
          label: "Entraineur",
          name: "entraineurNom",
          options: {
            filter: false,
            sort: false,
            customBodyRender: (data, tableMeta) => {
              return (
                <div style={{cursor:"pointer"}}>
                <span>{data}</span>
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
            };
          },
        }
        },
        {
          label: "Cot.",
          name: "cote",
          options: {
            filter: false,
            sort: false,
            customBodyRender: (data, tableMeta) => {
              return (
                <div style={{cursor:"pointer"}}>
                <span>{data}</span>
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
            };
          },
        }
        },
        {
          label: "Pl.",
          name: "place",
          options: {
            filter: false,
            sort: false,
            customBodyRender: (data, tableMeta) => {
              return (
                <div style={{cursor:"pointer"}}>
                <span>{data}</span>
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
            };
          },
        }
        },
        {
          label: "Chrono.",
          name: "chrono",
          options: {
            filter: false,
            sort: false,
            customBodyRender: (data, tableMeta) => {
              return (
                <div style={{cursor:"pointer"}}>
                <span>{data}</span>
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
            };
          },
        }
        },
        {
          label: "Gain",
          name: "allocation",
          options: {
            display: false,
            filter: false,
            sort: false,
            customBodyRender: (data, tableMeta) => {
              return (
                <div style={{cursor:"pointer"}}>
                <span>{data}</span>
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
            };
          },
        }
        },
        
      ];

      const options = {
        filter: false,
        filterType: 'dropdown',
        responsive: 'scrollFullHeight',
        selectableRowsHeader: false,
        selectableRows: false, // remove checkbox
        expandableRows: false,
        expandableRowsOnClick: false,
        pagination: false,
        viewColumns: false,
        print: false,
        download: false,
        sort: false,
        search: false,
        textLabels: {
          body: {
            noMatch: "Aucune données",
          },
        },
        setTableProps: () => {
          return {
           size: "small",
          };
        },
      };

      return (
        <TableRow>
        <TableCell colSpan={colSpan}>
          {/* Custom expandable row option. Data: {JSON.stringify(rowData)} */}
          <div>
          <Card style={{marginBottom:"0.5em"}}>
          <CardContent>
          <span style={{fontSize:"12px"}}>{condition}</span>
          </CardContent>
          </Card>
          
          <MUIDataTable
          style={{marginBottom:"1em"}}
          data={data}
          columns={columns}
          options={options}
          /></div>
        </TableCell>
      </TableRow>
       
      );
      
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
        name: "date",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (data, tableMeta) => {
             
          var date = tableMeta.rowData[0];
          var hippodrome = tableMeta.rowData[3];
          var course = tableMeta.rowData[2];

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
        label: "Hippodrome",
        name: "hippodromeLeTrot",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (data, tableMeta) => {
            var prix = tableMeta.rowData[2];  
            var display = data
            if (data.length > 20)
              display = data.substring(0, 20).concat('...')
              return (
              <div style={{cursor:"pointer"}}>
              <Tooltip arrow title={<h3>{data}<br/>- {prix}</h3>}>
               <span>{display}</span>
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
        label: "Prix",
        name: "course",
        options: {
          display:false,
          filter: false,
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
        label: "Hippodrome",
        name: "hippodromeLeTrot",
        options: {
          display: false,
          filter: false,
          sort: false,
          customBodyRender: (data, tableMeta) => {
          
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
        label: "Disc.",
        name: "discipline",
        options: {
          filter: false,
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
        label: "Dist.",
        name: "distance",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (data) => {
              return (
               <span><NumberFormat value={data} displayType={'text'} thousandSeparator=' '/></span>
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
        label: "Catégorie",
        name: "categorie",
        options: {
          filter: false,
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
        label: "Alloc.",
        name: "allocation",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (data) => {
              return (
               <span><NumberFormat value={data} displayType={'text'} thousandSeparator=' '/></span>
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
        label: "Pl.",
        name: "place",
        options: {
          filter: false,
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
        label: "",
        name: "autresPartants",
        options: {
          display:false,
          filter: false,
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
        label: "",
        name: "condition",
        options: {
          display:false,
          filter: false,
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

export default TableHistoriqueDriver;
