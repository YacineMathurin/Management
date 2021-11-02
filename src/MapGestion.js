import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import * as Const from "./Constant";
import CardHeader from "@material-ui/core/CardHeader";
import { TableRow, TableCell } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from "@material-ui/core/Button";
import ImageMapper from "react-image-mapper";
import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";
import { PathLine } from "react-svg-pathline";

class MapGestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: props.apiKey,
      coodinates: null,
      infoR: null,
      map: this.props.showDetailsMaps,
      co: null,
      id: null,
      blob: null,
      xCoord: null,
      yCoord: null,
      hoveredArea: null,
      msg: null,
      moveMsg: null,
      status: null,
      nbpts: null,
      idClient: null,
      idRobot: null,
      destination: "destination",
      targetx: 30,
    };
  }

  classes = makeStyles((Theme) => createStyles({}));
  deleteOnePoint(pk) {
    console.log("vous voulez effacer  le point de pk=" + pk);
    fetch(Const.URL_WS_DEL_DEF + "?pk=" + pk, { retry: 3, retryDelay: 1000 })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          status: "Vous avez supprimé une destination, Veuillez Rafraichir",
        });
        this.provideCoordinates();
      })
      .catch((error) => {
        console.log("Request failed", error);
      });
  }
  deletePoints(id) {
    //console.log("vous voulez effacer toutes les destinations de id="+ id)
    fetch(Const.URL_WS_DEL_ALL_DEF + "?id=" + id, {
      retry: 3,
      retryDelay: 1000,
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          status:
            "Vous avez supprimé plusieures destinations, Veuillez Rafraichir",
        });
        this.provideCoordinates();
      })
      .catch((error) => {
        console.log("Request failed", error);
      });
  }

  provideCoordinates() {
    var fields = this.props.showDetailsMapGestion.data.split("blob");
    var id = fields[0];
    this.setState({
      actualID: id,
    });
    var lgg = 0;
    console.log("Wait Please !!!!!");
    console.log("my Id: " + id);
    fetch(Const.URL_WS_ALL_DEF + "?id=" + id, { retry: 3, retryDelay: 1000 })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ coodinates: data });
        console.log("coordinate", this.state.coodinates);
        var MAP = {
          name: "my-map",
          areas: [],
        };

        this.state.coodinates.map((s) => {
          //this.setState({nbpts:s.nb_pts})
          MAP.areas.push({
            name: s.pk,
            shape: "circle",
            coords: [s.x_pixel, s.y_pixel, 9],
            preFillColor: "#0099ff",
            fillColor: "red",
          });
        });

        if (this.state.coodinates.length > 0) {
          //ajouter la couleur
          lgg = this.state.coodinates.length;
          console.log(lgg);
          MAP.areas[lgg - 1].preFillColor = "red";
          this.setState({
            nbpts: this.state.coodinates.length,
          });
          if (this.state.coodinates.length > 1) {
            this.setState({
              destination: "destinations",
            });
          }
        }

        console.log("co", MAP);
        console.log("nbpts", this.state.nbpts);
        this.setState({ mp: MAP });
        //this.setState({co:arra})

        console.log("co", this.state.co);
        console.log("map", this.state.mp);
        console.log("Finish i have points !!!!!");
        this.getLines();
      })
      .catch((error) => {
        console.log("Request failed", error);
      });
  }
  provideRobotInfos() {
    var fields = this.props.showDetailsMapGestion.data.split("blob");
    var id = fields[0];
    this.setState({
      actualID: id,
    });
    fetch(Const.URL_WS_ROBOT_INFO + "?id=" + id, { retry: 3, retryDelay: 1000 })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ infoR: data });
        this.state.infoR.map((inf) => {
          this.setState({
            idClient: inf.id_client,
            idRobot: inf.id_robot,
          });
        });
        console.log("idClient===", this.state.idClient);
        console.log("idRobot===", this.state.idRobot);
        console.log("idMap===", id); // id = pk
      })
      .catch((error) => {
        console.log("Request failed", error);
      });
  }
  deleteMap(pk) {
    console.log("Delete MAp    " + pk);
    console.log("To be called:");
    console.log(Const.URL_WS_DEL_ONE_MAP + "?pk=" + pk);

    fetch(Const.URL_WS_DEL_ONE_MAP + "?pk=" + pk, {
      retry: 3,
      retryDelay: 1000,
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log("Request failed", error);
      });
    this.props.callBackRetourMaps();
  }

  addAction() {
    console.log("add Action");
    let time = 5000;
    fetch(
      Const.URL_WS_INS_ACT +
        "?idClient=" +
        this.state.idClient +
        "&idRobot=" +
        this.state.idRobot +
        "&id=" +
        this.state.actualID +
        "&nbpts=" +
        this.state.nbpts +
        "&time=" +
        time,
      { retry: 3, retryDelay: 1000 }
    )
      .then((response) => response.json())
      .catch((error) => {
        console.log("Request failed", error);
      });
    //this.props.callBackRetourMaps()
  }

  deplacerRobot(x, y) {
    var fields = this.props.showDetailsMapGestion.data.split("blob");
    var id = fields[0];
    fetch(
      Const.URL_WS_INS_DEF +
        "?idClient=" +
        this.state.idClient +
        "&idRobot=" +
        this.state.idRobot +
        "&id=" +
        id +
        "&speed=6&x=" +
        x +
        "&y=" +
        y +
        "&breakTime=30",
      { retry: 3, retryDelay: 1000 }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Vous avez ajouté une destination x=" + x + "  y=" + y);
        console.log(data);
        this.setState({
          status: "Vous avez une nouvelle destination, Veuillez Rafraichir",
        });
      })
      .catch((error) => {
        console.log("Request failed", error);
      });
  }

  load() {
    this.setState({ msg: "" });
  }

  clicked(area) {
    this.setState({
      msg: `Vous avez cliqué sur la destination  ${JSON.stringify(
        area.center
      )} .`,
      actualPk: area.name,
    });
  }

  clickedOutside(evt) {
    const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    this.setState({
      msg: `Vous avez cliqué sur  ${JSON.stringify(coords)} `,
    });
    this.setState({
      xCoord: evt.nativeEvent.layerX,
      yCoord: evt.nativeEvent.layerY,
    });
    console.log("x " + this.state.xCoord);
    console.log("y " + this.state.yCoord);
  }

  moveOnImage(evt) {
    const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    //vous pouvez suivre le deplacement du curseur, ne marche que sur web et non sur smartphone
    /*
    this.setState({
      moveMsg: `Coordonnées  ${JSON.stringify(coords)} `
    });
    */
  }
  addRobotPosition = (index, robotPosition, coordinatesClone) => {
    coordinatesClone[index] = robotPosition;
    return coordinatesClone;
  };
  getLines(coords = this.state.coodinates, pathIndex = 0) {
    let canvas = document.getElementsByTagName("canvas")[0];
    console.log(canvas);

    const ctx = canvas.getContext("2d");

    ctx.beginPath();

    let prev = null;
    var distance = 100;
    coords.map((s, i, e) => {
      console.log("s " + s.x_pixel + " " + s.y_pixel);
      if (i + 1 < e.length) {
        ctx.moveTo(s.x_pixel, s.y_pixel);
        ctx.lineTo(e[i + 1].x_pixel, e[i + 1].y_pixel);
      }
      prev = s.x_pixel;
      // If i < pathIndex: lightweight strokeStyle color
      ctx.strokeStyle = i < pathIndex ? " #deeafc" : "#5293fa";
      distance = Math.sqrt(
        Math.pow(e[i + 1].x_pixel - e[i + 2].x_pixel, 2) +
          Math.pow(e[i + 1].y_pixel - e[i + 2].y_pixel, 2)
      );
    });

    // set line color
    ctx.lineWidth = 10;
    ctx.stroke();
    console.log("Distance is: ", distance);
    return distance;
  }

  handleMove = () => {
    // #deeafc #5293fa
    const coodinates = this.state.coodinates;
    var coordinatesClone = coodinates.splice(0);
    var pathIndex = 1;
    // define robotPosition
    // coordinates[pathIndex] = realtime_robot_coordinates
    this.setState({
      target_x: coordinatesClone[0]["x_pixel"],
      target_y: coordinatesClone[0]["y_pixel"],
    });
    var robotPosition = {
      x_pixel: this.state.target_x,
      y_pixel: this.state.target_y,
    };
    coordinatesClone = this.addRobotPosition(
      pathIndex,
      robotPosition,
      coordinatesClone
    );
    // Draw lines
    // If i < pathIndex: lightweight strokeStyle color
    const distance = this.getLines(coordinatesClone, pathIndex);

    // var distance = Math.sqrt(Math.pow(e[i + 1].x_pixel - e[i + 2].x_pixel,2) + Math.pow(e[i + 1].y_pixel - e[i + 2].y_pixel,2))
    // If distance < 5, pathIndex++ and coordinatesClone[pathIndex] = realtime_robot_coordinates

    var timeInterval = setInterval(() => {
      this.setState({ targetx: this.state.targetx + 5, moving: true }, () => {
        if (this.state.targetx >= 125) {
          clearInterval(timeInterval);
        }
      });
    }, 1000);
  };
  enterArea(area) {
    //Pas Besoin
    /*
    this.setState({
      hoveredArea: area,
      msg: `Vous êtes rentré sur ${area.shape} ${area.name} `
    });
    */
  }

  leaveArea(area) {
    //Pas Besoin
    /*
    this.setState({
      hoveredArea: null,
      msg: `Vous avez quitté ${area.shape} ${area.name}`
    });*/
  }

  moveOnArea(area, evt) {
    const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    this.setState({
      moveMsg: `Vous êtes à  ${area.shape} ${
        area.name
      } at coords ${JSON.stringify(coords)} !`,
    });
  }

  getTipPosition(area) {
    return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
  }

  componentDidMount() {
    this.provideCoordinates();
    this.provideRobotInfos();
  }

  render() {
    const { imageHeight, moving, targetx, coordinatesForSvg } = this.state;
    console.log("this.state", this.state);
    const mapName = this.props.showDetailsMapGestion.mapName;
    var fields = this.props.showDetailsMapGestion.data.split("blob");
    var id = fields[0];
    var blob = fields[1];

    return (
      <div className={this.classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={9}>
            <Card>
              <CardContent>
                <div>
                  <img
                    style={{ float: "left", marginTop: "0.5em" }}
                    width="40"
                    src="./images/carrier.svg"
                  />
                  <img
                    style={{ float: "right", marginTop: "0.5em" }}
                    width="50"
                    src="./images/back.png"
                    onClick={() => this.props.callBackRetourMaps()}
                  />
                </div>

                <div style={{ marginLeft: "3.5em" }}>
                  <Typography
                    style={{ color: "BLACK" }}
                    component="h5"
                    variant="h5"
                  >
                    Map {mapName} - Robot {this.state.idRobot}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={4}>
            <Card>
              <CardContent>
                <ImageMapper
                  src={`data:image/jpeg;base64,` + blob}
                  map={this.state.mp}
                  width={500}
                  onLoad={() => this.load()}
                  onClick={(area) => this.clicked(area)}
                  onMouseEnter={(area) => this.enterArea(area)}
                  onMouseLeave={(area) => this.leaveArea(area)}
                  onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
                  onImageClick={(evt) => this.clickedOutside(evt)}
                  onImageMouseMove={(evt) => this.moveOnImage(evt)}
                  lineWidth={4}
                  strokeColor={"white"}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={12} lg={4}>
            <Card>
              <CardContent>
                <span>&nbsp;</span>
                <div align="center">
                  <h1 style={{ color: "blue", fontWeight: "bold" }}>
                    {" "}
                    {this.state.nbpts ? (
                      <b>
                        {" "}
                        {this.state.nbpts} {this.state.destination}{" "}
                      </b>
                    ) : (
                      <b>&nbsp;</b>
                    )}
                  </h1>

                  <h3 className="message">
                    {this.state.msg ? <b>{this.state.msg}</b> : <b>&nbsp;</b>}
                  </h3>
                  <h3 style={{ color: "green", fontWeight: "bold" }}>
                    {" "}
                    {this.state.status ? this.state.status : <b>&nbsp;</b>}
                  </h3>
                </div>
                <Button
                  fullWidth={true}
                  width="2em"
                  onClick={() =>
                    this.deplacerRobot(this.state.xCoord, this.state.yCoord)
                  }
                  variant="outlined"
                  // color="primary"
                  size="medium"
                >
                  Ajouter une destination
                </Button>{" "}
                <span>&nbsp;</span>
                <Button
                  fullWidth={true}
                  width="2em"
                  onClick={() => this.provideCoordinates()}
                  variant="outlined"
                  color="primary"
                  size="large"
                >
                  Rafraichir Map
                </Button>
                <span>&nbsp;</span>
                <Button
                  fullWidth={true}
                  width="2em"
                  onClick={() => this.deleteOnePoint(this.state.actualPk)}
                  variant="outlined"
                  color="secondary"
                  size="large"
                >
                  Effacer une destination
                </Button>
                <span>&nbsp;</span>
                <Button
                  fullWidth={true}
                  width="2em"
                  onClick={() => {
                    if (
                      window.confirm(
                        " Voulez-vous vraiment supprimer toutes les destinations ?"
                      )
                    ) {
                      this.deletePoints(this.state.actualID);
                    }
                  }}
                  variant="outlined"
                  color="secondary"
                  size="large"
                >
                  Effacer destinations (Tous les points)
                </Button>
                <span>&nbsp;</span>
                <Button
                  fullWidth={true}
                  width="2em"
                  onClick={() => {}}
                  variant="outlined"
                  color="primary"
                  size="large"
                >
                  Envoyer les données au robot
                </Button>
                <span>&nbsp;</span>
                <Button
                  fullWidth={true}
                  width="2em"
                  // onClick={() => this.addAction()}
                  onClick={() => this.handleMove()}
                  variant="outlined"
                  color="primary"
                  size="large"
                >
                  Démarrage immédiat
                </Button>
                <span>&nbsp;</span>
                <Button
                  fullWidth={true}
                  width="2em"
                  onClick={() => {}}
                  variant="outlined"
                  // color="primary"
                  size="large"
                >
                  Prochaine destination
                </Button>
                <span>&nbsp;</span>
                <Button
                  fullWidth={true}
                  width="2em"
                  onClick={() => {}}
                  variant="outlined"
                  color="primary"
                  size="large"
                >
                  Démarrage planifié
                </Button>
                <span>&nbsp;</span>
                <Button
                  fullWidth={true}
                  width="2em"
                  onClick={() => {}}
                  variant="outlined"
                  color="primary"
                  size="large"
                >
                  Démarrage répetitif
                </Button>
                <span>&nbsp;</span>
                <Button
                  fullWidth={true}
                  width="2em"
                  onClick={() => {
                    if (
                      window.confirm(" Voulez-vous vraiment supprimer la Map ?")
                    ) {
                      this.deleteMap(this.state.actualID);
                    }
                  }}
                  variant="outlined"
                  color="secondary"
                  size="large"
                >
                  Effacer la Map
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={12} lg={4}>
            <Card>
              {/* <span>&nbsp;</span> */}
              <CardHeader
                avatar={<TuneOutlinedIcon fontSize="large" />}
                title="Informations"
              />
              <CardContent>
                <span>&nbsp;</span>
                <div align="center" style={{ backgroundColor: "#FFFFCC" }}>
                  <h3>
                    {" "}
                    1-Ajout d'une destination, cliquez sur une position de
                    l'image puis cliquez "Ajouter une destination";{" "}
                  </h3>
                  <h3>
                    {" "}
                    2-Supprimer une destination, cliquez sur un point existant
                    de l'image puis cliquez sur "Effacer une destination";{" "}
                  </h3>
                  <h3>
                    {" "}
                    3-Supprimer toutes les destination, cliquez juste sur
                    "Effacer destinations";{" "}
                  </h3>
                  <h3>
                    {" "}
                    4-Démarrage Immédiat, Envoie une action avec le nombre de
                    points au robot;{" "}
                  </h3>
                  <h3>
                    {" "}
                    5-Effacer la Map, Effacera la Map et toutes les destinations
                    affiliées cliquez juste sur "Effacer la Map" ;{" "}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default MapGestion;
