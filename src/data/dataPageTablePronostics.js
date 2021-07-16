import React from "react";
import Tooltip from '@material-ui/core/Tooltip';

  const defaultCellStyle = { fontSize: '12px' }

  // {index, name, label, display, empty, filter, sort, print, searchable, download, viewColumns, sortDirection, customHeadRender, customBodyRender, setCellProps, setCellHeaderProps}
  export const columns = [
    {
      label: "Date",
      name: "date",
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
        filter: true,
        sort: true,
        customBodyRender: (data) => {
          var display = data
          if (data.length > 7)
            display = data.substring(0,7).concat('...')
          return (
            <Tooltip arrow title={<h3>{data}</h3>}>
            <span>{display}</span>
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
      label: "Course",
      name: "course",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data) => {
          var display = data
          if (data.length > 30)
            display = data.substring(0,30).concat('...')
          return (
            <Tooltip arrow title={<h3>{data}</h3>}>
            <span>{display}</span>
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
      label: "Heure",
      name: "heure",
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
      label: "Numero",
      name: "combinaison",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data) => {
          return (
             <span>N°{data}</span>
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
    }
  ];

 