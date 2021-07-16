import React from "react";
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { columns } from './data/dataPageTablePronostics';
import CircularProgress from '@material-ui/core/CircularProgress'

//https://github.com/gregnb/mui-datatables/blob/master/README.md

class TablePronostics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pronostics : this.props.pronostics,
      isDL : this.props.isDL,
      isPagination : this.props.isPagination,
      
    }
  }
  render() {
  const options = {
    filter: false,
    filterType: 'dropdown',
    responsive: 'stacked', // truncate le texte si > a taille cellule
    selectableRowsHeader: false,
    selectableRows:false, // remove checkbox
    expandableRows: false,
    expandableRowsOnClick: false,
    pagination: this.state.isPagination,
    viewColumns: false,
    print: false,
    download: this.state.isDL,
    sort: false,
    filter: false,
    search: false,
    textLabels: {
      body: {
        noMatch: "Aucun pronostics trouvés pour les prochaines courses",
      },
      pagination: {
        next: "Suivant",
        previous: "Retour",
        rowsPerPage: "Pronostics par page:",
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
      },
    });

 
    return (
      <div>

 { (this.state.pronostics != null) && (
      <MuiThemeProvider theme={theme}>
      <MUIDataTable title={""} data={this.state.pronostics}
      columns={columns} options={options} />
 </MuiThemeProvider> ) }
      { (this.state.pronostics == null) && (<center><CircularProgress disableShrink /></center>) }

      
    </div>
    );

  }
}

export default TablePronostics;
