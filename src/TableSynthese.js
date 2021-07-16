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
import DialogTest from './DialogTest';



//https://github.com/gregnb/mui-datatables/blob/master/README.md

const originalFetch = require('isomorphic-fetch');
const fetch = require('fetch-retry')(originalFetch);

class TableSynthese extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey : props.apiKey,
      synthese : this.props.synthese,
      pagination: this.props.pagination,
      openDialog: false,
      nomTrotteur: "",
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
    this.setState({ synthese: props.synthese })
    
  }

  callbackDrawer(trotteur, driver, entraineur, hippodrome){
    this.props.openDrawer(trotteur, driver, entraineur, hippodrome.split(" - ")[0])
  }

  componentDidMount() {
    
  } 

  openWindow = (data) =>{
    this.setState({ openDialog: true})
    this.setState({ nomTrotteur: data})
    this.openDialog = true;
  }

  onCloseDialog = (data) =>{
    this.setState({ openDialog: false})
    this.openDialog = false;
  }

  defaultCellStyle = { fontSize: '14px' }
  defaultCellStyleNumero = { fontSize: '14px', width: "5px" }
  defaultCellStyleColor = { fontSize: '14px', width: "5px", backgroundColor:"red" }
  defaultCellStyleTrotteur = { fontSize: '14px', width: "200px" }
  options = { month: 'long', day: 'numeric' };
  
columns = [
   
  {
    label: "hippodrome",
    name: "hippodrome",
    options: {
      display:false,
      filter: true,
      sort: true,
      customBodyRender: (data,tableMeta) => {
        
        return (
          
           <div>
             
            {data}
             
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
    label: "course",
    name: "course",
    options: {
      display:false,
      filter: true,
      sort: true,
      customBodyRender: (data,tableMeta) => {
        
        return (
          
           <div>
             
            {data}
             
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
      label: "N°",
      name: "num",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (data,tableMeta) => {
          
          return (
            
             <div>
               
               <Avatar style={{backgroundColor:"#3F51B5", width:"34px", height:"34px"}}>{data}</Avatar>  
               
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
      label: "Trotteur",
      name: "trotteur",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (data,tableMeta) => {
          var hippodrome = tableMeta.rowData[0].split(' - ')[0];
          var heure = tableMeta.rowData[0].split(' - ')[1].replace(":","h");
          var numcourse = tableMeta.rowData[1].split(' - ')[0];
          var course = tableMeta.rowData[1].split(' - ')[1];
          return (

             <div style={{cursor:"pointer"}} onClick={() => this.openWindow(data) } >
               <span>{data}</span><br/>
               <Typography noWrap={true} color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">{hippodrome} - {numcourse} - {heure} - {course}</Typography>
              
             </div>
             
          )
        },
        setCellProps: () => {
          return {
           style: this.defaultCellStyleTrotteur 
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
      name: "dai",
      options: {
        display:true,
        filter: true,
        sort: false,
        customBodyRender: (data,tableMeta) => {
        
          if(data >= 50){
          return (
            <Tooltip arrow title={<h3>Taux de disqualification élevé<br/><center>sur les dernières sorties</center><center>{data}%</center></h3>}>
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
    {
      label: "Forme",
      name: "forme",
      options: {
        display:true,
        filter: true,
        sort: true,
        customBodyRender: (data,tableMeta) => {
          

          if (data >= 1 && data < 5) {
          return (
            <Tooltip arrow title={<h3>Indice de Forme du trotteur<br/><center>BON</center></h3>}>
               <TrendingUpIcon style={{color:"#1AA001", width:"32px", height:"32px"}}/>
             </Tooltip>
             
          )
          }if (data >= 5 && data < 9) {
            return (
              <Tooltip arrow title={<h3>Indice de Forme du trotteur<br/><center>MOYEN</center></h3>}>
                <TrendingDownIcon style={{color:"#FF9200", width:"32px", height:"32px"}}/>
              </Tooltip>
              
           )
          }else{
            return (
              <Tooltip arrow title={<h3>Indice de Forme du trotteur<br/><center>MAUVAIS</center></h3>}>
                <TrendingDownIcon style={{color:"#D50000", width:"32px", height:"32px"}}/>
              </Tooltip>
              
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
    {
      label: "Pop.",
      name: "pop",
      options: {
        display:true,
        filter: true,
        sort: true,
        customBodyRender: (data,tableMeta) => {
          if(data == 0){
            return (
              <Tooltip arrow title={<h3>Indice de Popularité du trotteur<br/><center>Aucune donnée</center></h3>}>
                <SentimentSatisfiedIcon style={{color:"grey", width:"32px", height:"32px"}}/>
              </Tooltip>
            )  
          }

        if(data <= 10){
          return (
            <Tooltip arrow title={<h3>Indice de Popularité du trotteur<br/><center>{data}</center></h3>}>
              <EmojiEmotionsOutlinedIcon style={{color:"#1AA001", width:"32px", height:"32px"}}/>
            </Tooltip>
          )
        }
        if(data > 10 && data <= 30){
          return (
            <Tooltip arrow title={<h3>Indice de Popularité du trotteur<br/><center>{data}</center></h3>}>
              <EmojiEmotionsOutlinedIcon style={{color:"#FF9200", width:"32px", height:"32px"}}/>
            </Tooltip>
          )
        }

        if(data > 30){
          return (
            <Tooltip arrow title={<h3>Indice de Popularité du trotteur<br/><center>{data}</center></h3>}>
              <SentimentDissatisfiedOutlinedIcon style={{color:"#D50000", width:"32px", height:"32px"}}/>
            </Tooltip>
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

  
    {
      label: "Score",
      name: "score",
      options: {
        display:true,
        filter: true,
        sort: true,
        customBodyRender: (data,tableMeta) => {
          var couleur = "";
          if(data >= 65){
            couleur = "#1AA001";
          }else if(data < 65 && data >= 50){
            couleur = "#81C784";
          }else if(data < 50 && data >= 20){
            couleur = "#FEB74B";
          }else if(data < 20 & data >= 10 ){
            couleur = "#E37473"
          }else{
            couleur = "#D50000";
          }
          return (
            <Avatar style={{backgroundColor:couleur, width:"50px", height:"20px"}} variant="square">
                 <span style={{color:"white", fontSize:"12px"}}>{data}</span>
            </Avatar>
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
    pagination: this.state.pagination,
    viewColumns: false,
    print: false,
    download: false,
    rowsPerPageOptions: [10,20],
    sort: true,
    search: false,
    textLabels: {
      body: {
        noMatch: "Aucun trotteur trouvé",
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
          size: "small",
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

 { (this.state.synthese != null) && (
      <MuiThemeProvider theme={theme}>
      <MUIDataTable title={""} data={this.state.synthese}
      columns={this.columns} options={options} />
 </MuiThemeProvider> ) }
      { (this.state.synthese == null) && (<center><CircularProgress disableShrink /></center>) }

    { (this.state.openDialog) && (
      <DialogTest open={true} apiKey={this.state.apiKey} onClose={this.onCloseDialog} nomTrotteur={this.state.nomTrotteur}/>
    )}
      
      
    </div>
    );

  }
}

export default TableSynthese;