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
import {Helmet} from "react-helmet";
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
    var CPU = [];
    var MEM = [];
    var BAT = [];
    var MAPD = [];

    fetch(Const.URL_WS_ROBOT_HEARTS + `?robot=${this.state.robot}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(
          "je fais un tableau des dateHeures et du niveau de batterie"
        );

        data.reverse().map((donnee) => {
          var d = new Date(donnee.TIMESTAMP * 1000).toLocaleString();
          CPU.push(donnee.CPU);
          MEM.push(donnee.MEMORY);
          BAT.push(donnee.BAT_LEVEL);
          MAPD.push(d);
        });
        this.setState({ CPU, MEM, mapBat: BAT, mapDat: MAPD,  });
      })
      .catch((error) => {
        console.log("Request failed", error);
      });
  }

  componentDidMount() {
    this.provideHeartBeats();
  }

  render() {
    var seriesCPU = [
      {
        name: "Level",
        data: this.state.CPU,
      },
    ];
    var seriesMEM = [
      {
        name: "Level",
        data: this.state.MEM,
      },
    ];
    var seriesBAT = [
      {
        name: "Level",
        data: this.state.mapBat,
      },
    ];
    var optionsChartCpu = {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true,
          type: 'x',  
          autoScaleYaxis: false,  
          zoomedArea: {
            fill: {
              color: '#90CAF9',
              opacity: 0.4
            },
          }
      },
      },
      dataLabels: {
        // enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: window.innerWidth < 1200 ? "": "CPU percentage",
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
        tickAmount:10
      },
    };
    var optionsChartMem = {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true,
          type: 'x',  
          autoScaleYaxis: false,  
          zoomedArea: {
            fill: {
              color: '#90CAF9',
              opacity: 0.4
            },
            stroke: {
              color: '#0D47A1',
              opacity: 0.4,
              width: 1
            }
          }
      },
      },
      dataLabels: {
        // enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text:window.innerWidth < 1200 ? "": "Memory percentage",
        align: "center",
      },
      grid: {
        row: {
          colors: ["transparent", "transparent"],
          opacity: 0.6,
        },
        padding: {
          left: 30, // or whatever value that works
          right: 30 // or whatever value that works
        }
      },
      xaxis: {
        categories: this.state.mapDat,
        labels: {
          show: true,
          rotate: -45,
        },
        tickAmount:10
      },
    };
    var optionsChartBat = {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true,
          type: 'x',  
          autoScaleYaxis: false,  
          zoomedArea: {
            fill: {
              color: '#90CAF9',
              opacity: 0.4
            },
            stroke: {
              color: '#0D47A1',
              opacity: 0.4,
              width: 1
            }
          }
      },
      },
      dataLabels: {
        // enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: window.innerWidth < 1200 ? "":"Battery percentage",
        align: "center",
      },
      grid: {
        row: {
          colors: ["transparent", "transparent"],
          opacity: 0.6,
        },
        padding: {
          left: 30, // or whatever value that works
          right: 30 // or whatever value that works
        }
      },
      xaxis: {
        categories: this.state.mapDat,
        labels: {
          show: true,
          rotate: -45,
        },
        tickAmount:10
      },
    };

    return (
      <div className={this.classes.root} id="PageAide">
        {/* Section recherche  */}
        
        <Container
          style={{
            // minWidth: "1200px",
            // maxWidth: "1200px",
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
                  src="./images/go_back.png"
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
                      <Grid item xs={12} lg={8}>
                        <Card>
                          <CardContent>
                            <CardHeader
                              avatar={<img width="24" src="./images/cpu.svg" />}
                              title="CPU"
                              subheader="Évolution du taux d'occupation du CPU"
                            />
                            <ReactApexChart
                              options={optionsChartCpu}
                              series={seriesCPU}
                              type="line"
                              height={350}
                            />
                          </CardContent>
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
                            <ReactApexChart
                              options={optionsChartMem}
                              series={seriesMEM}
                              type="line"
                              height={350}
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
                              options={optionsChartBat}
                              series={seriesBAT}
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
