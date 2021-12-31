import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import * as Const from "./Constant";
import CardHeader from "@material-ui/core/CardHeader";
import { TableRow, TableCell, colors } from "@material-ui/core";
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
import cryptoRandomString from 'crypto-random-string';

class MapOverview extends React.Component {

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
      pathIndex:1,
      colors:[],
      robotsPosition:[],
    };
  }

  componentDidMount() {
    // const coodinates = [
    //   { x_pixel: 210, y_pixel: 146 },
    //   { x_pixel: 313, y_pixel: 146 },
    //   { x_pixel: 313, y_pixel: 250 },
    // ];
    this.provideMap();
    // this.provideRobotInfos();
  }
  provideMap() {
    const {id_client, id_robot, id, allData} = this.props.showDetailsMapGestion;
    var robots = [];
    fetch(Const.URL_WS_ALL_MAPS + `?idclient=${id_client}&idrobot=${id_robot}`, {
      retry: 3,
      retryDelay: 1000,
    })
      .then((res) => res.json())
      .then((data) => {
        data = data.filter(item=>item.id === id)
        if (
          data.hasOwnProperty("message") &&
          data.message.includes("TOKEN_NON_VALIDE")
        ) {
          this.props.callbackNeedToLogin();
        } else {
          data.map((item, index) => {
            this.setState({
              ["editingMapDetails" + index]: false,
              ["showIconMapDetails" + index]: false,
            });
          });
          this.setState({
            blob: data[0]['blob'],
            default: data,
          });
        }
        robots = allData.filter(item=>item.id === id);
      console.log("ROBOTS", robots);
      this.fetchLastHeartbeats(robots)
      })
      .catch((error) => {
        console.log("Request failed", error);
      });
      
  }

  fetchLastHeartbeats = (robots) => {
    // const {id_client, id_robot} = this.props.showDetailsMapGestion;
    const {colors} = this.state;
    let robotsPosition = []; 
    var color = "";
    robots.map(({id_client, id_robot}) => {
      color = cryptoRandomString({length: 6, type: 'numeric'});
      colors.push({color, robot: id_robot});
      this.setState({colors});
    })

    fetch(
      Const.URL_GET_LAST_HEARTBEAT_MSG + "?idclient=" + robots[0]["id_client"],
      { retry: 3, retryDelay: 1000 }
    )
    .then((res) => res.json())
    .then((data) => {
      console.log("URL_GET_LAST_HEARTBEAT_MSG", data);
      data.map(d => {
        robots.map(r => {
          if(d.ID_ROBOT === r.id_robot) robotsPosition.push(d);
        })
      })
      console.log("robotsPosition", robotsPosition);
       this.setState({robotsPosition})
    })
    .catch((error) => {
      console.error("Request failed", error);
    });
  }

  load() {
    let canvas = document.getElementsByTagName("canvas")[0];
    console.log(canvas);
    // console.log("Image's Height", canvas.height);
    this.setState({ imageHeight: canvas.height });
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
      choosingDest,scrollTop,zoom, show, positionIndex,
      blob,
      colors,
      robotsPosition
    } = this.state;

    // console.log("this.state & coodinates & map", this.state, coodinates, mp);
    // console.log(
    //   "this.props.showDetailsMapGestion",
    //   this.props.showDetailsMapGestion
    // );
    console.log("PROPS", this.props.showDetailsMapGestion);
    console.log("STATE", this.state);
    // const {blob}= maps[0];
    
    const { t, callBackRetourMaps } = this.props;
    const { mapName } = this.props.showDetailsMapGestion;
    return (
      <React.Fragment>
      <div style={{display:"flex",
                   backgroundColor: "rgb(238, 238, 238)",
                    alignItems:"center", 
                   padding:"1em",
                   }}>
        <img
          style={{ width:"25px",}}
          src="./images/carrier.svg"
        />
        <h5
          style={{
            color: "BLACK",
            fontFamily: "Black Ops One, cursive",
            // transform: "translateY(17px)",
            // display: "flex",
            margin:"0 0 0 1em",
            fontSize:"1.2em"
          }}
        >
          {mapName ? mapName:`- ${t("manag_title")}`}
        </h5>
      </div>
      <div style={{display:"flex", position:"relative",borderBottom: "5px solid gold", marginBottom:"2em",}}>
          <div style={{margin:"3px 17px 0 17px"}}>
              <Tooltip title="Back to last page">
              <img onClick={()=>{callBackRetourMaps()}} src={"./images/go_back.png"} style={{width:"25px", marginRight:"1em"}}></img>
              </Tooltip>
              
              <Tooltip title="Zoom out">
              <img onClick={()=> this.setState({zoom: this.state.zoom - 10})} src={"./images/zoom-out.png"} style={{width:"25px", marginRight:"1em"}}></img>
              </Tooltip>
              <span style={{ marginRight:"1em", fontFamily: "Black Ops One, cursive", position:"relative", bottom:"7px"}}>{zoom}{"%"}</span>
              <Tooltip title="Zoom in">
              <img onClick={()=> this.setState({zoom: this.state.zoom + 10})} src={"./images/zoom-in.png"} style={{width:"25px", marginRight:"1em"}}></img>
              </Tooltip>
             
                      
          </div> 
          <div style={{display:"flex", position:"absolute", right:"10px"}}>
            {colors.map((item, index) => 
              <React.Fragment key={index}>
                <span style={{position:"relative", top:"7px", marginRight:"1em"}}>{"Robot-" + item.robot}</span>
                <p style={{width:"15px", height:"15px", borderRadius:"50%", backgroundColor: `#${item.color}`, margin: "0", position: "relative",top: "10px", marginRight:"1em"}}>{" "}</p>  
              </React.Fragment>
            )}
          </div>
      </div> 
      <Grid item xs={12} md={12} lg={12}>
                <Card style={{zoom:zoom+"%", backgroundColor: "rgb(238, 238, 238)"}}>
                  <CardContent>
                    <ImageMapper
                      src={`data:image/jpeg;base64,` + blob}
                      map={mp}
                      width={500}
                      onLoad={() => this.load()}
                      // onClick={(area) => this.clicked(area)}
                      // onMouseEnter={(area) => this.enterArea(area)}
                      // onMouseLeave={(area) => this.leaveArea(area)}
                      // onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
                      // onImageClick={(evt) => this.clickedOutside(evt)}
                      // onImageMouseMove={(evt) => this.moveOnImage(evt)}
                      lineWidth={4}
                      strokeColor={"white"}
                    />
                  </CardContent>
                </Card>
                {imageHeight && colors ? (
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
                      {robotsPosition.map((item, index) => {
                       return (
                        <React.Fragment key={index}>
                            <circle cx={item.X_COORD} cy={item.Y_COORD} fill="none" r="10" stroke={"#" + colors[index]['color']} strokeWidth="2">
                            <animate attributeName="r" from="8" to="20" dur="1.5s" begin="0s" repeatCount="indefinite"/>
                            <animate attributeName="opacity" from="1" to="0" dur="1.5s" begin="0s" repeatCount="indefinite"/>
                          </circle>
                          <circle cx={item.X_COORD} cy={item.Y_COORD} fill={"#" + colors[index]['color']} r="10"/>
                        </React.Fragment>
                      )
                    })}
                    </svg>
                  </div>
                ): ""}
        </Grid>
      </React.Fragment>  
    );
  }
}

export default  withTranslation()(MapOverview);
