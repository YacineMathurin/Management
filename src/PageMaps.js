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
import Tooltip from "@material-ui/core/Tooltip";
import Edit from "@material-ui/icons/Edit";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import "./PageMaps.css";

class PageMaps extends React.Component {
  constructor(props) {
    super(props);
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
    fetch(Const.URL_WS_ALL_MAPS + `?robot=${this.state.map}`, {
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
          data.map((item, index) => {
            this.setState({
              ["editingMapDetails" + index]: false,
              ["showIconMapDetails" + index]: false,
            });
          });
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
  saveComment = (pk, index) => {
    let { maps } = this.state;
    this.closeEditingMapArea(index);
    fetch(
      `http://193.70.86.40:8081/SetUserCommentByPkWS?pk=${pk}&user_comment=${
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
  };

  handleCallbackOpenMapGestion = (idMap) => {
    console.log("send robot id to MapGestion" + idMap);
    this.props.callbackOpenMapGestion(idMap);
  };

  componentDidMount() {
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
  openEditingMapArea = (index, pk, comment) =>
    this.setState({
      ["editingMapDetails" + index]: true,
      ["userComment" + pk]: comment,
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

  render() {
    console.log("State", this.state);
    const { open, openDeleteModal, editingMapDetails } = this.state;
    return (
      <div className={this.classes.root}>
        {/* Renaming Maps */}
        <Modal
          open={open}
          onClose={() => this.handleClose()}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div class="modal-body">
            <h3 style={{ marginTop: "0", borderBottom: "2px solid white" }}>
              Nommer votre carte
            </h3>
            <TextField
              id="standard-basic"
              placeholder="Entrepot 1"
              autoFocus
              onChange={(event) => this.setTempMapName(event)}
            />
            <div style={{ margin: "22px 0" }}>
              <Button
                variant="contained"
                style={{ margin: "0px" }}
                onClick={() => this.handleClose()}
              >
                Annuler
              </Button>
              <Button
                variant="contained"
                disabled={!this.state.mapName}
                color="primary"
                style={{ marginLeft: "100px" }}
                onClick={() => this.addActionNewMapping()}
              >
                Enregistrer
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
              Supprimer les cartes
            </h3>
            <p>Etes vous sûre de vouloir Supprimer vos cartes ?</p>
            <div style={{ margin: "22px 0" }}>
              <Button
                variant="contained"
                style={{ margin: "0px" }}
                onClick={() => this.handleClose()}
              >
                Annuler
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginLeft: "100px" }}
                onClick={() => {}}
              >
                Confirmer
              </Button>
            </div>
          </div>
        </Modal>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
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
                    onClick={() => this.props.callBackRetourTableauDeBord()}
                  />
                </div>

                <div style={{ marginLeft: "3.5em" }}>
                  <Typography
                    style={{ color: "BLACK" }}
                    component="h5"
                    variant="h5"
                  >
                    robot {this.state.map}
                  </Typography>
                </div>
                <span>&nbsp;</span>
                <h1> Cliquer pour Selectionner une Cartographie </h1>
                <Table>
                  <TableBody>
                    {this.state.maps != null &&
                      this.state.maps.map((s, index) => {
                        return (
                          <TableRow key={s.pk}>
                            <TableCell align="center">
                              <h3 style={{ textAlign: "left" }}> Map {s.pk}</h3>
                              <div>
                                <Grid
                                  container
                                  spacing={0}
                                  style={{ justifyContent: "center" }}
                                >
                                  <Grid item xs={12} md={6}>
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
                                            s.pk + "blob" + s.blob
                                          )
                                        }
                                      />
                                      <p
                                        className={
                                          this.state[
                                            "showIconMapDetails" + index
                                          ]
                                            ? "showIconMapDetails"
                                            : "hideIconMapDetails"
                                        }
                                        style={{
                                          backgroundColor: "rgba(0,0,0,0.1)",
                                          width: "2em",
                                          height: "2em",
                                          margin: "0 1em",
                                          // marginLeft: "1em",
                                          // position: "relative",
                                          // bottom: "0.5em",
                                          borderRadius: "5px",
                                          cursor: "pointer",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                        }}
                                        onClick={() =>
                                          this.openEditingMapArea(
                                            index,
                                            s.pk,
                                            s.user_comment
                                          )
                                        }
                                      >
                                        <Tooltip title="Ajouter un détail">
                                          <SpeakerNotesIcon
                                            style={{
                                              fontSize: 20,
                                              color: "#4aaac2",
                                            }}
                                          ></SpeakerNotesIcon>
                                        </Tooltip>
                                      </p>
                                    </figure>
                                    {!this.state["editingMapDetails" + index] &&
                                      s["user_comment"] !== "" && (
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            position: "relative",
                                            right: "28px",
                                          }}
                                        >
                                          <p>{s["user_comment"]}</p>
                                          <p
                                            style={{
                                              backgroundColor:
                                                "rgba(0,0,0,0.1)",
                                              width: "2em",
                                              height: "2em",
                                              marginLeft: "1em",
                                              position: "relative",
                                              bottom: "0.5em",
                                              borderRadius: "5px",
                                              cursor: "pointer",
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "center",
                                            }}
                                            onClick={() =>
                                              this.openEditingMapArea(index)
                                            }
                                          >
                                            <Tooltip title="Editer ce détail">
                                              <Edit
                                                style={{
                                                  fontSize: 20,
                                                  color: "#4aaac2",
                                                }}
                                              ></Edit>
                                            </Tooltip>
                                          </p>
                                        </div>
                                      )}
                                  </Grid>
                                  <Grid
                                    style={{
                                      padding: "17px",
                                      position: "relative",
                                      right: "28px",
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
                                        <TextField
                                          autoFocus
                                          style={{
                                            width: "100%",
                                          }}
                                          id="outlined-multiline-static"
                                          label="Concernant cette carte"
                                          multiline
                                          rows={4}
                                          defaultValue={s["user_comment"]}
                                          variant="outlined"
                                          helperText="Votre descriptif s'affichera juste en dessous de votre carte une fois enregisté"
                                          onChange={(event) =>
                                            this.handleComment(
                                              event.target.value,
                                              s.pk
                                            )
                                          }
                                        />
                                        <div
                                          style={{
                                            marginTop: "1em",
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            position: "relative",
                                            right: "28px",
                                          }}
                                        >
                                          <Button
                                            variant="contained"
                                            onClick={() =>
                                              this.closeEditingMapArea(index)
                                            }
                                          >
                                            Annuler
                                          </Button>
                                          <Button
                                            variant="contained"
                                            color="primary"
                                            style={{ marginLeft: "1em" }}
                                            onClick={() =>
                                              this.saveComment(s.pk, index)
                                            }
                                          >
                                            Enregistrer
                                          </Button>
                                        </div>
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
            <Card>
              <CardHeader
                avatar={<TuneOutlinedIcon fontSize="large" />}
                title="Filtrage"
                subheader="Filtrer par cartes"
              />
              <CardContent>
                <FormControl size="small" fullWidth variant="outlined">
                  <TextField
                    size="small"
                    placeholder="Rechercher la carte"
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

            <Card>
              <CardHeader
                avatar={<MapIcon fontSize="large" />}
                title="Cartografier à nouveau"
                subheader="Envoyer une commande à robot pour lancer une nouvelle exploration"
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
                    refaire la cartographie
                  </Button>
                </FormControl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader
                avatar={<DeleteSweepIcon fontSize="large" />}
                title="Supprimer toutes les cartes"
                subheader="Vider la contenu de la base des donnees pour ce robot"
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
                    Supprimer toutes cartes
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

export default PageMaps;
