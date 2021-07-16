import React from "react";
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

//https://github.com/gregnb/mui-datatables/blob/master/README.md

class TableHistoriqueSelection extends React.Component {
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
        label: "Date",
        name: "date",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (data, tableMeta) => {
            return (
              <div style={{cursor:"pointer"}}>
              <span>{data}</span><br/>
              <Typography color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">{tableMeta.rowData[2]}</Typography>
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
        label: "Réunion",
        name: "hippodrome",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (data, tableMeta) => {
          var display = tableMeta.rowData[4];  
          var course = tableMeta.rowData[4]; 
          if (course.length > 30)
            display = course.substring(0,29).concat('...')
          return (
            <div style={{cursor:"pointer"}}>
            <span>{data}</span><br/>
            <Tooltip arrow title={<h3>{course}</h3>}>
            <Typography color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">{tableMeta.rowData[3] + " - " + display}</Typography>
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
        label: "Heure",
        name: "heure",
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
          };
        },
      }
      },
      {
        label: "Course",
        name: "course",
        options: {
          display: false,
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
              style: defaultHeaderStyle 
          };
        },
      }
      },

      {
        label: " ",
        name: "nomCourse",
        options: {
          display: false,
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
              style: defaultHeaderStyle 
          };
        },
      }
      },

      {
        label: " ",
        name: "partants",
        options: {
          display: false,
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
    expandableRows: true,
    expandableRowsOnClick: true,
    pagination: true,
    viewColumns: false,
    print: false,
    download: false,
    sort: false,
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
      const colSpan = rowData.length + 1;

      var obj = JSON.parse(JSON.stringify(rowData[5].props.children));
      var arr = Object.values(obj);
      const data = arr;



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
          name: "trotteur",
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
          label: "Résultat",
          name: "etat",
          options: {
            filter: false,
            sort: false,
            customBodyRender: (data, tableMeta) => {
              if(data == "PERDANT"){
              return (
                <div style={{cursor:"pointer"}}>
                <span align="right" style={{color:"#D50000"}}>{data}</span>
              </div>
              )
              }else{
                return (
                  <div style={{cursor:"pointer"}}>
                  <span align="right" style={{color:"#3F51B5"}}>{data}</span>
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
        search: false
      };

      return (
        <TableRow>
        <TableCell colSpan={colSpan}>
          {/* Custom expandable row option. Data: {JSON.stringify(rowData)} */}
          <div>
          <MUIDataTable
          data={data}
          columns={columns}
          options={options}
          /></div>
        </TableCell>
      </TableRow>
       
      );
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

export default TableHistoriqueSelection;
