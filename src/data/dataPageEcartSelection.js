import React from "react";
import TodayIcon from '@material-ui/icons/Today';
import EventIcon from '@material-ui/icons/Event';
import Tooltip from '@material-ui/core/Tooltip';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ExtensionIcon from '@material-ui/icons/Extension';
import NumberFormat from 'react-number-format';

  const defaultCellStyle = { fontSize: '14px', cursor:"pointer", textAlign:"left" }
  const delimitCellStyle = { fontSize: '14px', borderLeftStyle:"solid",  textAlign:"left", borderLeftWidth:"1px",cursor:"pointer", borderColor:"#E0E0E0" }

  // {index, name, label, display, empty, filter, sort, print, searchable, download, viewColumns, sortDirection, customHeadRender, customBodyRender, setCellProps, setCellHeaderProps}
  export const columns = [
    {
      label: "criteres",
      name: "criteres",
      options: {
        display: false,
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
      name: "id",
      label: " ",
      options: {
        filter: false,
        sort: false,
        empty: true,
        download: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          let test = tableMeta.rowData[0];
          return (
            <div style={{cursor:"pointer"}}>
            <Tooltip style={{maxWidth: '600px'}} arrow title={<h2><ul>{test.split(":").map((critere) => <li>{critere}</li> ) }</ul></h2>}>
             <ExtensionIcon  color="primary" style={{marginLeft:"0.6em"}} />
            </Tooltip>
            </div>
          );
        }
      },
      setCellProps: () => {
        return {
         style: this.defaultCellStyle 
        };
      },
      setCellHeaderProps: () => {
        return {
          style: this.defaultCellStyle 
      };
    },
    },
    {
      label: "COURSES",
      name: "ticket",
      options: {
        display: true,
        filter: true,
        sort: true,
        customBodyRender: (data) => {
          return (
            <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>Nombre de courses</h3>}>
            <span><NumberFormat value={data} displayType={'text'} thousandSeparator=' '/></span>
            </Tooltip>
          )
        },
        setCellProps: () => {
          return {
           style: delimitCellStyle 
          };
        },
        setCellHeaderProps: () => {
          return {
            marginLeft:"30px",
            style: defaultCellStyle 
        };
      },
    }
    },

    {
      label: "RÉUSSITE",
      name: "reussite",
      options: {
        display: true,
        filter: true,
        sort: true,
        customBodyRender: (data) => {
          if (data >= 0 && data < 30) {
            return (
              <div style={{cursor:"pointer"}}>
              <Tooltip arrow title={<h3>Pourcentage de réussite</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
              </div>
            )}
            else {

              if (data >= 60 && data < 68) {
                return (
                  <div style={{cursor:"pointer"}}>
                  <Tooltip arrow title={<h3>Pourcentage de réussite</h3>}>
                  <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                  </Tooltip>
                  </div>
                )}
                else{

              return (
                <div style={{cursor:"pointer"}}>
                <Tooltip arrow title={<h3>Pourcentage de réussite</h3>}>
                <span style= {{color:"#1AA001"}}> {data.toString().replace(".",",")} %</span>
                </Tooltip>
                </div>
              ) 
                }
            }
        },
        setCellProps: () => {
          return {
           style: delimitCellStyle 
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
      label: "RSI",
      name: "rendement",
      options: {
        display: true,
        filter: true,
        sort: true,
        customBodyRender: (data) => {
          if (data > 0) {
            return (
              <div style={{cursor:"pointer"}}>
              <Tooltip arrow title={<h3>Rendement</h3>}>
              <span style= {{color:"#1AA001"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
              </div>
            )}
            else {
              return (
                <div style={{cursor:"pointer"}}>
                <Tooltip arrow title={<h3>Rendement</h3>}>
                <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
                </Tooltip>
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
            style: defaultCellStyle 
        };
      },
    }
    },

    {
      label: "RAPPORT",
      name: "rapportMoy",
      options: {
        display: true,
        filter: true,
        sort: true,
        customBodyRender: (data) => {
          return (
            <Tooltip arrow title={<h3>Rapport moyen</h3>}>
            <span>{data.toString().replace(".",",")} €</span>
            </Tooltip>
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
      label: "ÉCART",
      name: "ecartEnCours",
      options: {
        display: true,
        filter: true,
        sort: true,
        customBodyRender: (data) => {
          return (
            <Tooltip arrow title={<h3>Écart en cours</h3>}>
            <span>{data}</span>
            </Tooltip>
          )
        },
        setCellProps: () => {
          return {
           style: delimitCellStyle 
           
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
      label: "MAX",
      name: "ecartMax",
      options: {
        display: true,
        filter: true,
        sort: true,
        customBodyRender: (data) => {
          return (
            <Tooltip arrow title={<h3>Écart max. rencontré</h3>}>
            <span>{data}</span>
            </Tooltip>
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
      label: "%",
      name: "ecart",
      options: {
        display: true,
        filter: true,
        sort: true,
        customBodyRender: (data) => {
          if (data >= 0 && data < 30) {
            return (
              <div style={{cursor:"pointer"}}>
              <Tooltip arrow title={<h3>ÉCART / MAX</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
              </div>
            )}
            else {

              if (data >= 60 && data < 68) {
                return (
                  <div style={{cursor:"pointer"}}>
                  <Tooltip arrow title={<h3>ÉCART / MAX</h3>}>
                  <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                  </Tooltip>
                  </div>
                )}
                else{

              return (
                <div style={{cursor:"pointer"}}>
                <Tooltip arrow title={<h3>ÉCART / MAX</h3>}>
                <span style= {{color:"#1AA001"}}> {data.toString().replace(".",",")} %</span>
                </Tooltip>
                </div>
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
      label: "pronostics",
      name: "pronostics",
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
            style: defaultCellStyle 
        };
      },
    }
    },
  
    
  ];

 