
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
          this.setState({nbpts:s.nb_pts})
          MAP.areas.push({
            name: "0",
            shape: "circle",
            coords: [s.x0_pixel, s.y0_pixel,4],
            preFillColor: "blue",
            fillColor: "#0000ff"
          })

          if (s.x1_pixel!=0 & s.y1_pixel!=0) {
          MAP.areas.push({
            name: "1",
            shape: "circle",
            coords: [s.x1_pixel, s.y1_pixel,4],
            preFillColor: "blue",
            fillColor: "#0000ff"
          })
          }

          if (s.x2_pixel!=0 & s.y2_pixel!=0) {
          MAP.areas.push({
            name: "2",
            shape: "circle",
            coords: [s.x2_pixel, s.y2_pixel,4],
            preFillColor: "blue",
            fillColor: "#0000ff"
          })
          } 

          if (s.x3_pixel!=0 & s.y3_pixel!=0) {
          MAP.areas.push({
            name: "3",
            shape: "circle",
            coords: [s.x3_pixel, s.y3_pixel,4],
            preFillColor: "blue",
            fillColor: "#0000ff"
          }) 
          }

          if (s.x4_pixel!=0 & s.y4_pixel!=0) {
          MAP.areas.push({
            name: "4",
            shape: "circle",
            coords: [s.x4_pixel, s.y4_pixel,4],
            preFillColor: "blue",
            fillColor: "#0000ff"
          }) 
          }

          if (s.x5_pixel!=0 & s.y5_pixel!=0) {
          MAP.areas.push({
            name: "5",
            shape: "circle",
            coords: [s.x5_pixel, s.y5_pixel,4],
            preFillColor: "blue",
            fillColor: "#0000ff"
          }) 
          }

          if (s.x6_pixel!=0 & s.y6_pixel!=0) {
          MAP.areas.push({
            name: "6",
            shape: "circle",
            coords: [s.x6_pixel, s.y6_pixel,4],
            preFillColor: "blue",
            fillColor: "#0000ff"
          }) 
          }

          if (s.x7_pixel!=0 & s.y7_pixel!=0) { 
          MAP.areas.push({
            name: "7",
            shape: "circle",
            coords: [s.x7_pixel, s.y7_pixel,4],
            preFillColor: "blue",
            fillColor: "#0000ff"
          })
          }

          if (s.x8_pixel!=0 & s.y8_pixel!=0) {
          MAP.areas.push({
            name: "8",
            shape: "circle",
            coords: [s.x8_pixel, s.y8_pixel,4],
            preFillColor: "blue",
            fillColor: "#0000ff"
          })
          }

          if (s.x9_pixel!=0 & s.y9_pixel!=0) {
          MAP.areas.push({
            name: "9",
            shape: "circle",
            coords: [s.x9_pixel, s.y9_pixel,4],
            preFillColor: "blue",
            fillColor: "#0000ff"
          }) 
          }

          if (s.x10_pixel!=0 & s.y10_pixel!=0) {
          MAP.areas.push({
            name: "10",
            shape: "circle",
            coords: [s.x10_pixel, s.y10_pixel,4],
            preFillColor: "blue",
            fillColor: "#0000ff"
          }) 
          }

          if (s.x11_pixel!=0 & s.y11_pixel!=0) {
          MAP.areas.push({
            name: "11",
            shape: "circle",
            coords: [s.x11_pixel, s.y11_pixel,4],
            preFillColor: "blue",
            fillColor: "#0000ff"
          }) 
          } 

          if (s.x12_pixel!=0 & s.y12_pixel!=0) {
          MAP.areas.push({
            name: "12",
            shape: "circle",
            coords: [s.x12_pixel, s.y12_pixel,4],
            preFillColor: "blue",
            fillColor: "#0000ff"
          })
          } 

          if (s.x13_pixel!=0 & s.y13_pixel!=0) {
          MAP.areas.push({
            name: "13",
            shape: "circle",
            coords: [s.x13_pixel, s.y13_pixel,4],
            preFillColor: "blue",
            fillColor: "#0000ff"
          })
          }

          if (s.x14_pixel!=0 & s.y14_pixel!=0) {
          MAP.areas.push({
            name: "14",
            shape: "circle",
            coords: [s.x14_pixel, s.y14_pixel,4],
            preFillColor: "blue",
            fillColor: "#0000ff"
          }) 
          }

          if (s.x15_pixel!=0 & s.y15_pixel!=0) {
          MAP.areas.push({
            name: "15",
            shape: "circle",
            coords: [s.x15_pixel, s.y15_pixel,4],
            preFillColor: "blue",
            fillColor: "#0000ff"
          })
          } 
         
        //Add color to the last point
        MAP.areas[s.nb_pts-1].preFillColor="#00FF00"
        //
        console.log(MAP.areas[s.nb_pts-1].preFillColor)
        }
        
        )

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
        <img style={{float:"right", marginTop:"0.5em"}} width="50" src="./images/back.png" onClick={() => this.props.callBackRetourMaps() }/>
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