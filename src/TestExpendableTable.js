import React from "react";
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Rating from '@material-ui/lab/Rating';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import TestBarChart from './TestBarChart'

class TestExpendableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          "id": 18143,
          "selec": 4418,
          "type": "SG",
          "tck": 9,
          "reussite": 0,
          "rde": -100,
          "solde": -9,
          "score": 0,
          "requete": "Driver.nom = \"G. R. HUGUET\" ET Entraineur.nom = \"G. R. HUGUET\" ET Hippodrome.nom = \"SAINT-GALMIER\""
        },
        {
          "id": 18144,
          "selec": 3418,
          "type": "SG",
          "tck": 20,
          "reussite": 5,
          "rde": 61.3,
          "solde": 12.26,
          "score": 1,
          "requete": "Driver.nom = \"P.-Y. VERVA\" ET Entraineur.nom = \"J. KOUBICHE\""
        },
        {
          "id": 18145,
          "selec": 4418,
          "type": "SPL",
          "tck": 9,
          "reussite": 0,
          "rde": -100,
          "solde": -9,
          "score": 0,
          "requete": "Driver.nom = \"G. R. HUGUET\" ET Entraineur.nom = \"G. R. HUGUET\" ET Hippodrome.nom = \"SAINT-GALMIER\""
        },
      ]
    }
  }
 
  defaultCellStyle = { fontSize: '14px' }
  
  columns = [
    {
      label: "requete",
      name: "requete",
      options: {
        filter: true,
        display: false,
        sort: true,
        customBodyRender: (data) => {
          return (
          <span>{data}</span>
             
          )
        },
        setCellProps: () => {
          return {
           align:'left',
           style: this.defaultCellStyle 
          };
        },
        setCellHeaderProps: () => {
          return {
            align: 'left',
            style: this.defaultCellStyle 
        };
      },
    }
    },
    {
      label: "id",
      name: "id",
      options: {
        filter: true,
        display: false,
        sort: true,
        customBodyRender: (data) => {
          return (
          <span>{data}</span>
             
          )
        },
        setCellProps: () => {
          return {
           align:'left',
           style: this.defaultCellStyle 
          };
        },
        setCellHeaderProps: () => {
          return {
            align: 'left',
            style: this.defaultCellStyle 
        };
      },
    }
    },
    {
      label: "Pari",
      name: "type",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (data) => {
          return (
          <span>{data}</span>
             
          )
        },
        setCellProps: () => {
          return {
           align:'left',
           style: this.defaultCellStyle 
          };
        },
        setCellHeaderProps: () => {
          return {
            align: 'left',
            style: this.defaultCellStyle 
        };
      },
    }
    },
    {
      label: "Exp.",
      name: "tck",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data) => {
          return (
            <span>{data}</span>
          )
      },
      setCellProps: () => {
        return {
         align:'left',
         style: this.defaultCellStyle 
        };
      },
      setCellHeaderProps: () => {
        return {
          align:'left',
          style: this.defaultCellStyle 
      };
    },
    }
    },
    {
      label: "R.",
      name: "reussite",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data) => {
          if (data >= 0 && data < 30) {
            return (
              <span style= {{color:"#D50000"}}> {data} %</span>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                  <span style= {{color:"#FF9200"}}> {data} %</span>
                )}
                else{

              return (
                <span style= {{color:"#1AA001"}}> {data} %</span>
              ) 
                }
            }
      },
      setCellProps: () => {
        return {
          align:'left',
         style: this.defaultCellStyle 
        };
      },
      setCellHeaderProps: () => {
        return {
          align:'left',
          style: this.defaultCellStyle 
      };
    },
    }
    },
    {
      label: "Rde.",
      name: "rde",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data) => {
          if (data > 0) {
            return (
              <span style= {{color:"#1AA001"}}> {data} %</span>
            )}
            else {
              return (
                <span style= {{color:"#D50000"}}> {data} %</span>
              ) 
            }
      },
      setCellProps: () => {
        return {
          align:'left',
         style: this.defaultCellStyle 
        };
      },
      setCellHeaderProps: () => {
        return {
          align:'left',
          style: this.defaultCellStyle 
      };
    },
    }
    },
    {
      label: "Gain",
      name: "solde",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data) => {
          if (data > 0) {
            return (
              <span style= {{color:"#1AA001"}}> {data} €</span>
            )}
            else {
              return (
                <span style= {{color:"#D50000"}}> {data} €</span>
              ) 
            }
      },
      setCellProps: () => {
        return {
          align:'left',
         style: this.defaultCellStyle 
        };
      },
      setCellHeaderProps: () => {
        return {
          align:'left',
          style: this.defaultCellStyle 
      };
    },
    }
    },
    {
      label: "Score",
      name: "score",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data) => {
          return (
            <Rating name="read-only" value={data} readOnly />
               
            )
          
      },
      setCellProps: () => {
        return {
          align:'left',
         style: this.defaultCellStyle 
        };
      },
      setCellHeaderProps: () => {
        return {
          align:'left',
          style: this.defaultCellStyle 
      };
    },
    }
    },
    {
      name: "Details",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            // onClick={() => window.alert(`Details for row ${tableMeta.rowIndex}`)}
            <IconButton  color="primary" >
             <VisibilityIcon onClick={() => this.callbackDetailsSelection(tableMeta.rowIndex) }/>
            </IconButton >
          );
        }
      },
      setCellProps: () => {
        return {
          align:'left',
         style: this.defaultCellStyle 
        };
      },
      setCellHeaderProps: () => {
        return {
          align:'left',
          style: this.defaultCellStyle 
      };
    },
    },
    {
      name: "Edite",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            // onClick={() => window.alert(`Details for row ${tableMeta.rowIndex}`)}
            <IconButton  color="primary" >
             <EditIcon onClick={() => this.callbackEditSelection(tableMeta.rowIndex) }/>
            </IconButton >
          );
        }
      },
      setCellProps: () => {
        return {
          align:'left',
         style: this.defaultCellStyle 
        };
      },
      setCellHeaderProps: () => {
        return {
          align:'left',
          style: this.defaultCellStyle 
      };
    },
    },
  ];

  callbackDetailsSelection(rowIndex) {
    // this.props.callbackFunctionDetails(rowIndex)
    alert('ne fonctionne pas : mais doit appeler la page Details')
  }

  callbackEditSelection(rowIndex) {
    // this.props.callbackFunctionDetails(rowIndex)
    alert('ne fonctionne pas : mais doit appeler la page Dashboard avec cette query dans la filterbox')
  }

  render() {
  const options = {
    filter: false,
    filterType: 'dropdown',
    responsive: 'scrollFullHeight',
    selectableRowsHeader: false,
    selectableRows:false, // remove checkbox
    expandableRows: true,
    expandableRowsOnClick: true,
    pagination: false,
    viewColumns: false,
    print: false,
    download: false,
    sort: true,
    filter: false,
    search: false,
    setTableProps: () => {
        return { size: "small" };
    },
    isRowExpandable: (dataIndex, expandedRows) => {
        // Prevent expand/collapse of any row if there are 4 rows expanded already (but allow those already expanded to be collapsed)
        if (expandedRows.data.length > 4 && expandedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
        return true;
    },
    rowsExpanded: [],
    renderExpandableRow: (rowData, rowMeta) => {
        const colSpan = rowData.length + 1;
        return (
          <TableRow>
            <TableCell colSpan={colSpan}>
              Query : { rowData[0].props.children }
              <TestBarChart style={{marginTop:'10em'}}/>
            </TableCell>
          </TableRow>
        );
      },
      onRowsExpand: (curExpanded, allExpanded) => console.log(curExpanded, allExpanded)
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
      <MuiThemeProvider theme={theme}>
           <MUIDataTable title={""} 
          data={this.state.data} columns={this.columns} options={options} />
      </MuiThemeProvider>
    </div>
    );

  }
}

export default TestExpendableTable;
