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
import Tooltip from "@material-ui/core/Tooltip";
import Hidden from "@material-ui/core/Hidden";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import "./MapGestion.css";
import MapGestionButtons from "./MapGestionButtons";
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import { useTranslation, withTranslation } from "react-i18next";

class MapGestion extends React.Component {

  classes = makeStyles((Theme) => createStyles({}));

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
      msg: "Message: ",
      moveMsg: null,
      status: "null",
      nbpts: null,
      idClient: props.showDetailsMapGestion.id_client,
      idRobot: props.showDetailsMapGestion.id_robot,
      destination: "destination",
      modalErrorMsg: "",
      pk: 1,
      show:true,
      zoom:100, 
      positionIndex:0,
      pathIndex:1
    };
  }

  componentDidMount() {
    // const coodinates = [
    //   { x_pixel: 210, y_pixel: 146 },
    //   { x_pixel: 313, y_pixel: 146 },
    //   { x_pixel: 313, y_pixel: 250 },
    // ];
    this.provideCoordinates();
    this.provideRobotInfos();
  }

  fetchLastHeartbeatMsg = () => {
    const { coodinates } = this.state;
    console.log(
      "fetchLastHeartbeatMsg",
      this.state.idClient,
      this.state.idRobot
    );
    var self = this;
    fetch(
      Const.URL_FETCH_LAST_HEARTBEAT_MSG +
        "?id_client=" +
        this.state.idClient +
        "&id_robot=" +
        this.state.idRobot,
      { retry: 3, retryDelay: 1000 }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("fetchLastHeartbeatMsg data", data);
        if (data.length === 0) return 0;
        const pk = data[0]["PK"];
        const robotPosition = {x_pixel:data[0]["X_COORD"], y_pixel: data[0]["Y_COORD"]};
        console.log("robotPosition", robotPosition);
        coodinates.splice(0, 0, robotPosition);
        this.setState({ pk, coodinates });
        if (this.props.showDetailsMapGestion.is_moving) {
          console.log("MOVING...");
          const pathIndex = data[0]["PATH_INDEX"];
          this.setState({ pathIndex });
          pathIndex <= 1 ? self.startMove() : self.nextDestination();
        }
      })
      .catch((err) => console.error(err));
  };


  deleteOnePoint(pk) {
    const { t } = this.props;
    console.log("vous voulez effacer  le point de pk=" + pk);
    fetch(Const.URL_WS_DEL_DEF + "?pk=" + pk, { retry: 3, retryDelay: 1000 })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          status: t('manag_status'),
        });
        this.provideCoordinates();
      })
      .catch((error) => {
        console.log("Request failed", error);
      });
  }

  deletePoints(id) {
    const {t} = this.props;
    fetch(Const.URL_WS_DEL_ALL_DEF + "?id=" + id, {
      retry: 3,
      retryDelay: 1000,
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          status:
            t('manag_del_refresh'),
            nbpts:null
        });
        this.provideCoordinates();
      })
      .catch((error) => {
        console.log("Request failed", error);
      });
  }
  // Refresh 
  provideCoordinates() {
    var fields = this.props.showDetailsMapGestion.data.split("blob");
    var id = fields[0];
    this.setState({
      actualID: id,
      msg: null,
      status: null,
      choosingDest: false,
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
            fillColor: "#C51162",
          });
        });

        if (this.state.coodinates.length > 0) {
          //ajouter la couleur
          lgg = this.state.coodinates.length;
          console.log(lgg);
          MAP.areas[0].preFillColor = "gold";
          MAP.areas[lgg - 1].preFillColor = "#C51162";
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
      .then(() => this.fetchLastHeartbeatMsg())
      .catch((error) => {
        console.log("Request failed", error);
      });
  }

  deplacerRobot(x, y) {
    var fields = this.props.showDetailsMapGestion.data.split("blob");
    var id = fields[0];
    console.log("id deplacerRobot", id);
    const { coodinates } = this.state;
    // This pathIndex will be useful when playing scenarios
    const pathIndex = coodinates.length < 2 ? 1 : coodinates.length - 1;
    const { t } = this.props;
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
        "&breakTime=30" +
        "&pathIndex=" +
        pathIndex,
      { retry: 3, retryDelay: 1000 }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Vous avez ajouté une destination x=" + x + "  y=" + y);
        console.log(data);
        this.setState({
          status: t('manag_refresh_msg'),
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
    const { t } = this.props;
    this.setState({
      msg: `${t('manag_msg')}  ${JSON.stringify(
        area.center
      )} .`,
      actualPk: area.name,
    });
  }

  clickedOutside(evt) {
    const { t } = this.props;
    const { zoom } = this.state;
    const scale = zoom / 100; 
    const coords = { x: Math.round(evt.nativeEvent.layerX / scale) , y: Math.round(evt.nativeEvent.layerY / scale) };
    this.setState({
      msg: `${t('manag_clicked')}  ${JSON.stringify(coords)}, ${t('manag_clicked_next_step')}`,
    });
    this.setState({
      xCoord: Math.round(evt.nativeEvent.layerX / scale),
      yCoord: Math.round(evt.nativeEvent.layerY / scale),
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

  setMovingStatusMapsPAge = (isMoving, pk) => {
    fetch(Const.URL_UPD_STATUS_MAP_PAGE + "?moving=" + isMoving + "&pk=" + pk, {
      retry: 3,
      retryDelay: 1000,
    })
      .then((res) => res.json())
      .then((data) => {})
      .catch((error) => {
        console.error("Request failed", error);
      });
  };

  simulateHeartbeat = () => {
    const { coodinates, initialXcoord, arrived } = this.state;
    const pathIndex = 0;
    fetch(
      Const.URL_UPD_STATUS_MANAG_PAGE +
        "?MSG_TYPE=0&ID_CLIENT=" +
        this.state.idClient +
        "&ID_ROBOT=" +
        this.state.idRobot +
        "&IS_MOVING=" +
        !arrived +
        "&PATH_INDEX=" +
        pathIndex +
        "&ARRIVED=" +
        arrived +
        "&TIMESTAMP=" +
        Date.now() +
        "&STATUS=0&BAT_LEVEL=80&X_COORD=" +
        initialXcoord +
        "&Y_COORD=" +
        coodinates[0]["y_pixel"],
      {
        retry: 3,
        retryDelay: 1000,
      }
    )
      .then((res) => res.json())
      .then((data) => {})
      .catch((error) => {
        console.error("Request failed", error);
      });
  };

  addRobotPosition = (index, robotPosition, coordinatesClone) => {
    console.log("moving", this.state.moving);
    if (!this.state.moving) {
      // coordinatesClone.splice(index, 1);
      return 0;
    }
    // Add the robot position first then replace it later
    // At pk = 1 add then replace it later
    if (this.state.coodinatesEdited) {
      coordinatesClone.splice(index, 1);
    }
    coordinatesClone.splice(index, 0, robotPosition);
    // console.log("coordinatesClone", coordinatesClone);
    this.setState({
      coodinatesEdited: true,
      coodinates: coordinatesClone,
      pathIndex: index,
    });
  };

  fetchHeartbeat = (pathIndex, coordinatesClone) => {
    const { idClient, idRobot, pk, moving } = this.state;
    console.log("idClient, idRobot, pk", idClient, idRobot, pk, moving);

    fetch(
      `${
        Const.URL_WS_FETCH_HEARTBEAT
      }?idclient=${idClient}&idrobot=${idRobot}&pk=${pk + 1}`,
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
          arrived: data[0]["ARRIVED"],
        });
      })
      .catch((error) => {
        console.error("Request failed", error);
      });
  };

  StartMove = () => {
    // #deeafc #5293fa
    // if (pathIndex > 1) {
    //   return this.nextDestination();
    // }
    this.setMovingStatusMapsPAge(1, this.state.actualID);
    const {pathIndex}= this.state;
    // this.setState({ moving: true, pk: 1, msg: "En mouvement ..." });

    const coodinates = this.state.coodinates;
    this.setState({
      moving: true,
      msg: "En mouvement ...",
      positionIndex: this.state.positionIndex + 1
    });
    var coordinatesClone = coodinates;
    // var pathIndex = 1;
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

    setTimeout(() => {
      var timeInterval = setInterval(async () => {
        this.fetchHeartbeat(pathIndex, coordinatesClone);

        if (this.state.arrived) {
          console.log("Clearing StartMove");
          this.setMovingStatusMapsPAge(0, this.state.actualID);
          this.setState({
            moving: false,
            pathIndex: pathIndex + 1,
            msg: "Arrivée à destination !",
            moved:true,
            arrived:false
          });
          clearInterval(timeInterval);
        }
      }, 1000);
    }, 3000);
  };

  nextDestination = () => {
    var pathIndex = this.state.pathIndex;
    if (!pathIndex) {
      return this.StartMove();
    }
    // pathIndex = pathIndex + 1;
    this.setMovingStatus(1, this.state.actualID);
    this.setState({ moving: true, msg: "En mouvement ...",  positionIndex: this.state.positionIndex + 1 });
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

      // if (this.state.pk >= 70) {
      // stop after 35 iterations
      if (this.state.ARRIVED) {
        // This 313 is temporal, further we'll use a flag from robot heartbeat
        this.setMovingStatus(0, this.state.actualID);
        clearInterval(timeInterval);
        this.setState({
          moving: false,
          pathIndex: pathIndex + 1,
          msg: "Arrivée à destination !",
        });
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

  handleOpenModal = () => {
    this.setState({ openModal: true });
  };
  handleClose = () => {
    this.setState({ openModal: false, openModalInfo: false });
  };
  /** Scenario */
  handleScenarioStartTime = (startTime) => {
    console.log(
      "handleScenarioStartTime: Date.parse(this.state.endTime) < Date.parse(startTime) & startTime",
      this.state.endTime < Date.parse(startTime),
      startTime
    );
    if (this.state.endTime < Date.parse(startTime)) {
      return this.setState({
        modalErrorMsg:
          "* La date d'arrivé doit être après la date de départ et ne pas être une date du futur",
      });
    }
    this.setState({ startTime: Date.parse(startTime), modalErrorMsg: null });
  };
  handleScenarioEndTime = (endTime) => {
    console.log(
      "Date.parse(endTime) < Date.parse(this.state.startTime)",
      Date.parse(endTime) < this.state.startTime
    );
    if (
      Date.parse(endTime) > Date.now() ||
      Date.parse(endTime) < this.state.startTime
    ) {
      return this.setState({
        modalErrorMsg:
          "* La date d'arrivé doit être après la date de départ et ne pas être une date du futur",
      });
    }
    this.setState({ endTime: Date.parse(endTime), modalErrorMsg: null });
  };
  playScenario = () => {
    const { startTime, endTime } = this.state;
    // coordinatesClone = SELECT * FROM `MSG_DEF_ITINE` WHERE (TIMESTAMP >=startTime AND TIMESTAMP <=endTime)
    // Path index for starting is simply: const pathIndex = coordinatesClone[0]["pathindex"];
    // SELECT X_COORD,Y_COORD FROM `MSG_HEARTBEAT` WHERE (TIMESTAMP >=startTime AND TIMESTAMP <=endTime)
    // Increment pathIndex when you receive an arrived flag / For demo increment manually

    this.setState({ openModal: false });
    /**
     * We'll need to add pathIndex when storing destination points in database
     * Fetch the whole info (using startTime, endTime) in an array called scenario as we could
     * Increment pathIndex when needed
     */
    // var timeInterval = setInterval(async () => {
    //   // Fetch next scenario line
    //   this.addRobotPosition(
    //     pathIndex,
    //     {
    //       x_pixel: scenario[0]["X_COORD"],
    //       y_pixel: scenario[0]["Y_COORD"],
    //     },
    //     coordinatesClone
    //   );
    //   if (this.state.pk >= endTime) {
    //     // This 313 is temporal, further we'll use a flag from robot heartbeat
    //     clearInterval(timeInterval);
    //     this.setState({ moving: false });
    //   }
    // }, 1000);
  };
  /** */

  returnInfo = () => (
    <Card className="section3">
      <CardHeader
        avatar={<TuneOutlinedIcon fontSize="large" />}
        title="Informations"
      />
      <CardContent>
        {/* <span>&nbsp;</span> */}
        <div
          align="center"
          style={{
            // padding: "2em",
            // backgroundColor: "#FFFFCC",
            // fontFamily: "Josefin Slab, serif",
            fontFamily: "EB Garamond, serif",
          }}
        >
          <div className="line1">
            <div className="child1">
              1- Pour ajouter une destination, cliquez sur mode edition ensuite sur
              une position de la carte puis cliquez "Ajouter une destination".
              Cliquer "Rafraichir Map" pour visualiser la destination ajouté.
            </div>
            <div className="child2">
              2- Pour supprimer une destination, cliquez sur un point existant de
              l'image puis cliquez sur "Effacer une destination"
            </div>
          </div>
          <div className="line2">
            <div className="child1">
              3- Pour supprimer toutes les destination, cliquez juste sur "Effacer
              destinations"
            </div>
            <div className="child2">
              4- Le bouton "GO !", envoie une action avec le nombre de points
              au robot
            </div>
          </div>
          {/* <div className="line3">
            <div>
              Effacer la Map, Effacera la Map et toutes les destinations
              affiliées cliquez juste sur "Effacer la Map"
            </div>
          </div> */}
          {/* <h3>
            {" "}
            1-Ajout d'une destination, cliquez sur une position de l'image puis
            cliquez "Ajouter une destination";{" "}
          </h3>
          <h3>
            {" "}
            2-Supprimer une destination, cliquez sur un point existant de
            l'image puis cliquez sur "Effacer une destination";{" "}
          </h3>
          <h3>
            {" "}
            3-Supprimer toutes les destination, cliquez juste sur "Effacer
            destinations";{" "}
          </h3>
          <h3>
            {" "}
            4-Démarrage Immédiat, Envoie une action avec le nombre de points au
            robot;{" "}
          </h3>
          <h3>
            {" "}
            5-Effacer la Map, Effacera la Map et toutes les destinations
            affiliées cliquez juste sur "Effacer la Map" ;{" "}
          </h3> */}
        </div>
      </CardContent>
    </Card>
  );
  showInfoMobile = () => {
    this.setState({ openModalInfo: true });
  };
  editDestinations = () => {
    const { t } = this.props;
    const { xCoord, yCoord, choosingDest } = this.state;
    choosingDest
      ? this.deplacerRobot(xCoord, yCoord)
      : this.setState({ imageHeight: null, choosingDest: true, msg: t('manag_add_dest') });
  };
  enterArea(area) {
  }
  leaveArea(area) {
  }

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
      modalErrorMsg,
      openModalInfo,
      choosingDest,scrollTop,zoom, show, positionIndex, idRobot
    } = this.state;
    console.log("this.state & coodinates & map", this.state, coodinates, mp);
    // console.log(
    //   "this.props.showDetailsMapGestion",
    //   this.props.showDetailsMapGestion
    // );
    const mapName = this.props.showDetailsMapGestion.mapName;
    var fields = this.props.showDetailsMapGestion.data.split("blob");
    var id = fields[0];
    var blob = fields[1];
    const { t } = this.props;
    return (
      <div className={this.classes.root} style={{marginTop:window.innerWidth < 1200 ? "2em":"0" }}>
        {/* Old Scenario */}
        <Modal
          open={openModal}
          onClose={() => this.handleClose()}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="modal-body" style={{ backgroundColor: "white" }}>
            <p
              style={{
                color: "black",
                margin: " 0 0 2em",
                textAlign: "right",
                borderBottom: " 1px solid cornflowerblue",
                fontFamily: "system-ui",
              }}
            >
              Retracer un ancien parcour
            </p>
            <form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                  <TextField
                    id="datetime-local-from"
                    label="Départ"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    // className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) =>
                      this.handleScenarioStartTime(event.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    id="datetime-local-to"
                    label="Arrivé"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    // className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) =>
                      this.handleScenarioEndTime(event.target.value)
                    }
                  />
                </Grid>
              </Grid>
            </form>
            {modalErrorMsg && (
              <p style={{ color: "red", fontSize: "11px" }}>{modalErrorMsg}</p>
            )}
            <div
              style={{
                margin: "70px 0 0px",
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
                disabled={
                  !this.state.endTime || !this.state.startTime || modalErrorMsg
                }
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

        {/* Help on Mobile */}
        <Modal
          open={openModalInfo}
          onClose={() => this.handleClose()}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="modal-body" style={{ backgroundColor: "white", width:"80%" }}>
            {this.returnInfo()}
            <Button
              variant="outlined"
              size="small"
              // color="primary"
              style={{ float: "right", margin: "1em 0" }}
              onClick={() => this.handleClose()}
            >
              Fermer
            </Button>
          </div>
        </Modal>

        <MapGestionButtons showInfoMobile={()=>this.showInfoMobile()} zoom={zoom} handleZoomOut={()=>this.setState({zoom: this.state.zoom - 10})} handleZoomIn={()=>this.setState({zoom: this.state.zoom + 10})} handleShow={()=>this.setState({show:!this.state.show})} show={this.state.show} deletePoints={()=>this.deletePoints(this.state.actualID)} deleteOnePoint={()=>this.deleteOnePoint(this.state.actualPk)} editDestinations={()=>this.editDestinations()} provideCoordinates={()=>this.provideCoordinates()} StartMove={()=>this.StartMove()}   callBackRetourMaps={()=>this.props.callBackRetourMaps()} mapName={mapName} idRobot={idRobot} moving={moving} choosingDest={choosingDest} nbpts={this.state.nbpts} destination={this.state.destination} msg={this.state.msg} status={this.state.status}></MapGestionButtons>
           
        {/* Map Management */}
        <Grid container spacing={2} style={{position:"relative", top: show ? "250px":"80px"}}>
          <Grid item xs={12} md={12} lg={12}>
            <Card style={{zoom:zoom+"%", backgroundColor: "rgb(238, 238, 238)"}}>
              <CardContent>
                <ImageMapper
                  src={`data:image/jpeg;base64,` + blob}
                  map={mp}
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
                {/* <img src={"./images/indoor.jpg"} style={{zoom:zoom+"%"}}></img> */}
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
                  zoom:zoom+"%"
                }}
              >
                <svg style={{ height: "100%", width: "100%" }}>
                  {coodinates.map((item, index, array) => {
                    if (index + 1 < array.length) {
                      if (moving || moved) {
                        // Draw line 1
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
                            stroke={this.handleStrokeColor(index)}
                            strokeWidth="10"
                            fill="none"
                            r={10}
                          />
                        ) 
                      } else {
                        // Don't Draw line 1
                        if (index != 0 ) {
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
                              stroke={this.handleStrokeColor(index)}
                              strokeWidth="10"
                              fill="none"
                              r={10}
                            />
                          ) 
                        }
                      }
                    }
                  })}
                  {coodinates.map((item, index, array) => (
                    <React.Fragment>
                      <circle
                        cx={item.x_pixel}
                        cy={item.y_pixel}
                        r="12"
                        stroke="bisque"
                        strokeWidth="3"
                        fill={
                          moving
                            ? index === pathIndex
                              ? "#8f1b36"
                              : "#2e7aa3"
                            : "#2e7aa3"
                        }
  
                      />
                      {index === positionIndex && <React.Fragment>
                        <circle cx={item.x_pixel} cy={item.y_pixel} fill="none" r="10" stroke="#383a36" stroke-width="2">
                        <animate attributeName="r" from="8" to="20" dur="1.5s" begin="0s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" from="1" to="0" dur="1.5s" begin="0s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx={item.x_pixel} cy={item.y_pixel} fill="#383a36" r="10"/></React.Fragment>}
                    </React.Fragment>
                  ))}
                </svg>
              </div>
            )}
          </Grid>
          
        </Grid>
      </div>
    );
  }
}

export default  withTranslation()(MapGestion);