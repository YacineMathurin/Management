import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
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
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { useTranslation, withTranslation } from "react-i18next";
import Toast from "./Toast";
import { getAllWarehouses } from "./commonFunctions/functions";
import Header from "./components/header";


class PageUserManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      fetchedUser: [],
      editing: false,
      allWarehouses: [],
      allRobots: [],
      userWarehouses: [],
      editableUserWarehouses: [],
      allowedWarehouseOnSignup: [],
      allowedRobotOnSignup: [],
      currentAdmin: {email:"", name:""},
      currentAdminIdx: null
    }
  }
  componentDidMount() {
    this.fetchUsers();
    this.provideMetrics();
  }
  fetchUsers = () => {
    var currentAdmin = [];
    var currentAdminIdx = 0;
    fetch(Const.URL_WS_USERS+"/all")
    .then((res) => res.json())
    .then(({users}) => {
      console.log("users", users);
      currentAdmin = users.filter((item, idx) => {
        if(item.email === this.props.email) {
          currentAdminIdx = idx;
          return item;
        }
      });
      console.log("currentAdminIdx", currentAdminIdx);
      users = users.sort((a, b) => a.name > b.name);
      this.setState({currentAdmin,currentAdminIdx, users, fetchedUser: JSON.parse(JSON.stringify(users))});
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
  getAvailableRobotsOnSignup = () => {
    const { allowedWarehouseOnSignup, metrics } = this.state;
    var res = [];
    if (allowedWarehouseOnSignup.length === 0) return res;
    allowedWarehouseOnSignup.map(({id:warehouseId, value}) => {
      metrics.filter(({id, id_robot}) => {
        if (warehouseId === id && value){
          console.log(id_robot);
          res.push({id: id_robot, from:warehouseId})
        }
      })
    })
    return res;
  };
  getAvailableRobots = () => {
    // console.log("getAvailableRobots");
    const { editableUserWarehouses, metrics } = this.state;
    var res = [];
    if (editableUserWarehouses.length === 0) return res;
    editableUserWarehouses.map(({id:warehouseId, value}) => {
      metrics.filter(({id, id_robot}) => {
        if (warehouseId === id && value){
          res.push({id: id_robot, from:warehouseId})
        }
      })
    })
    // console.log("getAvailableRobots", res);
    res = res.sort((a, b) => (a.id > b.id) ? 1: ((a.id < b.id) ? -1: 0))
    return res;
  };
  edit = (users) => {
    this.setState({userWarehouses: users[0].warehouse});
    this.setState({editableUserWarehouses: users[0].warehouse});
  }
  searchFilterFunction = (text) => {
    const { fetchedUser } = this.state;

    const newData = fetchedUser.filter((item) => {
      const itemData = `${item.name}`;
      return itemData.includes(text);
    });
    console.log("FILTERED", newData);
    this.setState({fetchedUser: newData, value: text});
    // this.setState({ value: text});
  };
  resetFilter = () => {
    const { users } = this.state;
    this.setState({ fetchedUser: JSON.parse(JSON.stringify(users)) });
  }
  handleDisplayWarehouses = (idx) => {
    console.log("handleDisplayWarehouses", idx);
    const { allWarehouses, users, fetchedUser } = this.state;
    const userWarehouses = fetchedUser[idx]["warehouse"];
    if(this.state["editing"+idx]) {
      return allWarehouses.map(({name, id}, index) => {
        const value = this.IsWarehouseAllowed(idx, id);
        return (
          <p
           key={index}
           className="pageUserManagement-edition-btn"
           onClick={()=>this.handleWarehouses(idx, name, id, value)}
           style={{
            backgroundColor: this.IsWarehouseAllowed(idx, id) ? "goldenrod":"unset", 
            color: this.IsWarehouseAllowed(idx, id) ? "white":"unset",
            width:"fit-content",
            border:"1px solid white"
           }}
          >
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
    const { users, fetchedUser, editableUserRobots } = this.state;
    const usersClone = [...users];
    var editableUserWarehouses = fetchedUser[idx]["warehouse"];
    var newEditableUserRobots = [];
    console.log("unchoosed warehouse id & editableUserRobots ", id, editableUserRobots);

    // console.log("name - value", name, value);

    const res = editableUserWarehouses.filter(item => item.id === id);
    // console.log("res", res);
    
    if (res.length === 0) {
      editableUserWarehouses.push({name, id, value: !value});
    } else {
      editableUserWarehouses.map(item => {
        if(item.id === id)
          item.value = !value;
      });
      // After unchoosing a warehouse
      if (value) {
        console.log("unchoosed warehouse id & editableUserRobots ", id, editableUserRobots);
        newEditableUserRobots = editableUserRobots.filter(item => {
          return item.from !== id
        })
        this.setState({editableUserRobots: newEditableUserRobots});
      }
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
    const { editableUserWarehouses, fetchedUser } = this.state;
    var userRobots = fetchedUser[idx]["robot"];
    var availableRobots = [];
    availableRobots = this.getAvailableRobots();
    userRobots = userRobots.sort((a, b) => (a.id > b.id) ? 1: ((a.id < b.id) ? -1: 0));
    console.log("userRobots", userRobots);
 
    if(this.state["editing"+idx]) { 
      return availableRobots.map(({id, from}, index) => {
        const value = this.isRobotAllowed(idx,id);
        return (
          <p
             key={index}
             className="pageUserManagement-edition-btn"
             onClick={()=>this.handleAllowRobots(idx, id, from, value)}
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
  handleAllowRobots = (idx, id, from, value) => {
    const { users, fetchedUser } = this.state;
    var editableUserRobots = fetchedUser[idx]["robot"];

    console.log("name - value", value);

    const res = editableUserRobots.filter(item => item.id === id);
    console.log("res", res);
    
    if (res.length === 0) {
      editableUserRobots.push({id, value: !value, from});
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
  save = (idx) => {
    const {email, editableUserWarehouses, editableUserRobots} = this.state;
    const body = {email, warehouse:editableUserWarehouses, robot:editableUserRobots}

    console.log("request body", JSON.stringify(body));

    fetch(Const.URL_WS_MANAGE_USERS, {
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      this.setState({["editing"+idx]: false, userWarehouses: editableUserWarehouses});
      this.fetchUsers();
      this.editMode();
    })
    .catch(err=> console.log(err))
  };
  editMode = (idx) => {
    const { users, fetchedUser } = this.state;
    console.log("Edition mode");

    this.setState({
      ["editing"+idx]: true, 
      email: fetchedUser[idx]["email"],
      editableUserWarehouses: fetchedUser[idx]["warehouse"],
      editableUserRobots: fetchedUser[idx]["robot"]
    })
  }
  handleCancelation = (idx) => {
    const {fetchedUser, users} = this.state;
    console.log("users", users);
    this.setState({["editing"+idx]: false, fetchedUser: JSON.parse(JSON.stringify(users))})
  }
  getFirstnameField = () => {
    const { t } = this.props;
    const {firstname} = this.state;
    return (
      <FormControl fullWidth>
      <InputLabel htmlFor="signup_email">Firstname</InputLabel>
      <Input
        autoFocus
        className="signup_email"
        type={'email'}  
        value={firstname}
        onChange={(event) => this.setState({firstname: event.target.value})}
      />
    </FormControl>
  )}
  getEmailField = () => {
    const {signupEmail} = this.state;
    return (
    <FormControl fullWidth>
      <InputLabel htmlFor="signup_email">Email</InputLabel>
      <Input
        className="signup_email"
        type={'email'}  
        value={signupEmail}
        onChange={(event) => this.setState({signupEmail: event.target.value})}
      />
    </FormControl>
  )}
  getPasswordField = () => {
    const { t } = this.props;
    const { showSignupPassword, signupPassword } = this.state;
    return (
    <FormControl fullWidth className="">
      <InputLabel htmlFor="signup_password" className="signup_password-label">{t("password")}</InputLabel>
      <Input
        className=""
        type={showSignupPassword ? 'text' : 'password'}
        value={signupPassword}
        onChange={(event) => this.setState({signupPassword: event.target.value})}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => this.setState({showSignupPassword: !this.state.showSignupPassword})}
              // onMouseDown={handleMouseDownPassword}
            >
              {showSignupPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )}
  getWarehousesField = () => {
    const { t } = this.props;
    const { allWarehouses, signupPassword } = this.state;
    return allWarehouses.map(({name, id}, index) => {
      const value = this.IsWarehouseAllowedOnSignup(id);
      return (
        <p
         key={index}
         className="pageUserManagement-edition-btn"
         onClick={()=>this.AllowWarehousesOnSignup(name, id, value)}
         style={{
          backgroundColor: this.IsWarehouseAllowedOnSignup(id) ? "goldenrod":"unset", 
          color: this.IsWarehouseAllowedOnSignup(id) ? "white":"unset",
          width:"fit-content",
          border:"1px solid white"
         }}
        >
          <span>{name}</span>
        </p>
      )
    })
  }
  AllowWarehousesOnSignup = (name, id, value) => {
    const {allowedWarehouseOnSignup, allowedRobotOnSignup} = this.state;
    /** If not included in  allowedWarehouseOnSignup add it else remove it */
    const res = allowedWarehouseOnSignup.filter(item => item.id === id);
    var newEditableUserRobotsOnSignup = [];
    // console.log("res", res);
    
    if (res.length === 0) {
      allowedWarehouseOnSignup.push({name, id, value: !value});
    } else {
      allowedWarehouseOnSignup.map(item => {
        if(item.id === id)
        item.value = !value;
      });
    }
    // After unchoosing a warehouse
    if (value) {
      console.log("unchoosed warehouse id & allowedRobotOnSignup ", id, allowedRobotOnSignup);
      newEditableUserRobotsOnSignup = allowedRobotOnSignup.filter(item => {
        return item.from !== id
      })
      console.log("newEditableUserRobotsOnSignup", newEditableUserRobotsOnSignup);
      this.setState({allowedRobotOnSignup:newEditableUserRobotsOnSignup});
    }
    
    console.log("allowedWarehouseOnSignup", allowedWarehouseOnSignup);
    
    this.setState({allowedWarehouseOnSignup});
  }
  IsWarehouseAllowedOnSignup = (id) => {
    const {allowedWarehouseOnSignup} = this.state;
    /** If not included in  allowedWarehouseOnSignup return false else return true */
    const res = allowedWarehouseOnSignup.filter(item => item.id === id);
    if (res.length > 0) {
      return res[0]["value"];
    }
    return false ;
  }
  getRobotsField = () => {
    const { t } = this.props;
    const { allRobots } = this.state;
    var availableRobotsOnSignup = [];
    availableRobotsOnSignup = this.getAvailableRobotsOnSignup();

    return availableRobotsOnSignup.map(({id, name, from}, index) => {
      const value = this.IsRobotAllowedOnSignup(id);
      return (
        <p
           key={index}
           className="pageUserManagement-edition-btn"
           onClick={()=>this.AllowRobotOnSignup(id, name, from, value)}
           style={{
            backgroundColor: this.IsRobotAllowedOnSignup(id) ? "#35bdd0":"unset", 
            color: this.IsRobotAllowedOnSignup(id) ? "white":"unset",
            border: "1px solid",
            left:"10px"
           }}
        >
          <span>{id}</span>
        </p>
      )
    })
  }
  AllowRobotOnSignup = (id, name, from, value) => {
    const {allowedRobotOnSignup} = this.state;
    /** If not included in  allowedWarehouseOnSignup add it else remove it */
    const res = allowedRobotOnSignup.filter(item => item.id === id);
    console.log("res", res);
    
    if (res.length === 0) {
      allowedRobotOnSignup.push({id, value: !value, from});
    } else {
      allowedRobotOnSignup.map(item => {
        if(item.id === id)
        item.value = !value;
      });
    }
    
    console.log("allowedRobotOnSignup", allowedRobotOnSignup);
    
    this.setState({allowedRobotOnSignup});
  }
  IsRobotAllowedOnSignup = (id) => {
    const {allowedRobotOnSignup} = this.state;
    /** If not included in  allowedRobotOnSignup return false else return true */
    const res = allowedRobotOnSignup.filter(item => item.id === id);
    if (res.length > 0) {
      return res[0]["value"];
    }
    return false ;
  }
  getButtons = () => {
    const { t } = this.props;
    const { showSignupPassword, signupPassword } = this.state;
    return (
    <div>
      <Button 
        size="small" 
        variant="outlined" 
        color="primary" 
        style={{marginRight:"1em"}}
        onClick={() => this.addUser()}
      ><span>CREATE</span></Button>
      <Button  size="small" variant="outlined" color="default"onClick={() => this.setState({addUserMode: false})}>CLOSE</Button>
    </div>
  )}
  addUser = () => {
    const {firstname, signupEmail, signupPassword, allowedWarehouseOnSignup, allowedRobotOnSignup} = this.state;
    const body = {
      name:firstname,
      email: signupEmail,
      password: signupPassword,
      warehouse:allowedWarehouseOnSignup,
      robot: allowedRobotOnSignup
    }
    console.log("body", body);
    fetch(Const.URL_WS_SIGNUP,
    {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        firstname:"", signupEmail:"", signupPassword:"",
        allowedWarehouseOnSignup: [], allowedRobotOnSignup: [],
        success: true
      });
      this.fetchUsers();
    })
    .catch( err =>{
      console.error(err);
    })
  }
  deleteIcon = (idx)=> { 
    const {fetchedUser} = this.state;
    const body = {email: fetchedUser[idx]["email"]};
    const handleDelete = () => {
      const result = window.confirm("Do you confirm deletion ?");
      if(result) confirmDelete();
    }
    const confirmDelete = () => {
      console.log(body);
      fetch(Const.URL_WS_DELETE_USER,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(body) 
      })
      .then(res=>res.json())
      .then((data)=> {
        console.log(data);
          this.setState({success: true, ["editing"+idx]:false})
          this.fetchUsers()
      })
      .catch(err => {
        this.setState({error: true})
      })
    }
    return (
      <span 
        style={{cursor:"pointer", borderRadius:"3px",marginLeft:"0.3em", border:"1px solid #E03B8B", color:"#E03B8B", padding:"0.3em"}}
        onClick={()=>handleDelete()}
      >Delete</span>
    )
  }
  currentAdminBadge = (text) => {
    return (
      <span style={{padding:"0.3em", margin:"0 0.3em", background:"rgb(75,75,75)", color:"white", fontSize:"0.8em"}}>{text}</span>
    )
  }
  displayCurrentAdmin = () => {
    const {currentAdminIdx, currentAdmin} = this.state;
    if (currentAdminIdx) return this.displayUsers(currentAdmin[0]["name"], currentAdmin[0]["email"], currentAdmin[0]["isAdmin"], currentAdminIdx);
  }
  displayUsers = (name, email, isAdmin, idx) => {
    return (
      <TableRow key={idx}>
        <TableCell align="left" style={{textTransform:"capitalize"}}>
          {name}{email === this.props.email ? this.currentAdminBadge("You"):""}{isAdmin ? this.currentAdminBadge("Admin"):""}
          {this.state["editing"+idx] && email !== this.props.email ? this.deleteIcon(idx):""}
          {this.state["editing"+idx] && <p><a style={{textTransform:"none", textDecoration:"none"}} href={"mailto:" + email} target="_blank">{email}</a></p>}
        </TableCell>
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
          <Button style={{width:"5em"}} variant="outlined" color="primary" size="small" onClick={ () => this.state["editing"+idx] ? this.save(idx):this.editMode(idx)}
          >{this.state["editing"+idx] ? "SAVE":"EDIT"}</Button>
          <br></br>
          {this.state["editing"+idx] && <Button
             style={{margin:"1em 0", width:"5em"}}
             variant="outlined" 
             color="secondary" 
             size="small"
             onClick={() => this.handleCancelation(idx)}
          >CANCEL</Button>}
        </TableCell>
      </TableRow>
    )
  }
  render() { 
    const { t, callBackRetourTableauDeBord, email } = this.props;
    const {users, fetchedUser, success, error, search, addUserMode, allowedWarehouseOnSignup} = this.state;
    console.log(email);
    return (
      <div id="PageUserManagement">
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} lg={9}>
              <Header title={t("users_title")} subheader={t("users_subtitle")} onBackClicked={callBackRetourTableauDeBord}></Header>
              <Card>
                <CardContent >
                  {success && <Toast
                    severity="success"
                    message={t("users_toast_ok")}
                    callback={() => {
                      this.setState({success: false})
                    }}
                  />}
                  {error && <Toast
                    severity="error"
                    message={t("users_toast_ko")}
                    callback={() => {
                      this.setState({error: false})
                    }}
                  />}
                  <Button 
                    style={{marginBottom:"1em"}} 
                    size="small" variant="outlined" 
                    color="primary"
                    onClick={() => this.setState({addUserMode: true})}
                  >{t("users_add_user")}</Button>
                  <Button 
                    style={{margin:"0 0 1em 1em"}} 
                    size="small" variant="outlined" 
                    color="primary"
                    // onClick={() => this.setState({addUserMode: true})}
                  >{t("users_add_warehouse")}</Button>
                  {addUserMode && <Grid container spacing={3} style={{boxShadow:"-10px 10px 50px rgb(0,0,0,0.3)",width:"100%", margin:"0", paddingRight:"0.5em" }}>
                    <Grid item xs={12} lg={4}>
                      {this.getFirstnameField()}
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      {this.getEmailField()}
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      {this.getPasswordField()}
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <p
                        style={{color:"mediumblue", fontSize:"0.8em"}}
                      >
                        {t("users_select_warehouse")}
                      </p>
                      {this.getWarehousesField()}
                    </Grid>
                    <Grid item xs={12} lg={4}> 
                      {allowedWarehouseOnSignup.length > 0 &&
                        <p style={{color:"mediumblue", fontSize:"0.8em"}}>{t("users_select_robot")}</p>
                      }
                      <div
                        style={{
                          display:"grid",
                          gridTemplateColumns: "1fr 1fr 1fr 1fr"
                        }}
                      >
                        {this.getRobotsField()}
                      </div>
                    </Grid>
                    <Grid item xs={12} lg={4} style={{display:"flex", alignItems:"flex-end", justifyContent:"flex-end"}}>
                      {this.getButtons()}
                    </Grid>
                  </Grid>}
                  <br></br>
                  <Table>
                    <TableHead style={{backgroundColor: "rgb(75, 75, 75)", color:"white"}}>
                      <TableRow>
                        {/* <TableCell align="center">ID Client </TableCell> */}
                        <TableCell align="left" style={{padding:"16px 3px", color:"white"}}>{" "}{t("users_col1")}</TableCell>
                        <TableCell align="left"style={{ color:"white"}}>{t("users_col2")}</TableCell>
                        <TableCell align="left"style={{ color:"white"}}>{t("users_col3")}</TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                      
                    
                    <TableBody>
                      {this.displayCurrentAdmin()}
                      {fetchedUser.map(({name, email, isAdmin}, idx) => {
                        if(email !==  this.props.email) return this.displayUsers(name, email, isAdmin, idx)
                      })}
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
                      // disabled={fetchedUser.length > 0 ? false:true}
                      size="small"
                      placeholder={t("users_search")}
                      value={search}
                      onChange={(e) => this.searchFilterFunction(e.target.value)}
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