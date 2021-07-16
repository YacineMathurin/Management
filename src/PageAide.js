
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

class PageAide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey : props.apiKey,
      detail: "",
      synthese : null,
      details : null,
      metric : this.props.showDetailsMetrics
    }
  }

  classes = makeStyles((Theme) =>
    createStyles({
    }),
  );

  provideMetrics(){
    fetch(Const.URL_WS_PROVIDE_DETAILS + `?id=${this.state.metric}`, { retry: 3, retryDelay: 1000 })
    .then(res => res.json())
    .then((data) => {
      if (data.hasOwnProperty('message') && data.message.includes('TOKEN_NON_VALIDE')) {
        this.props.callbackNeedToLogin()
      } else {
        this.setState({ details: data})
      }
    })
    .catch((error) => {
      console.log('Request failed', error)
    })
  }

  componentDidMount() {
  //  this.provideMetrics();
  }
  

  render() {
  return (
    <div className={this.classes.root}>
    
    {/* Section recherche  */}
    <Container style={{minWidth:'1200px', maxWidth:'1200px', backgroundColor: '#FAFBFC',height: '100%' }}>
    
    
    <Card>
    <CardContent>
    <div>
               <img style={{float:"left", marginTop:"0.5em"}} width="40" src="./images/carrier.svg"/>
               </div>
              
               <div style={{marginLeft:"3.5em"}}>
               <Typography style={{color:"BLACK"}} component="h5" variant="h5">
               {this.state.metric}
               </Typography>
               <Typography style={{fontSize:"14px"}} color="textSecondary">
                 description
               </Typography>
               </div>
    
    <Grid container spacing={2}>
      <Grid item xs={12} >
        <Card style={{marginTop:"2em"}}>

        <CardHeader
            avatar={
              <img width="38" src="./images/chip.svg"/>
            }
            
            title="Logiciel cobot"
            subheader="informations sur la partie logicielle"
          />
        </Card>

        <CardContent>
        <Grid container spacing={2}>
        <Grid item xs={8} >
            
            <Card>
           <CardHeader
            avatar={
              <img width="24" src="./images/cpu.svg"/>
            }
            
            title="CPU"
            subheader="Évolution du taux d'occupation du CPU"
          />
              <CardContent>
              { (this.state.details != null ) && (
               <TestLineChart data={this.state.details.cpu}/>
              )}
              </CardContent>
            </Card>

            <Card style={{marginTop:"1em"}}>
              <CardContent>
              <CardHeader
            avatar={
              <img width="24" src="./images/memory.svg"/>
            }
            
            title="Mémoire"
            subheader="Évolution du taux d'occupation de la mémoire"
          />
               { (this.state.details != null ) && (
               <TestLineChart data={this.state.details.mem}/>
              )}
              </CardContent>
            </Card>

            <Card style={{marginTop:"1em"}}>
              <CardContent>
              <CardHeader
            avatar={
              <img width="24" src="./images/heat.svg"/>
            }
            
            title="Température"
            subheader="Évolution de la température"
          />
               <TestLineChart data={[{date:"01/01/2020", valeur:32}, {date:"02/01/2020", valeur:33}, {date:"03/01/2020", valeur:34},{date:"04/01/2020", valeur:30},{date:"05/01/2020", valeur:29},{date:"06/01/2020", valeur:34},{date:"07/01/2020", valeur:32},{date:"08/01/2020", valeur:31}]}/>
              </CardContent>
            </Card>
       </Grid>

          <Grid item xs={4} >
              <Table>
              <TableRow>
                    <TableCell><img  width="30" src="./images/ip-address.svg"/></TableCell>
                    <TableCell align="right">
                    <Typography style={{fontSize:"18px"}} >
                        {this.state.metric}
                    </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><img  width="30" src="./images/usb.svg"/></TableCell>
                    <TableCell align="right">
                    <Typography style={{fontSize:"18px"}} >
                        N/C
                    </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><img  width="30" src="./images/cpu.svg"/></TableCell>
                    <TableCell align="right">
                    <Typography style={{fontSize:"18px"}} >
                    {this.state.metric} %
                    </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><img  width="30" src="./images/memory.svg"/></TableCell>
                    <TableCell align="right">
                    <Typography style={{fontSize:"18px"}} >
                    {this.state.metric} %
                    </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><img  width="30" src="./images/heat.svg"/></TableCell>
                    <TableCell align="right">
                    <Typography style={{fontSize:"18px"}} >
                        N/C
                    </Typography>
                    </TableCell>
                </TableRow>
               
              </Table>
          </Grid>

        </Grid> 

        

        </CardContent>
    
     </Grid>

     <Grid item xs={12} >
        <Card style={{marginTop:"2em"}}>

        <CardHeader
            avatar={
              <img width="38" src="./images/settings.svg"/>
            }
            
            title="Mécanique cobot"
            subheader="informations sur la partie mécanique"
          />
        </Card>
        <CardContent>
        <Grid container spacing={2}>

        <Grid item xs={8} >
            
            <Card>
           <CardHeader
            avatar={
              <img width="24" src="./images/heat.svg"/>
            }
            
            title="Température"
            subheader="Évolution de la température moteur"
          />
              <CardContent>
               
               <TestLineChart data={[{date:"01/01/2020", valeur:10}, {date:"02/01/2020", valeur:8}, {date:"03/01/2020", valeur:9},{date:"04/01/2020", valeur:6},{date:"05/01/2020", valeur:2},{date:"06/01/2020", valeur:9},{date:"07/01/2020", valeur:12},{date:"08/01/2020", valeur:4}]}/>
              </CardContent>
            </Card>

            <Card style={{marginTop:"1em"}}>
              <CardContent>
              <CardHeader
            avatar={
              <img width="24" src="./images/wheel.svg"/>
            }
            
            title="Roue droite"
            subheader="Évolution de la vitesse de la roue droite"
          />
               { (this.state.details != null ) && (
               <TestLineChart data={this.state.details.wheelR}/>
              )}
              </CardContent>
            </Card>

            <Card style={{marginTop:"1em"}}>
              <CardContent>
              <CardHeader
            avatar={
              <img width="24" src="./images/wheel.svg"/>
            }
            
            title="Roue gauche"
            subheader="Évolution de la vitesse de la roue gauche"
          />
                { (this.state.details != null ) && (
               <TestLineChart data={this.state.details.wheelL}/>
              )}
              </CardContent>
            </Card>

            <Card style={{marginTop:"1em"}}>
              <CardContent>
              <CardHeader
            avatar={
              <img width="24" src="./images/car-battery.svg"/>
            }
            
            title="Batterie"
            subheader="Évolution de la batterie"
          />
                { (this.state.details != null ) && (
               <TestLineChart data={this.state.details.bat}/>
              )}
              </CardContent>
            </Card>
       </Grid>

          <Grid item xs={4} >
              <Table>
               
                <TableRow>
                    <TableCell><img  width="30" src="./images/heat.svg"/></TableCell>
                    <TableCell align="right">
                    <Typography style={{fontSize:"18px"}} >
                        N/C
                    </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><img  width="30" src="./images/wheel.svg"/></TableCell>
                    <TableCell align="right">
                    <Typography style={{fontSize:"18px"}} >
                    {this.state.metric} tr/min
                    </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><img  width="30" src="./images/wheel.svg"/></TableCell>
                    <TableCell align="right">
                    <Typography style={{fontSize:"18px"}} >
                    {this.state.metric} tr/min
                    </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><img  width="30" src="./images/car-battery.svg"/></TableCell>
                    <TableCell align="right">  <Typography style={{fontSize:"18px"}} >
                    {this.state.metric} %
                    </Typography></TableCell>
                </TableRow>
                
               
              </Table>
          </Grid>
        </Grid> 
        </CardContent>
     </Grid>
    
     <Grid item xs={12} >
        <Card style={{marginTop:"2em"}}>

        <CardHeader
            avatar={
              <img width="38" src="./images/log-format.svg"/>
            }
            
            title="Journal des évènements"
            subheader="Logs techniques"
          />
        </Card>
        <CardContent>
            <Table>
            <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </Table>
        </CardContent>
      </Grid>

    </Grid>
    
   
    </CardContent>
    </Card>
    </Container>
    </div>
  )}
}

export default PageAide;