import React from "react";
import TodayIcon from '@material-ui/icons/Today';
import EventIcon from '@material-ui/icons/Event';
import Tooltip from '@material-ui/core/Tooltip';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';

  const defaultCellStyle = { fontSize: '14px', cursor:"pointer" }
  const delimitCellStyle = { fontSize: '14px', borderLeftStyle:"solid", borderLeftWidth:"1px",cursor:"pointer", borderColor:"#E0E0E0" }

  // {index, name, label, display, empty, filter, sort, print, searchable, download, viewColumns, sortDirection, customHeadRender, customBodyRender, setCellProps, setCellHeaderProps}
  export const columns = [
    
    {
      label: "Actualisation",
      name: "date",
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
      label: "Sélection",
      name: "label",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data) => {
          return (
            <Tooltip arrow title={<h3>{data}</h3>}>
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
      label: "Description",
      name: "description",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[3];

          return (
            <Tooltip arrow title={<h3>{test}</h3>}>
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
      label: "Requete",
      name: "requete",
      options: {
        display:false,
        filter: false,
        sort: false,
        customBodyRender: (data) => {
          return (
            <Tooltip arrow title={<h3>lysées</h3>}>
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
      label: "Pari",
      name: "pari",
      options: {
        display:true,
        filter: false,
        sort: false,
        customBodyRender: (data) => {
          return (
            <Tooltip arrow title={<h3>Type de pari</h3>}>
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
      label: "Réussite",
      name: "reussite",
      options: {
        display:true,
        filter: false,
        sort: false,
        customBodyRender: (data) => {
          if (data >= 0 && data < 30) {
            return (
              <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>Pourcentage de réussite</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                  <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>Pourcentage de réussite</h3>}>
                  <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                  </Tooltip>
                )}
                else{

              return (
                <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>Pourcentage de réussite</h3>}>
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
      label: "Rendement",
      name: "rendement",
      options: {
        display:true,
        filter: false,
        sort: false,
        customBodyRender: (data) => {

          if (data < -2) {
            return (
              <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>Rendement</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
            )}
            else {

              if (data >= -2 && data < 0) {
                return (
                  <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>Rendement</h3>}>
                  <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                  </Tooltip>
                )}
                else{

              return (
                <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>Rendement</h3>}>
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
      label: "Solde",
      name: "gain",
      options: {
        display:true,
        filter: false,
        sort: false,
        customBodyRender: (data) => {
          if (data < -2) {
            return (
              <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>Gain / Perte</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} €</span>
              </Tooltip>
            )}
            else {

              if (data >= -2 && data < 0) {
                return (
                  <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>Gain / Perte</h3>}>
                  <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} €</span>
                  </Tooltip>
                )}
                else{

              return (
                <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>Gain / Perte</h3>}>
                <span style= {{color:"#1AA001"}}> {data.toString().replace(".",",")} €</span>
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
      label: "id",
      name: "id",
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

   
    {
      label: "",
      name: "",
      options: {
        display:true,
        filter: false,
        sort: false,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[8];
          return (
            <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>Détails</h3>}>
            <TimelineOutlinedIcon/>
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
      label: "",
      name: "",
      options: {
        display:true,
        filter: false,
        sort: false,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[8];
          return (
            <Tooltip style={{maxWidth: '600px'}} arrow title={<h3>Supprimer la sélection</h3>}>
            <DeleteOutlineOutlinedIcon/>
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


  ];

 