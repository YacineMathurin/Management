import CircularProgress from '@material-ui/core/CircularProgress';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import MUIDataTable from "mui-datatables";
import React from "react";
import { columns } from './data/dataPageTablePariHistorique';

//https://github.com/gregnb/mui-datatables/blob/master/README.md

class TablePariHistorique extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      histo : this.props.histo
    }
  }
  render() {
  const options = {
    filter: false,
    filterType: 'dropdown',
    // responsive: 'scrollFullHeight', // permets au texte de depasser de la cellule
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
    filter: true,
    search: false,
    textLabels: {
      body: {
        noMatch: "Aucun historique trouvé",
      },
      pagination: {
        next: "Suivant",
        previous: "Retour",
        rowsPerPage: "Course par page:",
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
      if (expandedRows.data.length > 4 && expandedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
      return true;
    },
    // none : rowsExpanded: [0, 1],
    renderExpandableRow: (rowData, rowMeta) => {
      const colSpan = rowData.length + 1;
      return (
        <TableRow>
          <TableCell colSpan={colSpan}>
            {/* Custom expandable row option. Data: {JSON.stringify(rowData)} */}
            <div><h5>
            </h5>
            </div>
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
        MUIDataTableBodyCell: {
          root: {
            whiteSpace: 'nowrap',
            overFlow: 'hidden',
            textOverflow: 'ellipsis' 
          }
        }
      },
    });

 
    return (
      <div>

 { (this.state.histo != null) && (
      <MuiThemeProvider theme={theme}>
      <MUIDataTable title={""} data={this.state.histo}
      columns={columns} options={options} />
    </MuiThemeProvider> ) }
      { (this.state.histo == null) && (<center><CircularProgress disableShrink /></center>) }

      
    </div>
    );

  }
}

export default TablePariHistorique;
