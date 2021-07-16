import React from "react";
import Rating from '@material-ui/lab/Rating';


  const defaultCellStyle = { fontSize: '14px'}


  // {index, name, label, display, empty, filter, sort, print, searchable, download, viewColumns, sortDirection, customHeadRender, customBodyRender, setCellProps, setCellHeaderProps}
  export const columns = [
    {
      label: "requete",
      name: "requete",
      options: {
        filter: true,
        display: false,
        sort: true,
        customBodyRender: (data) => {
          return (
          <span>{data}</span>
             
          )
        },
        setCellProps: () => {
          return {
           align:'left',
           style: defaultCellStyle 
          };
        },
        setCellHeaderProps: () => {
          return {
            align: 'left',
            style: defaultCellStyle 
        };
      },
    }
    },
    {
      label: "id",
      name: "id",
      options: {
        filter: true,
        display: false,
        sort: true,
        customBodyRender: (data) => {
          return (
          <span>{data}</span>
             
          )
        },
        setCellProps: () => {
          return {
           align:'left',
           style: defaultCellStyle 
          };
        },
        setCellHeaderProps: () => {
          return {
            align: 'left',
            style: defaultCellStyle 
        };
      },
    }
    },
    {
      label: "Pari",
      name: "type",
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
           style: defaultCellStyle 
          };
        },
        setCellHeaderProps: () => {
          return {
            align: 'left',
            style: defaultCellStyle 
        };
      },
    }
    },
    {
      label: "Exp.",
      name: "tck",
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
         align:'left',
         style: defaultCellStyle 
        };
      },
      setCellHeaderProps: () => {
        return {
          align:'left',
          style: defaultCellStyle 
      };
    },
    }
    },
    {
      label: "R.",
      name: "reussite",
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
          align:'left',
         style: defaultCellStyle 
        };
      },
      setCellHeaderProps: () => {
        return {
          align:'left',
          style: defaultCellStyle 
      };
    },
    }
    },
    {
      label: "Rde.",
      name: "rde",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data) => {
          if (data > 0) {
            return (
              <span style= {{color:"#1AA001"}}> {data.toString().replace(".",",")} %</span>
            )}
            else {
              return (
                <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              ) 
            }
      },
      setCellProps: () => {
        return {
          align:'left',
         style: defaultCellStyle 
        };
      },
      setCellHeaderProps: () => {
        return {
          align:'left',
          style: defaultCellStyle 
      };
    },
    }
    },
    {
      label: "Gain",
      name: "solde",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data) => {
          if (data > 0) {
            return (
              <span style= {{color:"#1AA001"}}> {data.toString().replace(".",",")} €</span>
            )}
            else {
              return (
                <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} €</span>
              ) 
            }
      },
      setCellProps: () => {
        return {
          align:'left',
         style: defaultCellStyle 
        };
      },
      setCellHeaderProps: () => {
        return {
          align:'left',
          style: defaultCellStyle 
      };
    },
    }
    },
    {
      label: "Score",
      name: "score",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data) => {
          return (
            <Rating name="read-only" value={data} readOnly />
               
            )
          
      },
      setCellProps: () => {
        return {
          align:'left',
         style: defaultCellStyle 
        };
      },
      setCellHeaderProps: () => {
        return {
          align:'left',
          style: defaultCellStyle 
      };
    },
    }
    },
  ];

 