import React, { Component } from 'react';
import * as Const from "./Constant";
import Button from "@material-ui/core/Button";
import { getAllWarehouses } from "./commonFunctions/functions";

class PageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.email,
            allWarehouses: [],
            warehouse: [],
            robot: []
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
            this.setState({user, warehouse: user[0]["warehouse"], robot: user[0]["robot"]});
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
    render() { 
        const {user, warehouse, robot, allWarehouses} = this.state;
        console.log(user, warehouse, robot);
        return (
            <div>
                 {warehouse.map(({name, id:idWarehouse, value: isWarehouse}, idx) => {
                    if(isWarehouse) return (
                            <div key={idx}>
                                <p>{name}</p>
                                <div key={0} style={{display:"flex", padding:"0  1.2em"}}>
                                    {robot.map(({id, value, from}, idx) => {
                                        if (value && idWarehouse === from) return (
                                            <Button key={idx} style={{marginRight:"1em"}} color="primary" size="small" variant="outlined">{id}</Button>
                                        ) 
                                    })}
                                </div>
                            </div>)
                })}
            </div>
        );
    }
}
 
export default PageUser;