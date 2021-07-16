import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MUIDataTable from "mui-datatables";
import React from "react";
import * as Const from './Constant';
import ExtensionIcon from '@material-ui/icons/Extension';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Rating from '@material-ui/lab/Rating';
import NumberFormat from 'react-number-format';
import Avatar from '@material-ui/core/Avatar';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import WarningIcon from '@material-ui/icons/Warning';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import SentimentDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentDissatisfiedOutlined';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';



//https://github.com/gregnb/mui-datatables/blob/master/README.md

const originalFetch = require('isomorphic-fetch');
const fetch = require('fetch-retry')(originalFetch);

class TableProgrammeCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey : props.apiKey,
      syntheseCourse : this.props.syntheseCourse,
    }
  }

  callbackDetailsSelection(data, expandedRows) {
    // save the expandedRows
    // expandedRows is string format
    var arr = []
    var tmp = JSON.parse(expandedRows)
    for (var i=0; i < tmp.length; i++) {
      arr.push(tmp[i]['index'])
    }
    localStorage.setItem('expandedRows', JSON.stringify(arr))
    this.props.callbackDetailsSelection(data)
  }

  componentWillReceiveProps(props) {
    this.setState({ syntheseCourse: props.syntheseCourse })
    
  }

  callbackFilterReunion(reunion){
    this.props.callbackFilterReunion(reunion)
  }

  callbackFilterCourse(reunion, numCourse){
    this.props.callbackFilterCourse(reunion, numCourse)
  }

  callbackDrawer(trotteur, driver, entraineur, hippodrome){
    this.props.openDrawer(trotteur, driver, entraineur, hippodrome.split(" - ")[0])
  }

  componentDidMount() {
    /*fetch(Const.URL_WS_SYNTHESE + `?token=${this.state.apiKey}&TYPE=JOUR`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
      this.setState({ synthese: data})
      }
    })
    .catch((error) => {
      console.log('Request failed', error)
    })*/
  } 


  defaultCellStyle = { fontSize: '14px' }
  defaultCellStyleNumero = { fontSize: '14px', width: "5px" }
  defaultCellStyleColor = { fontSize: '14px', width: "5px", backgroundColor:"red" }
  defaultCellStyleTrotteur = { fontSize: '14px', width: "200px" }
  options = { month: 'long', day: 'numeric' };
  
columns = [
  {
    label: " ",
    name: "reunion",
    options: {
      display:false,
      filter: true,
      sort: true,
      customBodyRender: (data,tableMeta) => {
      
        return (
           <div>
             <span>{data}</span>  
           </div>
           
        )
      },
      setCellProps: () => {
        return {
         style: this.defaultCellStyleNumero
        };
      },
      setCellHeaderProps: () => {
        return {
          style: this.defaultCellStyle 
      };
    },
  }
  },

  {
    label: " ",
    name: "numCourse",
    options: {
      display:false,
      filter: true,
      sort: true,
      customBodyRender: (data,tableMeta) => {
      
        return (
           <div>
             <span>{data}</span>  
           </div>
           
        )
      },
      setCellProps: () => {
        return {
         style: this.defaultCellStyleNumero
        };
      },
      setCellHeaderProps: () => {
        return {
          style: this.defaultCellStyle 
      };
    },
  }
  },

  

  {
    label: " ",
    name: "course",
    options: {
      display:false,
      filter: true,
      sort: true,
      customBodyRender: (data,tableMeta) => {
      
        return (
           <div>
             <span>{data}</span>  
           </div>
           
        )
      },
      setCellProps: () => {
        return {
         style: this.defaultCellStyleNumero
        };
      },
      setCellHeaderProps: () => {
        return {
          style: this.defaultCellStyle 
      };
    },
  }
  },

    {
      label: "Course",
      name: "hippodrome",
      options: {
        display:true,
        filter: false,
        sort: false,
        customBodyRender: (data,tableMeta) => {
          var reunion = tableMeta.rowData[0];
          var numCourse = tableMeta.rowData[1];
          var course = tableMeta.rowData[2];
          var condition = tableMeta.rowData[4];
          var combi = course;
          if (combi.length > 38)
            combi = combi.substring(0,38).concat('...')
          
          return (
            <Tooltip arrow title={<h3>{condition}<br/><br/><center>CLIQUEZ POUR FILTRER</center></h3>}>
            <div style={{cursor:"pointer"}} >
          <span  onClick={() => this.callbackFilterReunion(reunion) }>{reunion} - {data}</span><br/>
          <Typography onClick={() => this.callbackFilterCourse(reunion, numCourse)} noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">C{numCourse} - {combi}</Typography>
          </div>
          </Tooltip>   
          )
        },
        setCellProps: () => {
          return {
           style: this.defaultCellStyleNumero
          };
        },
        setCellHeaderProps: () => {
          return {
            style: this.defaultCellStyle 
        };
      },
    }
    },

    {
      label: " ",
      name: "condition",
      options: {
        display:false,
        filter: false,
        sort: false,
        customBodyRender: (data,tableMeta) => {
        
          return (
             <div>
               <span>{data}</span>  
             </div>
             
          )
        },
        setCellProps: () => {
          return {
           style: this.defaultCellStyleNumero
          };
        },
        setCellHeaderProps: () => {
          return {
            style: this.defaultCellStyle 
        };
      },
    }
    },

    {
      label: "Départ",
      name: "heure",
      options: {
        display:true,
        filter: false,
        sort: false,
        customBodyRender: (data,tableMeta) => {
        
          return (
             <div>
               <span>{data}</span>  
             </div>
             
          )
        },
        setCellProps: () => {
          return {
           style: this.defaultCellStyleNumero
          };
        },
        setCellHeaderProps: () => {
          return {
            style: this.defaultCellStyle 
        };
      },
    }
    },

    {
      label: "Discipline",
      name: "discipline",
      options: {
        display:true,
        filter: false,
        sort: false,
        customBodyRender: (data,tableMeta) => {
        
          return (
             <div>
               <span>{data}</span>  
             </div>
             
          )
        },
        setCellProps: () => {
          return {
           style: this.defaultCellStyleNumero
          };
        },
        setCellHeaderProps: () => {
          return {
            style: this.defaultCellStyle 
        };
      },
    }
    },
    
    {
      label: "Partant",
      name: "partant",
      options: {
        display:true,
        filter: false,
        sort: false,
        customBodyRender: (data,tableMeta) => {
        
          return (
             <div>
               <span>{data}</span>  
             </div>
             
          )
        },
        setCellProps: () => {
          return {
           style: this.defaultCellStyleNumero
          };
        },
        setCellHeaderProps: () => {
          return {
            style: this.defaultCellStyle 
        };
      },
    }
    },

    {
      label: "Distance",
      name: "distance",
      options: {
        display:true,
        filter: false,
        sort: false,
        customBodyRender: (data,tableMeta) => {
        
          return (
             <div>
               <span><NumberFormat value={data} displayType={'text'} thousandSeparator=' '/></span>  
             </div>
             
          )
        },
        setCellProps: () => {
          return {
           style: this.defaultCellStyleNumero
          };
        },
        setCellHeaderProps: () => {
          return {
            style: this.defaultCellStyle 
        };
      },
    }
    },

    {
      label: "Alloc.",
      name: "allocation",
      options: {
        display:true,
        filter: false,
        sort: false,
        customBodyRender: (data,tableMeta) => {
        
          return (
             <div>
               <span><NumberFormat value={data} displayType={'text'} thousandSeparator=' '/></span>  
             </div>
             
          )
        },
        setCellProps: () => {
          return {
           style: this.defaultCellStyleNumero
          };
        },
        setCellHeaderProps: () => {
          return {
            style: this.defaultCellStyle 
        };
      },
    }
    },

    {
      label: "Catégorie",
      name: "categorie",
      options: {
        display:true,
        filter: false,
        sort: false,
        customBodyRender: (data,tableMeta) => {
        
          return (
             <div>
               <span>{data}</span>  
             </div>
             
          )
        },
        setCellProps: () => {
          return {
           style: this.defaultCellStyleNumero
          };
        },
        setCellHeaderProps: () => {
          return {
            style: this.defaultCellStyle 
        };
      },
    }
    },


    {
      label: " ",
      name: "inedit",
      options: {
        display:true,
        filter: false,
        sort: false,
        customBodyRender: (data,tableMeta) => {
        
          if(data >= 20){
            return (
              <Tooltip arrow title={<h3>Taux de chevaux inédit élevé<br/><center>{data}%</center></h3>}>
                 <WarningIcon style={{color:"#D50000", width:"32px", height:"32px"}}/>
               </Tooltip>
               
            )
            }else{
              return (
                <span></span>   
              ) 
            }
        },
        setCellProps: () => {
          return {
           style: this.defaultCellStyleNumero
          };
        },
        setCellHeaderProps: () => {
          return {
            style: this.defaultCellStyle 
        };
      },
    }
    },
  ];

  render() {
  
  let glExpendableRows = "" // keep track of the rows expanded (array json > string)
  
  const options = {
    page: localStorage.getItem('page') ? parseInt(JSON.parse(localStorage.getItem('page'))) : 0,
    rowsExpanded: localStorage.getItem('expandedRows') ? JSON.parse(localStorage.getItem('expandedRows')) : [],  // rows expanded at start
    filter: false,
    filterType: 'dropdown',
    responsive: 'scrollFullHeight',
    selectableRowsHeader: false,
    selectableRows: false, // remove checkbox
    expandableRows: false,
    expandableRowsOnClick: false,
    pagination: true,
    viewColumns: false,
    print: false,
    download: false,
    rowsPerPageOptions: [10,15,20],
    sort: true,
    search: false,
    textLabels: {
      body: {
        noMatch: "Aucune course trouvée",
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
      //if (expandedRows.data.length > 4 && expandedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
      glExpendableRows = JSON.stringify(expandedRows['data'])
      return true;
    },
    onChangePage: (page) => {
      localStorage.setItem('page', JSON.stringify(page))
    },
    // none : rowsExpanded: [0, 1],
    renderExpandableRow: (rowData, rowMeta) => {
      
    },
    //onRowsExpand: (curExpanded, allExpanded) => console.log(curExpanded, allExpanded)

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

 { (this.state.syntheseCourse != null) && (
      <MuiThemeProvider theme={theme}>
      <MUIDataTable title={""} data={this.state.syntheseCourse}
      columns={this.columns} options={options} />
 </MuiThemeProvider> ) }
      { (this.state.syntheseCourse == null) && (<center><CircularProgress disableShrink /></center>) }

      
    </div>
    );

  }
}

export default TableProgrammeCourses;