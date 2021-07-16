import React from "react";
import ReactDOM from "react-dom";
//import MUIDataTable from "../../src/";
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import { testData, columns } from './data/dataPageUserSelection';
import TestBarChart from './TestBarChart'
import { red } from "@material-ui/core/colors";

class UserSelection extends React.Component {

  render() {
  const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'scrollFullHeight',
    selectableRows:false, // remove checkbox
    expandableRows: true,
    expandableRowsOnClick: true,
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
      font: red,
      overrides: {
        MUIDataTableSelectCell: {
          expandDisabled: {
            // Soft hide the button.
            visibility: 'hidden',
            font: red,
          },
        },
      },
    });

    return (
      <MuiThemeProvider theme={theme}>
        <MUIDataTable title={"Selection strategie Patrick"} data={testData} columns={columns} options={options} />
      </MuiThemeProvider>
    );

  }
}

export default UserSelection;
