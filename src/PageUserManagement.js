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
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import DashboardIcon from "@material-ui/icons/Dashboard";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import LinearProgress from "@material-ui/core/LinearProgress";
import LinearBuffer from "./PageTableauDeBordChargement";
import CircularProgressWithLabel from "./PageTableauDeBordBattery";
import { useTranslation } from "react-i18next";

function PageUserManagement(props) {
  const { t } = useTranslation();

  const [users, setUsers] = React.useState([]);
  const [search, setsearch] = React.useState("");
  const [editing, setEditing] = React.useState(null);
  const [warehouses, setWarehouses] = React.useState([]);
  const [warehouseCheckboxs, setWarehouseCheckboxs] = React.useState([]);
  const [robotCheckboxs, setRobotCheckboxs] = React.useState([]);

  React.useEffect(() => {
    fetchUsers();
    provideMetrics();
   }, []);

  const fetchUsers = () => {
    fetch(Const.URL_WS_USERS+"/all")
    .then((res) => res.json())
    .then(({users}) => {
      console.log(users);
      setUsers(users)
      edit(users);
    })
    .catch(err => {
      console.error(err);
    })
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
        //  console.log(data);
         getAllRobots(data);
         getAllWarehouses(data);
        //  setLoading(false);
      })
      .catch((error) => {
        console.error("Request failed", error);
      });
  };

  const getAllRobots = (data) => {
    var allRobots = [];
    data.map(item => allRobots.push(item.id_robot));
    console.log("All Robots", allRobots); 
  };

  const getAllWarehouses = (data) => {  
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

    result.map(item => allWarehouses.push(item.map_name));
    console.log("All Warehouses", allWarehouses);
    // setWarehouses(allWarehouses)
  }
  const handleWarehouses = (event) => {
    setWarehouseCheckboxs([ ...warehouseCheckboxs, {[event.target.name]: event.target.checked} ]);
  };
  const edit = (users) => {
    setWarehouses(users[0].warehouse);
  }
  const handleRobots = (event) => {
    setRobotCheckboxs([ ...robotCheckboxs, {[event.target.name]: event.target.checked} ]);
  };
  const searchFilterFunction = (text) => {
    
  };
  const resetFilter = () => {
    

  };

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
                  <img onClick={() => props.callBackRetourTableauDeBord()} src={"./images/go_back.png"} style={{width:"50px", marginRight:"1em", position:"relative", top:"15px"}}></img>
                </div>
                <Table>
                  <TableHead>
                    <TableRow>
                      {/* <TableCell align="center">ID Client </TableCell> */}
                      <TableCell align="left">{t("users_col1")}</TableCell>
                      <TableCell align="center">{t("users_col2")}</TableCell>
                      <TableCell align="center">{t("users_col3")}</TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                    
                  
                  <TableBody>
                    {users.map(({name, robot}, idx) => (
                      <TableRow key={idx}>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="center"> {
                          warehouses.map((item, index) => {
                            if (editing) 
                            return (
                              <FormControlLabel
                                key={index}
                                control={
                                  <Checkbox
                                    checked={item[Object.keys(item)]}
                                    onChange={handleWarehouses}
                                    name={Object.keys(item)}
                                    color="primary"
                                  />
                                }
                                label={Object.keys(item)}
                              />            
                            )
                            else {
                              var allowedWarehouse = Object.values(item);
                              allowedWarehouse = allowedWarehouse[0];
                              var warehouseName = Object.keys(item);
                              warehouseName = warehouseName[0];
                              return allowedWarehouse ? <Button style={{margin: "0.5em"}} variant="outlined" color="primary" key={index} className="allowedWarehouse">{warehouseName}</Button>:"";
                            }
                          })
                        } </TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">
                          <Button onClick={ () => {
                              console.log("warehouseCheckboxs", JSON.stringify(warehouseCheckboxs))
                              console.log("warehouseCheckboxs", JSON.parse(JSON.stringify(warehouseCheckboxs)))
                          }}
                          >Save</Button>
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
                    size="small"
                    placeholder={t("dashboard_maps_search")}
                    value={search}
                    onChange={(event) => {
                      const { value } = event.target;
                      // this.setState({ search: value });
                      setsearch(value);
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


export default PageUserManagement;
