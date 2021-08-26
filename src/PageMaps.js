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

class PageMaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey : props.apiKey,
      maps : null,
      map : this.props.showDetailsMaps,
      hoveredArea: null, msg: null, 
      moveMsg: null, 
      search:'',default:null,
    }
  }

  classes = makeStyles((Theme) =>
    createStyles({
    }),
  );

  provideMaps(){
    fetch(Const.URL_WS_ALL_MAPS + `?robot=${this.state.map}`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
        this.setState({ maps: data,
                        default: data})
      }
    })
    .catch((error) => {
      console.log('Request failed', error)
    })
  }
  
  
  handleCallbackOpenMapGestion= (idMap) =>{
    console.log("send robot id to MapGestion")
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

  render() {
  return (
    <div className={this.classes.root}>
    <Grid container spacing={2}>
       
    <Grid item  xs={12} md={8} lg={9}>
    <Card>
    
    <CardContent >
    
        <div>
        <img style={{float:"left", marginTop:"0.5em"}} width="40" src="./images/carrier.svg"/>
        <img style={{float:"right", marginTop:"0.5em"}} width="50" src="./images/back.png" onClick={() => this.props.callBackRetourTableauDeBord() }/>
        </div>
                    
        <div style={{marginLeft:"3.5em"}}>
        <Typography style={{color:"BLACK"}} component="h5" variant="h5">
        robot  {this.state.map}
        </Typography>
        </div>
        <span >&nbsp;</span>
        <h1 > Selectionne une Map </h1>
      <Table>
        <TableBody >
      { (this.state.maps != null) && (  this.state.maps.map((s) => { 
                
                return ( 
                  <TableRow key={s.pk} >
                     <TableCell align="center">
                     <h3 > Map {s.pk}</h3>
                    <figure >
                        <img key={s.pk} style={{paddingBottom:10}}  width="250"  src={ `data:image/png;base64,`+s.blob} onClick={() => this.handleCallbackOpenMapGestion(s.pk+"blob"+s.blob) }/>
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
            avatar={
              <TuneOutlinedIcon fontSize="large"/>
            }
            
            title="Filtrage"
            subheader="Filtrez sur les Map"
          />
          
            <CardContent>

                  <FormControl size="small" fullWidth variant="outlined">
          
          <TextField
            size="small"
            placeholder="Rechercher un ID Map"
            value={this.state.search}
            onChange={event => {
              const { value } = event.target;
              this.setState({ search: value });
              if (value !== "") {
                this.searchFilterFunction(value);
              } else {
                this.setState({ maps: this.state.default,
                 });
              }
            }}
          />
        </FormControl>

     
            </CardContent>
          </Card>
        </Grid>
    </Grid>
    </div>
  )}
}

export default PageMaps;