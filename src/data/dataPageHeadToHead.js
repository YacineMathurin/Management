import React from "react";
import TodayIcon from '@material-ui/icons/Today';
import EventIcon from '@material-ui/icons/Event';
import Tooltip from '@material-ui/core/Tooltip';


  const defaultCellStyle = { fontSize: '14px' }

  export const columns = [
    {
      label: "Trotteur",
      name: "trotteur",
      options: {
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
      label: "S.",
      name: "sexe",
      options: {
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
      label: "A.",
      name: "age",
      options: {
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
      label: "Cot.",
      name: "cote",
      options: {
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
      label: "Duel",
      name: "duel",
      options: {
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
      name: "gagnant",
      options: {
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
      label: "R.",
      name: "pourcentage",
      options: {
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
      label: "test",
      name: "coursesHeadToHead",
      options: {
        display:false,
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
  ];

 