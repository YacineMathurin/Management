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
import { Modal } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

class MapGestion extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
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
    };
  }

  componentDidMount() {
    const coodinates = [
      { x_pixel: 210, y_pixel: 146 },
      { x_pixel: 313, y_pixel: 146 },
      { x_pixel: 313, y_pixel: 250 },
    ];
    this.provideCoordinates();
    this.provideRobotInfos();
    this.setState({ coodinates });
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
        // this.setState({ coodinates: data });
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

  deplacerRobot(x, y) {
    var fields = this.props.showDetailsMapGestion.data.split("blob");
    var id = fields[0];
    console.log("id deplacerRobot", id);
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

  load() {
    let canvas = document.getElementsByTagName("canvas")[0];
    console.log(canvas);

    const context = canvas.getContext("2d");
    console.log("Image's Height", context.height);
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

  getLines = (coords = this.state.coodinates, pathIndex = 0) => {
    let canvas = document.getElementsByTagName("canvas")[0];
    console.log(canvas);
    console.log("Canvas Height", canvas.height);

    const ctx1 = canvas.getContext("2d");
    const ctx2 = canvas.getContext("2d");

    ctx2.font = "10px Arial";

    // ctx1.beginPath();
    // ctx2.beginPath();

    let prev = null;
    coords.map((s, i, e) => {
      // this.state.coodinates.map((s, i, e) => {
      console.log("s " + s.x_pixel + " " + s.y_pixel);
      // if (this.state.moving && i > pathIndex) {
      //   ctx2.fillText(i - 1, s.x_pixel - 3, s.y_pixel + 3);
      // } else {
      //   ctx2.fillText(i, s.x_pixel - 3, s.y_pixel + 3);
      // }

      if (i < pathIndex) {
        console.log("Elapsed");
        ctx1.moveTo(s.x_pixel, s.y_pixel);
        ctx1.lineTo(e[i + 1].x_pixel, e[i + 1].y_pixel);
        ctx1.strokeStyle = "#95cf9c"; // set line color
        ctx1.lineWidth = 10;
      }
      // else {
      //   console.log("Left");
      //   if (i + 1 < e.length) {
      //     ctx2.moveTo(s.x_pixel, s.y_pixel);
      //     ctx2.lineTo(e[i + 1].x_pixel, e[i + 1].y_pixel);
      //   }
      //   ctx2.strokeStyle = "red"; // set line color
      //   ctx1.lineWidth = 10;
      //   ctx1.stroke();
      // }

      prev = s.x_pixel;

      console.log("i & pathIndex & i < pathIndex", i, pathIndex, i < pathIndex);
    });
    ctx1.stroke();
    this.setState({ imageHeight: canvas.height });
  };

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

  addRobotPosition = (index, robotPosition, coordinatesClone) => {
    console.log("moving", this.state.moving);
    if (!this.state.moving) {
      // coordinatesClone.splice(index, 1);
      return 0;
    }
    if (this.state.pk > 1) {
      coordinatesClone.splice(index, 1);
    }
    coordinatesClone.splice(index, 0, robotPosition);
    // console.log("coordinatesClone", coordinatesClone);
    this.setState({ coodinates: coordinatesClone, pathIndex: index });
  };

  fetchHeartbeat = (pathIndex, coordinatesClone) => {
    const { idClient, idRobot, pk, moving } = this.state;

    console.log("idClient, idRobot, pk", idClient, idRobot, pk, moving);
    fetch(
      `http://193.70.86.40:8081/GetAllMetricsByClientAndRobotAndPKWS?idclient=${idClient}&idrobot=${idRobot}&pk=${pk}`,
      {
        retry: 3,
        retryDelay: 1000,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("fetchHeartbeat", data, {
        //   x_pixel: data[0]["X_COORD"],
        //   y_pixel: data[0]["Y_COORD"],
        // });
        this.addRobotPosition(
          pathIndex,
          {
            x_pixel: data[0]["X_COORD"],
            y_pixel: data[0]["Y_COORD"],
          },
          coordinatesClone
        );
        this.setState({
          pk: pk + 1,
        });
      })
      .catch((error) => {
        console.error("Request failed", error);
      });
  };

  StartMove = () => {
    // #deeafc #5293fa
    this.setState({ moving: true, pk: 1 });
    const coodinates = this.state.coodinates;
    var coordinatesClone = coodinates;
    var pathIndex = 1;
    console.log(
      "coordinatesClone",
      coordinatesClone,
      coordinatesClone[pathIndex - 1]["x_pixel"],
      coordinatesClone[pathIndex - 1]["y_pixel"]
    );
    // define robotPosition
    // coordinates[pathIndex] = realtime_robot_coordinates
    var robotPosition = {
      x_pixel: coordinatesClone[pathIndex - 1]["x_pixel"],
      y_pixel: coordinatesClone[pathIndex - 1]["y_pixel"],
    };
    console.log("robotPosition", robotPosition);
    // Goal: fetch the robot position each interval and insert it in the coordinates,
    // When we get an arrived flag, we stop/delete the interval
    var timeInterval = setInterval(async () => {
      /** Either database mock
       * this.fetchHeartbeat();
       * this.addRobotPosition(pathIndex, this.state.robotPosition, coordinatesClone);
       * Either
       */
      this.fetchHeartbeat(pathIndex, coordinatesClone);

      // Or JS mock
      // robotPosition.x_pixel = robotPosition.x_pixel + 3;
      // this.addRobotPosition(pathIndex, robotPosition, coordinatesClone);
      // Or
      // coordinatesClone.splice(pathIndex, 1);

      // if (this.state.robotPosition.x_pixel >= 313 - 10) {
      if (this.state.pk >= 35) {
        // This 313 is temporal, further we'll use a flag from robot heartbeat
        console.log("Clearing StartMove");
        this.setState({ moving: false, pathIndex: pathIndex + 1 });
        clearInterval(timeInterval);
        // timeInterval = null;
      }
    }, 1000);
  };

  nextDestination = () => {
    var pathIndex = this.state.pathIndex;
    if (!pathIndex) {
      return this.StartMove();
    }
    // pathIndex = pathIndex + 1;
    this.setState({ moving: true });
    const { coodinates } = this.state;
    var coordinatesClone = coodinates;
    console.log(
      "coodinates & nextDestination coordinatesClone & pathIndex",
      coodinates,
      coordinatesClone,
      pathIndex
    );
    var robotPosition = {
      x_pixel: coordinatesClone[pathIndex - 1]["x_pixel"],
      y_pixel: coordinatesClone[pathIndex - 1]["y_pixel"],
    };
    console.log("robotPosition & pathIndex", robotPosition, pathIndex);
    var timeInterval = setInterval(async () => {
      await this.fetchHeartbeat(pathIndex, coordinatesClone);

      if (this.state.pk >= 70) {
        // This 313 is temporal, further we'll use a flag from robot heartbeat
        clearInterval(timeInterval);
        this.setState({ moving: false, pathIndex: pathIndex + 1 });
      }
    }, 1000);
  };

  handleStrokeColor = (index) => {
    var color = "";
    const { moving, pathIndex } = this.state;
    // console.log("index & pathIndex", index, pathIndex);
    if (moving) {
      // console.log("index < pathIndex", index < pathIndex);
      color = index < pathIndex ? "#bfe0f2" : "#6d95ab";
    } else {
      color = index < pathIndex - 1 ? "#bfe0f2" : "#6d95ab";
    }
    return color;
  };

  handleSVGMask = () => this.setState({ imageHeight: null });

  /* Populate the MSG_HEARTBEAT database to suite our path
  (coodinate[1]["x_pixel"] - coodinate[0]["x_pixel"]) / 3 ~= 35
  UPDATE `MSG_HEARTBEAT` SET X_COORD = `X_COORD` + (`PK` - 1) * 3 WHERE  PK < '35';
  UPDATE `MSG_HEARTBEAT` SET Y_COORD = `Y_COORD` + (`PK` - 35) * 3 WHERE  PK > '35';

  Need /getHeartbeat() to retreive heartbeat 
*/
  handleOpenModal = () => {
    this.setState({ openModal: true });
  };
  handleClose = () => {
    this.setState({ openModal: false });
  };

  render() {
    const {
      imageHeight,
      moving,
      moved,
      targetx,
      coodinates,
      pathIndex,
      mp,
      openModal,
    } = this.state;
    console.log("this.state & coodinates & map", this.state, coodinates, mp);
    const mapName = this.props.showDetailsMapGestion.mapName;
    var fields = this.props.showDetailsMapGestion.data.split("blob");
    var id = fields[0];
    var blob = fields[1];

    return (
      <div className={this.classes.root}>
        {/* Old Scenario */}
        <Modal
          open={openModal}
          onClose={() => this.handleClose()}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div class="modal-body" style={{ backgroundColor: "white" }}>
            <form noValidate>
              <TextField
                id="datetime-local-from"
                label="Départ"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                // className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="datetime-local-to"
                label="Arrivé"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                // className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ marginLeft: "2em" }}
              />
            </form>
            <div
              style={{
                margin: "50px 0 30px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="outlined"
                style={{ margin: "0px" }}
                onClick={() => this.handleClose()}
                size="small"
              >
                <Typography variant="button" display="block" gutterBottom>
                  Annuler
                </Typography>
              </Button>
              <Button
                variant="outlined"
                // disabled={!this.state.mapName}
                size="small"
                color="primary"
                style={{ marginLeft: "10px" }}
                onClick={() => this.handleClose()}
              >
                Allons-y
              </Button>
            </div>
          </div>
        </Modal>

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
                  // map={mp}
                  // map={[
                  //   areas:{
                  //     name: "s.pk",
                  //     shape: "circle",
                  //     coords: [210, 146, 9],
                  //     preFillColor: "#0099ff",
                  //     fillColor: "red",
                  //   },
                  // ]}
                  // map={{
                  //   name: "my-map",
                  //   areas: [],
                  // }}
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
            {imageHeight && (
              <div
                style={{
                  position: "relative",
                  height: imageHeight,
                  bottom: imageHeight + 24,
                  left: "16px",
                  zIndex: 1,
                }}
                onMouseEnter={() => this.handleSVGMask()}
              >
                <svg style={{ height: "100%", width: "100%" }}>
                  {coodinates.map((item, index, array) => {
                    if (index + 1 < array.length) {
                      return (
                        <PathLine
                          points={[
                            {
                              x: item["x_pixel"],
                              y: item["y_pixel"],
                            },
                            {
                              x: array[index + 1]["x_pixel"],
                              y: array[index + 1]["y_pixel"],
                            },
                          ]}
                          // index < pathIndex
                          stroke={this.handleStrokeColor(index)}
                          strokeWidth="10"
                          fill="none"
                          r={10}
                        />
                      );
                    }
                  })}
                  {coodinates.map((item, index, array) => (
                    <circle
                      cx={item.x_pixel}
                      cy={item.y_pixel}
                      r="12"
                      stroke="bisque"
                      stroke-width="3"
                      fill={
                        moving
                          ? index === pathIndex
                            ? "#8f1b36"
                            : "#2e7aa3"
                          : "#2e7aa3"
                      }
                    />
                  ))}
                  {moving && (
                    <PathLine
                      points={[
                        { x: 30, y: 30 },
                        { x: targetx, y: 30 },
                        // { x: 125, y: 125 },
                        // { x: 250, y: 125 },
                      ]}
                      stroke="#f5a9a4"
                      strokeWidth="10"
                      fill="none"
                      r={10}
                    />
                  )}
                </svg>
              </div>
            )}
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
                  color="primary"
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
                  onClick={() => {
                    this.handleOpenModal();
                  }}
                  variant="outlined"
                  color="primary"
                  size="large"
                >
                  Parcours passés
                </Button>
                <span>&nbsp;</span>
                <Button
                  fullWidth={true}
                  width="2em"
                  // onClick={() => this.addAction()}
                  onClick={() => this.StartMove()}
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
                  onClick={() => {
                    this.nextDestination();
                  }}
                  variant="outlined"
                  color="primary"
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
