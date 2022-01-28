import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import * as Const from "./Constant";
import { TableRow, TableCell } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";
import MapIcon from "@material-ui/icons/Map";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import MoreVertSharpIcon from "@material-ui/icons/MoreVertSharp";
import Tooltip from "@material-ui/core/Tooltip";
import Edit from "@material-ui/icons/Edit";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import "./PageMaps.css";
import { useTranslation, withTranslation } from "react-i18next";
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Toast from "./Toast";

class PageMaps extends React.Component {
  constructor(props) {
    // const { t, i18n } = useTranslation();
    
    super(props);
    // console.log("allWarehouses", JSON.parse(localStorage.getItem("allWarehouses")));
    this.state = {
      apiKey: props.apiKey,
      maps: null,
      map: this.props.showDetailsMaps,
      hoveredArea: null,
      msg: null,
      moveMsg: null,
      search: "",
      default: null,
      mapsErased: false,
      actionAdded: false,
      mapName: "",
      allWarehouses: JSON.parse(localStorage.getItem("allWarehouses")),
      switchWarehouse:false
    };
  }

  classes = makeStyles((Theme) => createStyles({}));

  addActionNewMapping() {
    this.handleClose();
    // TODO reorganize this 4 variable in good way
    let command = 2; // let suppose that 2 is to do mapping
    let var_id_client = 0; // FIX ASAP id client is not in the variable
    // this.state.map is in current context id_robot stupid
    // additional for the moment in not used for future

    fetch(
      Const.URL_WS_ADD_ACTION +
        `?id_client=${var_id_client}` +
        `&id_robot=${this.state.map}` +
        `&command=${command}` +
        `&additional=${command}` +
        `&map_name=${this.state.mapName}`,
      { retry: 3, retryDelay: 1000 }
    )
      .then((res) => res.json())
      .then((data) => {
        if (
          data.hasOwnProperty("message") &&
          data.message.includes("TOKEN_NON_VALIDE")
        ) {
          this.props.callbackNeedToLogin();
        } else {
          this.setState({ actionAdded: true });
        }
      })
      .catch((error) => {
        console.log("Request addActionNewMapping failed", error);
      });
  }

  deleteAllMaps() {
    console.log(Const.URL_WS_DEL_ALL_MAPS + `?robot=${this.state.map}`);
    fetch(Const.URL_WS_DEL_ALL_MAPS + `?robot=${this.state.map}`, {
      retry: 3,
      retryDelay: 1000,
    })
      .then((res) => res.json())
      .then((data) => {
        if (
          data.hasOwnProperty("message") &&
          data.message.includes("TOKEN_NON_VALIDE")
        ) {
          this.props.callbackNeedToLogin();
        } else {
          this.setState({ mapsErased: true });
        }
      })
      .catch((error) => {
        console.log("Request addActionNewMapping failed", error);
      });
  }

  provideMaps() {
    fetch(Const.URL_WS_ALL_MAPS + `?idclient=0&idrobot=${this.state.map}`, {
      retry: 3,
      retryDelay: 1000,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
          data = data.filter(item => item.on_map === 1);
          this.setState({
            maps: data,
            default: data,
          });
        }
      })
      .catch((error) => {
        console.log("Request failed", error);
      });
  }
  saveChanges = (pk, index) => {
    let { maps } = this.state;
    this.closeEditingMapArea(index);
    fetch(
      `${Const.URL_WS_SET_USER_COMMENT}?pk=${pk}&user_comment=${
        this.state["userComment" + pk]
      }`,
      {
        retry: 3,
        retryDelay: 1000,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(
          "request pk and comment",
          pk,
          this.state["userComment" + pk]
        );
        maps[index]["user_comment"] = this.state["userComment" + pk];
        this.setState({ maps });
        console.log("Save comment response: ", data);
      })
      .catch((error) => {
        console.error("Request failed", error);
      });

    fetch(
      `${Const.URL_WS_SET_MAP_NAME}?pk=${pk}&map_name=${
        this.state["mapName" + pk]
      }`,
      {
        retry: 3,
        retryDelay: 1000,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("request pk and mapName", pk, this.state["mapName" + pk]);
        maps[index]["map_name"] = this.state["mapName" + pk];
        this.setState({ maps });
        console.log("Save mapName response: ", data);
      })
      .catch((error) => {
        console.error("Request failed", error);
      });
  };

  handleCallbackOpenMapGestion = (
    mapName,
    status,
    id_client,
    id_robot,
    idMap
  ) => {
    // console.log("send robot id to MapGestion" + idMap, mapName);
    this.props.callbackOpenMapGestion(
      mapName,
      status,
      id_client,
      id_robot,
      idMap
    );
  };

  componentDidMount() {
    // Change zoom level on mount
    document.body.style.zoom = "100%";
    this.provideMaps();
  }
  searchFilterFunction = (text) => {
    //console.log("recherche Map n° "+text )
    const newData = this.state.default.filter((item) => {
      const itemData = `${item.pk}`;
      return itemData.includes(text);
    });

    this.setState({
      maps: newData,
    });
  };
  openEditingMapArea = (index, pk, comment, mapName) =>
    this.setState({
      ["editingMapDetails" + index]: this.state["editingMapDetails" + index] ? false:true,
      ["userComment" + pk]: comment,
      ["mapName" + pk]: mapName,
      switchWarehouse: false
    });
  closeEditingMapArea = (index) =>
    this.setState({ ["editingMapDetails" + index]: false });
  renamingModalDisplay = () => this.setState({ open: true });
  deletionModalDisplay = () => this.setState({ openDeleteModal: true });
  handleClose = () => this.setState({ open: false, openDeleteModal: false });
  setTempMapName = (event) => {
    const mapName = event.target.value;
    console.log(mapName);
    this.setState({ mapName });
  };
  handleFigureHoveringOn = (index) => {
    this.setState({ ["showIconMapDetails" + index]: true });
  };
  handleFigureHoveringOff = (index) => {
    this.setState({ ["showIconMapDetails" + index]: false });
  };
  handleComment = (comment, pk) => {
    console.log(comment);
    this.setState({ ["userComment" + pk]: comment });
  };
  handleMapRenamaing = (mapName, pk) => {
    console.log(mapName);
    this.setState({ ["mapName" + pk]: mapName });
  };
  handleSwitchWarehouse = (id_robot,id, name, comment) => {
    fetch(`${Const.URL_WS_SWITCH_WAREHOUSE}?id_robot=${id_robot}&id=${id}&name=${name}&comment=${comment}`)
    .then(res => res.json())
    .then(() => {
      this.setState({success: true, switchWarehouse: false});
      this.provideMaps();
    })
    .catch(() =>{
      this.setState({error: true})
    })
  }

  render() {
    const { t } = this.props;
    const { open, openDeleteModal, success,error, allWarehouses, switchWarehouse } = this.state;
    return (
      <div className={this.classes.root} id="PageMaps">
        {success && <Toast
          severity="success"
          message={t("maps_switch_res_ok")}
          callback={() => {
            this.setState({success: false})
          }}
        />}
        {error && <Toast
          severity="error"
          message={t("maps_switch_res_ko")}
          callback={() => {
            this.setState({error: false})
          }}
        />}
        {/* Rebuild Maps */}
        <Modal
          open={open}
          onClose={() => this.handleClose()}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div class="modal-body">
            <h3 style={{ marginTop: "0", borderBottom: "2px solid white" }}>
              <Typography variant="overline">
                {t("maps_mapping_modal_title")}
              </Typography>
            </h3>
            <TextField
              id="standard-basic"
              placeholder={t("maps_mapping_modal_search")}
              autoFocus
              onChange={(event) => this.setTempMapName(event)}
            />
            <div style={{ margin: "22px 0" }}>
              <Button
                variant="contained"
                style={{ margin: "0px" }}
                onClick={() => this.handleClose()}
              >
                <Typography variant="button" display="block" gutterBottom>
                  {t("maps_mapping_modal_cancel_btn")}
                </Typography>
              </Button>
              <Button
                variant="contained"
                disabled={!this.state.mapName}
                color="primary"
                style={{ marginLeft: "100px" }}
                onClick={() => this.addActionNewMapping()}
              >
                {t("maps_mapping_modal_search")}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Confirm Maps deletion */}
        <Modal
          open={openDeleteModal}
          onClose={() => this.handleClose()}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div class="modal-body">
            <h3 style={{ marginTop: "0", borderBottom: "2px solid white" }}>
              {t("maps_deleting_modal_title")}
            </h3>
            <p>{t("maps_deleting_modal_confirm")}</p>
            <div style={{ margin: "22px 0" }}>
              <Button
                variant="contained"
                style={{ margin: "0px" }}
                onClick={() => this.handleClose()}
              >
                {t("maps_deleting_modal_cancel_btn")}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginLeft: "100px" }}
                onClick={() => {}}
              >
                {t("maps_deleting_modal_confirm_btn")}
              </Button>
            </div>
          </div>
        </Modal>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Card>
            <CardHeader
                avatar={
                  <div>
                    <img width="32" src="./images/carrier.svg" />
                  </div>
                }
                title={`Robot ${this.state.map}`}
                subheader={t("maps_title")}
              />
              <CardContent>
              <div style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      position: "relative",
                      bottom: "6.5em",
                }}>
                  <img onClick={() => this.props.callBackRetourTableauDeBord()} src={"./images/go_back.png"} style={{width:"50px", marginRight:"1em", position:"relative", top:"15px"}}></img>
                </div>
                <Table>
                  <TableBody>
                    {this.state.maps != null &&
                      this.state.maps.map((s, index) => {
                        return (
                          <TableRow key={s.pk}>
                            <TableCell align="center">
                              <div>
                                <Grid
                                  container
                                  spacing={0}
                                  style={{ justifyContent: "center" }}
                                >
                                  <Grid item xs={12} md={6}>
                                    <span>{s.map_name}</span>
                                    <figure
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                      }}
                                      onMouseEnter={() =>
                                        this.handleFigureHoveringOn(index)
                                      }
                                      onMouseLeave={() =>
                                        this.handleFigureHoveringOff(index)
                                      }
                                    >
                                      <img
                                        key={s.pk}
                                        style={{ paddingBottom: 10 }}
                                        width="250"
                                        src={`data:image/jpeg;base64,` + s.blob}
                                        onClick={() =>
                                          this.handleCallbackOpenMapGestion(
                                            s.map_name,
                                            s.is_moving,
                                            s.id_client,
                                            s.id_robot,
                                            s.pk + "blob" + s.blob
                                          )
                                        }
                                      />
                                    </figure>
                                    <span>{s["user_comment"]}</span>
                                    <div style={{display: "flex", justifyContent: "center", marginTop:"1em"}}>
                                      <Button
                                        // style={{ marginLeft: "1em" }}
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        endIcon={<DoubleArrowIcon />}
                                        onClick={() =>
                                          this.openEditingMapArea(
                                            index,
                                            s.pk,
                                            s.user_comment,
                                            s.map_name
                                          )
                                        }
                                      >
                                        {t("maps_edit_btn")}
                                      </Button>
                                      <Button
                                        style={{ marginLeft: "1em" }}
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        endIcon={<DoubleArrowIcon />}
                                        onClick={() => this.setState({switchWarehouse: !this.state.switchWarehouse, ["editingMapDetails" + index]:false})}
                                      >
                                        {t("maps_switch_btn")}
                                      </Button>
                                    </div>
                                  </Grid>
                                  <Grid
                                    style={{
                                      padding: "10px", 
                                    }}
                                  >
                                    {this.state[
                                      "editingMapDetails" + index
                                    ] && (
                                      <div
                                        style={{
                                          width: "300px",
                                        }}
                                      >
                                        <div style={{textAlign:"right", paddingBottom:"1em"}}>
                                          <span>L'entrepôt actuel</span>
                                        </div>
                                        <TextField
                                          autoFocus
                                          style={{
                                            width: "100%",
                                            marginBottom: "20px",
                                          }}
                                          label="Nom de l'entrepôt"
                                          defaultValue={s["map_name"]}
                                          variant="outlined"
                                          onChange={(event) =>
                                            this.handleMapRenamaing(
                                              event.target.value,
                                              s.pk
                                            )
                                          }
                                        />
                                        <TextField
                                          // autoFocus
                                          style={{
                                            width: "100%",
                                          }}
                                          id="outlined-multiline-static"
                                          label="Concernant l'entrepôt"
                                          multiline
                                          rows={4}
                                          defaultValue={s["user_comment"]}
                                          variant="outlined"
                                          helperText="Votre descriptif s'affichera juste en dessous de votre carte une fois enregistré"
                                          onChange={(event) =>
                                            this.handleComment(
                                              event.target.value,
                                              s.pk
                                            )
                                          }
                                        />
                                        <div
                                          style={{
                                            marginTop: "2em",
                                            display: "flex",
                                            justifyContent: "flex-end",
                                          }}
                                        >
                                          <Button
                                            size="small"
                                            variant="contained"
                                            onClick={() =>
                                              this.closeEditingMapArea(index)
                                            }
                                          >
                                            Annuler
                                          </Button>
                                          <Button
                                            size="small"
                                            variant="outlined"
                                            color="primary"
                                            style={{ marginLeft: "1em" }}
                                            onClick={() =>
                                              this.saveChanges(s.pk, index)
                                            }
                                          >
                                            Enregistrer
                                          </Button>
                                        </div>
                                      </div>
                                    )}
                                    {switchWarehouse && (
                                    <div>
                                      <div style={{textAlign:"right", paddingTop:"1em", marginTop:"1em"}}>
                                        <p style={{borderBottom:"2px solid gray", margin:"0"}}>Changer d'entrepôt à ce robot</p>
                                        <span style={{fontSize:"0.8em", color:"gray"}}>Liste d'entrepôt disponible</span>
                                      </div>
                                      <div
                                        style={{
                                          margin: "1em 0",
                                          display: "flex",
                                          justifyContent: "flex-end",
                                          
                                        }}
                                      >
                                        {allWarehouses.map(({name, id, comment}, index) => {
                                          if(name !== s.map_name)  return (
                                            <Button
                                              key={index}
                                              variant="outlined"
                                              color="primary"
                                              style={{ marginLeft: "1em" }}
                                              onClick={() =>this.handleSwitchWarehouse(s.id_robot,id, name, comment)}
                                              size="small"
                                            >
                                              {name}
                                            </Button>
                                          )}
                                        )}
                                      </div>
                                      <Button
                                          style={{float:"right"}}
                                          size="small"
                                          variant="contained"
                                          onClick={() => this.setState({switchWarehouse: false})}
                                        >Annuler</Button>
                                    </div>
                                    )}
                                  </Grid>
                                </Grid>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Card className="sidebarCards">
              <CardHeader
                avatar={<TuneOutlinedIcon fontSize="large" />}
                title={t("maps_filter")}
                subheader={t("maps_filter_sub")}
              />
              <CardContent>
                <FormControl size="small" fullWidth variant="outlined">
                  <TextField
                    size="small"
                    placeholder={t("maps_search")}
                    value={this.state.search}
                    onChange={(event) => {
                      const { value } = event.target;
                      this.setState({ search: value });
                      if (value !== "") {
                        this.searchFilterFunction(value);
                      } else {
                        this.setState({
                          maps: this.state.default,
                        });
                      }
                    }}
                  />
                </FormControl>
              </CardContent>
            </Card>

            <Card className="sidebarCards">
              <CardHeader
                avatar={<MapIcon fontSize="large" />}
                title={t("maps_mapping")}
                subheader={t("maps_new_mapping_sub")}
              />
              <CardContent>
                <FormControl size="small" fullWidth variant="outlined">
                  <Button
                    fullWidth={false}
                    width="2em"
                    // onClick={() => this.addActionNewMapping()}
                    onClick={() => this.renamingModalDisplay()}
                    variant="outlined"
                    color="error"
                    size="small"
                  >
                    {t("maps_new_mapping_btn")}
                  </Button>
                </FormControl>
              </CardContent>
            </Card>

            <Card className="sidebarCards">
              <CardHeader
                avatar={<MapIcon fontSize="large" />}
                title={t("maps_mapping")}
                subheader={t("maps_mapping_sub")}
              />
              <CardContent>
                <FormControl size="small" fullWidth variant="outlined">
                  <Button
                    fullWidth={false}
                    width="2em"
                    // onClick={() => this.addActionNewMapping()}
                    onClick={() => this.renamingModalDisplay()}
                    variant="outlined"
                    color="error"
                    size="small"
                  >
                    {t("maps_mapping_btn")}
                  </Button>
                </FormControl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader
                avatar={<DeleteSweepIcon fontSize="large" />}
                title={t("maps_delete")}
                subheader={t("maps_delete_sub")}
              />
              <CardContent>
                <FormControl size="small" fullWidth variant="outlined">
                  <Button
                    fullWidth={false}
                    width="2em"
                    onClick={() => this.deletionModalDisplay()}
                    variant="outlined"
                    outline
                    color="red"
                    size="small"
                  >
                    {t("maps_delete_btn")}
                  </Button>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withTranslation()(PageMaps);
