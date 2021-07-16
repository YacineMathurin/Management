import React from "react";
import TodayIcon from '@material-ui/icons/Today';
import EventIcon from '@material-ui/icons/Event';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';



  const defaultCellStyle = { fontSize: '14px' }
  const options = { month: 'long', day: 'numeric' };

  // {index, name, label, display, empty, filter, sort, print, searchable, download, viewColumns, sortDirection, customHeadRender, customBodyRender, setCellProps, setCellHeaderProps}
  export const columns = [
    
    {
      label: "Date",
      name: "type",
      options: {
        display:false,
        filter: true,
        sort: false,
        customBodyRender: (data) => {
          if (data == "AUJOURD'HUI") {
            return (
              <Tooltip title="Aujourd'hui">
             <span style={{fontSize:"18px"}}>{new Date().toLocaleDateString("fr-FR", options)}</span>
             </Tooltip>
            )}
            else {

              return (
                <Tooltip title="Demain">
                <EventIcon/>
                </Tooltip>
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
            style: defaultCellStyle 
        };
      },
    }
    },
    {
      label: "Hippodrome",
      name: "hippodrome",
      options: {
        display:false,
        filter: true,
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
      label: " ",
      name: "course",
      options: {
        display:true,
        filter: true,
        sort: false,
        customBodyRender: (data) => {
          return (
            <div onClick={() => this.test() } style={{cursor:"pointer"}}>
            <center><img width="24" src="./images/binoculars2.png"/></center>
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
            style: defaultCellStyle 
        };
      },
    }
    },
    {
      label: "Trotteur",
      name: "trotteur",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (data,tableMeta) => {
          var date = tableMeta.rowData[0];
          if (date == "AUJOURD'HUI") {
            date = new Date().toLocaleDateString("fr-FR", options);
          }else{
            var today= new Date()
            date =new Date(today.setDate(today.getDate()+1)).toLocaleDateString("fr-FR", options);
            
            
          }
          return (
             <div>
               <span>{data}</span><br/>
               <Typography color="textSecondary" style={{fontSize:"12px"}} gutterBottom variant="body2">{date + " - " + tableMeta.rowData[1] + " - " +  tableMeta.rowData[2]} </Typography>
               
               
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
            style: defaultCellStyle 
        };
      },
    }
    },
    {
      label: "Score",
      name: "rating",
      options: {
        display:true,
        filter: false,
        sort: true,
        customBodyRender: (data) => {
          return (
            <Rating name="read-only" value={data} readOnly />
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
      label: "Min.",
      name: "minReussite",
      options: {
        display:false,
        filter: false,
        sort: true,
        customBodyRender: (data) => {
          if (data >= 0 && data < 30) {
            return (
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                  <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                )}
                else{

              return (
                <span style= {{color:"#1AA001"}}> {data.toString().replace(".",",")} %</span>
              ) 
                }
            }
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
      label: "Max.",
      name: "maxReussite",
      options: {
        display:false,
        filter: false,
        sort: true,
        customBodyRender: (data) => {
          if (data >= 0 && data < 30) {
            return (
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                  <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                )}
                else{

              return (
                <span style= {{color:"#1AA001"}}> {data.toString().replace(".",",")} %</span>
              ) 
                }
            }
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
      label: "Moy.",
      name: "moyReussite",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data) => {
          if (data >= 0 && data < 30) {
            return (
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
            )}
            else {

              if (data >= 30 && data < 56) {
                return (
                  <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                )}
                else{

              return (
                <span style= {{color:"#1AA001"}}> {data.toString().replace(".",",")} %</span>
              ) 
                }
            }
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
      label: "Med.",
      name: "medReussite",
      options: {
        filter: false,
        display: false,
        sort: true,
        customBodyRender: (data) => {
          if (data >= 0 && data < 30) {
            return (
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
            )}
            else {

              if (data >= 30 && data < 56) {
                return (
                  <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                )}
                else{

              return (
                <span style= {{color:"#1AA001"}}> {data.toString().replace(".",",")} %</span>
              ) 
                }
            }
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
      label: "tableSelection",
      name: "tableSelection",
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
            style: defaultCellStyle 
        };
      },
    }
    },
  ];

 