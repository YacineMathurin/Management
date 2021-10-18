import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import * as Const from './Constant';
import { TableRow, TableCell } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { Modal } from '@material-ui/core';
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
      search: '',
      default: null,
      mapsErased: false,
      actionAdded: false,
      mapName: ''
    }
  }
  classes = makeStyles((Theme) => createStyles({}),);


  addActionNewMapping() {
    this.handleClose();
    // TODO reorganize this 4 variable in good way
    let command = 2;// let suppose that 2 is to do mapping
    let var_id_client = 0;// FIX ASAP id client is not in the variable
    // this.state.map is in current context id_robot stupid
    // additional for the moment in not used for future

    fetch(Const.URL_WS_ADD_ACTION + `?id_client=${var_id_client}` + `&id_robot=${this.state.map}` + `&command=${command}` + `&additional=${command}` + `&map_name=${this.state.mapName}`, { retry: 3, retryDelay: 1000 })
      .then(res => res.json())
      .then((data) => {
        if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
          this.props.callbackNeedToLogin()
        } else {
          this.setState({ actionAdded: true })
        }
      })
      .catch((error) => {
        console.log('Request addActionNewMapping failed', error)
      })
  }

  deleteAllMaps() {
    console.log(Const.URL_WS_DEL_ALL_MAPS + `?robot=${this.state.map}`);
    fetch(Const.URL_WS_DEL_ALL_MAPS + `?robot=${this.state.map}`, { retry: 3, retryDelay: 1000 })
      .then(res => res.json())
      .then((data) => {
        if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
          this.props.callbackNeedToLogin()
        } else {
          this.setState({ mapsErased: true })
        }
      })
      .catch((error) => {
        console.log('Request addActionNewMapping failed', error)
      })
  }


  provideMaps() {
    fetch(Const.URL_WS_ALL_MAPS + `?robot=${this.state.map}`, { retry: 3, retryDelay: 1000 })
      .then(res => res.json())
      .then((data) => {
        if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
          this.props.callbackNeedToLogin()
        } else {
          this.setState({
            maps: data,
            default: data
          })
        }
      })
      .catch((error) => {
        console.log('Request failed', error)
      })
  }


  handleCallbackOpenMapGestion = (idMap) => {
    console.log("send robot id to MapGestion" + idMap)
    this.props.callbackOpenMapGestion(idMap)
  }

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
  ModalDisplay = () => this.setState({ open: true })
  handleClose = () => this.setState({ open: false })
  setTempMapName = (event) => {
    const mapName = event.target.value;
    console.log(mapName);
    this.setState({ mapName })
  }
  render() {
    const { open } = this.state;
    return (
      <div className={this.classes.root}>
        <Modal
          open={open}
          onClose={() => this.handleClose()}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div id="modal-body" style={{
            color: "white",
            position: "absolute",
            top: "10%",
            left: "50%",
            border: "2px solid",
            borderRadius: "5px",
            padding: "20px",
            transform: "translateX(-50%)"
          }}>
            <h3 style={{ marginTop: "0", borderBottom: "2px solid white" }}>Nommer votre carte</h3>
            <TextField id="standard-basic" label="Nomenclature:" autoFocus onChange={(event) => this.setTempMapName(event)} />
            <Button variant="contained" color="primary" style={{ margin: "12px" }} onClick={() => this.addActionNewMapping()}>
              Enregistrer
            </Button>
          </div>
        </Modal>

        <Grid container spacing={3}>

          <Grid item xs={12} md={8} lg={9}>
            <Card>

              <CardContent >

                <div>
                  <img style={{ float: "left", marginTop: "0.5em" }} width="40" src="./images/carrier.svg" />
                  <img style={{ float: "right", marginTop: "0.5em" }} width="50" src="./images/back.png" onClick={() => this.props.callBackRetourTableauDeBord()} />
                </div>

                <div style={{ marginLeft: "3.5em" }}>
                  <Typography style={{ color: "BLACK" }} component="h5" variant="h5">
                    robot  {this.state.map}
                  </Typography>
                </div>
                <span >&nbsp;</span>
                <h1 > Selectionne une Map </h1>
                <Table>
                  <TableBody >
                    {(this.state.maps != null) && (this.state.maps.map((s) => {

                      return (
                        <TableRow key={s.pk} >
                          <TableCell align="center">
                            <h3 > Map {s.pk}</h3>
                            <figure >
                              <img key={s.pk} style={{ paddingBottom: 10 }} width="250" src={`data:image/jpeg;base64,` + s.blob} onClick={() => this.handleCallbackOpenMapGestion(s.pk + "blob" + s.blob)} />
                            </figure>
                          </TableCell>
                        </TableRow >
                      )
                    }))

                    }
                  </TableBody>
                </Table>



              </CardContent>
            </Card>

          </Grid>


          <Grid item xs={12} md={4} lg={3} >

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
                    onChange={event => {
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
                avatar={<TuneOutlinedIcon fontSize="large" />}
                title="Cartografier à nouveau"
                subheader="Envoyer une commande à robot pour lancer une nouvelle exploration"
              />
              <CardContent>
                <FormControl size="small" fullWidth variant="outlined">
                  <Button
                    fullWidth={false}
                    width="2em"
                    // onClick={() => this.addActionNewMapping()}
                    onClick={() => this.ModalDisplay()}
                    variant="outlined" color="error" size="small">
                    refaire la cartographie
                  </Button>
                </FormControl>
              </CardContent>
            </Card>




            <Card>
              <CardHeader
                avatar={<TuneOutlinedIcon fontSize="large" />}
                title="Supprimer toutes les cartes"
                subheader="Vider la contenu de la base des donnees pour ce robot"
              />
              <CardContent>
                <FormControl size="small" fullWidth variant="outlined">
                  <Button
                    fullWidth={false}
                    width="2em"
                    onClick={() => this.deleteAllMaps()}
                    variant="outlined" outline color="red" size="small">
                    Supprimer toutes cartes
                  </Button>
                </FormControl>
              </CardContent>
            </Card>






          </Grid>
        </Grid>
      </div>
    )
  }
}

export default PageMaps;