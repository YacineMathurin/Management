
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

class PageMaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey : props.apiKey,
      maps : null,
      map : this.props.showDetailsMaps,
      hoveredArea: null, msg: null, moveMsg: null
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
        this.setState({ maps: data})
      }
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
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
        console.log("ELse it's me MR")
        this.setState({ listeMetrics: data})
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
  

  render() {
  return (
    <div className={this.classes.root}>
    
    {/* Section recherche  */}
    <Container style={{minWidth:'1200px', maxWidth:'1200px', backgroundColor: '#FAFBFC',height: '100%' }}>
    
    
    <Card>
    <CardContent >
    
        <div>
        <img style={{float:"left", marginTop:"0.5em"}} width="40" src="./images/carrier.svg"/>
        </div>
                    
        <div style={{marginLeft:"3.5em"}}>
        <Typography style={{color:"BLACK"}} component="h5" variant="h5">
        robot  {this.state.map}
        </Typography>
        </div>
        <span >&nbsp;</span>
      <Table>
      <h1 > Select your Map </h1>
      { (this.state.maps != null) && (  this.state.maps.map((s) => { 
                
                return ( 
                  
                    <div key={s.pk} style={{paddingLeft:400,backgroundColor:"#E0F2FB",border: 2}}>
                    <h2 > Map {s.pk}</h2>
                    <img  style={{paddingBottom:10}}  width="250"  src={ `data:image/png;base64,`+s.blob} onClick={() => this.handleCallbackOpenMapGestion(s.pk+"blob"+s.blob) }/>
                                             
                    </div>
                
                )
          }))
          
          }
        
     </Table>
     
       
       
    </CardContent>
    </Card>
    </Container>
    </div>
  )}
}

export default PageMaps;