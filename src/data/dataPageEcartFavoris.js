import React from "react";
import TodayIcon from '@material-ui/icons/Today';
import EventIcon from '@material-ui/icons/Event';
import Tooltip from '@material-ui/core/Tooltip';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

  const defaultCellStyle = { fontSize: '14px', cursor:"pointer" }
  const delimitCellStyle = { fontSize: '14px', borderLeftStyle:"solid", borderLeftWidth:"1px",cursor:"pointer", borderColor:"#E0E0E0" }

  // {index, name, label, display, empty, filter, sort, print, searchable, download, viewColumns, sortDirection, customHeadRender, customBodyRender, setCellProps, setCellHeaderProps}
  export const columns = [
    
    {
      label: "Date",
      name: "date",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (data) => {
          if (data == "AUJOURD'HUI") {
            return (
              <Tooltip title="Aujourd'hui">
             <TodayIcon/>
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
      label: "Prix",
      name: "nom",
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
      label: "N°",
      name: "num",
      options: {
        display:true,
        filter: false,
        sort: false,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[1] + " / " + tableMeta.rowData[2];
          return (
            <div style={{cursor:"pointer"}}>
            <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>{test}</h3>}>
            <span>C{data}</span>
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
            style: defaultCellStyle 
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
        customBodyRender: (data) => {
          return (
            <div style={{cursor:"pointer"}}>
            <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>Heure de départ de la course</h3>}>
            <span>{data}</span>
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
            style: defaultCellStyle 
        };
      },
    }
    },
    {
      label: "Exp.",
      name: "exp",
      options: {
        display: false,
        filter: false,
        sort: true,
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
      label: "G.",
      name: "g",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[5];
          return (
            <div style={{cursor:"pointer"}}>
            <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>{data} gagnants sur {test} courses analysées</h3>}>
            <span>{data}</span>
            </Tooltip>
            </div>
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
      label: "R.",
      name: "reussiteG",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data) => {
          if (data >= 0 && data < 30) {
            return (
              <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>Réussite gagnant du favori</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                  <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>Réussite gagnant du favori</h3>}>
                  <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                  </Tooltip>
                )}
                else{

              return (
                <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>Réussite gagnant du favori</h3>}>
                <span style= {{color:"#1AA001"}}> {data.toString().replace(".",",")} %</span>
                </Tooltip>
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
      label: "Ec.",
      name: "ecartG",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data) => {
          return (
            <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>Ecart gagnant en cours</h3>}>
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
      label: "Max.",
      name: "maxEcartG",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data) => {
          return (
            <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>Ecart max. gagnant rencontré</h3>}>
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
      label: "PL.",
      name: "pl",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[5];
          return (
            <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>{data} placé sur {test} courses analysées</h3>}>
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
      label: "R.",
      name: "reussitePl",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data) => {
          if (data >= 0 && data < 30) {
            return (
              <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>Réussite placé du favori</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                  <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>Réussite placé du favori</h3>}>
                  <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                  </Tooltip>
                )}
                else{

              return (
                <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>Réussite placé du favori</h3>}>
                <span style= {{color:"#1AA001"}}> {data.toString().replace(".",",")} %</span>
                </Tooltip>
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
      label: "Ec.",
      name: "ecartPl",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data) => {
          return (
            <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>Ecart placé en cours</h3>}>
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
      label: "Max.",
      name: "maxEcartPl",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data) => {
          return (
            <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>Ecart max. placé rencontré</h3>}>
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
      label: " ",
      name: "conseil",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data) => {
          if (data == "1") {
            return (
              <Tooltip arrow title={<h3>Favori a étudier</h3>}>
             <ErrorOutlineIcon size="small"/>
             </Tooltip>
            )}
            else {

              return (
                <span></span>
              ) 
             
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

   
  ];

 