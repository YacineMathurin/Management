import React from "react";
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress'

//https://github.com/gregnb/mui-datatables/blob/master/README.md


class TableSyntheseSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // initialized once - need componentWillReceiveProps method to pickup updates
      data: this.props.data
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
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                  <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                )}
                else{

              return (
                <span style= {{color:"#1AA001"}}> {data.toString().replace(".",",")} %</span>
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
              <span style= {{color:"#1AA001"}}> {data.toString().replace(".",",")} %</span>
            )}
            else {
              return (
                <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
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
              <span style= {{color:"#1AA001"}}> {data.toString().replace(".",",")} €</span>
            )}
            else {
              return (
                <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} €</span>
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
    /*{
      name: "id",
      label: ' ',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton onClick={() => this.callbackEditSelection(value) }  color="primary" >
             <VisibilityIcon />
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
    },*/
    {
      name: "id",
      label: " ",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            // onClick={() => window.alert(`Details for row ${tableMeta.rowIndex}`)}
            <IconButton onClick={() => this.callbackDetailsSelection(value) }  color="primary" >
             <VisibilityIcon />
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

  // see comment in constructor
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ data: nextProps.data })
    }
  }

  callbackDetailsSelection(rowIndex) {
    this.props.callbackFunctionDetails(rowIndex)
  }

  callbackEditSelection(rowIndex) {
    this.props.callbackFunctionEdit(rowIndex)
  }

  render() {
  const options = {
    filter: false,
    filterType: 'dropdown',
    responsive: 'scrollFullHeight',
    selectableRowsHeader: false,
    selectableRows:false, // remove checkbox
    expandableRows: false,
    expandableRowsOnClick: false,
    pagination: true,
    viewColumns: false,
    print: false,
    download: false,
    sort: true,
    filter: false,
    search: false,
    textLabels: {
      body: {
        noMatch: "Aucune sélections trouvées",
      },
      pagination: {
        next: "Suivant",
        previous: "Retour",
        rowsPerPage: "Sélection par page:",
        displayRows: "sur",
      }
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

    console.log('table data', this.state.data)
 
    return (
      <div style={{width:'100%'}}>
      { (this.state.data != null) && (
      <MuiThemeProvider theme={theme}>
           <MUIDataTable title={""} 
          data={this.state.data} columns={this.columns} options={options} />
      </MuiThemeProvider> ) }
      { (this.state.data == null) && (<center><CircularProgress disableShrink /></center>) }
    </div>
    );

  }
}

export default TableSyntheseSelection;
