import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import * as Const from "./Constant";
import CardHeader from "@material-ui/core/CardHeader";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { Divider } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import DashboardIcon from "@material-ui/icons/Dashboard";
import TextField from "@material-ui/core/TextField";

class PageTableauDeBord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: this.props.apiKey,
      filtreReussite: [0, 100],
      filtreRapportMoyen: [0, 100],
      filtreEcartMax: [0, 100],
      filtreIndicateurEcart: [0, 200],
      filtreActivite: [0, 100],
      listeMetrics: null,
      printTable: "block",
      printCard: "none",
      search: "",
      default: null,
    };
  }

  provideMetrics() {
    fetch(
      Const.URL_WS_ALL_ROBOTS + "?email=" + localStorage.getItem("username"),
      { retry: 3, retryDelay: 1000 }
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          listeMetrics: data,
          default: data,
        });
      })
      .catch((error) => {
        console.log("Request failed", error);
      });
  }
  componentDidMount() {
    this.provideMetrics();
  }
  handleCallbackOpenDetails = (idRobot) => {
    console.log("send robot id to PageAide");
    this.props.callbackOpenDetails(idRobot);
    console.log(idRobot);
    console.log(this.props.callbackOpenDetails(idRobot));
  };
  handleCallbackOpenMaps = (idRobot) => {
    console.log("send robot id to PageMaps");
    this.props.callbackOpenMaps(idRobot);
    console.log(idRobot);
    console.log(this.props.callbackOpenMaps(idRobot));
  };
  handlePrintTable = () => {
    this.setState({ printTable: "block" });
    this.setState({ printCard: "none" });
  };
  handlePrintCard = () => {
    this.setState({ printTable: "none" });
    this.setState({ printCard: "block" });
  };
  searchFilterFunction = (text) => {
    //console.log("recherche robot n° "+text )
    const newData = this.state.default.filter((item) => {
      const itemData = `${item.ID_ROBOT}`;
      return itemData.includes(text);
    });

    this.setState({
      listeMetrics: newData,
    });
  };
  setFilteredBatLevel = (batLevel, index) => {
    // const ["batLevel" + index] = this.state["batLevel" + index] != null ? null : batLevel;
    this.setState({
      ["batLevel" + index]:
        this.state["batLevel" + index] != undefined ? undefined : batLevel,
    });
  };
  setFiltMoving = (value) => {
    const { moving } = this.state;
    this.setState({
      moving: moving == null ? value : null,
    });
  };
  setFiltStoped = () => {
    const { stoped } = this.state;
    this.setState({
      stoped: !stoped ? true : null,
    });
  };
  handleFiltering = () => {
    const {
      batLevel0,
      batLevel1,
      batLevel2,
      moving,
      stoped,
      default: defaultMetrics,
    } = this.state;

    var newData = defaultMetrics;

    newData = defaultMetrics.filter(
      (item) =>
        item.BAT_LEVEL >= batLevel0 ||
        (item.BAT_LEVEL > batLevel1 && item.BAT_LEVEL < batLevel2) ||
        item.BAT_LEVEL > batLevel2
    );
    if (moving) {
      console.log("Moving set !");
      newData = newData.filter((item) => item.STATUS === moving);
    }
    this.setState({
      listeMetrics: newData,
    });
  };
  resetFilter = () => {
    const { default: defaultMetrics } = this.state;

    this.setState({ listeMetrics: defaultMetrics });
  };
  render() {
    console.log("state", this.state);
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={9}>
            <Card>
              <CardHeader
                avatar={
                  <div>
                    <img width="32" src="./images/carrier.svg" />
                  </div>
                }
                title="Mon Parcs cobotique"
                subheader="Retrouvez vos robots suiveurs"
              />
              <div
                style={{
                  float: "right",
                  marginTop: "-4em",
                  marginRight: "2em",
                }}
              >
                <Button
                  style={{ marginTop: "1em", display: this.state.printTable }}
                  fullWidth={false}
                  onClick={() => this.handlePrintCard()}
                  variant="outlined"
                  color="primary"
                  size="small"
                >
                  <DashboardIcon fontSize="large" />
                </Button>

                <Button
                  style={{ marginTop: "1em", display: this.state.printCard }}
                  fullWidth={false}
                  onClick={() => this.handlePrintTable()}
                  variant="outlined"
                  color="primary"
                  size="small"
                >
                  <ViewStreamIcon fontSize="large" />
                </Button>
              </div>

              <CardContent style={{ display: this.state.printTable }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">ID Client </TableCell>
                      <TableCell align="center">ID Robot</TableCell>
                      <TableCell align="center">En mouvement</TableCell>
                      <TableCell align="center">Connecté</TableCell>
                      {/* <TableCell align="center"><img  width="24" src="./images/microchip.svg"/></TableCell>*/}
                      <TableCell align="center">Autonomie </TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  {this.state.listeMetrics != null &&
                    this.state.listeMetrics.map((s) => {
                      var batterie = "./images/b1.png";

                      if (s.BAT_LEVEL <= 55 && s.BAT_LEVEL >= 45) {
                        batterie = "./images/b50.png";
                      } else if (s.BAT_LEVEL < 45) {
                        batterie = "./images/b0.png";
                      }

                      var processor = "./images/check.svg";
                      /* if(s.system.cpu >= 80){
                  processor = "./images/warning.svg";
                }*/

                      var dispo = "./images/switch-on.svg";
                      var timeS = Date.now() - s.TIMESTAMP;
                      var dateS = new Date(timeS * 1000);
                      var minutesS = dateS.getMinutes();
                      //console.log("robot " +s.ID_ROBOT +" nb minutes="+minutesS);

                      if (minutesS >= 15) {
                        dispo = "./images/switch-off.svg";
                      }

                      return (
                        <TableBody key={s.ID_ROBOT}>
                          <TableRow>
                            <TableCell align="center">{s.ID_CLIENT}</TableCell>
                            <TableCell align="center">{s.ID_ROBOT}</TableCell>
                            <TableCell align="center">
                              {" "}
                              <img
                                style={{ marginTop: "0.5em" }}
                                width="34"
                                src={dispo}
                              />
                            </TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">
                              <img width="30" src={batterie} />
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                fullWidth={false}
                                width="2em"
                                onClick={() =>
                                  this.handleCallbackOpenDetails(s.ID_ROBOT)
                                }
                                variant="outlined"
                                color="primary"
                                size="small"
                              >
                                détails
                              </Button>
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                fullWidth={false}
                                width="2em"
                                onClick={() =>
                                  this.handleCallbackOpenMaps(s.ID_ROBOT)
                                }
                                variant="outlined"
                                color="primary"
                                size="small"
                              >
                                Maps
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      );
                    })}
                </Table>
              </CardContent>

              <CardContent style={{ display: this.state.printCard }}>
                <Grid container spacing={2}>
                  {this.state.listeMetrics != null &&
                    this.state.listeMetrics.map((s) => {
                      var batterie = "./images/b1.png";

                      if (s.BAT_LEVEL <= 55 && s.BAT_LEVEL >= 45) {
                        batterie = "./images/b50.png";
                      } else if (s.BAT_LEVEL < 45) {
                        batterie = "./images/b0.png";
                      }

                      var processor = "./images/check.svg";
                      /* if(s.system.cpu >= 80){
                processor = "./images/warning.svg";
              }*/

                      var dispo = "./images/switch-on.svg";
                      var timeS = Date.now() - s.TIMESTAMP;
                      var dateS = new Date(timeS * 1000);
                      var minutesS = dateS.getMinutes();
                      console.log(minutesS);

                      if (minutesS >= 15) {
                        dispo = "./images/switch-off.svg";
                      }

                      return (
                        <Grid item xs={12} md={4} lg={3} key={s.ID_ROBOT}>
                          <Card>
                            <CardContent>
                              <div>
                                <img
                                  style={{ float: "left", marginTop: "0.5em" }}
                                  width="24"
                                  src="./images/carrier.svg"
                                />
                              </div>
                              <div>
                                <img
                                  style={{ float: "right", marginTop: "0.5em" }}
                                  width="34"
                                  src={dispo}
                                />
                              </div>
                              <div style={{ marginLeft: "2.5em" }}>
                                <Typography
                                  style={{ color: "BLACK" }}
                                  component="h3"
                                  variant="h3"
                                >
                                  {s.ID_CLIENT}
                                </Typography>
                                <Typography
                                  style={{ color: "BLACK" }}
                                  component="h3"
                                  variant="h3"
                                >
                                  {s.ID_ROBOT}
                                </Typography>
                                <Typography
                                  style={{ fontSize: "14px" }}
                                  color="textSecondary"
                                >
                                  description
                                </Typography>
                              </div>
                              <Divider style={{ marginTop: "1em" }} />
                              <div>
                                <Table>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell>
                                        <img
                                          width="24"
                                          src="./images/microchip.svg"
                                        />
                                      </TableCell>
                                      <TableCell align="right">
                                        <img width="24" src={processor} />
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>
                                        <img
                                          width="24"
                                          src="./images/car-battery.svg"
                                        />
                                      </TableCell>
                                      <TableCell align="right">
                                        <img width="30" src={batterie} />
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                                <Button
                                  style={{ marginTop: "1em" }}
                                  fullWidth={true}
                                  //onClick={() => this.handleCallbackOpenDetails(s) }
                                  onClick={() =>
                                    this.handleCallbackOpenDetails(s.ID_ROBOT)
                                  }
                                  variant="outlined"
                                  color="primary"
                                  size="small"
                                >
                                  détails
                                </Button>
                                <Button
                                  style={{ marginTop: "1em" }}
                                  fullWidth={true}
                                  onClick={() =>
                                    this.handleCallbackOpenMaps(s.ID_ROBOT)
                                  }
                                  variant="outlined"
                                  color="primary"
                                  size="small"
                                >
                                  Maps
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Card>
              <CardHeader
                avatar={<TuneOutlinedIcon fontSize="large" />}
                title="Filtrage"
                subheader="Filtrez votre parc cobotique"
              />

              <CardContent>
                <FormControl size="small" fullWidth variant="outlined">
                  <TextField
                    size="small"
                    placeholder="Rechercher un ID Robot"
                    value={this.state.search}
                    onChange={(event) => {
                      const { value } = event.target;
                      this.setState({ search: value });
                      if (value !== "") {
                        this.searchFilterFunction(value);
                      } else {
                        this.setState({ listeMetrics: this.state.default });
                      }
                    }}
                  />
                </FormControl>

                <div style={{ marginTop: "1.5em" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        name="checkedI"
                        onChange={() => {
                          this.setFiltMoving(1, 0);
                        }}
                        disabled={this.state.moving === 0 ? true : false}
                      />
                    }
                    label={
                      <img
                        style={{ marginTop: "0.5em" }}
                        width="30"
                        src="./images/switch-on.svg"
                      />
                    }
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        name="checkedI"
                        onChange={() => {
                          this.setFiltMoving(0, 1);
                        }}
                        disabled={this.state.moving === 1 ? true : false}
                      />
                    }
                    label={
                      <img
                        style={{ marginTop: "0.5em" }}
                        width="30"
                        src="./images/switch-off.svg"
                      />
                    }
                  />
                </div>

                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        name="checkedI"
                      />
                    }
                    label={
                      <img
                        style={{ marginTop: "0.5em" }}
                        width="25"
                        src="./images/check.svg"
                      />
                    }
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        name="checkedI"
                      />
                    }
                    label={
                      <img
                        style={{ marginTop: "0.5em" }}
                        width="25"
                        src="./images/warning.svg"
                      />
                    }
                  />
                </div>

                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      name="checkedI"
                      onChange={() => {
                        this.setFilteredBatLevel(0, 0);
                      }}
                    />
                  }
                  label={
                    <img
                      style={{ marginTop: "0.5em" }}
                      width="30"
                      src="./images/b0.png"
                    />
                  }
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      name="checkedI"
                      onChange={() => {
                        this.setFilteredBatLevel(50, 1);
                      }}
                    />
                  }
                  label={
                    <img
                      style={{ marginTop: "0.5em" }}
                      width="30"
                      src="./images/b50.png"
                    />
                  }
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      name="checkedI"
                      onChange={() => {
                        this.setFilteredBatLevel(100, 2);
                      }}
                    />
                  }
                  label={
                    <img
                      style={{ marginTop: "0.5em" }}
                      width="30"
                      src="./images/b1.png"
                    />
                  }
                />
                <br></br>
                <Button
                  style={{ marginTop: "1em" }}
                  fullWidth={true}
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => this.handleFiltering()}
                >
                  Filtrer
                </Button>
                <br></br>
                <Button
                  style={{ marginTop: "1em" }}
                  fullWidth={true}
                  variant="outlined"
                  color="default"
                  size="small"
                  onClick={() => this.resetFilter()}
                >
                  Reinitialiser les filtres
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default PageTableauDeBord;
