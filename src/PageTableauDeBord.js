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
import Switch from "@material-ui/core/Switch";

function PageTableauDeBord(props) {
  const [apiKey, setApiKey] = React.useState(props.apiKey);
  const [filtreReussite, setfiltreReussite] = React.useState([0, 100]);
  const [filtreRapportMoyen, setfiltreRapportMoyen] = React.useState([0, 100]);
  const [filtreEcartMax, setfiltreEcartMax] = React.useState([0, 100]);
  const [filtreIndicateurEcart, setfiltreIndicateurEcart] = React.useState([
    0,
    200,
  ]);
  const [filtreActivite, setfiltreActivite] = React.useState([0, 100]);
  const [listeMetrics, setlisteMetrics] = React.useState(null);
  const [printTable, setprintTable] = React.useState("block");
  const [printCard, setprintCard] = React.useState("none");
  const [search, setsearch] = React.useState("");
  const [defaultMetrics, setdefaultMetrics] = React.useState(null);

  const [batLevels, setBatLevels] = React.useState({
    batLevel0: undefined,
    batLevel1: undefined,
    batLevel2: undefined,
  });
  const [batFilters, setBatFilters] = React.useState({
    batFilter0: false,
    batFilter1: false,
    batFilter2: false,
  });
  //   const [batFilter0, setbatFilter0] = React.useState();
  //   const [batFilter1, setbatFilter1] = React.useState();
  //   const [batFilter2, setbatFilter2] = React.useState();

  const [moving, setmoving] = React.useState();
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       apiKey: this.props.apiKey,
  //       filtreReussite: [0, 100],
  //       filtreRapportMoyen: [0, 100],
  //       filtreEcartMax: [0, 100],
  //       filtreIndicateurEcart: [0, 200],
  //       filtreActivite: [0, 100],
  //       listeMetrics: null,
  //       printTable: "block",
  //       printCard: "none",
  //       search: "",
  //       defaultMetrics: null,
  //     };
  //   }

  // Similar to componentDidMount and componentDidUpdate:
  React.useEffect(() => {
    provideMetrics();
  }, []);

  // componentDidMount() {
  //     this.provideMetrics();
  //   }

  const provideMetrics = () => {
    fetch(
      Const.URL_WS_ALL_ROBOTS + "?email=" + localStorage.getItem("username"),
      { retry: 3, retryDelay: 1000 }
    )
      .then((res) => res.json())
      .then((data) => {
        setlisteMetrics(data);
        setdefaultMetrics(data);
        // this.setState({
        //   listeMetrics: data,
        //   defaultMetrics: data,
        // });
      })
      .catch((error) => {
        console.log("Request failed", error);
      });
  };

  const handleCallbackOpenDetails = (idRobot) => {
    console.log("send robot id to PageAide");
    props.callbackOpenDetails(idRobot);
    console.log(idRobot);
    console.log(props.callbackOpenDetails(idRobot));
  };
  const handleCallbackOpenMaps = (idRobot) => {
    console.log("send robot id to PageMaps");
    props.callbackOpenMaps(idRobot);
    console.log(idRobot);
    console.log(props.callbackOpenMaps(idRobot));
  };
  const handlePrintTable = () => {
    this.setState({ printTable: "block" });
    this.setState({ printCard: "none" });
  };
  const handlePrintCard = () => {
    this.setState({ printTable: "none" });
    this.setState({ printCard: "block" });
  };
  const searchFilterFunction = (text) => {
    //console.log("recherche robot n° "+text )
    const newData = defaultMetrics.filter((item) => {
      const itemData = `${item.ID_ROBOT}`;
      return itemData.includes(text);
    });

    this.setState({
      listeMetrics: newData,
    });
  };
  const setFilteredBatLevel = (event, batLevel, index) => {
    // const ["batLevel" + index] = this.state["batLevel" + index] != null ? null : batLevel;
    // this.setState({
    //   ["batLevel" + index]:
    //     this.state["batLevel" + index] != undefined ? undefined : batLevel,
    //   ["batFilter" + index]: !this.state["batFilter" + index],
    // });

    setBatFilters({ ...batFilters, [event.target.name]: event.target.checked });
    setBatLevels({
      ...batLevels,
      ["batLevel" + index]:
        ["batLevel" + index] != undefined ? undefined : batLevel,
    });
  };
  const setFiltMoving = (value) => {
    const { moving } = this.state;
    this.setState({
      moving: moving == null ? value : null,
    });
  };

  const setFiltStoped = () => {
    const { stoped } = this.state;
    this.setState({
      stoped: !stoped ? true : null,
    });
  };
  const handleFiltering = () => {
    const {
      batLevel0,
      batLevel1,
      batLevel2,
      moving,
      stoped,
      defaultMetrics,
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
  const resetFilter = () => {
    const { defaultMetrics } = this.state;

    this.setState({
      listeMetrics: defaultMetrics,
      batFilter0: false,
      batFilter1: false,
      batFilter2: false,
    });
  };
  //   render() {
  // console.log("state", this.state);
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
                style={{ marginTop: "1em", display: printTable }}
                fullWidth={false}
                onClick={() => this.handlePrintCard()}
                variant="outlined"
                color="primary"
                size="small"
              >
                <DashboardIcon fontSize="large" />
              </Button>

              <Button
                style={{ marginTop: "1em", display: printCard }}
                fullWidth={false}
                onClick={() => this.handlePrintTable()}
                variant="outlined"
                color="primary"
                size="small"
              >
                <ViewStreamIcon fontSize="large" />
              </Button>
            </div>

            <CardContent style={{ display: printTable }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {/* <TableCell align="center">ID Client </TableCell> */}
                    <TableCell align="center">ID Robot</TableCell>
                    <TableCell align="center">En mouvement</TableCell>
                    <TableCell align="center">Connecté</TableCell>
                    {/* <TableCell align="center"><img  width="24" src="./images/microchip.svg"/></TableCell>*/}
                    <TableCell align="center">Autonomie </TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                {listeMetrics != null &&
                  listeMetrics.map((s) => {
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
                          {/* <TableCell align="center">{s.ID_CLIENT}</TableCell> */}
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
                                handleCallbackOpenDetails(s.ID_ROBOT)
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
                              onClick={() => handleCallbackOpenMaps(s.ID_ROBOT)}
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

            <CardContent style={{ display: printCard }}>
              <Grid container spacing={2}>
                {listeMetrics != null &&
                  listeMetrics.map((s) => {
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
                  value={search}
                  onChange={(event) => {
                    const { value } = event.target;
                    this.setState({ search: value });
                    if (value !== "") {
                      this.searchFilterFunction(value);
                    } else {
                      this.setState({
                        listeMetrics: defaultMetrics,
                      });
                    }
                  }}
                />
              </FormControl>

              <div style={{ marginTop: "1.5em" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      // icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      name="checkedI"
                      onChange={() => {
                        this.setFiltMoving(1, 0);
                      }}
                      disabled={moving === 0 ? true : false}
                      checked={!moving}
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
                      disabled={moving === 1 ? true : false}
                      checked={moving}
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

              {/* <div>
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
                   */}
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      name="batFilter0"
                      onChange={(e) => {
                        setFilteredBatLevel(e, 0, 0);
                      }}
                      inputProps={{ "aria-label": "controlled-checkbox" }}
                      checked={batFilters.batFilter0}
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
                      name="batFilter1"
                      onChange={(e) => {
                        setFilteredBatLevel(e, 50, 1);
                      }}
                      checked={batFilters.batFilter1}
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
                      name="batFilter2"
                      onChange={(e) => {
                        setFilteredBatLevel(e, 100, 2);
                      }}
                      checked={batFilters.batFilter2}
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
              </div>
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
  //   }
}

export default PageTableauDeBord;
