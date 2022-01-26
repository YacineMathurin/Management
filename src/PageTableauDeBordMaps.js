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

function PageTableauDeBordMaps(props) {
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
  const [allData, setAllData] = React.useState(null);
  const [printTable, setprintTable] = React.useState("block");
  const [printCard, setprintCard] = React.useState("none");
  const [search, setsearch] = React.useState("");
  const [defaultMetrics, setdefaultMetrics] = React.useState(null);
  const [moving, setMoving] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    provideMetrics();
  }, []);

  const formating = (data) => {
    var rows = [];
    var result = [];
    rows.push(data[0]['id']);
    result.push(data[0]);
    console.log("formating data", data[0], 'rows', rows);

    data.map(dataItem => { 
        if(!rows.includes(dataItem.id)) {
          rows.push(dataItem.id);
          result.push(dataItem);
        }
    });
    console.log("result", result);
    setlisteMetrics(result);
    setdefaultMetrics(result);
    setAllData(data);
  }

  const provideMetrics = () => {
    var result = [];
    fetch(
      Const.URL_GET_ALL_MAPS,
      {
        
      }
    )
      .then((res) => res.json())
      .then((data) => {
         console.log(data);
         formating(data);
         setLoading(false);
      })
      .catch((error) => {
        console.error("Request failed", error);
      });
  };

  const handleCallbackOpenMaps = (idRobot) => {
    console.log("send robot id to PageMaps");
    props.callbackOpenMaps(idRobot);
    console.log(idRobot);
    console.log(props.callbackOpenMaps(idRobot));
  };

  const searchFilterFunction = (text) => {
    if (!allData) {
      alert("Votre Flotte est vide !!!");
      return 0;
    }
    
    var regex = new RegExp(text, "gi");

    const newData = allData.filter((item) => {
      return item.id_robot == text || item.map_name.match(regex) ;
    }); 
    console.log("newData", newData);

    setlisteMetrics(newData);
  };
 
  const resetFilter = () => {
    console.log("Reseting ...");
    setsearch("");
    setlisteMetrics(defaultMetrics);

  };

  const getComment = (comment) => {
    const parser = new DOMParser();
    console.log(parser.parseFromString(comment, 'text/html'))
    return new String(comment);
  }

  if (loading) {
    return (
      <div>
        <p>{t("dashboard_loading")}</p>
        <LinearBuffer></LinearBuffer>
      </div>
    );
  } else
    return (
      <div id="PageTableauDeBordMaps">
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={9}>
            <Card>
              <CardHeader
                avatar={
                  <div>
                    <img width="32" src="./images/carrier.svg" />
                  </div>
                }
                title={t("dashboard_maps_title")}
                subheader={t("dashboard_maps_subtitle")}
              />
              

              <CardContent style={{ display: printTable }}>
                <div style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      position: "relative",
                      bottom: "6.5em",
                }}>
                  {/* <img onClick={()=>callBackRetourMaps()} src={"./images/go_back.png"} style={{width:"50px", marginRight:"1em", position:"relative", top:"15px"}}></img> */}
                  <img onClick={() => props.callBackRetourTableauDeBord()} src={"./images/go_back.png"} style={{width:"50px", marginRight:"1em", position:"relative", top:"15px"}}></img>
                </div>
                <Table>
                  <TableHead style={{backgroundColor: "rgb(75, 75, 75)", color:"white"}}>
                    <TableRow>
                      {/* <TableCell align="center">ID Client </TableCell> */}
                      <TableCell align="center" style={{ color:"white"}}>ID Map</TableCell>
                      <TableCell align="left" style={{ color:"white"}}>
                        {t("dashboard_maps_name")}
                      </TableCell>
                      <TableCell align="left" style={{ color:"white"}}>
                        {t("dashboard_maps_comment")}
                      </TableCell>
                      {/* <TableCell align="center"><img  width="24" src="./images/microchip.svg"/></TableCell>*/}
                      <TableCell align="left" style={{ color:"white"}}>
                        {t("dashboard_maps_robots")}{" "}
                      </TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  {listeMetrics != null &&
                    listeMetrics.map((s) => {
                      return (
                        <TableBody key={s.id}>
                          <TableRow>
                            {/* <TableCell align="center">{s.ID_CLIENT}</TableCell> */}
                            <TableCell align="center">{s.id}</TableCell>
                            <TableCell align="left">{s.map_name}</TableCell>
                            <TableCell align="left" dangerouslySetInnerHTML={{ __html: getComment(s.user_comment)}}></TableCell> 
                            <TableCell >{allData.map((item, index) => item.id === s.id ? 
                              <Button
                                key={index}
                                onClick={()=>{handleCallbackOpenMaps(item.id_robot)}}
                                variant="outlined"
                                // color="secondary"
                                size="small"
                                style={{margin:"0 0.5em 0.5em"}}
                              >
                                {item.id_robot}
                              </Button>: "")}
                            </TableCell>
                            <TableCell align="left">
                            </TableCell>
                            <TableCell align="left">
                              <Button
                                fullWidth={false}
                                width="2em"
                                onClick={() =>
                                  props.callbackOpenMapOverview(s.id_client ,s.id_robot, s.id, allData, s.map_name)
                                }
                                variant="outlined"
                                color="primary"
                                size="small"
                              >
                                {t("dashboard_map")}
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      );
                    })}
                </Table>
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
                    placeholder={t("dashboard_maps_search")}
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

                <br></br>
                
                <br></br>
                <Button
                  style={{ marginTop: "1em" }}
                  fullWidth={true}
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={() => resetFilter()}
                  
                >
                  {t("dashboard_maps_filter_reset")}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
}

export default PageTableauDeBordMaps;
