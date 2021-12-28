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
import LinearProgress from "@material-ui/core/LinearProgress";
import LinearBuffer from "./PageTableauDeBordChargement";
import CircularProgressWithLabel from "./PageTableauDeBordBattery";
import { useTranslation } from "react-i18next";

function PageTableauDeBord(props) {
  const { t, i18n } = useTranslation();

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
  const [moving, setMoving] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

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

  React.useEffect(() => {
    provideMetrics();
  }, []);

  const provideMetrics = () => {
    var result = [];
    fetch(
      Const.URL_WS_ALL_ROBOTS + "?email=" + localStorage.getItem("username"),
      { retry: 3, retryDelay: 1000 }
    )
      .then((res) => res.json())
      .then((data) => {
            setlisteMetrics(data);
            setdefaultMetrics(data);

            setTimeout(() => {
              setLoading(false);
            }, 100);
          })
          .catch((error) => {
            console.error("Request failed", error);
          });
        // data.map((item) => {
        //   fetch(
        //     Const.URL_WS_GET_CLIENT_ROBOT +
        //       "?id_client=" +
        //       item.ID_CLIENT +
        //       "?id_robot=" +
        //       item.ID_ROBOT,
        //     { retry: 3, retryDelay: 1000 }
        //   )
        //     .then((res) => res.json())
        //     .then((data) => {
        //       // returns [{}]
        //       result.push(data[0]);
        //     })
        //     .catch((error) => {
        //       console.error("Request failed", error);
        //     });
        // });
        // result = data;
        // setlisteMetrics(result);
        // setdefaultMetrics(result);
      
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
    // this.setState({ printTable: "block" });
    setprintTable("block");
    // this.setState({ printCard: "none" });
    setprintCard("none");
  };
  const handlePrintCard = () => {
    // this.setState({ printTable: "none" });
    // this.setState({ printCard: "block" });
    setprintTable("none");
    setprintCard("block");
  };
  const searchFilterFunction = (text) => {
    if (!defaultMetrics) {
      alert("Votre Flotte est vide !!!");
      return 0;
    }
    const newData = defaultMetrics.filter((item) => {
      const itemData = `${item.ID_ROBOT}`;
      return itemData.includes(text);
    });

    // this.setState({
    //   listeMetrics: newData,
    // });
    setlisteMetrics(newData);
  };
  const autoReset = (newBatLevels, movingFilter) => {
    const { batLevel0, batLevel1, batLevel2 } = newBatLevels;
    console.log("AutoReset", batLevel0, batLevel1, batLevel2, movingFilter);
    if (movingFilter == null && !batLevel0 && !batLevel1 && !batLevel2) {
      console.log("Fired !");
      resetFilter();
    }
  };
  const setFilteredBatLevel = (event, batLevel, index) => {
    console.log("batLevel, index", batLevel, index);
    setBatFilters({ ...batFilters, [event.target.name]: event.target.checked });

    console.log("batLevels", batLevels);
    var newBatLevels = batLevels;
    newBatLevels["batLevel" + index] =
      batLevels["batLevel" + index] != undefined ? undefined : batLevel;
    console.log("newBatLevels", newBatLevels);

    setBatLevels(newBatLevels);
    autoReset(newBatLevels, moving);
    console.log("batLevels", batLevels);
  };
  const setFiltMoving = (value) => {
    const movingFilter = moving == null ? value : null;
    setMoving(movingFilter);
    autoReset(batFilters, movingFilter);
  };

  const handleFiltering = () => {
    if (!defaultMetrics) {
      alert("Votre Flotte est vide !!!");
      return 0;
    }

    const { batLevel0, batLevel1, batLevel2 } = batLevels;
    console.log(
      "Filtering ... batLevel0, batLevel1, batLevel2 ",
      batLevel0,
      batLevel1,
      batLevel2
    );

    var newData = defaultMetrics;

    if (batLevel0 || batLevel1 || batLevel2) {
      newData = defaultMetrics.filter(
        (item) =>
          (batLevel0 && item.BAT_LEVEL >= 0 && item.BAT_LEVEL < 45) ||
          (batLevel1 && item.BAT_LEVEL > 45 && item.BAT_LEVEL < 55) ||
          (batLevel2 && item.BAT_LEVEL > 55)
      );
    }

    if (moving != null) {
      console.log("Moving set !");
      newData = newData.filter((item) => item.STATUS === moving);
    }
    console.log("New Data", newData);
    setlisteMetrics(newData);
  };
  const resetFilter = () => {
    console.log("Reseting ...");
    setsearch("");
    setMoving(null);

    var resetFilters = batFilters;
    resetFilters.batFilter0 = false;
    resetFilters.batFilter1 = false;
    resetFilters.batFilter2 = false;
    setBatFilters(resetFilters);

    var resetLevels = batLevels;
    resetLevels.batLevel0 = undefined;
    resetLevels.batLevel1 = undefined;
    resetLevels.batLevel2 = undefined;
    setBatLevels(resetLevels);

    setlisteMetrics(defaultMetrics);
    // const { defaultMetrics } = state;

    // setState({
    //   listeMetrics: defaultMetrics,
    //   batFilter0: false,
    //   batFilter1: false,
    //   batFilter2: false,
    // });
  };

  if (loading) {
    return (
      <div>
        <p>{t("dashboard_loading")}</p>
        <LinearBuffer></LinearBuffer>
      </div>
    );
  } else
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
                title={t("dashboard_title")}
                subheader={t("dashboard_subtitle")}
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
                  onClick={() => handlePrintCard()}
                  variant="outlined"
                  color="primary"
                  size="small"
                >
                  <DashboardIcon fontSize="large" />
                </Button>

                <Button
                  style={{ marginTop: "1em", display: printCard }}
                  fullWidth={false}
                  onClick={() => handlePrintTable()}
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
                      <TableCell align="center">
                        {t("dashboard_moving")}
                      </TableCell>
                      <TableCell align="center">
                        {t("dashboard_connected")}
                      </TableCell>
                      {/* <TableCell align="center"><img  width="24" src="./images/microchip.svg"/></TableCell>*/}
                      <TableCell align="center">
                        {t("dashboard_autonomy")}{" "}
                      </TableCell>
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
                                src={
                                  s.is_moving
                                    ? "./images/switch-on.svg"
                                    : "./images/switch-off.svg"
                                }
                              />
                            </TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">
                              <img
                                src={"./images/car-battery.svg"}
                                style={{ width: "20px" }}
                              />
                              <span sytle={{ margin: "0 1em" }}>
                                <CircularProgressWithLabel
                                  value={s.BAT_LEVEL}
                                  color={
                                    s.BAT_LEVEL < 20
                                      ? "#FF6666"
                                      : s.BAT_LEVEL > 20 && s.BAT_LEVEL < 80
                                      ? "gold"
                                      : "#4DD637"
                                  }
                                />
                              </span>
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
                                {t("dashboard_details")}
                              </Button>
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                fullWidth={false}
                                width="2em"
                                onClick={() =>
                                  handleCallbackOpenMaps(s.ID_ROBOT)
                                }
                                variant="outlined"
                                color="primary"
                                size="small"
                              >
                                {t("dashboard_maps")}
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
                                  //onClick={() => handleCallbackOpenDetails(s) }
                                  onClick={() =>
                                    handleCallbackOpenDetails(s.ID_ROBOT)
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
                                    handleCallbackOpenMaps(s.ID_ROBOT)
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
                title={t("dashboard_filtrage")}
                subheader={t("dashboard_filtrage_sub")}
              />

              <CardContent>
                <FormControl size="small" fullWidth variant="outlined">
                  <TextField
                    size="small"
                    placeholder={t("dashboard_search")}
                    value={search}
                    onChange={(event) => {
                      const { value } = event.target;
                      // this.setState({ search: value });
                      setsearch(value);
                      if (value !== "") {
                        searchFilterFunction(value);
                      } else {
                        // this.setState({
                        //   listeMetrics: defaultMetrics,
                        // });
                        setlisteMetrics(defaultMetrics);
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
                        name="moving"
                        onChange={() => {
                          setFiltMoving(1, 0);
                        }}
                        disabled={moving === 0 ? true : false}
                        checked={moving === 1}
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
                        name="stoped"
                        onChange={() => {
                          setFiltMoving(0, 1);
                        }}
                        disabled={moving === 1 ? true : false}
                        checked={moving === 0}
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
                          setFilteredBatLevel(e, true, 0);
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
                          setFilteredBatLevel(e, true, 1);
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
                          setFilteredBatLevel(e, true, 2);
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
                  onClick={() => handleFiltering()}
                  disabled={
                    !batLevels.batLevel0 &&
                    !batLevels.batLevel1 &&
                    !batLevels.batLevel2 &&
                    moving == null
                  }
                >
                  {t("dashboard_filter_btn")}
                </Button>
                <br></br>
                <Button
                  style={{ marginTop: "1em" }}
                  fullWidth={true}
                  variant="outlined"
                  color="default"
                  size="small"
                  onClick={() => resetFilter()}
                  disabled={
                    !batLevels.batLevel0 &&
                    !batLevels.batLevel1 &&
                    !batLevels.batLevel2 &&
                    moving == null
                  }
                >
                  {t("dashboard_filter_reset")}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
}

export default PageTableauDeBord;
