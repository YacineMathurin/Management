import React from "react";
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TestExpendableTable from './TestExpendableTable'

class TestExpendableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{"hippodrome":"Nice", "prix": "Prix des tomates"},
      {"hippodrome":"Cagnes", "prix": "Prix des cerises"}]
    }
  }
 
  defaultCellStyle = { fontSize: '14px' }
  
  columns = [
    {
      label: "Hippodrome",
      name: "hippodrome",
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
        label: "Prix",
        name: "prix",
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
  ];

  render() {
  const options = {
    filter: false,
    filterType: 'dropdown',
    responsive: 'scrollFullHeight',
    selectableRowsHeader: false,
    selectableRows:false, // remove checkbox
    expandableRows: true,
    expandableRowsOnClick: true,
    pagination: true,
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
                <TestExpendableTable/>
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
           <MUIDataTable title={"Top selection courses 14 Mars 2020"} 
          data={this.state.data} columns={this.columns} options={options} />
      </MuiThemeProvider>
    </div>
    )

  }
}

export default TestExpendableTable;
