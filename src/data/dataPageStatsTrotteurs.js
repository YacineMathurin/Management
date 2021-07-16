import React from "react";
import TodayIcon from '@material-ui/icons/Today';
import EventIcon from '@material-ui/icons/Event';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import NumberFormat from 'react-number-format';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

  const defaultCellStyle = { fontSize: '14px', cursor:"pointer" }
  const delimitCellStyle = { fontSize: '14px', borderLeftStyle:"solid", borderLeftWidth:"1px",cursor:"pointer", borderColor:"#E0E0E0" }

  export const columns = [
    {
      label: "Date",
      name: "P_DATE",
      options: {
        display: false,
        filter: true,
        sort: false,
        customBodyRender: (data) => {
          if (data == "AUJOURD'HU") {
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
      name: "P_HIPPODROME",
      options: {
        display: false,
        filter: true,
        sort: false,
        customBodyRender: (data) => {
          var display = data
          if (data.length > 10)
            display = data.substring(0,10).concat('...')
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
      name: "P_PRIX",
      options: {
        display:false,
        filter: true,
        sort: false,
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
      label: "Num.",
      name: "P_NUM_COURSE",
      options: {
        display:false,
        filter: false,
        sort: false,
        customBodyRender: (data) => {
            return (
              <Tooltip arrow title={<h3>Course N°{data}</h3>}>
             <span>C{data}</span>
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
      label: "N°",
      name: "P_NUM",
      options: {
        display: true,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let hipp = tableMeta.rowData[5];
            return (
              <Tooltip arrow title={<h3>{hipp}</h3>}>
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
      label: "Trotteur",
      name: "P_TROTTEUR",
      options: {
        display:true,
        filter: false,
        sort: false,
        customBodyRender: (data, tableMeta) => {
          let hipp = tableMeta.rowData[6];
          let def = tableMeta.rowData[9];
          var display = data
          if (data.length > 20)
            display = data.substring(0,20).concat('...')
            return (
              <Tooltip arrow title={<h3>{data} - {hipp}</h3>}>      
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
      label: "PERFORMANCE",
      name: "P_ABRV_MUSIQUE",
      options: {
        display:false,
        filter: false,
        sort: false,
        customBodyRender: (data, tableMeta) => {
          let hipp = tableMeta.rowData[5];
            return (
              <Tooltip arrow title={<h3>{hipp}</h3>}>
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
      label: "SA",
      name: "P_SEXE",
      options: {
        display:true,
        filter: false,
        sort: false,
        customBodyRender: (data, tableMeta) => {
            return (
            <Tooltip arrow title={<h3>Le sexe et âge du trotteur</h3>}>
             <span>{tableMeta.rowData[7]}{tableMeta.rowData[8]}</span>
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
      label: "Age",
      name: "P_AGE",
      options: {
        display:false,
        filter: false,
        sort: false,
        customBodyRender: (data) => {
            return (
              <Tooltip arrow title={<h3>Age du trotteur</h3>}>
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
      label: "DEF.",
      name: "P_DEFERRAGE",
      options: {
        display: false,
        filter: true,
        sort: false,
        customBodyRender: (data) => {
            return (
              <Tooltip arrow title={<h3>Type de déferrage</h3>}>
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
      label: "P.F.",
      name: "P_PREMIER_FER",
      options: {
        display:false,
        filter: false,
        sort: false,
        customBodyRender: (data) => {
            return (
              <Tooltip arrow title={<h3>Le trotteur est déferré pour la première fois</h3>}>
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
      label: "Musique",
      name: "P_MUSIQUE",
      options: {
        display:false,
        filter: false,
        sort: false,
        customBodyRender: (data) => {
            return (
              <Tooltip arrow title={<h3>Les dernières performances du trotteur</h3>}>
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
      label: "Gain",
      name: "P_GAIN",
      options: {
        display:false,
        filter: false,
        sort: true,
        customBodyRender: (data) => {
            return (
              <Tooltip arrow title={<h3>Gain du trotteur</h3>}>
              <span><NumberFormat value={data} displayType={'text'} thousandSeparator=' '/> €</span>
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
      label: "TC",
      name: "P_NB_TROT",
      options: {
        display: true,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[5];
            return (
              <Tooltip arrow title={<h3>Nombre de course du trotteur {test}</h3>}>
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
      label: "G",
      name: "P_TROT_G",
      options: {
        display: true,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[5];

          if (data >= 0 && data < 30) {
            return (
              <Tooltip arrow title={<h3>Pourcentage de course gagnée par le trotteur {test}</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                  <Tooltip arrow title={<h3>Pourcentage de course gagnée par le trotteur {test}</h3>}>
                  <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                  </Tooltip>
                )}
                else{

              return (
               
                <Tooltip arrow title={<h3>Pourcentage de course gagnée par le trotteur {test}</h3>}>
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
      label: "PL",
      name: "P_TROT_PL",
      options: {
        display: true,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[5];
            
          if (data >= 0 && data < 30) {
            return (
              <Tooltip arrow title={<h3>Pourcentage de course placée par le trotteur {test}</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                <Tooltip arrow title={<h3>Pourcentage de course placée par le trotteur {test}</h3>}>
                <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                </Tooltip>
                )}
                else{

              return (
                <Tooltip arrow title={<h3>Pourcentage de course placée par le trotteur {test}</h3>}>
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
      label: "GRP",
      name: "P_TROT_SHOW",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[5];

          if (data >= 0 && data < 30) {
            return (
              <Tooltip arrow title={<h3>Pourcentage de course 'dans les cinq' du trotteur {test}</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                  <Tooltip arrow title={<h3>Pourcentage de course 'dans les cinq' du trotteur {test}</h3>}>
                <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                </Tooltip>
                )}
                else{

              return (
                <Tooltip arrow title={<h3>Pourcentage de course 'dans les cinq' du trotteur {test}</h3>}>
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
      label: "Nb_Hipp.",
      name: "P_NB_HIPP",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[1];
            return (
              <Tooltip arrow title={<h3>Nombre de participation du trotteur sur l'hippodrome de {test}</h3>}>
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
      label: "H_G%",
      name: "P_HIPP_G",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[1];
           
            if (data >= 0 && data < 30) {
              return (
                <Tooltip arrow title={<h3>Pourcentage de réussite 'Gagnant' du trotteur sur l'hippodrome de {test}</h3>}>
                <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
                </Tooltip>
              )}
              else {
  
                if (data >= 30 && data < 60) {
                  return (
                    <Tooltip arrow title={<h3>Pourcentage de réussite 'Gagnant' du trotteur sur l'hippodrome de {test}</h3>}>
                  <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                  </Tooltip>
                  )}
                  else{
  
                return (
                  <Tooltip arrow title={<h3>Pourcentage de réussite 'Gagnant' du trotteur sur l'hippodrome de {test}</h3>}>
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
      label: "H_Pl%",
      name: "P_HIPP_PL",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[1];
            
          if (data >= 0 && data < 30) {
            return (
              <Tooltip arrow title={<h3>Pourcentage de réussite 'Placé' du trotteur sur l'hippodrome de {test}</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                  <Tooltip arrow title={<h3>Pourcentage de réussite 'Placé' du trotteur sur l'hippodrome de {test}</h3>}>
                <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                </Tooltip>
                )}
                else{

              return (
                <Tooltip arrow title={<h3>Pourcentage de réussite 'Placé' du trotteur sur l'hippodrome de {test}</h3>}>
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
      label: "H_Grp%",
      name: "P_HIPP_SHOW",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[1];
          
          if (data >= 0 && data < 30) {
            return (
              <Tooltip arrow title={<h3>Pourcentage de réussite 'Dans les cinq' du trotteur sur l'hippodrome de {test}</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                  <Tooltip arrow title={<h3>Pourcentage de réussite 'Dans les cinq' du trotteur sur l'hippodrome de {test}</h3>}>
                <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                </Tooltip>
                )}
                else{

              return (
                <Tooltip arrow title={<h3>Pourcentage de réussite 'Dans les cinq' du trotteur sur l'hippodrome de {test}</h3>}>
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
      label: "Dist.",
      name: "P_DISTANCE",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          return (
            <Tooltip arrow title={<h3>Distance à parcourir par le trotteur</h3>}>
            <span>{data} m</span>
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
      label: "Nb_Dist.",
      name: "P_NB_DIST",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
              return (
                <Tooltip arrow title={<h3>Nombre course du trotteur avec la même distance (+/- 50 m)</h3>}>
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
      label: "Dist_G%",
      name: "P_DIST_G",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[20];
          
          if (data >= 0 && data < 30) {
            return (
              <Tooltip arrow title={<h3>Pourcentage de réussite 'Gagnant' du trotteur sur la distance de {test} m</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                  <Tooltip arrow title={<h3>Pourcentage de réussite 'Gagnant' du trotteur sur la distance de {test} m</h3>}>
                <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                </Tooltip>
                )}
                else{

              return (
                <Tooltip arrow title={<h3>Pourcentage de réussite 'Gagnant' du trotteur sur la distance de {test} m</h3>}>
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
      label: "Dist_Pl%",
      name: "P_DIST_PL",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[20];
         
          if (data >= 0 && data < 30) {
            return (
              <Tooltip arrow title={<h3>Pourcentage de réussite 'Placé' du trotteur sur la distance de {test} m</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                  <Tooltip arrow title={<h3>Pourcentage de réussite 'Placé' du trotteur sur la distance de {test} m</h3>}>
                <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                </Tooltip>
                )}
                else{

              return (
                <Tooltip arrow title={<h3>Pourcentage de réussite 'Placé' du trotteur sur la distance de {test} m</h3>}>
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
      label: "Dist.Grp%",
      name: "P_DIST_SHOW",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[20];
          
          if (data >= 0 && data < 30) {
            return (
              <Tooltip arrow title={<h3>Pourcentage de réussite 'Dans les cinq' du trotteur sur la distance de {test} m</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                  <Tooltip arrow title={<h3>Pourcentage de réussite 'Dans les cinq' du trotteur sur la distance de {test} m</h3>}>
                <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                </Tooltip>
                )}
                else{

              return (
                <Tooltip arrow title={<h3>Pourcentage de réussite 'Dans les cinq' du trotteur sur la distance de {test} m</h3>}>
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
      label: "Moy_Dist_G",
      name: "P_MOY_DIST_G",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          return (
            <Tooltip arrow title={<h3>Distance moyenne des courses gagnées par le trotteur</h3>}>
            <span><NumberFormat value={data} displayType={'text'} thousandSeparator=' '/> m</span>
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
      label: "Moy_Dist_Pl",
      name: "P_MOY_DIST_PL",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          return (
            <Tooltip arrow title={<h3>Distance moyenne des courses placées par le trotteur</h3>}>
             <span><NumberFormat value={data} displayType={'text'} thousandSeparator=' '/> m</span>
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
      label: "Driver",
      name: "P_DRIVER",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          return (
            <Tooltip arrow title={<h3>Nom du driver / jockey</h3>}>
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
      label: "Nb_Drv",
      name: "P_NB_DRIV",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[27];
          return (
            <Tooltip arrow title={<h3>Nombre de course du trotteur avec le driver / jockey {test}</h3>}>
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
      label: "Drv_G%",
      name: "P_DRIV_G",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[27];
          
          if (data >= 0 && data < 30) {
            return (
              <Tooltip arrow title={<h3>Pourcentage des courses gagnées par le trotteur avec le driver / jockey {test}</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                  <Tooltip arrow title={<h3>Pourcentage des courses gagnées par le trotteur avec le driver / jockey {test}</h3>}>
                <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                </Tooltip>
                )}
                else{

              return (
                <Tooltip arrow title={<h3>Pourcentage des courses gagnées par le trotteur avec le driver / jockey {test}</h3>}>
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
      label: "Drv_Pl%",
      name: "P_DRIV_PL",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[27];
          
          if (data >= 0 && data < 30) {
            return (
              <Tooltip arrow title={<h3>Pourcentage des courses placées par le trotteur avec le driver / jockey {test}</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                  <Tooltip arrow title={<h3>Pourcentage des courses placées par le trotteur avec le driver / jockey {test}</h3>}>
                <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                </Tooltip>
                )}
                else{

              return (
                <Tooltip arrow title={<h3>Pourcentage des courses placées par le trotteur avec le driver / jockey {test}</h3>}>
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
      label: "Drv_Grp%",
      name: "P_DRIV_SHOW",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[27];
          
          if (data >= 0 && data < 30) {
            return (
              <Tooltip arrow title={<h3>Pourcentage des courses 'Dans les cinq' par le trotteur avec le driver / jockey {test}</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                  <Tooltip arrow title={<h3>Pourcentage des courses 'Dans les cinq' par le trotteur avec le driver / jockey {test}</h3>}>
                <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                </Tooltip>
                )}
                else{

              return (
                <Tooltip arrow title={<h3>Pourcentage des courses 'Dans les cinq' par le trotteur avec le driver / jockey {test}</h3>}>
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
      label: "Entraineur",
      name: "P_ENTRAINEUR",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          return (
            <Tooltip arrow title={<h3>Nom de l'entraineur</h3>}>
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
      label: "Nb_Entr",
      name: "P_NB_ENTR",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[32];
          return (
            <Tooltip arrow title={<h3>Nombre de course du trotteur avec l'entraineur {test}</h3>}>
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
      label: "Entr_G%",
      name: "P_ENTR_G",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[32];
          
          if (data >= 0 && data < 30) {
            return (
              <Tooltip arrow title={<h3>Pourcentage des courses gagnées par le trotteur avec l'entraineur {test}</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                  <Tooltip arrow title={<h3>Pourcentage des courses gagnées par le trotteur avec l'entraineur {test}</h3>}>
                <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                </Tooltip>
                )}
                else{

              return (
                <Tooltip arrow title={<h3>Pourcentage des courses gagnées par le trotteur avec l'entraineur {test}</h3>}>
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
      label: "Entr_Pl%",
      name: "P_ENTR_PL",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[32];
          
          if (data >= 0 && data < 30) {
            return (
              <Tooltip arrow title={<h3>Pourcentage des courses placées par le trotteur avec l'entraineur {test}</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                  <Tooltip arrow title={<h3>Pourcentage des courses placées par le trotteur avec l'entraineur {test}</h3>}>
                <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                </Tooltip>
                )}
                else{

              return (
                <Tooltip arrow title={<h3>Pourcentage des courses placées par le trotteur avec l'entraineur {test}</h3>}>
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
      label: "Entr_.Grp%",
      name: "P_ENTR_SHOW",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[32];
          
          if (data >= 0 && data < 30) {
            return (
              <Tooltip arrow title={<h3>Pourcentage des courses 'dans les cinq' par le trotteur avec l'entraineur {test}</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                  <Tooltip arrow title={<h3>Pourcentage des courses 'dans les cinq' par le trotteur avec l'entraineur {test}</h3>}>
                <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                </Tooltip>
                )}
                else{

              return (
                <Tooltip arrow title={<h3>Pourcentage des courses 'dans les cinq' par le trotteur avec l'entraineur {test}</h3>}>
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
      label: "Nb_Drv_Entr",
      name: "P_NB_DRIV_ENTR",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let driver = tableMeta.rowData[27];
          let entr = tableMeta.rowData[32];
          return (
            <Tooltip arrow title={<h3>Nombre de course du trotteur avec le driver {driver} et l'entraineur {entr}</h3>}>
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
      label: "Drv_Entr_G%",
      name: "P_DRIV_ENTR_G",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let driver = tableMeta.rowData[27];
          let entr = tableMeta.rowData[32];
          
          if (data >= 0 && data < 30) {
            return (
              <Tooltip arrow title={<h3>Pourcentage des courses gagnées par le trotteur avec le driver {driver} et l'entraineur {entr}</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                  <Tooltip arrow title={<h3>Pourcentage des courses gagnées par le trotteur avec le driver {driver} et l'entraineur {entr}</h3>}>
                <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                </Tooltip>
                )}
                else{

              return (
                <Tooltip arrow title={<h3>Pourcentage des courses gagnées par le trotteur avec le driver {driver} et l'entraineur {entr}</h3>}>
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
      label: "Drv_Entr_Pl%",
      name: "P_DRIV_ENTR_PL",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let driver = tableMeta.rowData[27];
          let entr = tableMeta.rowData[32];
          
          if (data >= 0 && data < 30) {
            return (
              <Tooltip arrow title={<h3>Pourcentage des courses placées par le trotteur avec le driver {driver} et l'entraineur {entr}</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                  <Tooltip arrow title={<h3>Pourcentage des courses placées par le trotteur avec le driver {driver} et l'entraineur {entr}</h3>}>
                <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                </Tooltip>
                )}
                else{

              return (
                <Tooltip arrow title={<h3>Pourcentage des courses placées par le trotteur avec le driver {driver} et l'entraineur {entr}</h3>}>
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
      label: "Drv_Entr_Grp%",
      name: "P_DRIV_ENTR_SHOW",
      options: {
        display: false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let driver = tableMeta.rowData[27];
          let entr = tableMeta.rowData[32];
          
          if (data >= 0 && data < 30) {
            return (
              <Tooltip arrow title={<h3>Pourcentage des courses 'dans les cinq' par le trotteur avec le driver {driver} et l'entraineur {entr}</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")} %</span>
              </Tooltip>
            )}
            else {

              if (data >= 30 && data < 60) {
                return (
                  <Tooltip arrow title={<h3>Pourcentage des courses 'dans les cinq' par le trotteur avec le driver {driver} et l'entraineur {entr}</h3>}>
                <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")} %</span>
                </Tooltip>
                )}
                else{

              return (
                <Tooltip arrow title={<h3>Pourcentage des courses 'dans les cinq' par le trotteur avec le driver {driver} et l'entraineur {entr}</h3>}>
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
      label: "CR",
      name: "P_CR",
      options: {
        display:true,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[5];
          
          if(data >= -1 && data <= 0 ){
            return (
              <span>-</span>
              
            )}

          if (data > 0 && data <= 8) {
            return (
              <Tooltip arrow title={<h3>Coefficient de réussite du trotteur {test}</h3>}>
              <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")}</span>
              </Tooltip>
            )}
            else {

              if (data > 8 && data < 18) {
                return (
                  <Tooltip arrow title={<h3>Coefficient de réussite du trotteur {test}</h3>}>
                <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")}</span>
                </Tooltip>
                )}
                else{

              return (
                <Tooltip arrow title={<h3>Coefficient de réussite du trotteur {test}</h3>}>
                <span style= {{color:"#1AA001"}}> {data.toString().replace(".",",")}</span>
                </Tooltip>
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
      label: "IF",
      name: "P_IF",
      options: {
        display:true,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[5];
          
          if(data >= -1 && data <= 0 ){
            return (
              <span>-</span>
              
            )}

          if (data > 0 && data <= 4) {
            return (
              <Tooltip arrow title={<h3>Indice de forme du trotteur {test}</h3>}>
              <span style= {{color:"#1AA001"}}> {data.toString().replace(".",",")}</span>
              </Tooltip>
            )}
            else {

              if (data > 4 && data <= 8) {
                return (
                  <Tooltip arrow title={<h3>Indice de forme du trotteur {test}</h3>}>
                <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")}</span>
                </Tooltip>
                )}
                else{

              return (
                <Tooltip arrow title={<h3>Indice de forme du trotteur {test}</h3>}>
                <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")}</span>
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
      label: "CRIF",
      name: "P_CRIF",
      options: {
        display:true,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[5];
          
          if(data >= -1 && data <= 0 ){
            return (
              <span>-</span>
              
            )}

          if (data >= 90 ) {
            return (
              <Tooltip arrow title={<h3>Indice CR*IF du trotteur {test}</h3>}>
              <span style= {{color:"#1AA001"}}> {data.toString().replace(".",",")}</span>
              </Tooltip>
            )}
            else {

              if (data < 90 && data >= 70) {
                return (
                  <Tooltip arrow title={<h3>Indice CR*IF du trotteur {test}</h3>}>
                <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")}</span>
                </Tooltip>
                )}
                else{

              return (
                <Tooltip arrow title={<h3>Indice CR*IF du trotteur {test}</h3>}>
                <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")}</span>
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
      label: "REG",
      name: "P_REG",
      options: {
        display:true,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[5];
          if(data == -1){
            return (
              <span>-</span>
              
            )}

          if (data >= 0 && data <= 1.33) {
            return (
              <Tooltip arrow title={<h3>Indice de régularité du trotteur {test}</h3>}>
              <span style= {{color:"#1AA001"}}> {data.toString().replace(".",",")}</span>
              </Tooltip>
            )}
            else {

              if (data > 1.33 && data < 6) {
                return (
                  <Tooltip arrow title={<h3>Indice de régularité du trotteur {test}</h3>}>
                <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")}</span>
                </Tooltip>
                )}
                else{

              return (
                <Tooltip arrow title={<h3>Indice de régularité du trotteur {test}</h3>}>
                <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")}</span>
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
      label: "IFREG",
      name: "P_IFREG",
      options: {
        display:true,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[5];
          
          if(data >= -1 && data <= 0 ){
            return (
              <span>-</span>
              
            )}

          if (data > 0 && data <= 4) {
            return (
              <Tooltip arrow title={<h3>Indice de forme du trotteur {test}</h3>}>
              <span style= {{color:"#1AA001"}}> {data.toString().replace(".",",")}</span>
              </Tooltip>
            )}
            else {

              if (data > 4 && data <= 8) {
                return (
                  <Tooltip arrow title={<h3>Indice de forme du trotteur {test}</h3>}>
                <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")}</span>
                </Tooltip>
                )}
                else{

              return (
                <Tooltip arrow title={<h3>Indice de forme du trotteur {test}</h3>}>
                <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")}</span>
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
      label: "IF/REG",
      name: "P_IF_DIV_REG",
      options: {
        display:true,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[5];
          
          if(data >= -1 && data <= 0 ){
            return (
              <span>-</span>
              
            )}

          if (data > 0 && data <= 4) {
            return (
              <Tooltip arrow title={<h3>Indice de forme du trotteur {test}</h3>}>
              <span style= {{color:"#1AA001"}}> {data.toString().replace(".",",")}</span>
              </Tooltip>
            )}
            else {

              if (data > 4 && data <= 8) {
                return (
                  <Tooltip arrow title={<h3>Indice de forme du trotteur {test}</h3>}>
                <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")}</span>
                </Tooltip>
                )}
                else{

              return (
                <Tooltip arrow title={<h3>Indice de forme du trotteur {test}</h3>}>
                <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")}</span>
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
      label: "Cr/If",
      name: "P_CR_DIV_IF",
      options: {
        display:false,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          let test = tableMeta.rowData[5];
          
          if(data >= -1 && data <= 0 ){
            return (
              <span>-</span>
              
            )}

          if (data >= 3.5 ) {
            return (
              <Tooltip arrow title={<h3>Indice CR/IF du trotteur {test}</h3>}>
              <span style= {{color:"#1AA001"}}> {data.toString().replace(".",",")}</span>
              </Tooltip>
            )}
            else {

              if (data < 3.5 && data >= 2) {
                return (
                  <Tooltip arrow title={<h3>Indice CR/IF du trotteur {test}</h3>}>
                <span style= {{color:"#FF9200"}}> {data.toString().replace(".",",")}</span>
                </Tooltip>
                )}
                else{

              return (
                <Tooltip arrow title={<h3>Indice CR/IF du trotteur {test}</h3>}>
                <span style= {{color:"#D50000"}}> {data.toString().replace(".",",")}</span>
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
      label: "CLASS",
      name: "P_PROG_CLASS",
      options: {
        display: true,
        filter: false,
        sort: true,
        customBodyRender: (data, tableMeta) => {
          if (data == ">") {
            return (
              <Tooltip arrow title={<h3>Le trotteur monte de catégorie</h3>}>
              <AddIcon fontSize="small"/>
              </Tooltip>
            )}
            else if(data == "<") {
              return (
                <Tooltip arrow title={<h3>Le trotteur baisse de catégorie</h3>}>
                <RemoveIcon fontSize="small" />
                </Tooltip>
              )
            }else{

              return (
                <Tooltip arrow title={<h3>Le trotteur est sur une catégorie équivalente</h3>}>
                <DragHandleIcon fontSize="small"/>
                </Tooltip>
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

 