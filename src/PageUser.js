import React, { Component } from 'react';
import * as Const from "./Constant";
import Button from "@material-ui/core/Button";
import { getAllWarehouses } from "./commonFunctions/functions";
import { useTranslation, withTranslation } from "react-i18next";
import Header from './components/header';
import Depart from './components/depart';

var interval = 0;
class PageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.email,
            allWarehouses: [],
            warehouse: [],
            robot: [],
            departs: [],
            onceArrived: false
        }
    }
    componentDidMount() {
        var user = []; 
        const { email } = this.state;
        fetch(Const.URL_WS_USERS + "/all")
        .then(res=>res.json())
        .then(({users}) => {
            user = users.filter(item => item.email === email);
            console.log(users ,user, email);
            var warehouse = user[0]["warehouse"];
            console.log(warehouse);
            warehouse = warehouse.sort((a, b) => (a.name > b.name)  ? 1 : ((a.name < b.name) ? -1: 0));
            console.log(warehouse);

            this.setState({user, warehouse, robot: user[0]["robot"]});
            this.provideMetrics();
        })
        .catch(err => {
            console.error(err);
        })
    } 
    provideMetrics = () => {
        var allWarehouses = [];
        fetch(
          Const.URL_GET_ALL_MAPS,
          {
            
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            data = data.filter(item => item.on_map === 1);
            this.setState({metrics:data})
            //  this.getAllWarehouses(data);
            allWarehouses = getAllWarehouses(data);
            this.setState({allWarehouses})
          })
          .catch((error) => {
            console.error("Request failed", error);
          });
    };
    fetchDeparts = (idRobot) => {
        const { metrics } = this.state;
        var id = 0;
        metrics.filter(item => {if(item.id_robot === idRobot) return id = item.pk});
        fetch(Const.URL_WS_ALL_DEF + "?id=" + id, { retry: 3, retryDelay: 1000 })
        .then(res => res.json())
        .then(data => {
            data.splice(0, 0, {});
            console.log(id, data);
            this.setState({departs: data});
        })
        .catch(err => console.error(err))
    }
    fetchLastHeartbeatMsg = () => {
        const {departs, idRobot} = this.state;
        return fetch(
          Const.URL_FETCH_LAST_HEARTBEAT_MSG +
            "?id_client=" +
            departs[1]["id_client"] +
            "&id_robot=" + idRobot,
          { retry: 3, retryDelay: 1000 }
        )
          .then((res) => res.json())
          .then((data) => {

            console.log("From:", data, data[0]["X_COORD"], data[0]["Y_COORD"]);
            return {
                startingX: data[0]["X_COORD"],
                startingY: data[0]["Y_COORD"],
                arrived: data[0]["ARRIVED"]
            }
          })
          .catch((err) => console.error(err));
    };
    handleBackClick = () => {}
    computeDistance = ({startingX, startingY}, {endX, endY}) => {
        return Math.sqrt(Math.pow((endX - startingX), 2) + Math.pow((endY - startingY), 2));
    }
    realtimePosition = (initialDistance, idx, endCoord) => {
        var { departs } = this.state;
        interval = setInterval(async () => {
            const realtimeCoord = await this.fetchLastHeartbeatMsg();
            console.log("Arrived", realtimeCoord.arrived);
            
            const distance =  Math.round(this.computeDistance(realtimeCoord, endCoord));
            const runThrough = (initialDistance - distance) / initialDistance;
            const percent = Math.round(runThrough * 100);
            console.log("%", percent);
            departs[idx - 1]["percent"] = percent;
            this.setState({departs});
            if (realtimeCoord.arrived) return clearInterval(interval);
        }, 1000);
    }
    handleDestChoosen = async (idx) => {
        var { departs, onceArrived } = this.state;
        var distance = 0;
        // Fetch last heartbeat
        const realtimeCoord = await this.fetchLastHeartbeatMsg();
        const endCoord = { endX: departs[idx]["x_pixel"], endY: departs[idx]["y_pixel"]};
        const initialDistance =  Math.round(this.computeDistance(realtimeCoord, endCoord));
        console.log("Start", realtimeCoord);
        console.log("Initial Distance", initialDistance);
        console.log("To: ", departs[idx]["x_pixel"], departs[idx]["y_pixel"]);
        // Inject in departs at corresponding index vars runthrough and percent in order to display realtime move
        // departs[idx]["runthrough"] = true;
        this.realtimePosition(initialDistance, idx, endCoord);

        // departs[idx]["percent"] = distance;
        // this.setState({ departs });
        // Use ars runthrough and percent in Depart component
        // Advanced: Skip a destination
    }
    getDeparts = () => {
        const { departs, idRobot} = this.state;
        const departsLength = departs.length;
        return (
                <div>
                    {/* {idRobot && <Depart text={"Depart"} distance={10}  current={true}></Depart>} */}
                    {departs.map((item, idx) => {
                       if(idx === 0) return <Depart key={idx} text={"Depart"} showPath={true}  percent={item.percent}></Depart>
                       else if(departsLength - 1 !== idx) return <Depart key={idx} index={idx} text={"Destination "+(idx + 1)} showPath={true} percent={item.percent} onHandleDestChoosen={this.handleDestChoosen}></Depart>
                       else return <Depart key={idx} index={idx} text={"Destination "+(idx + 1)} onHandleDestChoosen={this.handleDestChoosen}></Depart>
                    })}
                </div>
                )
    }
    render() { 
        const { t } = this.props;
        const {user, warehouse, robot, idRobot, departs} = this.state;
        console.log(user, warehouse, robot);
        return (
            <div style={{marginBottom:"5em"}}>
                <Header title={t("user_title")} subheader={t("user_subtitle")} onBackClicked={this.handleBackClick}></Header>
                 {warehouse.map(({name, id:idWarehouse, value: isWarehouse}, idx) => {
                    if(isWarehouse) return (
                            <div key={idx}>
                                <p className="user_warehouse">{name}</p>
                                <div key={0} style={{display:"flex", padding:"0  1.2em"}}>
                                    {robot.map(({id, value, from}, idx) => {
                                        if (value && idWarehouse === from) return (
                                            <Button 
                                                key={idx} 
                                                style={{marginRight:"1em"}} 
                                                color="primary" size="small" 
                                                variant={id === idRobot ? "contained":"outlined"}
                                                onClick={()=>this.setState({idRobot: id}, this.fetchDeparts(id))}
                                            >
                                                {id}
                                            </Button>
                                        ) 
                                    })}
                                </div>
                            </div>)
                })}
                <br></br>
                <br></br>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    {idRobot && <div style={{margin: "3.5em 0"}}>
                        <h3 style={{textTransform: "uppercase", margin: "0"}}>Destinations for the robot {idRobot}</h3>
                        <p style={{margin: 0, fontSize: "0.85em"}}>Total number of destination(s) is: <strong>{departs.length}</strong></p>
                        <p style={{margin: 0, fontSize: "0.85em"}}>Click on your next destination</p>
                        </div>
                    }
                    {this.getDeparts()}
                </div>
                {idRobot && 
                    <div style={{position: "fixed", right:"2em", bottom:"3em"}}>
                        <Depart style={{backgroundColor:"#E03B8B", padding: "3em", fontWeight:"bold", }} text={"STOP"}></Depart>
                    </div>
                }
            </div>
        );
    }
}
 
export default withTranslation()(PageUser);