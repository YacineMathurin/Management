import React from "react";
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress'

//https://github.com/gregnb/mui-datatables/blob/master/README.md

class TableOptimiseurTrotteur extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optimisation : this.props.optimisation
    }
  }
  render() {

    const defaultCellStyle = { fontSize: '12px' }
    const defaultHeaderStyle = { fontSize: '12px' }

    // {index, name, label, display, empty, filter, sort, print, searchable, download, viewColumns, sortDirection, customHeadRender, customBodyRender, setCellProps, setCellHeaderProps}
    const columns = [
      {
        label: "Trotteur",
        name: "trotteur",
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
             style: defaultCellStyle 
            };
          },
          setCellHeaderProps: () => {
            return {
              style: defaultHeaderStyle 
          };
        },
      }
      },
      {
        label: "Rencontré",
        name: "occurrence",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (data) => {
            return (
              <span style={{marginLeft:"1em"}}>{data}</span>
           )
        },
        setCellProps: () => {
          return {
           style: defaultCellStyle 
          };
        },
        setCellHeaderProps: () => {
          return {
            style: defaultHeaderStyle 
        };
      },
      }
      },
      {
        label: "Pari gagnant",
        name: "gagnant",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (data) => {
            return (
              <span  style={{marginLeft:"1em"}}>{data}</span>
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
        label: "Pari perdant",
        name: "perdant",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (data) => {
            return (
              <span  style={{marginLeft:"1em"}}>{data}</span>
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
        label: "Réussite",
        name: "reussite",
        options: {
          filter: false,
          sort: true,
          customBodyRender: (data) => {
            return (
              <span  style={{marginLeft:"1em"}}>{data + "%"}</span>
           )
        },
        setCellProps: () => {
          return {
           style: defaultCellStyle 
          };
        },
        setCellHeaderProps: () => {
          return {
            style: defaultHeaderStyle 
        };
      },
      }
      }
      
    ];

  const options = {
    filter: false,
    filterType: 'dropdown',
    responsive: 'stacked', // truncate le texte si > a taille cellule
    selectableRowsHeader: false,
    selectableRows:false, // remove checkbox
    expandableRows: false,
    expandableRowsOnClick: false,
    pagination: true,
    viewColumns: false,
    print: false,
    download: true,
    sort: true,
    filter: false,
    search: true,
    textLabels: {
      body: {
        noMatch: "Aucune données",
      },
      pagination: {
        next: "Suivant",
        previous: "Retour",
        rowsPerPage: "information par page:",
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
      <div>

 { (this.state.optimisation != null) && (
      <MuiThemeProvider theme={theme}>
      <MUIDataTable title={""} data={this.state.optimisation}
      columns={columns} options={options} />
 </MuiThemeProvider> ) }
      { (this.state.optimisation == null) && (<center><CircularProgress disableShrink /></center>) }
    </div>
    );

  }
}

export default TableOptimiseurTrotteur;
