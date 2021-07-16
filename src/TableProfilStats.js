import React from "react";
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';


//https://github.com/gregnb/mui-datatables/blob/master/README.md

class TableProfilStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      donnees : this.props.donnees,
      
    }
  }
  render() {
    let glExpendableRows = ""
    const defaultCellStyle = { fontSize: '14px' }
    const defaultHeaderStyle = { fontSize: '14px', align:"center" }

    const columns = [
     
      {
        label: " ",
        name: "valeur",
        options: {
          filter: true,
          sort: false,
          customBodyRender: (data, tableMeta) => {
          var display = data;  
          var valeur = data; 
          if (valeur.length > 30)
            display = valeur.substring(0,29).concat('...')
          return (
            <div style={{cursor:"pointer"}}>
            <Tooltip arrow title={<h3>{valeur}</h3>}>
            <span>{display}</span>
            </Tooltip>
          </div>
          )

          },
          setCellProps: () => {
            return {
             style: {width:"350px"} 
            };
          },
          setCellHeaderProps: () => {
            return {
          };
        },
      }
      },
      {
        label: "Nbre.",
        name: "occurrence",
        options: {
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
          };
        },
      }
      },
      {
        label: "Gagnant",
        name: "reussite",
        options: {
          filter: false,
          sort: true,
          customBodyRender: (data) => {
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
              style: defaultHeaderStyle 
          };
        },
      }
      },

      {
        label: "Placé",
        name: "reussitePlace",
        options: {
          filter: false,
          sort: true,
          customBodyRender: (data) => {
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
              style: defaultHeaderStyle 
          };
        },
      }
      },
 
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
    download: false,
    sort: true,
    filter: false,
    search: false,
    textLabels: {
      body: {
        noMatch: "Aucune données",
      },
      pagination: {
        next: "Suivant",
        previous: "Retour",
        rowsPerPage: "ligne par page:",
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
    renderExpandableRow: (rowData, rowMeta) => {
      
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

 { (this.props.donnees != null) && (
      <MuiThemeProvider theme={theme}>
      <MUIDataTable title={""} data={this.props.donnees}
      columns={columns} options={options} />
 </MuiThemeProvider> ) }
      { (this.props.donnees == null) && (<center><CircularProgress disableShrink /></center>) }
    </div>
    );

  }
}

export default TableProfilStats;
