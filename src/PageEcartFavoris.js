import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import TableEcartSelection from './TableEcartSelection';

class PageEcartFavoris extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      synthese : null
    }

  }

  classes = makeStyles((theme: Theme) =>
  createStyles({
   }),
  );

  handleCallbackViewDetails = (data) => {
    this.props.callbackViewDetails(data)
  } 

  handleCallbackViewEdit = (data) => {
    this.props.callbackViewEdit(data)
  }

  handleCallbackFilterChange = (data) => {
    this.setState( { dataTableSynthese: data })
  }

  render() {
  return (
    <div className={this.classes.root}>

    {/* Section recherche  */}
     <Container style={{minWidth:'1000px', maxWidth:'1000px', backgroundColor: '#FAFBFC',height: '100%' }}>
    <Card>
      <CardContent>
      <Typography color="textSecondary" gutterBottom variant="h5" style={{color:"#454E54", lineHeight:"0.5em"}}>Écart des sélections</Typography>
      <div style={{marginTop:"1em"}}></div>
      <Typography color="textSecondary" gutterBottom variant="body1">Zoom sur les écarts des sélections du jour.</Typography>
        <Grid style={{marginTop:'1em'}} container spacing={3}>
      <Grid item xs={12}>
      <TableEcartSelection apiKey = { this.props.apiKey } synthese = {this.state.synthese} callbackDetailsSelection = { this.handleCallbackViewDetails } callbackNeedToLogin = { this.props.callbackNeedToLogin }></TableEcartSelection>      
      </Grid>
    <Grid item xs={12}>
    <Alert severity="info"><span>Le tableau des <i>Trotteurs favoris à l'écart</i> vous permet de suivre quotidiennement les performances des chevaux les plus joués. Notre analyse vous alerte sur des écarts statistiquement anormaux.</span></Alert>
    </Grid>
    </Grid>
    </CardContent>
    </Card>
    </Container>
    </div>
  )}
}

export default PageEcartFavoris;