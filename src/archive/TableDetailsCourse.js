import React from "react";
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { testData, columns } from './data/dataPageTableDetailsCourse';
import Button from '@material-ui/core/Button';

//https://github.com/gregnb/mui-datatables/blob/master/README.md

class TableDetailsCourse extends React.Component {
  constructor(props) {
    super(props);
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
    pagination: false,
    viewColumns: false,
    print: false,
    download: false,
    sort: false,
    filter: false,
    search: false,
     setTableProps: () => {
       return {
        size: "small",
        //  backgroundColor: "#FF000"
       };
     },
      setCellHeaderProps: () => {
        return {
          // backgroundColor: 'red'
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
      <MuiThemeProvider theme={theme}>
           <MUIDataTable title={""} 
          data={testData} columns={columns} options={options} />
      </MuiThemeProvider>
    </div>
    );

  }
}

export default TableDetailsCourse;
