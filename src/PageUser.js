import React, { Component } from 'react';
import * as Const from "./Constant";
import Button from "@material-ui/core/Button";
import { getAllWarehouses } from "./commonFunctions/functions";
import { useTranslation, withTranslation } from "react-i18next";
import Header from './components/header';
import Depart from './components/depart';

class PageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.email,
            allWarehouses: [],
            warehouse: [],
            robot: [],
            departs: []
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
            console.log(id, data);
            this.setState({departs: data});
        })
        .catch(err => console.error(err))
    }
    handleBackClick = () => {}
    getDeparts = () => {
        const {departs, idRobot} = this.state;
        const departsLength = departs.length;
        return (
                <div>
                    {idRobot && <Depart text={"Depart"} distance={10}  current={true}></Depart>}
                    {departs.map((item, idx) => {
                       if(departsLength - 1 !== idx || idx === 0) return <Depart key={idx} text={"Destination "+(idx + 1)} distance={10}></Depart>
                       else if(departsLength - 1 !== idx) return <Depart key={idx} text={"Destination "+(idx + 1)} distance={10}></Depart>
                       else return <Depart key={idx} text={"Destination "+(idx + 1)}></Depart>
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
                        <h3 style={{textTransform: "uppercase", margin: "0"}}>Departs for the robot {idRobot}</h3>
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