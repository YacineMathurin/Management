import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import * as Const from "./Constant";
import CardHeader from "@material-ui/core/CardHeader";
import ReactApexChart from "react-apexcharts";
// import "./PageAide.css";

class PageAide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: props.apiKey,
      detail: "",
      synthese: null,
      details: null,
      mapBat: [],
      mapDat: [],
      robot: this.props.showDetailsMetrics,
    };
  }

  classes = makeStyles((Theme) => createStyles({}));

  provideHeartBeats() {
    var MAP = [];
    var MAPD = [];

    fetch(Const.URL_WS_ROBOT_HEARTS + `?robot=${this.state.robot}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(
          "je fais un tableau des dateHeures et du niveau de batterie"
        );

        data.reverse().map((donnee) => {
          var d = new Date(donnee.TIMESTAMP * 1000).toLocaleString();
          MAP.push(donnee.BAT_LEVEL);
          MAPD.push(d);
        });
        this.setState({ mapBat: MAP, mapDat: MAPD });
        console.log("MAP", MAP);
        console.log("MAPD", MAPD);
      })
      .catch((error) => {
        console.log("Request failed", error);
      });
  }

  componentDidMount() {
    this.provideHeartBeats();
  }

  render() {
    var series = [
      {
        name: "Level",
        data: this.state.mapBat,
      },
    ];
    var options = {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Battery percentage",
        align: "center",
      },
      grid: {
        row: {
          colors: ["transparent", "transparent"],
          opacity: 0.6,
        },
      },
      xaxis: {
        categories: this.state.mapDat,
        labels: {
          show: true,
          rotate: -45,
        },
      },
    };

    return (
      <div className={this.classes.root}>
        {/* Section recherche  */}
        <Container
          style={{
            minWidth: "1200px",
            maxWidth: "1200px",
            backgroundColor: "#FAFBFC",
            height: "100%",
          }}
        >
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
                  onClick={() => this.props.callBackRetourTableauDeBordAide()}
                />
              </div>

              <div style={{ marginLeft: "3.5em" }}>
                <Typography
                  style={{ color: "BLACK" }}
                  component="h5"
                  variant="h5"
                >
                  {this.state.robot}
                </Typography>
                <Typography style={{ fontSize: "14px" }} color="textSecondary">
                  description
                </Typography>
              </div>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card style={{ marginTop: "2em" }}>
                    <CardHeader
                      avatar={<img width="38" src="./images/chip.svg" />}
                      title="Logiciel cobot"
                      subheader="informations sur la partie logicielle"
                    />
                  </Card>

                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Card>
                          <CardHeader
                            avatar={<img width="24" src="./images/cpu.svg" />}
                            title="CPU"
                            subheader="Évolution du taux d'occupation du CPU"
                          />
                          <CardContent></CardContent>
                        </Card>

                        <Card style={{ marginTop: "1em" }}>
                          <CardContent>
                            <CardHeader
                              avatar={
                                <img width="24" src="./images/memory.svg" />
                              }
                              title="Mémoire"
                              subheader="Évolution du taux d'occupation de la mémoire"
                            />
                          </CardContent>
                        </Card>

                        <Card style={{ marginTop: "1em" }}>
                          <CardContent>
                            <CardHeader
                              avatar={
                                <img
                                  width="24"
                                  src="./images/car-battery.svg"
                                />
                              }
                              title="Batterie"
                              subheader="Évolution de la batterie"
                            />

                            <ReactApexChart
                              options={options}
                              series={series}
                              type="line"
                              height={350}
                            />
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </div>
    );
  }
}

export default PageAide;
