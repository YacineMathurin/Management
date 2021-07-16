import React from "react";
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { columns } from './data/dataPageHeadToHead';
import CircularProgress from '@material-ui/core/CircularProgress'

class TableHeadToHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey : props.apiKey,
      synthese : this.props.synthese
    }
  }

  componentDidMount() {
    fetch(`http://vps-17d340a0.vps.ovh.net:8080/headToHeadWS?token=${this.state.apiKey}&CLE=1133667`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ synthese: data})
    })
    .catch((error) => {
      console.log('Request failed', error)
    })
  } 

  render() {
  const options = {
    filter: true,
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
    search: true,
    textLabels: {
      body: {
        noMatch: "Aucun résultat trouvé",
      },
      pagination: {
        next: "Suivant",
        previous: "Retour",
        rowsPerPage: "lignes par page:",
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
      console.log(rowData.trotteur);
      const defaultCellStyle = { fontSize: '12px' }

      const columns = [
        {
         name: "date",
         label: "Date",
         options: {
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
              style: defaultCellStyle 
          };
        },
         }
        },
        {
         name: "hippodrome",
         label: "Hippodrome",
         options: {
          filter: false,
          sort: false,
          customBodyRender: (data) => {
            var display = data
            if (data.length > 10)
              display = data.substring(0,7).concat('...')
            return (
              <span>{display}</span>
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
          name: "distance",
          label: "Dist.",
          options: {
           filter: false,
           sort: false,
           customBodyRender: (data) => {
            return (
              <span>{data} m</span>
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
          name: "positionRef",
          label: "Pl.",
          options: {
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
               style: defaultCellStyle 
           };
         },
          }
         },
         {
          name: "etat",
          label: "Statut",
          options: {
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
              style: defaultCellStyle 
          };
        },
          }
         },
         {
          name: "adversaire",
          label: "Trotteur",
          options: {
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
              style: defaultCellStyle 
          };
        },
          }
         },
         {
          name: "positionAd",
          label: "Pl.",
          options: {
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
              style: defaultCellStyle 
          };
        },
          }
         },
       ];
       
       var obj = JSON.parse(JSON.stringify(rowData[7].props.children));
       var arr = Object.values(obj);

       console.log(arr);

       const data = arr;

      
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
/>

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
      <div style={{width:'100%'}}>

 { (this.state.synthese != null) && (
      <MuiThemeProvider theme={theme}>
      <MUIDataTable title={""} data={this.state.synthese}
      columns={columns} options={options} />
 </MuiThemeProvider> ) }
      { (this.state.synthese == null) && (<center><CircularProgress disableShrink /></center>) }

      
    </div>
    );

  }
}

export default TableHeadToHead;
