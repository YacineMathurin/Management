import React from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Tooltip } from '@material-ui/core';

const MapGestionButtons = ({show, handleShow, moving, choosingDest, nbpts, destination, msg, status, mapName, idRobot, callBackRetourMaps, editDestinations,StartMove, deletePoints, deleteOnePoint, provideCoordinates}) => {
  return (
    <div style={{
      position: "sticky",
          top: "48px",
          zIndex: "5",
          backgroundColor:"#eee",
          
    }}>
       <div style={{display: show ? "block":"none"}}>
      <Grid container spacing={2} >
          <Grid item xs={12} md={12} lg={12} >
            <Card style={{background:"#eee", position:"relative", bottom:"23px"}}>
              <CardContent>
                <div>
                  <img
                    style={{ float: "left", marginTop: "0.5em", width:"25px", position:"relative", top:"12px" }}
                    
                    src="./images/carrier.svg"
                  />
                  {/* <img
                    style={{
                      float: "right",
                      marginTop: "0.5em",
                      position: "relative",
                      bottom: "0.5em",
                    }}
                    width="50"
                    src="./images/go_back.png"
                    onClick={() => callBackRetourMaps()}
                  /> */}
                </div>

                <div style={{ marginLeft: "3.5em" }}>
                  <Typography
                    style={{
                      color: "BLACK",
                      fontFamily: "Black Ops One, cursive",
                      transform: "translateY(17px)",
                      display: "flex",
                    }}
                    component="h5"
                    variant="h5"
                  >
                    {mapName} - Robot {idRobot}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
   
    <div style={{
      display: "flex",
      margin: "0 17px",
      position: "relative",
      bottom: "10px",
      // position: "fixed",
      zIndex:5
    }}>
      <div style={{marginRight:"1em"}}>
        <Button
          // className="_button"
          // fullWidth={true}
          width="2em"
          onClick={() =>
            editDestinations()
          }
          variant="outlined"
          color="primary"
          size="small"
          disabled={moving}
        >
          {!choosingDest ? "Mode Edition" : "Ajouter une destination"}
        </Button>
      </div>
      <div style={{marginRight:"1em"}}>
      <Button
                  disabled={moving}
                   // fullWidth={true}
                  width="2em"
                  onClick={() => provideCoordinates()}
                  variant="outlined"
                  color="primary"
                  size="small"
                >
                  Rafraichir Map
      </Button>
      </div>
      <div style={{marginRight:"1em"}}> 
      <Button
                  disabled={moving}
                   // fullWidth={true}
                  width="2em"
                  onClick={() => StartMove()}
                  variant="outlined"
                  color="primary"
                  size="small"
                >
                  Démarrage immédiat
                </Button>
      </div>
      <div style={{marginRight:"1em"}}>
      <Button
                  disabled={moving}
                  // className="_button"
                  // fullWidth={true}
                  width="2em"
                  onClick={() => deleteOnePoint()}
                  variant="outlined"
                  color="secondary"
                  size="small"
                >
                  Effacer une destination
                </Button>
      </div>
      <div style={{marginRight:"1em"}}>
      <Button
                  disabled={moving}
                  // className="_button"
                  // fullWidth={true}
                  width="2em"
                  onClick={() => {  
                    if (
                      window.confirm(
                        " Voulez-vous vraiment supprimer toutes les destinations ?"
                      )
                    ) {
                      deletePoints();
                    }
                  }}
                  variant="outlined"
                  color="secondary"
                  size="small"
                >
                  Effacer destinations (Tous les points)
                </Button>
      </div>
      <div style={{marginRight:"1em"}}>
      <Button
                   // fullWidth={true}
                  // width="2em"

                  variant="contained"
                  color="secondary"
                  size="small"
                >
                  stop
                </Button>
      </div>
    </div>
    <div align="center" style={{marginLeft:"17px"}}>
                  {nbpts && (
                    <h1
                      style={{
                        color: "blue",
                        fontWeight: "bold",
                        // position: "relative",
                        // left: "1em",
                        fontFamily: "Josefin Slab, serif",
                        margin: "0",
                        textAlign: "left",
                        
                      }}
                    >
                      <b>
                        {nbpts} {destination}
                      </b>
                    </h1>
                  )}

                  {msg && (
                    <h3
                      className="message"
                      style={{ fontFamily: "Josefin Slab, serif", textAlign:"left" }}
                    >
                      <b>{msg}</b>
                    </h3>
                  )}

                  {status && (
                    <h3 style={{ color: "green", fontWeight: "bold" , textAlign:"left" }}>
                      {status}
                    </h3>
                  )}
      </div>
      <div style={{borderBottom: "5px solid gold"}}></div>
        </div>  
        <div style={{marginTop:"3px", marginLeft:"17px"}}>
            <Tooltip title="Go To Back page">
            <img onClick={()=>callBackRetourMaps()} src={"./images/go_back.png"} style={{width:"25px", marginRight:"1em"}}></img>
            </Tooltip>
            <Tooltip title="Show / Hide Toolbar">
            <img onClick={()=>handleShow()} src={"./images/arrow.png"} style={{width:"25px", marginRight:"1em"}}></img>
            </Tooltip>
            {!show &&
              <span style={{color: "BLACK", fontFamily: "Black Ops One, cursive", position:"relative", bottom:"7px"}}>{mapName} - Robot {idRobot}</span>
            }
             
        </div> 
     </div> 
  );
};

export default MapGestionButtons;
