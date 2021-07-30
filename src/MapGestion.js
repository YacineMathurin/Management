
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import YouTube from 'react-youtube';
import pdf_memo_img from './assets/DTF_MEMO.jpg';
import pdf_memo from './assets/DTF_MEMO.pdf';
import * as Const from './Constant';
import CardHeader from '@material-ui/core/CardHeader';
import { TableRow, TableCell } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TestLineChart from './TestLineChart';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Button from '@material-ui/core/Button';
import ImageMapper from 'react-image-mapper';

class MapGestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey : props.apiKey,
      coodinates : null,
      map : this.props.showDetailsMaps,
      co:null,
      id:null,
      blob:null,
      xCoord:null,
      yCoord:null,
      hoveredArea: null, msg: null, moveMsg: null,status:null,
      nbpts:null
    }
  }

  classes = makeStyles((Theme) =>
    createStyles({
    }),
  );
  
  provideCoordinates(){
    var fields = this.props.showDetailsMapGestion.split('blob');
    var id = fields[0];
    var lgg=0;
    console.log("Wait Please !!!!!")
    console.log("my Id: "+id)
    fetch(Const.URL_WS_ALL_DEF+"?id="+id, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
     
        this.setState({ coodinates: data})
        console.log('coordinate', this.state.coodinates)
        var MAP = {
          name: "my-map",
          areas: []
        }
               
        this.state.coodinates.map((s) => { 
          //this.setState({nbpts:s.nb_pts})
          MAP.areas.push({
            name: s.pk,
            shape: "circle",
            coords: [s.x_pixel, s.y_pixel,4],
            preFillColor: "blue",
            fillColor: "#0000ff"
          })
          
        })

        if(this.state.coodinates.length>0) {
          //ajouter la couleur
          lgg=this.state.coodinates.length
          console.log(lgg)
          MAP.areas[lgg-1].preFillColor="#00FF00"
         }
        
        console.log('co', MAP)
        console.log('nbpts', this.state.nbpts)
        this.setState({mp:MAP})
        //this.setState({co:arra})
     
      console.log('co', this.state.co)
      console.log('map', this.state.mp)
      console.log("Finish i have points !!!!!")
    })
    .catch((error) => {
      console.log('Request failed', error)
    })
  }
  deplacerRobot(x,y){
    var fields = this.props.showDetailsMapGestion.split('blob');
    var id = fields[0];
    fetch(Const.URL_WS_INS_DEF+"?idClient=0&idRobot=1&id="+id+"&speed=6&x="+x+"&y="+y+"&breakTime=30", { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      console.log("J'ai ajouté un point x="+ x+"  y="+y)
      console.log(data)
      this.setState({
        status:"J'ai ajouté un point x="+ x+"  y="+y
      })
      
    })
    .catch((error) => {
      console.log('Request failed', error)
    })
  }
  
  getMAJMaps(){
    
    fetch(Const.URL_WS_PROVIDE_METRICS, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      console.log("it's me MR")
      console.log(data)
      
        console.log("ELse it's me MR")
        this.setState({ listeMetrics: data})
      
    })
    .catch((error) => {
      console.log('Request failed', error)
    })
  }
  load() {
		this.setState({ msg: "" });
	}

	clicked(area) {
		this.setState({
			msg: `Vous avez cliqué sur ${area.shape} à ${JSON.stringify(
				area.coords
			)} !`
		});

    
  }
   

	clickedOutside(evt) {
		const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
		this.setState({
			msg: `Vous avez cliqué sur  ${JSON.stringify(coords)} `
		});
    this.setState({
      xCoord:evt.nativeEvent.layerX,
      yCoord:evt.nativeEvent.layerY,
    })
    console.log("x "+this.state.xCoord)
    console.log("y "+this.state.yCoord)
	}

	moveOnImage(evt) {
		const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
		this.setState({
			moveMsg: `Coordonnées  ${JSON.stringify(coords)} `
		});
	}

	enterArea(area) {
		this.setState({
			hoveredArea: area,
			msg: `Vous êtes rentré sur ${area.shape} ${area.name} `
		});
	}

	leaveArea(area) {
		this.setState({
			hoveredArea: null,
			msg: `Vous avez quitté ${area.shape} ${area.name}`
		});
	}

	moveOnArea(area, evt) {
		const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
		this.setState({
			moveMsg: `Vous êtes à  ${area.shape} ${
				area.name
			} at coords ${JSON.stringify(coords)} !`
		});
	}

	getTipPosition(area) {
		return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
	}

  componentDidMount() {
   this.provideCoordinates();
  }
  

  render() {
    
    var MAP = {
      name: "my-map",
      areas: [
        {
          name: "1",
          shape: "circle",
          coords: [228, 338,5],
          preFillColor: "green",
          fillColor: "#0000ff"
        },
        
      ]
    }
   
    var fields = this.props.showDetailsMapGestion.split('blob');
    var id = fields[0];
    var blob = fields[1];
    
    
  return (
    <div className={this.classes.root}>
    
    <Grid container spacing={2}>
       
    <Grid item  xs={12} md={8} lg={9}>
    <Card>
    <CardContent>
    
        <div>
        <img style={{float:"left", marginTop:"0.5em"}} width="40" src="./images/carrier.svg"/>
        <img style={{float:"right", marginTop:"0.5em"}} width="50" src="./images/backI.png" onClick={() => this.props.callBackRetourMaps() }/>
        </div>
                    
        <div style={{marginLeft:"3.5em"}}>
        <Typography style={{color:"BLACK"}} component="h5" variant="h5">
        Map N°  {id}
        </Typography>
        </div>
        <span >&nbsp;</span>
        <Table>
                <TableHead>
                  <TableRow>
                      <TableCell align="center">Map</TableCell>
                      <TableCell align="center">Commandes</TableCell>
                  </TableRow>
                </TableHead>
        <TableRow>
            <TableCell align="center">
                <ImageMapper 
                  src={ `data:image/png;base64,`+blob}
                  map={this.state.mp}
                  width={500}
                  onLoad={() => this.load()}
                  onClick={area => this.clicked(area)}
                  onMouseEnter={area => this.enterArea(area)}
                  onMouseLeave={area => this.leaveArea(area)}
                  onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
                  onImageClick={evt => this.clickedOutside(evt)}
                  onImageMouseMove={evt => this.moveOnImage(evt)}
                  lineWidth={4}
                  strokeColor={"white"}
                />
            </TableCell>
            <TableCell align="center">
            <h1 style={{color:'orange', fontWeight: 'bold'}}> {this.state.nbpts ? this.state.nbpts +" positions ": null}</h1> 
            {this.state.hoveredArea && (
            <span
            className="tooltip"
            style={{ ...this.getTipPosition(this.state.hoveredArea) }}
            >
            {this.state.hoveredArea && this.state.hoveredArea.name}
            </span>
            )}
            <h3 className="message">
            {this.state.msg ? this.state.msg : null}</h3>
            <h3> {this.state.moveMsg ? this.state.moveMsg : null} </h3>

            <h3 style={{color:'green', fontWeight: 'bold'}}> {this.state.status ? this.state.status : null}</h3>
            <span>&nbsp;</span>
                     <Button
                      fullWidth="false"
                      width="2em"
                      onClick={() => this.deplacerRobot(this.state.xCoord,this.state.yCoord) }
                      variant="contained"
                        color="primary"
                        size="medium"
                      >
                        Déplacer robot
                     </Button> <span>&nbsp;</span>
                      <Button
                      fullWidth="false"
                      width="2em"
                      onClick={() => this.provideCoordinates() }
                      variant="contained"
                        color="primary"
                        size="large"
                      >
                        Rafraichir Map
                      </Button><span>&nbsp;</span>
                      <Button
                      fullWidth="false"
                      width="2em"
                      onClick={() => {} }
                      variant="contained"
                        color="secondary"
                        size="large"
                      >
                         Effacer carte
                      </Button><span>&nbsp;</span>
                      <Button
                      fullWidth="false"
                      width="3em"
                      onClick={() => {} }
                      variant="contained"
                        color="primary"
                        size="large"
                      >
                         Démarrage
                      </Button>
            </TableCell>
        </TableRow>
        </Table>
     
    </CardContent>
    </Card>
    </Grid>
    </Grid>
    </div>
  )}
}

export default MapGestion;