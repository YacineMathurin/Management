import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
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
import TextField from "@material-ui/core/TextField";
import { useTranslation, withTranslation } from "react-i18next";

class PageUserManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      editing: false,
      allWarehouses: [],
      userWarehouses: [],
      editableUserWarehouses: [],
    }
  }
  componentDidMount() {
    this.fetchUsers();
    this.provideMetrics();
  }
  fetchUsers = () => {
    fetch(Const.URL_WS_USERS+"/all")
    .then((res) => res.json())
    .then(({users}) => {
      console.log(users);
      this.setState({users, fetchedUser: JSON.parse(JSON.stringify(users))});
      // this.edit(users);
    })
    .catch(err => {
      console.error(err);
    })
  }
  provideMetrics = () => {
    var result = [];
    fetch(
      Const.URL_GET_ALL_MAPS,
      {
        
      }
    )
      .then((res) => res.json())
      .then((data) => {
        //  console.log(data);
         this.getAllRobots(data);
         this.getAllWarehouses(data);
        //  setLoading(false);
      })
      .catch((error) => {
        console.error("Request failed", error);
      });
  };
  getAllRobots = (data) => {
    var allRobots = [];
    data.map(item => allRobots.push({id:item.id_robot}));
    console.log("All Robots", allRobots); 
    this.setState({allRobots})
  };
  getAllWarehouses = (data) => {  
    var rows = [];
    var result = [];
    var allWarehouses = [];
    rows.push(data[0]['id']);
    result.push(data[0]);
 
    data.map(dataItem => { 
        if(!rows.includes(dataItem.id)) {
          rows.push(dataItem.id);
          result.push(dataItem);
        }
    });

    result.map(item => allWarehouses.push({name:item.map_name, id:item.id}));
    console.log("All Warehouses", allWarehouses);
    this.setState({allWarehouses});
  }
  edit = (users) => {
    this.setState({userWarehouses: users[0].warehouse});
    this.setState({editableUserWarehouses: users[0].warehouse});
  }
  searchFilterFunction = (text) => {
    
  };
  resetFilter = () => {
    

  };
  handleDisplayWarehouses = (idx) => {
    const { editing, allWarehouses, users, fetchedUser } = this.state;
    const usersClone = [...users];
    const userWarehouses = fetchedUser[idx]["warehouse"];
    if(editing) {
      return allWarehouses.map(({name, id}, index) => {
        const value = this.IsWarehouseAllowed(idx, id);
        return (
          <p
           key={index}
           className="pageUserManagement-edition-btn"
          //  style={{margin:"1em", cursor:"pointer"}}
           onClick={()=>this.handleWarehouses(idx, name, id, value)}
           style={{
            backgroundColor: this.IsWarehouseAllowed(idx, id) ? "goldenrod":"unset", 
            color: this.IsWarehouseAllowed(idx, id) ? "white":"unset",
            width:"fit-content",
            border:"1px solid white"
           }}
          >
            {/* {this.IsWarehouseAllowed(idx, id) && <span className="pageUserManagement-status">Allowed</span>} */}
            <span>{name}</span>
          </p>
        )
    })
    }
    return userWarehouses.map((item, index) => {
     if(item.value)
        return <p
           key={index}
           className="pageUserManagement-edition-btn"
           style={{
            backgroundColor: "goldenrod", 
            color: "white",
            width:"fit-content",
            border:"1px solid white"
           }}
           onClick={()=> this.editMode(idx)}
          >
            {item.name}
          </p>
    })
  };
  handleWarehouses = (idx, name, id, value) => {
    const { users, fetchedUser } = this.state;
    const usersClone = [...users];
    var editableUserWarehouses = fetchedUser[idx]["warehouse"];

    console.log("name - value", name, value);

    const res = editableUserWarehouses.filter(item => item.id === id);
    console.log("res", res);
    
    if (res.length === 0) {
      editableUserWarehouses.push({name, id, value: !value});
    } else {
      editableUserWarehouses.map(item => {
        if(item.id === id)
        item.value = !value;
      });
    }
    
    console.log("editableUserWarehouses", editableUserWarehouses);
    
    this.setState({editableUserWarehouses});
  };
  IsWarehouseAllowed = (idx, id) => {
    const {users, fetchedUser} = this.state;
    const usersClone = [...users];
    // console.log(idx);
    var editableUserWarehouses = fetchedUser[idx]["warehouse"];
    const res = editableUserWarehouses.filter(item => item.id === id);
    // console.log("IsWarehouseAllowed: id res", id, res, res[0]);
    if (res.length > 0) {
      return res[0]["value"];
    }
    return false ;
  }
  handleDisplayRobots = (idx) => {
    const { editing, allRobots, users, fetchedUser } = this.state;
    const userRobots = fetchedUser[idx]["robot"];
    if(editing) { 
      return allRobots.map(({id}, index) => {
        const value = this.isRobotAllowed(idx,id);
        return (
          <p
             key={index}
             className="pageUserManagement-edition-btn"
             onClick={()=>this.handleAllowRobots(idx, id, value)}
             style={{
              backgroundColor: this.isRobotAllowed(idx, id) ? "#35bdd0":"unset", 
              color: this.isRobotAllowed(idx, id) ? "white":"unset",
              border: "1px solid"
             }}
          >
            {/* {this.isRobotAllowed(idx, id) && <span className="pageUserManagement-status">Allowed</span>} */}
            <span>{id}</span>
          </p>
        )
      })
    }
    return userRobots.map((item, index) => {
     if(item.value)
      return <p
        key={index}
        className="pageUserManagement-edition-btn"
        style={{
          backgroundColor: "#35bdd0", 
          color: "white",
          border:"1px solid white"

         }}
         onClick={()=> this.editMode(idx)}
      >
        {item.id}
      </p>
    })
  };
  handleAllowRobots = (idx, id, value) => {
    const { users, fetchedUser } = this.state;
    var editableUserRobots = fetchedUser[idx]["robot"];

    console.log("name - value", value);

    const res = editableUserRobots.filter(item => item.id === id);
    console.log("res", res);
    
    if (res.length === 0) {
      editableUserRobots.push({id, value: !value});
    } else {
      editableUserRobots.map(item => {
        if(item.id === id)
        item.value = !value;
      });
    }
    
    console.log("editableUserRobots", editableUserRobots);
    
    this.setState({editableUserRobots});
  };
  isRobotAllowed = (idx, id) => {
    const {users, fetchedUser} = this.state;
    var editableUserRobots =  fetchedUser[idx]["robot"];
    const res = editableUserRobots.filter(item => item.id === id);
    // console.log("isRobotAllowed: id res", id, res, res[0]);
    if (res.length > 0) {
      return res[0]["value"];
    }
    return false ;
  }
  save = () => {
    const {email, editableUserWarehouses, editableUserRobots} = this.state;
    const body = {email, warehouse:editableUserWarehouses, robot:editableUserRobots}

    console.log("request body", JSON.stringify(body));

    fetch("http://127.0.0.1:5000/api/user/autorize", {
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      this.setState({editing: false, userWarehouses: editableUserWarehouses});
    })
    .catch(err=> console.log(err))
  };
  editMode = (idx) => {
    const { users, fetchedUser } = this.state;
    const usersClone = JSON.parse(JSON.stringify(users));
    usersClone[idx]["robot"] = [];
    usersClone.clone = true;
    console.log(usersClone, users, fetchedUser );

    this.setState({
      editing: true, 
      email: usersClone[idx]["email"],
      editableUserWarehouses: usersClone[idx]["warehouse"],
      editableUserRobots: usersClone[idx]["robot"]
    })
  }
  handleCancelation = (idx) => {
    const {fetchedUser, users} = this.state;
    console.log("users", users);
    this.setState({editing: false, fetchedUser: JSON.parse(JSON.stringify(users))})
  }
  render() { 
    const { t, callBackRetourTableauDeBord } = this.props;
    const {users, editing, search} = this.state;
    return (
      <div id="PageUserManagement">
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
                <CardContent >
                  <div style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        position: "relative",
                        bottom: "6.5em",
                  }}>
                    <img onClick={() => callBackRetourTableauDeBord()} src={"./images/go_back.png"} style={{width:"50px", marginRight:"1em", position:"relative", top:"15px"}}></img>
                  </div>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {/* <TableCell align="center">ID Client </TableCell> */}
                        <TableCell align="left">{t("users_col1")}</TableCell>
                        <TableCell align="left">{t("users_col2")}</TableCell>
                        <TableCell align="left">{t("users_col3")}</TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                      
                    
                    <TableBody>
                      {users.map(({name, robot, email}, idx) => (
                        <TableRow key={idx}>
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left"> {this.handleDisplayWarehouses(idx)} </TableCell>
                          <TableCell align="left">
                            <div style={{
                              display:"grid",
                              gridTemplateColumns: "1fr 1fr 1fr 1fr"
                            }}>
                              {this.handleDisplayRobots(idx)}
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <Button style={{width:"5em"}} variant="outlined" color="primary" size="small" onClick={ () => editing ? this.save():this.editMode(idx)}
                            >{editing ? "SAVE":"EDIT"}</Button>
                            <br></br>
                            {editing && <Button
                               style={{margin:"1em 0", width:"5em"}}
                               variant="outlined" 
                               color="secondary" 
                               size="small"
                               onClick={() => this.handleCancelation(idx)}
                            >CANCEL</Button>}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
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
                      disabled={true}
                      size="small"
                      placeholder={t("dashboard_maps_search")}
                      value={search}
                      onChange={(event) => {
                        const { value } = event.target;
                        // this.setState({ search: value });
                        this.setState({search:value});
                        if (value !== "") {
                          // searchFilterFunction(value);
                        } else {
                          // this.setState({
                          //   listeMetrics: defaultMetrics,
                          // });
                          // setlisteMetrics(defaultMetrics);
                        }
                      }}
                    />
                  </FormControl>
  
                  <br></br>
                  
                  <br></br>
                  <Button
                    disabled={true}
                    style={{ marginTop: "1em" }}
                    fullWidth={true}
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => this.resetFilter()}
                    
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
}
 
export default withTranslation()(PageUserManagement);


