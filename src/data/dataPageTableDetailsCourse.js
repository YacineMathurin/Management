import React from "react";

export const testData = [
  {"champ": "course", "valeur": "Reunion TOTO"},
  {"champ": "gain", "valeur": "16000e"},
  {"champ": "date", "valeur": "2019-11-09"},
  {"champ": "heure", "valeur": "16:30"},
  {"champ": "hippodrome", "valeur": "CHATEAUBRIANT"},
  {"champ": "partant", "valeur": "ELISA DU MOTTAY"},
  {"champ": "partant", "valeur": "TOTO DU MOTTAY"},
  {"champ": "partant", "valeur": "TITI TT"},
  {"champ": "partant", "valeur": "ANOTHER ONE"},
  {"champ": "partant", "valeur": "THE BIG ONE"},
  {"champ": "partant", "valeur": "WINNER A"},
  {"champ": "partant", "valeur": "IDEAS QWER"},
  {"champ": "partant", "valeur": "TITI TT"},
  {"champ": "partant", "valeur": "ANOTHER ONE"},
];


  const defaultCellStyle = { fontSize: '12px', padding: '0px' }

  // {index, name, label, display, empty, filter, sort, print, searchable, download, viewColumns, sortDirection, customHeadRender, customBodyRender, setCellProps, setCellHeaderProps}
  export const columns = [
    {
      label: "Champ",
      name: "champ",
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
      label: "Valeur",
      name: "valeur",
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
    }}
    },
  ];

 